import React from 'react'
import {

    Box,
    Heading,
    Text,
    Button,
    Image
} from '@chakra-ui/react';
import {
    Link
} from "react-router-dom";
import bgSvg from './bg.svg'
import { HashLink } from 'react-router-hash-link';

// const backgroundSrc = `url(${bgSvg} )`
function HeroSection() {
    return (
        <>
            <Box
                pt="12"
                d="flex"
                flexDirection={["column", 'column', "row", "row"]}

            >

                <Box d="flex" flexDirection="column" alignItems="center" justifyContent="center" w={["100%", "100%", "50vw", "50vw"]} >
                    <Heading color="blue.600" ><Text as="span" color="green.500">Innovative, hasselfree</Text> proximity based presence tracking system</Heading>
                    <Link to="/dashboard"><Button colorScheme="whatsapp" borderRadius="25px">View Demo</Button></Link>

                    <HashLink to="/#how-it-works">

                        <Button borderRadius="25px" border="1px solid black" m="3">How it works?</Button>
                    </HashLink>
                </Box>
                <Image src={bgSvg} my={["-250px", "0", "0", "0"]} w={["100vw", "100vw", "50vw", "50vw"]} h={["50rem", "50rem", "", ""]} />
            </Box>


        </>
    )
}

export default HeroSection
