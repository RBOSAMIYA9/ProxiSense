import React, { useState, useEffect } from 'react'

import Login from './Login'
import NavBar from './NavBar'
import Container from './Container'
import {

    Box,

} from '@chakra-ui/react';

import mqtt from 'mqtt';

function Dashboard({ user, setUser }) {


    const [mqttStatus, setMqttStatus] = useState(false);
    const [messages, setMessages] = useState("");
    const [menu, setmenu] = useState("dashboard");


    const logOut = () => {

        localStorage.removeItem('user');
        setUser(null);

    }
    useEffect(() => {
        console.log("inside use effect");
        // const client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");
        // const client = mqtt.connect("ws://broker.mqttdashboard.com:8000/mqtt");
        // const client = mqtt.connect("ws://broker.emqx.io:8083/mqtt");
        const client = mqtt.connect("ws://test.mosquitto.org:8080");
        
        client.on('connect', () => {
            setMqttStatus(true);
            // setConnectionStatus(true);
            console.log("connected");
            client.subscribe('rajkotCityPoliceBleStatus')

        });
        client.on('message', (topic, payload, packet) => {
            console.log("got message  from: ", topic, "message : ", payload.toString());
            if (topic === 'rajkotCityPoliceBleStatus') {
                // const msgInjson = JSON.parse(payload.toString())
                // console.log("msgInjson", JSON.parse(payload.toString()));
                setMessages(JSON.parse(payload.toString()));

            }
        });

        client.on('disconnect', () => {
            setMqttStatus(false);
            console.log("mqtt disconnect");
        });


        client.on('offline', () => {
            setMqttStatus(false);
            console.log("mqtt offline");
        });


        // eslint-disable-next-line 
    }, []);


    return (
        <>
            {/* _hover={{ borderRight: "2px", borderColor: "green" }} */}

            {user ? <>
                <Box d="flex">
                    <NavBar setmenu={setmenu} menu={menu} logOut={logOut} />
                    <Container menu={menu} mqttStatus={mqttStatus} mqttMessage={messages} />
                </Box>

            </> : <Login user={user} setUser={setUser} />}


        </>
    )
}

export default Dashboard
