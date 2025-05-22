import { createContext, useContext, useState } from "react";



//import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';
//const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({
Canvas: HTMLCanvasElement,
Image: HTMLImageElement,
//ImageData: ImageData,
Video: HTMLVideoElement,
createCanvasElement: () => document.createElement('canvas'),
createImageElement: () => document.createElement('img')
})



const BACKEND_URL = "http://localhost:8000";

export const AuthContext = createContext({
  token: "",
  isFaceSame: false,
  handleSignIn: (userData:Object) => {},
  handleSignUp: (userData:Object) => {},
  handleLogout: () => {},
})

export const AuthContextProvider = ({children}: any) => {

  const [token, setToken] = useState("");
  const [isFaceSame, setIsFaceSame] = useState(false);

  const handleSignIn = async (credentials: any) => {
    console.log('Signing in with:', credentials);
    // Add your authentication logic here

    const {email, password, biometricImageDescriptor} = credentials;

    let result = await fetch( `${BACKEND_URL}/auth/signin`, {
      method: "POST",
      headers: {
       'Content-Type': 'application/json', // Specify the content type
     },
      body: JSON.stringify({
        "email": email,
        "password": password,
        "descriptor": biometricImageDescriptor
      })
    } )

    result = await result.json();

    console.log(result);

    if( result.authToken ) setToken(result.authToken);


    const processImage2 = async () => {
      const faceMatcher = new faceapi.FaceMatcher(biometricImageDescriptor);


      Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      ]).then(() => {
          const match = faceMatcher.findBestMatch(result.descriptor);
          //console.log(match);
          if( match.label !== "unknown" ){
            setIsFaceSame(true);
          }
        })
        .catch((err) => alert(err));
    };
    processImage2();
  };

  const handleSignUp = async (userData: any) => {
    console.log('Signing up with:', userData);
    // Add your registration logic here
    
    const {name, email, password, biometricImageDescriptor} = userData;

    let result = await fetch( `${BACKEND_URL}/auth/signup`, {
      method: "POST",
      headers: {
       'Content-Type': 'application/json', // Specify the content type
     },
      body: JSON.stringify({
        "name": name,
        "email": email,
        "password": password,
        "descriptor": Array.from(biometricImageDescriptor.descriptor),
      })
    } )

    result = await result.json();
    if( result.authToken ) setToken( result.authToken );
    setIsFaceSame(true);

  };

  const handleLogout = () => {

  }
  
  return (
    <AuthContext.Provider value={{token, isFaceSame, handleSignIn, handleSignUp, handleLogout}}>
      {children}
    </AuthContext.Provider>
  )
}



export const useAuthContext = () => {
  return useContext(AuthContext);
}
