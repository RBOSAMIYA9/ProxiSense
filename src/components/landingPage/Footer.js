import React from 'react'
import {

    Box,
    Text,
   
    useColorMode

} from '@chakra-ui/react';

function Footer() {
    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <>
        {/* bg={colorMode === "light" ? "white" : "gray.700"} */}
            <Box  boxShadow="md" bg={colorMode === "light" ? "gray.100" : "gray.700"} mt="2" p="5" >
                <Text textAlign="center">Made with  ❤️  by <Text as="a" href="https://ravindrabosamiya.tech/" target="_blank"> Ravindra Bosamiya</Text></Text>
            </Box>
        </>
    )
}

export default Footer
