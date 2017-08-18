import React, { Component } from 'react';
import {
    Button,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    Animated,
    Easing
} from 'react-native'
import {
    createNavigator,
    TabRouter,
    addNavigationHelpers
} from 'react-navigation'
import { Container, Text } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Theme from '../constants/Theme'

const deviceWidth = Theme.deviceWidth
const { priColor, homeNavHeight, bakColor, supColor_001, priColor_300, supColor_002, homeNavIconSize, priFontColor } = Theme

const HomeTabBar = ({ navigation, flush }) => {
    const { routes } = navigation.state
    return (
        <View style={styles.tabContainer}>
            <View style={{height: homeNavHeight, justifyContent: 'center', width: 74, alignItems: 'flex-start', paddingLeft: 12}}>
                <Icon 
                    name='menu'
                    style={{fontSize: homeNavIconSize, color: supColor_002}}
                />
            </View>
            {routes.map(route => (
                <TouchableWithoutFeedback
                    onPress={() => { flush({name: route.routeName}); navigation.navigate(route.routeName) }}
                    key={route.routeName}
                    >
                    <View style={styles.tab}>
                        <Text style={{color: priFontColor}}>{route.routeName}</Text>
                    </View>
                </TouchableWithoutFeedback>
            ))}
            <View style={{height: homeNavHeight, justifyContent: 'center', width: 74, alignItems: 'flex-end', paddingRight: 12}}>
                <Icon 
                    name='magnify'
                    style={{fontSize: homeNavIconSize, color: supColor_002}}
                />
            </View>
        </View>
    )
}

const tabWidth = (deviceWidth - 74 * 2) / 3
class HomeTabView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pageIndex: 0,
            move: new Animated.Value(tabWidth * 0 + (tabWidth - 32) / 2 + 74)
        }
    }

    componentDidMount() {
        var timing = Animated.timing
        Animated.parallel(['move'].map(property => {
            return timing(this.state[property], {
                toValue: tabWidth * 0 + (tabWidth - 32) / 2 + 74,
                duration: 100,
                easing: Easing.sin
            })
        })).start()
    }

    pageMove() {
        var timing = Animated.timing
        Animated.parallel(['move'].map(property => {
            return timing(this.state[property], {
                toValue: tabWidth * this.state.pageIndex + (tabWidth - 32) / 2 + 74,
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
            <Container style={styles.container}>
                <HomeTabBar navigation={this.props.navigation} flush={this.setPageIndex.bind(this)} />
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
                        top: homeNavHeight - 2
                    }]}>
                    <View style={{width: 32, height: 2, backgroundColor: priColor_300, left: 0}} />
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
        backgroundColor: priColor
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