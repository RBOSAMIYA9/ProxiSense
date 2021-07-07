import React from 'react'
import {

    Box,
    Heading,
    Center,
    Button,
    List, ListItem, ListIcon, useColorMode
} from '@chakra-ui/react';
import { FaRegDotCircle } from "react-icons/fa";
import {
    Link
} from "react-router-dom";


function UseCases() {
    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <>
            <Box p="6" bg={colorMode === "light" ? "gray.50" : "gray.900"}>
                <Heading textAlign="center">UseCases</Heading>
                <Center>
                    <List spacing={3} textAlign="left" mt="5">
                        <ListItem>
                            <ListIcon as={FaRegDotCircle} color="green.500" />
                            Can be used to enhance Productivity of company
                        </ListItem>
                        <ListItem>
                            <ListIcon as={FaRegDotCircle} color="green.500" />
                            Can be  used as attendence system
                        </ListItem>
                        <ListItem>
                            <ListIcon as={FaRegDotCircle} color="green.500" />
                            Can be integrated with existing payroll systems
                        </ListItem>
                        <Center my="5">
                            <Link to="/dashboard"><Button colorScheme="whatsapp" borderRadius="25px">View Demo</Button></Link>
                        </Center>
                    </List>
                </Center>

            </Box>


        </>
    )
}

export default UseCases
