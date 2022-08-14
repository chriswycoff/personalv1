import React from 'react';
import './App.css';
import {provider} from './firebase'
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { MdCheckCircle } from "react-icons/md";
import { getAuth, 
  signOut,
  signInWithPopup,
  GoogleAuthProvider } from "firebase/auth";
import {setActiveUser, 
setUserLogOutState, 
selectUserEmail, 
selectUserName}
from './features/userSlice'
import { Button, Text, Box, VStack, List, Image,
  ListItem,
  ListIcon,
  
  Heading,
  }  from '@chakra-ui/react';


function App() {

  const dispatch = useDispatch()

  const userName = useSelector(selectUserName)
  // const userEmail = useSelector(selectUserEmail)

  // const [word, setWord] = useState("nachos");
  
  const resume = "https://drive.google.com/file/d/1UyDOhvKPA8eqceGyNiOU4dPSmsyvMgeQ/view?usp=sharing"
  const github = "https://github.com/chriswycoff"
  const linkedin = "https://www.linkedin.com/in/christopherwycoff/"

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
      <Box className="App-header" backgroundImage={{md: "'url(../public/chriswebsite6.png)'" }}>
     {/* spacer div */}

  <Box display={{ md: 'flex'}} className='message' marginBottom={"40px"}>
  <Box width={{base:"0px", md:"400px", lg:"600px", xl:"800px"}}>
  </Box>
  <Box>
  <VStack padding={"0px"} >

  <Heading color={"white"} as='h1'><span style={{ color: '#00FFFF'}}>Pro</span>fessional Software Engineer</Heading>
  <Heading color={"white"} as='h1'><span style={{ color: '#00FFFF'}}>Chris</span> Wycoff</Heading>
  <br></br>
  <List>
  <ListItem color={"white"}><ListIcon as={MdCheckCircle} color='#00FFFF' /> Web2/3 Developer</ListItem>
  <ListItem color={"white"}><ListIcon as={MdCheckCircle} color='#00FFFF' />System Architect</ListItem>
  <ListItem color={"white"}><ListIcon as={MdCheckCircle} color='#00FFFF' />Technical Writer</ListItem>
</List>


  </VStack>
  </Box>
  </Box>
  {userName ? <Text fontSize={{base:"20px", md:"25px"}} color={"white"}
  top={{md:"50px", base:"10px"}} className='signin' left={{base: "20px"}}
  >Hello! {userName}</Text> : null }
  <Box top ={{base:"10px"}} right={{md: "125", base:"50px"}} className='resume'>
        <a href={github} target={"2"}>
        <Image boxSize={{md:"35px", base:"30px"}} src='/github_logo.png' alt="github"></Image>
        </a>
  </Box>
  <Box top ={{base:"10px"}} right={{md: "175",base:"100px"}} className='resume'>
        <a href={linkedin} target={"2"}>
        <Image boxSize={{md:"35px", base:"30px"}} src='/linkedin_logo_2.png' alt="linkedin"></Image>
        </a>
  </Box>

    <Box height={{base: "200px",md: "100px" }}></Box>
      <Box bottom={{md:"60%", base:"250px"}} left={{md: "220px",  lg:"300px",  base: "auto"}} className='resume'>
          <a href={resume} target={"1"}>
          <Button _hover={{ bg: '#1a68b0', color:"white" }} onClick={serveResume} >Chris' Resume</Button>
          </a>
      </Box>

        {userName ? 
        
        <Box bottom={{md:"50%", base:"150px"}} className='signin' left={{md: "220px", lg:"300px", base: "auto"}}>

          <Button _hover={{ bg: '#1a68b0', color:"white" }} onClick={handleSignOut} >Sign Out</Button>
          </Box>
        :
        <Box bottom={{md:"50%", base:"150px"}} className='signin' left={{md: "220px", lg:"300px", base: "auto"}}>
        <Button className='main' _hover={{ bg: '#1a68b0', color:"white", transform: "5px"}} onClick={handleSignIn} >Client Sign In</Button>
        </Box>
        }
      
      </Box>
    </div>

    
  );


}

export default App;
