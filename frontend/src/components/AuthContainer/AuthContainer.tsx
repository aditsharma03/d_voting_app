import { useState } from 'react';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import { configDotenv, config} from 'dotenv';


//const BACKEND_URL = process.env.BACKEND_URL

const AuthContainer = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleSignIn = (credentials: any) => {
    console.log('Signing in with:', credentials);
    // Add your authentication logic here

    const {email, password, biometricImageDescriptor} = credentials;
  };

  const handleSignUp = (userData: any) => {
    console.log('Signing up with:', userData);
    // Add your registration logic here
    
    const {name, email, password, biometricImageDescriptor} = userData;
  };

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
