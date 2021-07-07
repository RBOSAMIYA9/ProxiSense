import React from 'react'

import {

    Box,
    Text,
    Button,
    useColorMode

} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import {
    Link
} from "react-router-dom";

function Header() {
    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <>
            <Box bg={colorMode === "light" ? "white" : "gray.700"} boxShadow="md" p="5" d="flex" alignItems="center" justifyContent="space-between" >
                <Box fontSize="2rem" >
                    <Text as="span" fontWeight="hairline" color="blue.600">Proxi</Text>
                    <Text as="span" fontWeight="bold" color="green.400">Sense</Text>
                </Box>
                <Box d={["none", "none", "block", ""]}>
                    <Link to="/dashboard"><Button colorScheme="whatsapp" borderRadius="25px">Dashboard</Button></Link>
                    <ColorModeSwitcher />
                </Box>
            </Box>
        </>
    )
}

export default Header
