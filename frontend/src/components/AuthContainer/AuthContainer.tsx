import { useState } from 'react';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

//import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';
import { useAuthContext } from '../../contexts/AuthContext';
//const { Canvas, Image, ImageData } = canvas
//faceapi.env.monkeyPatch({ Canvas, Image, ImageData })
faceapi.env.monkeyPatch({
Canvas: HTMLCanvasElement,
Image: HTMLImageElement,
//ImageData: ImageData,
Video: HTMLVideoElement,
createCanvasElement: () => document.createElement('canvas'),
createImageElement: () => document.createElement('img')
})

const BACKEND_URL = "http://127.0.0.1:8000";

const AuthContainer = () => {
  const [isSignIn, setIsSignIn] = useState(true);



  const { handleSignUp, handleSignIn } = useAuthContext();



//  const handleSignIn = async (credentials: any) => {
//    console.log('Signing in with:', credentials);
//    // Add your authentication logic here
//
//    const {email, password, biometricImageDescriptor} = credentials;
//
//    let result = await fetch( `${BACKEND_URL}/auth/signin`, {
//      method: "POST",
//      headers: {
//       'Content-Type': 'application/json', // Specify the content type
//     },
//      body: JSON.stringify({
//        "email": email,
//        "password": password,
//        "descriptor": biometricImageDescriptor
//      })
//    } )
//
//    result = await result.json();
//
//    console.log( typeof result.descriptor )
//
//    const processImage2 = async () => {
//      const faceMatcher = new faceapi.FaceMatcher(biometricImageDescriptor);
//
//
//      Promise.all([
//        faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
//        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
//        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
//      ]).then(() => {
//          const match = faceMatcher.findBestMatch(result.descriptor);
//          console.log(match);
//        })
//        .catch((err) => alert(err));
//    };
//    processImage2();
//  };







  //const handleSignUp = async (userData: any) => {
  //  console.log('Signing up with:', userData);
  //  // Add your registration logic here
  //  
  //  const {name, email, password, biometricImageDescriptor} = userData;

  //  const foo = Array.from(biometricImageDescriptor.descriptor);

  //  const result = await fetch( `${BACKEND_URL}/auth/signup`, {
  //    method: "POST",
  //    headers: {
  //     'Content-Type': 'application/json', // Specify the content type
  //   },
  //    body: JSON.stringify({
  //      "name": name,
  //      "email": email,
  //      "password": password,
  //      "descriptor": foo
  //    })
  //  } )

  //  console.log(result);
  //};

  return (
    <div className=" w-1/2 mx-auto flex items-center justify-center p-4">
      {isSignIn ? (
        <SignIn
          onSignIn={handleSignIn} 
          onSwitchToSignUp={() => setIsSignIn(false)} 
        />
      ) : (
        <SignUp 
          onSignUp={handleSignUp} 
          onSwitchToSignIn={() => setIsSignIn(true)} 
        />
      )}
    </div>
  );
};

export default AuthContainer;
