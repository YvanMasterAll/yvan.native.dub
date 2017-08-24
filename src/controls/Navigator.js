import React, { Component } from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Root, Text } from 'native-base'
import { Image, View, StatusBar, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Theme from '../constants/Theme'
const width = Theme.deviceWidth, height = Theme.deviceHeight, { supFontColor_002, mdIconSize, smIconSize, isAndroid, rootNavHeight, rootNavIconSize, xsFontSize, priColor, priColor_300, supColor_001, homeNavHeight } = Theme

import { actions } from '../redux/configureStore'
import { connect } from 'react-redux'

import HomeScreen from '../containers/HomeScreen'
import LearnScreen from '../containers/LearnScreen'
import RankScreen from '../containers/RankScreen'
import PunchScreen from '../containers/PunchScreen'
import VipScreen from '../containers/VipScreen'
import ActivityScreen from '../containers/ActivityScreen'
import SortScreen from '../containers/SortScreen'
import DubVideoScreen from '../containers/DubVideoScreen'
import TopicVideoFullScreen from '../containers/TopicVideoFullScreen'
import TopicVideoScreen from '../containers/TopicVideoScreen'
import MeScreen from '../containers/MeScreen'
import MessageScreen from '../containers/MessageScreen'

const navigate = (navigation) => {
    let { routeName } = navigation.state
    navigation.navigate(routeName)
    if(routeName != "首页") {
        actions.video.topicvideo_play_on({play_id: -1, seek: false, seek_time: 0.0, fullScreen: false})
    }
}

const Navigation = StackNavigator({
    Root: {
        screen: TabNavigator(
        {
            首页: {
                screen: HomeScreen
            },  
            学习: {
                screen: LearnScreen
            },
            消息: {
                screen: MessageScreen
            },
            我: {
                screen: MeScreen
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
                tabBarLabel: ({ focused }) => {
                    const { routeName } = navigation.state
                    let iconName
                    switch (routeName) {
                        case '首页':
                            iconName = focused? require('../assets/images/bar_icon_home.png') : require('../assets/images/bar_icon_home_gray.png')
                            break
                        case '学习':
                            iconName = focused? require('../assets/images/bar_icon_study.png') : require('../assets/images/bar_icon_study_gray.png')
                            break
                        case '消息':
                            iconName = focused? require('../assets/images/bar_icon_group.png') : require('../assets/images/bar_icon_group_gray.png')
                            break
                        case '我':
                            iconName = focused? require('../assets/images/bar_icon_my.png') : require('../assets/images/bar_icon_my_gray.png')
                            break
                    }
                    return (
                        <View style={{height: rootNavHeight, width: width / 4, position: 'relative', top: isAndroid ? -8 : 0, justifyContent: 'center', borderTopWidth: 0.3, borderTopColor: Theme.bakColor_50}}>
                            <View style={{height: rootNavHeight, width: width / 4, justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={iconName} style={{width: 28, height: 28}} />
                                <Text style={{fontSize: xsFontSize * 0.9, color: focused? supFontColor_002 : priColor_300, marginTop: 4}}>{routeName}</Text>
                            </View>
                            <TouchableOpacity onPress={navigate.bind(this, navigation)} style={{position:'absolute', right: 0, top: 0, left: 0, bottom: 0}}>
                                <View style={{position: 'relative', right: 0, top: 0, left: 0, bottom: 0}}>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                }
            }),
            tabBarOptions: {
                activeTintColor: Theme.tabTintColor,
                showLabel: true,
                showIcon: false,
                indicatorStyle: {
                    backgroundColor: 'transparent'
                },
                iconStyle: {
                    width: 24,
                    height: 24
                },
                style: {
                    backgroundColor: Theme.bakColor,
                    height: rootNavHeight
                },
                tabBarIcon: ({ tintColor }) => { Theme.tabDarkTintColor }
            },
            lazy: true,
            swipeEnabled: false,
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
    },
    TopicVideoFullScreen: {
        screen: TopicVideoFullScreen,
        path: 'topicvideofullscreen/:type:currentTime:video:title'
    },
    TopicVideo: {
        screen: TopicVideoScreen,
        path: 'topicvideo/:title'
    }
},
{
    navigationOptions: {
        header: null,
    }
})

export default () =>
    <Root>
        <Navigation />
    </Root>

// class Navigator extends Component {
//     render() {
//         return (
//             <Root>
//                 <Navigation style={this.props.topicvideo.fullScreen? {position: 'absolute', width: width, height: height + homeNavHeight, top: 0} : {}}/>
//             </Root>
//         )
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         topicvideo: state.video.topicvideo
//     }
// }

// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         topicvideo_play_on: (...args) => dispatch(actions.video.topicvideo_play_on(...args))
//     }
// }

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Navigator)



