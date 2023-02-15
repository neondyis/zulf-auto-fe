import {Flex, FlexProps, Icon} from "@chakra-ui/react";
import {IconType} from "react-icons";
import React from "react";
import Link from "next/link";

interface NavItemProps extends FlexProps {
    icon: IconType;
    link: string;
    text: string;
}
export const NavItem = ({ icon, text, link, ...rest }: NavItemProps) => {
    return (
        <Link href={link} style={{ textDecoration: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="0"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'purple.400',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {text}
            </Flex>
        </Link>
    );
};