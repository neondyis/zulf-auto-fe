import {
  Flex,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import React from 'react';
import DashboardCard from '@/components/DashboardCard';
import {LinearGradient} from 'zrender';
import darkTheme from '@/themes/charts/dark'
import {registerTheme} from 'echarts';
import FinancialOverviewChart from '@/components/FinancialOverviewChart';
import {useAuth} from '@/contexts/AuthContext';
import {useRouter} from 'next/router';



export default function Home() {
  const { token, isAuthenticated, isLoaded} = useAuth();
  const router = useRouter()
  const options = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    title: {
      text: 'Financial Overview'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5'],
      padding: [0,0,0,0],
      bottom: '0'
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Line 1',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 255, 165)'
            },
            {
              offset: 1,
              color: 'rgb(1, 191, 236)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [140, 232, 101, 264, 90, 340, 250]
      },
      {
        name: 'Line 2',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(0, 221, 255)'
            },
            {
              offset: 1,
              color: 'rgb(77, 119, 255)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [120, 282, 111, 234, 220, 340, 310]
      },
      {
        name: 'Line 3',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(55, 162, 255)'
            },
            {
              offset: 1,
              color: 'rgb(116, 21, 219)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [320, 132, 201, 334, 190, 130, 220]
      },
      {
        name: 'Line 4',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 0, 135)'
            },
            {
              offset: 1,
              color: 'rgb(135, 0, 157)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [220, 402, 231, 134, 190, 230, 120]
      },
      {
        name: 'Line 5',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {
          opacity: 0.8,
          color: new LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 191, 0)'
            },
            {
              offset: 1,
              color: 'rgb(224, 62, 76)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [220, 302, 181, 234, 210, 290, 150]
      }
    ]
  };

  registerTheme('zulf_dark', darkTheme);

  return (
      <Flex direction={'column'} width={'100%'} gap={5}>
        <Flex marginTop={50} justify={'space-evenly'} width={'100%'}>
          <DashboardCard>
            <Stat>
              <StatLabel>Collected Fees</StatLabel>
              <StatNumber>£0.00</StatNumber>
              <StatHelpText>Feb 12 - Feb 28</StatHelpText>
            </Stat>
          </DashboardCard>
          <DashboardCard>
            <Stat>
              <StatLabel>Collected Fees</StatLabel>
              <StatNumber>£0.00</StatNumber>
              <StatHelpText>Feb 12 - Feb 28</StatHelpText>
            </Stat>
          </DashboardCard>
          <DashboardCard>
            <Stat>
              <StatLabel>Sent</StatLabel>
              <StatNumber>345,670</StatNumber>
              <StatHelpText>
                <StatArrow type='increase'/>
                23.36%
              </StatHelpText>
            </Stat>
          </DashboardCard>
        </Flex>
        <FinancialOverviewChart option={options}/>
        <Flex justify={'space-evenly'} width={'100%'} marginBottom={50}>
          <DashboardCard>
            <Stat>
              <StatLabel>Collected Fees</StatLabel>
              <StatNumber>£0.00</StatNumber>
              <StatHelpText>Feb 12 - Feb 28</StatHelpText>
            </Stat>
          </DashboardCard>
          <DashboardCard>
            <Stat>
              <StatLabel>Collected Fees</StatLabel>
              <StatNumber>£0.00</StatNumber>
              <StatHelpText>Feb 12 - Feb 28</StatHelpText>
            </Stat>
          </DashboardCard>
          <DashboardCard>
            <Stat>
              <StatLabel>Sent</StatLabel>
              <StatNumber>345,670</StatNumber>
              <StatHelpText>
                <StatArrow type='increase'/>
                23.36%
              </StatHelpText>
            </Stat>
          </DashboardCard>
        </Flex>
      </Flex>
  )
}
