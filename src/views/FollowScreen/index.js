import React, { Component } from 'react'
import { StatusBar, BackHandler } from 'react-native'
import { Container, Text } from 'native-base'

export default class FollowScreen extends Component {
    componentDidMount() {
        let o = this
        BackHandler.addEventListener('home_navigation_back',(event) => {  
            BackHandler.exitApp()
        })
    }
    
    render() {
        return (
            <Container>
                <StatusBar
                    barStyle={'dark-content'}
                    backgroundColor="transparent"
                    translucent={true}
                    animated={false}
                />
                <Text>This is FollowScreen</Text>
            </Container>
        )
    }
}