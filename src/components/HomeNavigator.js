import React, { Component } from 'react';
import {
    Button,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    Animated,
    Easing
} from 'react-native'
import {
    createNavigator,
    TabRouter,
    addNavigationHelpers
} from 'react-navigation'
import { Icon, Container, Text } from 'native-base'

import Theme from '../constants/Theme'

const deviceWidth = Theme.deviceWidth

const HomeTabBar = ({ navigation, flush }) => {
    const { routes } = navigation.state
    return (
        <View style={styles.tabContainer}>
            <View style={{height: 48, justifyContent: 'center', width: 74, alignItems: 'flex-start', paddingLeft: 12}}>
                <Icon 
                    name='menu'
                />
            </View>
            {routes.map(route => (
                <TouchableOpacity
                    onPress={() => { flush({name: route.routeName}); navigation.navigate(route.routeName) }}
                    style={styles.tab}
                    key={route.routeName}
                    >
                    <Text>{route.routeName}</Text>
                </TouchableOpacity>
            ))}
            <View style={{height: 48, justifyContent: 'center', width: 74, alignItems: 'flex-end', paddingRight: 12}}>
                <Icon 
                    name='search'
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
                        top: 46
                    }]}>
                    <View style={{width: 32, height: 2, backgroundColor: '#333', left: 0}} />
                </Animated.View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0
    },
    tabContainer: {
        flexDirection: 'row',
        height: 48
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