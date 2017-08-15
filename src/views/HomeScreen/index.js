import React from 'react'
import {
    Button,
    ScrollView,
} from 'react-native'
import { StackNavigator } from 'react-navigation'

import HomeNavigator from '../../components/HomeNavigator'
import DubScreen from './DubScreen'
import TopicScreen from './TopicScreen'
import FollowScreen from './FollowScreen'

const CustomTabRouter = (
{
    root: {
        配音: {
            screen: DubScreen
        },
        热门: {
            screen: TopicScreen
        },
        关注: {
            screen: FollowScreen
        }
    },
    init: {
        initialRouteName: '配音'
    }
})

export default HomeNavigator({routes: CustomTabRouter})
