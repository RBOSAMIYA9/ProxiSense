import React from 'react'
import {

    Box,
    Heading,
    Center,
    Image
} from '@chakra-ui/react';
import bg from './indoorTracking.jpeg'

function HowItWorks() {
    return (
        <>
            <Box my="5" id="how-it-works">
                <Heading>
                    How it works?
                </Heading>
                <Center>
                    <Image mt="8"   src={bg}  w="40%"/>
                </Center>
            </Box>
        </>
    )
}

export default HowItWorks
