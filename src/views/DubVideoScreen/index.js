import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class DubVideoScreen extends Component {
    render() {
        return (
            <View>
                <Text>This is DubVideoScreen</Text>
                <Text>title: {this.props.navigation.state.params.title}</Text>
            </View>
        )
    }
}