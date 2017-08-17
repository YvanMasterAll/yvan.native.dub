import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Theme from '../../constants/Theme'

const width = Theme.deviceWidth

export default class DubVideoItem extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPressItem}>
                <View style={{marginLeft: this.props.index % 2 == 0 ? 0 : 2, marginRight: this.props.index % 2 == 0 ? 2 : 0, width: width / 2 - 2}} >
                    <Image source={{uri: this.props.image}} style={{height: 120}}/>
                    <View style={{paddingLeft: 8, paddingBottom: 18, paddingTop: 4}}>
                        <Text style={{color: 'black', marginBottom: 4}}>{this.props.title}</Text>
                        <Text>{this.props.desc}</Text>
                    </View>
                    <View style={{position: 'absolute', left: 8, top: 94, flexDirection:'row', alignItems: 'center'}}>
                        <Icon name='play-circle-filled' style={{color: '#fff', fontSize: 16, marginRight: 4}}/>
                        <Text style={{color: '#fff'}}>{this.props.hits}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

