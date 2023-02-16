import {Flex, Spinner} from '@chakra-ui/react';

export default function FullPageLoader () {
    return(
        <Flex direction={'column'} width={'100%'} height={'100%'} justify={'center'} alignItems={'center'}>
            <Spinner size='xl'/>
        </Flex>
    )
}