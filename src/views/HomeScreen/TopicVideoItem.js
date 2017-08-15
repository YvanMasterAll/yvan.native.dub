import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native'
import { Left, Right, Thumbnail, Text } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Theme from '../../constants/Theme'

const width = Theme.deviceWidth

export default class TopicVideoItem extends Component {
    render() {
        return (
            <View>
                <View>
                    <Left>
                        <Thumbnail source={{uri: this.props.avator}} />
                        <Text>{this.props.name}</Text>
                    </Left>
                    <Right>
                        <Button iconLeft bordered>
                            <Icon name='add' />
                            <Text>关注</Text>
                        </Button>
                    </Right>
                </View>
                <View>
                    
                </View>
                <View>
                    <Left>
                        <Icon name='play-circle-filled' />
                        <Text>{this.props.hits}</Text>
                    </Left>
                    <Right>
                        <Icon name='play-circle-filled' />
                        <Text>{this.props.thumbsup}</Text>
                        <Icon name='play-circle-filled' />
                        <Text>{this.props.comments}</Text>
                        <Icon name='play-circle-filled' />
                        <Text>分享</Text>
                    </Right>
                </View>
            </View>
        )
    }
}
