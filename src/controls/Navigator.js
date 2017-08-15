import React, { Component } from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Icon, Root } from 'native-base'
import { StatusBar } from 'react-native'

import Theme from '../constants/Theme'

import HomeScreen from '../containers/HomeScreen'
import LearnScreen from '../containers/LearnScreen'
import RankScreen from '../containers/RankScreen'
import PunchScreen from '../containers/PunchScreen'
import VipScreen from '../containers/VipScreen'
import ActivityScreen from '../containers/ActivityScreen'
import SortScreen from '../containers/SortScreen'
import DubVideoScreen from '../containers/DubVideoScreen'

const Navigator = StackNavigator({
    Root: {
        screen: TabNavigator(
        {
            首页: {
                screen: HomeScreen
            },  
            学习: {
                screen: LearnScreen
            }
        },
        {
            navigationOptions: ({ navigation }) => ({
                tabBarIcon: ({ focused }) => {
                    const { routeName } = navigation.state
                    let iconName
                    switch (routeName) {
                        case '首页':
                            iconName = 'home'
                        case '学习':
                            iconName = 'home'
                    }
                    return (
                        <Icon
                            name={iconName}
                            fontSize={24}
                            style={{color: focused ? Theme.tabIconSelected : Theme.tabIconDefault}}
                        />
                    )
                },
                tabBarLabel: () => {
                    const { routeName } = navigation.state
                    return routeName
                }
            }),
            tabBarOptions: {
                activeTintColor: Theme.tabTintColor,
                showLabel: true,
                showIcon: true,
                indicatorStyle: {
                    backgroundColor: 'transparent'
                },
                iconStyle: {
                    width: 24,
                    height: 24
                },
                style: {
                    backgroundColor: 'white'
                },
                tabBarIcon: ({ tintColor }) => { Theme.tabDarkTintColor }
            },
            lazy: true,
            tabBarPosition: 'bottom',
            initialRouteName: '首页'
        })
    },
    Punch: {
        screen: PunchScreen,
    },
    Rank: {
        screen: RankScreen
    },
    Vip: {
        screen: VipScreen
    },
    Activity: {
        screen: ActivityScreen
    },
    Sort: {
        screen: SortScreen
    },
    DubVideo: {
        screen: DubVideoScreen,
        path: 'dubvideo/:title'
    }
},
{
    navigationOptions: {
        header: null,
    }
})

export default () =>
    <Root>
        <Navigator />
    </Root>



