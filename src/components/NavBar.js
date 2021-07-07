import React from 'react'
import {

    Box,

    useColorMode
} from '@chakra-ui/react';
import { RiDashboardLine } from 'react-icons/ri';
import { FcTodoList } from 'react-icons/fc';
import { RiPlayListAddLine } from 'react-icons/ri';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

function NavBar({ menu, setmenu, logOut }) {

    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode()

    const styling = {
        borderRightColor: "green",

        borderRightWidth: "2px",

    }

    const mobileStyling = {
        fontSize: "1.4rem",
        borderBottom: "2px solid green",
        paddingBottom: "5px"

    }
    return (
        <>
            <Box w="5%" p="1" bg={colorMode === "light" ? "gray.200" : "gray.700"} d={["none", "none", "block", "block"]} >

                <Box>

                    <Box width="100%" d="flex" justifyContent="center" _hover={{
                        borderRightColor: "green",
                        borderRightRadius: "5px",
                        borderRightWidth: "3px"
                    }}
                        style={menu === "dashboard" ? styling : {}}
                        mt="6"
                        fontSize="1.2rem"
                        color="teal"
                        cursor="pointer"
                        as="span" onClick={() => setmenu("dashboard")}
                    ><RiDashboardLine /></Box>

                    <Box width="100%" d="flex" justifyContent="center"
                        _hover={{
                            borderRightColor: "green",
                            borderRightRadius: "5px",
                            borderRightWidth: "3px"
                        }}
                        mt="6"
                        fontSize="1.2rem"
                        color="teal"
                        cursor="pointer"
                        style={menu === "listAll" ? styling : {}}
                        as="span" onClick={() => setmenu("listAll")}
                    >
                        <FcTodoList />
                    </Box>


                    <Box width="100%" d="flex" justifyContent="center"
                        _hover={{
                            borderRightColor: "green",
                            borderRightRadius: "5px",
                            borderRightWidth: "3px"
                        }}
                        mt="6"
                        fontSize="1.2rem"
                        color="teal"
                        cursor="pointer"
                        style={menu === "createEmployee" ? styling : {}}
                        as="span" onClick={() => setmenu("createEmployee")}
                    >
                        <RiPlayListAddLine />
                    </Box>


                    <Box width="100%" d="flex" justifyContent="center"
                        _hover={{
                            borderRightColor: "green",
                            borderRightRadius: "5px",
                            borderRightWidth: "3px"
                        }}
                        mt="6"
                        fontSize="1.2rem"
                        color="teal"
                        cursor="pointer"
                        as="span" style={{ marginTop: "20px", fontSize: "1.2rem", color: "teal" }}
                        onClick={() => { logOut(); console.log("loggedOut") }}
                    >
                        <RiLogoutCircleLine />
                    </Box>
                    <ColorModeSwitcher mt="6" />

                </Box>

            </Box>




            {/* for mobile devices */}



            <Box w="100vw" d={["block", "block", "none", "none"]} pos="fixed" left="0px" bottom="0px"  >
                <Box d="flex" w="100vw" h="60px" alignSelf="flex-end" justifyContent="space-evenly" bg={colorMode === "light" ? "gray.200" : "gray.700"}  >



                    <Box as="ul" style={{ listStyleType: "none" }} d="flex" p="5" w="100vw" alignSelf="flex-end" justifyContent="space-evenly" zIndex="1111111111111111111111" >
                        <li style={{ fontSize: "1.2rem", color: "teal" }} onClick={() => setmenu("dashboard")}  >
                            <Box width="100%" d="flex" justifyContent="center"
                                style={menu === "dashboard" ? mobileStyling : {}}
                            ><RiDashboardLine /></Box>
                        </li>
                        <li style={{ fontSize: "1.2rem", color: "teal" }} onClick={() => setmenu("listAll")}>
                            <Box width="100%" d="flex" justifyContent="center"
                                style={menu === "listAll" ? mobileStyling : {}}
                            >
                                <FcTodoList />
                            </Box>
                        </li>

                        <li style={{ fontSize: "1.2rem", color: "teal" }} onClick={() => setmenu("createEmployee")}>
                            <Box width="100%" d="flex" justifyContent="center"
                                style={menu === "createEmployee" ? mobileStyling : {}}
                            >
                                <RiPlayListAddLine />
                            </Box>
                        </li>


                        <li style={{ fontSize: "1.2rem", color: "teal" }} >
                            <Box width="100%" d="flex" justifyContent="center"
                                onClick={() => { logOut(); console.log("loggedOut") }}
                            >
                                <RiLogoutCircleLine />
                            </Box>
                        </li>


                    </Box>


                </Box>



            </Box>
        </>
    )
}

export default NavBar
