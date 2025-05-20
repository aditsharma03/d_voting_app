import { useState } from 'react';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

const AuthContainer = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleSignIn = (credentials: any) => {
    console.log('Signing in with:', credentials);
    // Add your authentication logic here
  };

  const handleSignUp = (userData: any) => {
    console.log('Signing up with:', userData);
    // Add your registration logic here
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
