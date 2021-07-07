import React from 'react'
import {

    Box,
    Heading,
    Center,
    List, ListItem, ListIcon, useColorMode
} from '@chakra-ui/react';
import { FaRegDotCircle } from "react-icons/fa";

function Benifits() {
    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <>


            <Box p="6" bg={colorMode === "light" ? "gray.50" : "gray.900"}>
                <Heading textAlign="center">Benifits of ProxiSense</Heading>
                <Center>
                    <List spacing={3} textAlign="left" mt="5">
                        <ListItem>
                            <ListIcon as={FaRegDotCircle} color="green.500" />
                            Easy to Implement
                        </ListItem>
                        <ListItem>
                            <ListIcon as={FaRegDotCircle} color="green.500" />
                            Real-time tracking within premises
                        </ListItem>
                        <ListItem>
                            <ListIcon as={FaRegDotCircle} color="green.500" />
                            Cloud-based & Secure
                        </ListItem>

                        <ListItem>
                            <ListIcon as={FaRegDotCircle} color="green.500" />
                            Alarms & Alerts
                        </ListItem>


                        <ListItem>
                            <ListIcon as={FaRegDotCircle} color="green.500" />
                            Productivity monitoring
                        </ListItem>

                        <ListItem>
                            <ListIcon as={FaRegDotCircle} color="green.500" />
                            SMS/Email Notification
                        </ListItem>
                    </List>
                </Center>

            </Box>

        </>
    )
}

export default Benifits
