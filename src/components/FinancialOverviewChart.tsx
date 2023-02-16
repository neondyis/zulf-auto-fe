import {LinearGradient} from 'zrender';
import {Card, CardBody} from '@chakra-ui/react';
import ReactECharts from 'echarts-for-react';
import React from 'react';
import {EChartsOption} from 'echarts-for-react/src/types';

export default function FinancialOverviewChart(props: {
    option: EChartsOption
}) {
    return <Card width={'75%'} margin={'auto'} bgColor={'#2f2b53'}>
        <CardBody>
            <ReactECharts option={props.option}
                          style={{height: '40vh', width: '100%'}}
                          notMerge={true}
                          lazyUpdate={true}
                          theme="zulf_dark"
            />
        </CardBody>
    </Card>;
}