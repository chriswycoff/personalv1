import React from 'react';
import logo from './logo.svg';
import './App.css';
import {authentication, provider} from './firebase'
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { MdCheckCircle } from "react-icons/md";
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
import { Button, Text, Flex, Center, Square, Box, VStack, List,
  ListItem,
  ListIcon,
  OrderedList,
  Heading,
  UnorderedList,}  from '@chakra-ui/react';
import { motion } from "framer-motion"

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
  
    {/* <Box className='overlay'></Box> */}

    <Box className='overlay2'></Box>
      <Box className="App-header" backgroundImage={{md: "'url(../public/chriswebsite5.png)'" }}>
     {/* spacer div */}

  <Box display={{ md: 'flex'}} className='message'>
  <Box width={{base:"0px", md:"400px", lg:"600px", xl:"800px"}}>
  </Box>
  <Box>
  <VStack padding={"0px"} >

  <Heading as='h1'>Chris Pro:</Heading>
  <List>
  <ListItem><ListIcon as={MdCheckCircle} color='#259c9a' /> Web2/3 Developer</ListItem>
  <ListItem><ListIcon as={MdCheckCircle} color='#259c9a' />System Architect</ListItem>
  <ListItem><ListIcon as={MdCheckCircle} color='#259c9a' />Technical Writer</ListItem>
</List>


  </VStack>
  </Box>
  </Box>
    <Box height={{base: "200px",md: "100px" }}></Box>
        
        {userName ? 
        <Box className='signin' right={{md: "70px", base: "10px"}}>
          <Text fontSize={{base:"16px", md:"25px"}} color={"black"}>Hello! {userName}</Text>
          <Button _hover={{ bg: '#1a68b0', color:"white" }} onClick={handleSignOut} >Sign Out</Button>
          </Box>
        :
        <Box bottom={{md:"420px", base:"150px"}} className='signin' left={{md: "220px", lg:"300px", base: "auto"}}>
        <Button className='main' color="black" _hover={{ bg: '#1a68b0', color:"white", transform: "5px"}} onClick={handleSignIn} >Client Sign In</Button>
        </Box>
        }
       
        <Box bottom={{md:"500px", base:"250px"}} left={{md: "220px",  lg:"300px",  base: "auto"}} className='resume'>
        <a href={resume} target={"1"}>
        <Button _hover={{ bg: '#1a68b0', color:"white" }} onClick={serveResume} >Chris' Resume</Button>
        </a>
        </Box>
      </Box>
    </div>

    
  );


}

export default App;
