import React, { Component } from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Root, Text } from 'native-base'
import { View, StatusBar, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Theme from '../constants/Theme'
const width = Theme.deviceWidth, height = Theme.deviceHeight, { rootNavHeight, rootNavIconSize, xsFontSize, priColor, priColor_300, supColor_001, homeNavHeight } = Theme

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
                            iconName = 'home-assistant'
                            break
                        case '学习':
                            iconName = 'book-open'
                            break
                    }
                    return (
                        <View style={{height: rootNavHeight, width: width / 2, position: 'relative', top: -8, justifyContent: 'center'}}>
                            <View style={{height: rootNavHeight, width: width / 2, justifyContent: 'center', alignItems: 'center'}}>
                                <Icon
                                    name={iconName}
                                    style={{fontSize: rootNavIconSize, color: focused? supColor_001 : priColor_300}}
                                    />
                                <Text style={{fontSize: xsFontSize, color: focused? supColor_001 : priColor_300}}>{routeName}</Text>
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
                    backgroundColor: priColor,
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
        path: 'topicvideofullscreen/:type:currentTime:video'
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



