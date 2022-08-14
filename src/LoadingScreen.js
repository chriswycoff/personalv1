import React from 'react';

import Spinner from "./spinner"

import { Center
  }  from '@chakra-ui/react';


export default function LoadingScreen() {



// 
  return (
    <div>
    <Center h={"100vh"} background="black">
    <Spinner></Spinner>
    </Center>
    </div>
  );


}

