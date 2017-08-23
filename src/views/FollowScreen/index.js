import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Container, Text } from 'native-base'

export default class FollowScreen extends Component {
    render() {
        return (
            <Container>
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                />
                <Text>This is FollowScreen</Text>
            </Container>
        )
    }
}