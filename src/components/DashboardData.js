import React, { useEffect, useState } from 'react'
import {
    Center, useColorMode,
    Box, useToast,
    Text, Tabs, TabList, TabPanels, Tab, TabPanel, Spinner, Image
} from '@chakra-ui/react';
import { projectFirestore } from '../firebase/firebaseConfig'
import { MdUpdate } from 'react-icons/md'
import { GoPrimitiveDot } from 'react-icons/go'
import * as moment from 'moment';
// import sound from './entered.wav'

function DashboardData({ mqttMessage, mqttStatus }) {

    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode()
    const sound = "https://media1.vocaroo.com/mp3/1lPHQ4EFRNaZ"
    const [employeeList, setEmployeeList] = useState([])
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const [presentTotal, setPresentTotal] = useState(0);
    const [absentTotal, setAbsentTotal] = useState(0);

    const [presentList, setPresentList] = useState([]);
    const [absentList, setAbsentlist] = useState([]);
    const [updatedTimestamp, setUpdateTimestamp] = useState("");
    const [difference, setDifference] = useState({});

    const toast = useToast()
    // localStorage.setItem('user', JSON.stringify({ userName: "ravindra" }))
    // JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        // console.log(" if no pela in useEffect", mqttMessage)
        if (mqttMessage) {


            var mqttMessageArray = [...new Set(mqttMessage["devices"])]
            // mqttMessage = [...new Set(mqttMessage["devices"])]

            // console.log("in useEffect", mqttMessage)
            var present = [];

            var totalPresent = 0;
            for (var i = 0; i < mqttMessageArray.length; i++) {
                // console.log("mqtt message", mqttMessage[i])
                for (var j = 0; j < employeeList.length; j++) {
                    // console.log("employee", employeeList[j].data.bleData)
                    if (mqttMessageArray[i] === employeeList[j].data.bleData) {
                        // console.log("mqtt: ", mqttMessage[i], "employee :", employeeList[j].data.bleData)
                        present.push(employeeList[j]);
                        totalPresent += 1;
                    }

                }
            }
            setPresentList(present);
            setPresentTotal(totalPresent);

            //calc absents
            var absentees = employeeList.filter(x => present.indexOf(x) === -1);
            // console.log("absents in useEffect", absentees);
            setAbsentlist(absentees);
            setAbsentTotal(absentees.length);
            var CurrentDate = moment(new Date());
            // setDifference(CurrentDate.diff(updatedTimestamp, 'seconds'))
            // console.log("current time", CurrentDate)
            var timeUpdate;
            if (CurrentDate.diff(updatedTimestamp, 'minutes') > 60) {
                timeUpdate = {
                    "time": "hours",
                    "differenceTime": CurrentDate.diff(updatedTimestamp, 'hours')
                };
                setDifference(timeUpdate)
                // console.log("in hours", CurrentDate.diff(updatedTimestamp, 'minutes'))
            }


            else {
                // console.log("in seconds", CurrentDate.diff(updatedTimestamp, 'seconds'))
                timeUpdate = {
                    "time": "minutes",
                    "differenceTime": CurrentDate.diff(updatedTimestamp, 'minutes')
                }
                setDifference(timeUpdate);
            }
            setUpdateTimestamp(CurrentDate)
            const audioEl = document.getElementsByClassName("audio-element")[0]
            audioEl.play()


            var tempData =
            {
                "presentEmployees": present,
                "presentTotal": totalPresent,
                "absentEmployees": absentees,
                "absentTotal": absentees.length,
                "updateTime": timeUpdate
            }

            localStorage.setItem('data', JSON.stringify(tempData))
            // console.log("temp:",JSON.parse(tempData));


        }


        // eslint-disable-next-line
    }, [mqttMessage])

    useEffect(() => {
        console.log("mqttStatus i vu")
        if (mqttStatus) {
            // toast({
            //     title: "MQTT Connected ",
            //     status: "success",
            //     isClosable: true,
            // })

        } else if (!mqttStatus) {
            toast({
                title: "MQTT Disconnected ",
                status: "error",
                isClosable: true,
            })
        }

        // eslint-disable-next-line 
    }, [mqttStatus])



    useEffect(() => {
        // console.log("localstorrge data",localStorage.getItem('data'));
        setLoading(true);
        const collectionRef = projectFirestore.collection("employeeData");
        collectionRef.onSnapshot((snapshot) => {
            var data = snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            }))

            setEmployeeList(data)
            setTotal(snapshot.docs.length)
            setLoading(false)

            try {
                var oldData = JSON.parse(localStorage.getItem('data'));

                console.log("old time: ", oldData);
                setPresentTotal(oldData["presentTotal"]);
                setAbsentTotal(oldData["absentTotal"]);
                setPresentList(oldData["presentEmployees"]);
                setAbsentlist(oldData["absentEmployees"]);
                setDifference(oldData["updateTime"]);

            }
            catch (e) {

                // eslint-disable-next-line 
                var previousData = {

                    "presentEmployees": [],
                    "presentTotal": 0,
                    "absentEmployees": [],
                    "absentTotal": 0,
                    "updateTime": {
                        "time": "minutes",
                        "differenceTime": 0
                    }
                }
            }


        })

    }, [])

    return (
        <>
            {loading ? <Center>
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />
            </Center> : (<>
                <Box w="100%" >
                    <Box d="none">
                        <audio className="audio-element">
                            <source src={sound}></source>
                        </audio>
                    </Box>
                    <Box d="flex" p="6" flexDirection={["column", "column", "row", "row"]} justifyContent="space-between">
                        <Box flexGrow="1" m="4" bg={colorMode === "light" ? "white" : "green.700"} p="2" borderRadius="25px" boxShadow="lg">
                            <Center d="flex" flexDir="column">
                                <Text fontSize="large" >Total Registred</Text>

                                <Text fontSize="5xl">{total}</Text>
                            </Center>
                        </Box>
                        <Box flexGrow="1" m="4" bg={colorMode === "light" ? "white" : "green.700"} p="2" borderRadius="25px" boxShadow="lg">
                            <Center d="flex" flexDir="column">
                                <Text fontSize="large">Total Present</Text>

                                <Text fontSize="5xl">{presentTotal}</Text>
                            </Center>
                        </Box>
                        <Box flexGrow="1" m="4" bg={colorMode === "light" ? "white" : "green.700"} p="2" borderRadius="25px" boxShadow="lg">
                            <Center d="flex" flexDir="column">
                                <Text fontSize="large">Total Absent</Text>

                                <Text fontSize="5xl">{absentTotal}</Text>
                            </Center>
                        </Box>
                    </Box>
                    <Box d="flex">
                        <Text ml="12" flexGrow="1" fontSize="large" fontWeight="semibold">Keyar Ads Head Office Rajkot</Text>


                        <Box d="flex" justifyContent="space-evenly" flexGrow="1" >
                            <Box d="flex" alignItems="center">
                                <Text>Device Status: &nbsp; </Text><Box color={mqttStatus ? "green" : "red"} ><GoPrimitiveDot w="50px" h="50px" /></Box> <Text> Online</Text>
                            </Box>
                            <Box d="flex" alignItems="center">
                                <Text>MQTT Status: &nbsp; </Text><Box color={mqttStatus ? "green" : "red"} ><GoPrimitiveDot w="50px" h="50px" /></Box> <Text> {mqttStatus ? "Connected" : "Disconnected"}</Text>
                            </Box>

                        </Box>

                    </Box>
                    <Center>
                        <Box w="89vw" borderRadius="25px" bg={colorMode === "light" ? "white" : "gray.700"} mt="2" minH="30vh" boxShadow="lg">
                            <Tabs isFitted variant="enclosed">
                                <TabList mb="1em">
                                    <Tab _selected={{ color: "white", bg: "green.300" }}>Present</Tab>
                                    <Tab _selected={{ color: "white", bg: "red.300" }}>Absent</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>

                                        <Box >
                                            <Center>
                                                <Box mb="2" d="flex" justifyContent="flex-end" width="60vw" pr="4" alignItems="center"><MdUpdate /><i > &nbsp; updated {difference.differenceTime} {difference.time} ago</i></Box>
                                            </Center>
                                            {presentList && presentList.map((employee) => (

                                                <Box key={Math.random().toString()}>
                                                    <Center key={Math.random().toString()}>
                                                        <Box bg={colorMode === "light" ? "gray.100" : "gray.600"} borderRadius="25px" width="60vw" p="5" mt="2" key={Math.random().toString()}>
                                                            <Box d="flex" alignItems="center" key={Math.random().toString()}>
                                                                <Image bg="white" key={Math.random().toString()} src={employee.data.dp} borderRadius="50%" w="50px" h="50px" />
                                                                <Text ml="6" key={Math.random().toString()}>{employee.data.firstName}</Text>
                                                            </Box>


                                                        </Box>
                                                    </Center>
                                                </Box>

                                            ))}


                                        </Box>

                                    </TabPanel>
                                    <TabPanel>
                                        <Box >
                                            <Center>
                                                <Box mb="2" d="flex" justifyContent="flex-end" width="60vw" pr="4" alignItems="center"><MdUpdate /><i > &nbsp; updated {difference.differenceTime} {difference.time} ago</i></Box>
                                            </Center>

                                            {absentList && absentList.map((employee) => (
                                                <Box key={Math.random().toString()}>
                                                    <Center key={Math.random().toString()}>
                                                        <Box bg={colorMode === "light" ? "gray.100" : "gray.600"} borderRadius="25px" key={Math.random().toString()} width="60vw" p="5" mt="2" >
                                                            <Box d="flex" alignItems="center" key={Math.random().toString()}>
                                                                <Image bg="white" key={Math.random().toString()} src={employee.data.dp} borderRadius="50%" w="50px" h="50px" />
                                                                <Text ml="6" key={Math.random().toString()}  >{employee.data.firstName}</Text>
                                                            </Box>


                                                        </Box>
                                                    </Center>
                                                </Box>
                                            ))}


                                        </Box>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>

                        </Box>

                    </Center>
                    <Center>

                        <Box mt="5" w="89vw" bg={colorMode === "light" ? "white" : "gray.700"} borderRadius="25px" p="5">

                            <Text>Data shown here may delayed by few seconds</Text>
                        </Box>
                    </Center>
                </Box>

            </>)}

        </>
    )
}

export default DashboardData
