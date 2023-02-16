import {Card, CardBody} from '@chakra-ui/react';
import { ReactNode, } from 'react';

export default function DashboardCard({children}: DashboardCardProps) {
    return <Card w={['50px', '150px','250px', '300px']} maxW={'17vw'} bgColor={'#2f2b53'}>
        <CardBody color={'#F0EFF4'}>
            {children}
        </CardBody>
    </Card>;
}

type DashboardCardProps = {
    children:  ReactNode;
}