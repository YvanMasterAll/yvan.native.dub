import React, { Component } from 'react';
import {
    Button,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    Animated,
    Easing,
    Image,
    StatusBar,
    BackHandler
} from 'react-native'
import {
    createNavigator,
    TabRouter,
    addNavigationHelpers
} from 'react-navigation'
import { Container, Text } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Theme from '../constants/Theme'
const width = Theme.deviceWidth, height = Theme.deviceHeight
const deviceWidth = Theme.deviceWidth
const { priColor, homeNavHeight, bakColor, supColor_001, priColor_300, supColor_002, homeNavIconSize, priFontColor, supFontColor_001, supFontColor_002 } = Theme

class HomeTabBar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            currentRoute: props.navigation.state.routes[0].routeName,
            index :0
        }
    }
    
    render() {
        let o = this
        const { routes } = this.props.navigation.state
        let list_icon = (this.state.index === 0 && !this.props.home_scroll_down)? require('../assets/images/home_icon_screen_gray.png') : require('../assets/images/home_icon_screen.png')
        let search_icon = (this.state.index === 0 && !this.props.home_scroll_down)? require('../assets/images/home_icon_search_gray.png') : require('../assets/images/home_icon_search.png')
        return (
            <View style={{flexDirection: 'row', height: homeNavHeight, marginTop: StatusBar.currentHeight, zIndex: 1, backgroundColor: (this.state.index === 0 && !this.props.home_scroll_down)? 'transparent' : bakColor, borderBottomWidth: (this.state.index === 0 && !this.props.home_scroll_down)? 0:0.3, borderBottomColor: Theme.bakColor_50 }}>
                <View style={{height: homeNavHeight, justifyContent: 'center', width: 74, alignItems: 'flex-start', paddingLeft: 12}}>
                    <Image source={list_icon} style={{width: 28, height: 28}} />
                </View>
                {routes.map((route, index) => {
                    return (
                        <TouchableWithoutFeedback
                            onPress={() => { this.props.flush({name: route.routeName}); this.props.navigation.navigate(route.routeName); this.setState({currentRoute: route.routeName, index: index}); if(index === 0) {o.props.home_scroll_on({home_scroll_down: false})} }}
                            key={route.routeName}
                            >
                            <View style={styles.tab}>
                                <Text style={{color: (this.state.index === 0 && !this.props.home_scroll_down)? bakColor : this.state.currentRoute === route.routeName? supFontColor_002:supFontColor_001, top: 1}}>{route.routeName}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                )}
                <View style={{height: homeNavHeight, justifyContent: 'center', width: 74, alignItems: 'flex-end', paddingRight: 12}}>
                    <Image source={search_icon} style={{width: 28, height: 28}} />
                </View>
            </View>
        )
    }
}

const tabWidth = (deviceWidth - 74 * 2) / 3
class HomeTabView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pageIndex: 0,
            move: new Animated.Value(tabWidth * 0 + (tabWidth - 22) / 2 + 74)
        }
    }

    componentDidMount() {
        var timing = Animated.timing
        Animated.parallel(['move'].map(property => {
            return timing(this.state[property], {
                toValue: tabWidth * 0 + (tabWidth - 22) / 2 + 74,
                duration: 100,
                easing: Easing.sin
            })
        })).start()
    }

    pageMove() {
        var timing = Animated.timing
        Animated.parallel(['move'].map(property => {
            return timing(this.state[property], {
                toValue: tabWidth * this.state.pageIndex + (tabWidth - 22) / 2 + 74,
                duration: 100,
                easing: Easing.sin
            })
        })).start()
    }

    setPageIndex({name}) {
        switch (name) {
            case '配音':
                this.setState({
                    pageIndex: 0
                }, this.pageMove)
                break
            case '热门':
                this.setState({
                    pageIndex: 1
                }, this.pageMove)
                break
            case '关注':
                this.setState({
                    pageIndex: 2
                }, this.pageMove)
                break
        }
    }

    render() {
        const { routes, index } = this.props.navigation.state
        const ActiveScreen = this.props.router.getComponentForState(this.props.navigation.state)

        return (
            <Container style={{ marginTop: Platform.OS === 'ios' ? 20 : 0, backgroundColor: bakColor }}>
                <HomeTabBar navigation={this.props.navigation} flush={this.setPageIndex.bind(this)} {...this.props} />
                <ActiveScreen
                    navigation={addNavigationHelpers({
                    ...this.props.navigation,
                    state: routes[index]
                })}
                />
                <Animated.View
                    style={[
                    {
                        left: this.state.move,
                        position: 'absolute',
                        zIndex: 9,
                        top: homeNavHeight + StatusBar.currentHeight - 2.8
                    }]}>
                    <View style={{width: 22, height: 2, backgroundColor: this.state.pageIndex === 0? bakColor : supFontColor_002, left: 0}} />
                </Animated.View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        backgroundColor: bakColor
    },
    tabContainer: {
        flexDirection: 'row',
        height: homeNavHeight,
        backgroundColor: bakColor
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const HomeNavigator = ({routes}) => {
    const HomeTabRouter = TabRouter(routes.root, routes.init)
    return createNavigator(HomeTabRouter)(HomeTabView)
}
export default HomeNavigator