import Header from './Header';
import { SwitchTransition, Transition } from 'react-transition-group';
import gsap from 'gsap';
import { useRouter } from 'next/router';
import React from "react";
import Head from "next/head";
import {Box, Flex, useColorModeValue} from "@chakra-ui/react";

function Layout ({ children }:any)  {
    const router = useRouter();
    const onPageEnter = (node: gsap.TweenTarget) => {
        gsap.fromTo(
            node,
            {
                y: 0,
                autoAlpha: 0,
                ease: 'power3.In',
            },
            {
                y: 0,
                autoAlpha: 1,
                duration: 0.5,
                ease: 'power3.In',
            }
        )
    }
    const onPageExit = (node: gsap.TweenTarget) => {
        gsap.fromTo(
            node,
            {
                y: 0,
                autoAlpha: 1,
                ease: 'power3.inOut',
            },
            {
                y: 0,
                autoAlpha: 0,
                duration: 0.5,
                ease: 'power3.inOut',
            }
        )
    }

    return (

        <Box>
            <Head>
                <title>Zulf Auto CMS</title>
                <meta name="description" content="CMS for managing cars and clients." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <Header/>
                <SwitchTransition>
                    <Transition
                        key={router.asPath} // our route as a key
                        timeout={500}
                        in={true}
                        onEnter={onPageEnter} // our enter animation
                        onExit={onPageExit} // our exit animation
                        mountOnEnter={true}
                        unmountOnExit={true}>
                        <main>
                            <Flex
                                minH={'100vh'}
                                align={'stretch'}
                                bg={useColorModeValue('#131517', 'background.50')}>
                                {children}
                            </Flex>
                        </main>
                    </Transition>
                </SwitchTransition>
            </div>
        </Box>

    )
}

export default Layout