import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import axios from 'axios';
import {useState} from 'react';
import {useAuth} from '@/contexts/AuthContext';

export default function Login() {
    const { updateToken} = useAuth();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const login = async () => {
        await axios.post('http://localhost:8080/api/auth/login', {username: username, password: password})
            .then(res => {
                // @ts-ignore
                updateToken(res.headers.get('authorization'))
            }).catch(err => {
                console.log(err)
        })
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            direction={'column'} width={'100%'}
            bg={useColorModeValue('background.900', 'background.50')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('forefront.500', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="username">
                            <FormLabel>Username</FormLabel>
                            <Input value={username} onChange={e => setUsername(e.target.value)} type="text" />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input value={password} onChange={e => setPassword(e.target.value)} type="password" />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Link color={'blue.400'}>Forgot password?</Link>
                            </Stack>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                onClick={login}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}