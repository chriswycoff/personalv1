import React from 'react';
import logo from './logo.svg';
import './App.css';
import {authentication, provider} from './firebase'
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getAuth, 
  signOut,
  signInWithPopup,
   createUserWithEmailAndPassword,
  GoogleAuthProvider } from "firebase/auth";
import {setActiveUser, 
setUserLogOutState, 
selectUserEmail, 
selectUserName}
from './features/userSlice'
import { Button, Text, Flex, Center, Square, Box }  from '@chakra-ui/react';

function App() {

  const dispatch = useDispatch()

  const userName = useSelector(selectUserName)
  const userEmail = useSelector(selectUserEmail)
  const [word, setWord] = useState("nachos");
  
  const resume = "https://drive.google.com/file/d/1BXNUbLkthJwQMpcgyiuSv5f4O41b_Jyu/view?usp=sharing"
  
  const serveResume = () => {
    console.log("linking resume")
  }


  useEffect(() => {
   
  }, []);

const handleSignIn = () =>{

  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("here",result)
      dispatch(setActiveUser({
        userName : result.user.displayName,
        userEmail : result.user.email
      }))
      // ...
    }).catch((error) => {
      console.log(error)
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

}

const handleSignOut = () =>{
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    dispatch(setUserLogOutState())
  }).catch((error) => {
    // An error happened.
    console.log(error)
  });
}

// 



// 
  return (
    <div className="App">
      <header className="App-header">
     {/* spacer div */}

  <Text color={"black"}>Chris</Text>
  <Text color={"black"}>Professional Technologist</Text>
    <Box height={"200px"}></Box>
        <div className='signin'>
        {userName ? 
          <Button _hover={{ bg: '#1a68b0', color:"white" }}onClick={handleSignOut} >Sign Out</Button>
        :
        <Button _hover={{ bg: '#1a68b0', color:"white" }}onClick={handleSignIn} >Client Sign In</Button>
        }
        </div>
        <div className='resume'>
        <a href={resume} target={"1"}>
        <Button _hover={{ bg: '#1a68b0', color:"white" }} onClick={serveResume} >Resume</Button>
        </a>
        </div>
      </header>
    </div>

    
  );


}

export default App;
