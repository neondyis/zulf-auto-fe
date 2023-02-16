import {
    Button, Divider,
    Drawer, DrawerBody,
    DrawerContent, DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex, Text,
    IconButton, useDisclosure, AccordionPanel, AccordionItem, AccordionButton, Box, Accordion, AccordionIcon, Icon,
} from "@chakra-ui/react";
import {useCookies} from "react-cookie";
import React, {useRef, useState} from "react";
import {SlideDirection} from "@chakra-ui/transition/dist/transition-utils";
import {HamburgerIcon} from "@chakra-ui/icons";
import { NavItem } from "./NavItem";
import {BiCar, BiCoinStack, BiHomeAlt, BiUser, BiUserVoice} from "react-icons/bi";
import {BsTable} from "react-icons/bs";
import {GrUserAdmin} from 'react-icons/gr';

export default function Header () {
    const [cookies, setCookie] = useCookies();
    const [mode,setMode] = useState(cookies.mode || false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [placement, setPlacement] = useState<SlideDirection>("left")
    const btnRef = useRef()

    const handleOnModeClick = () => {
        setMode(!mode);
        setCookie('mode',mode);
    }

    return(
        <header style={{zIndex: 1400, position: 'absolute'}}>
            <nav>
                <Flex className='nav-container' align='center' justify='space-between' wrap='nowrap' >
                        <IconButton color={"whiteAlpha.700"} variant={"unstyled"} icon={<HamburgerIcon/>}  aria-label={'Nav Button'} onClick={onOpen}/>
                </Flex>
                <Drawer
                    isOpen={isOpen}
                    placement={placement}
                    onClose={onClose}
                    finalFocusRef={btnRef.current}
                >
                    <DrawerOverlay />
                    <DrawerContent borderRadius={'0px 25px 25px 0px'} bgColor={'#131517'} color={'#F0EFF4'}>
                        <DrawerHeader>
                            <Text>
                                Navigation
                            </Text>
                        </DrawerHeader>
                        <DrawerBody>
                            <Flex direction={"column"}>
                                <NavItem link={'/'} text={'Home'} icon={BiHomeAlt}></NavItem>
                                <Accordion  allowToggle>
                                    <AccordionItem border={0}>
                                        <h2>
                                            <AccordionButton _expanded={{ bg: 'purple.400', color: 'white'}} borderRadius="lg">
                                                <Box as="span" flex='1' textAlign='left'>
                                                    <Icon
                                                        mr="4"
                                                        fontSize="16"
                                                        _groupHover={{
                                                            color: 'white',
                                                        }}
                                                        as={BsTable}
                                                    />
                                                    Tables
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            <NavItem link={'/tables/cars'} text={'Cars'} icon={BiCar}></NavItem>
                                            <NavItem link={'/tables/clients'} text={'Clients'} icon={BiUserVoice}></NavItem>
                                            <NavItem link={'/tables/payments'} text={'Payments'} icon={BiCoinStack}></NavItem>
                                            <NavItem link={'/tables/users'} text={'Users'} icon={GrUserAdmin}></NavItem>
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                                <NavItem link={'/'} text={'Profile'} icon={BiUser}></NavItem>
                            </Flex>
                        </DrawerBody>
                        <DrawerFooter>
                            <Button variant='outline' mr={3} onClick={onClose}>
                                Logout
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </nav>
        </header>
    )
}