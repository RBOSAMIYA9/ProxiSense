import React, { useState } from 'react'

import {

    Box,
    Text,
    Button,
    Center,
    VStack,
    Input,
    useColorMode,
    // Alert,
    // AlertIcon,
    // AlertDescription,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';



const adminDetails = {
    userName: "ravindra",
    password: "ravindra"
}

const errorMessage = <Text color="red">Incorrect login details! </Text>

function Login({ user, setUser }) {

    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode();
    const [error, seterror] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        if (data.userName === adminDetails.userName && data.password === adminDetails.password) {
            console.log("login success");
            localStorage.setItem('user', JSON.stringify({ userName: "ravindra" }))

            setUser({ userName: "ravindra" })

            seterror(false);
        }
        else {
            seterror(true);
        }
    }
    console.log(errors);

    // eslint-disable-next-line 
    const guestLogin = () => {
        console.log("login success");
        localStorage.setItem('user', JSON.stringify({ userName: "ravindra" }))

        setUser({ userName: "ravindra" })

        seterror(false);
    }

    return (
        <>

            <Box bg={colorMode === "light" ? "gray.100" : "gray.700"} width="100vw" h="100vh" >
                <Center>
                    <VStack m="12" >
                        <Text as="h1" fontSize="30px">Login</Text>
                        <Box w={["80vw", "60vw", "40vw", "20vw"]} mt="12" boxShadow="lg" borderRadius="25px" p="5" bg={colorMode === "light" ? "white" : "gray.600"}>
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <Input placeholder="UserName" type="text" size="lg" mt="6"  {...register("userName", { required: true })} required />
                                <Input placeholder="Password" type="password" size="lg" mt="6" {...register("password", { required: true })} required />
                                {error && errorMessage}
                                <Button mt="6" type="submit" size="lg" width="100%" colorScheme="teal">Login</Button>
                                <Button mt="6" onClick="guestLogin()" size="lg" width="100%" colorScheme="gray">Guest Login</Button>

                            </form>
                        </Box>
                        {/* <Alert status="info">
                            <AlertIcon />

                            <AlertDescription>Use userName: ravindra  password: ravindra to view Demo!</AlertDescription>

                        </Alert> */}
                    </VStack>
                </Center>
            </Box>


        </>
    )
}

export default Login
