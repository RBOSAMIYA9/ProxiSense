import React from 'react'
import {

    Box,
    Text,
    useColorMode
} from '@chakra-ui/react';

import RegistrationForm from "./Registration"
import ViewEmployees from "./ViewEmployees"
import DashboardData from "./DashboardData"

function Container({ menu, mqttMessage,  mqttStatus }) {
    
    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode()
    const alias = {
        "dashboard": "Dashboard",
        "listAll": "Employees details",
        "createEmployee": "New Employee Registration"

    }
    return (
        <>
            <Box bg={colorMode === "light" ? "gray.100" : ""} width={["100vw", "100vw", "95%", "95%"]} pb="10vh" minH="100vh">
                <Text textAlign="center" as="h1" fontSize="1.5rem" mt="6">{alias[menu]}</Text>
                {
                    menu === "createEmployee" && <RegistrationForm />
                }
                {
                    menu === "listAll" && <ViewEmployees />
                }
                {
                    menu === "dashboard" && <DashboardData mqttMessage={mqttMessage}  mqttStatus={mqttStatus} />
                }

            </Box>

        </>
    )
}

export default Container
