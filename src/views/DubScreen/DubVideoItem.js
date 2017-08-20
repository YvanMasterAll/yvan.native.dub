import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Theme from '../../constants/Theme'

const width = Theme.deviceWidth
const { priColor, homeNavHeight, bakColor, supColor_001, priColor_300, mdFontSize, videoHeight, xsFontSize, homeNavIconSize, videoControlHeight, mdIconSize, priFontColor, supFontColor_001, smIconSize, smFontSize } = Theme

export default class DubVideoItem extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPressItem}>
                <View style={{marginRight: 4, width: width / 2 - 2}} >
                    <Image source={{uri: this.props.image}} style={{height: 120}}/>
                    <View style={{paddingLeft: 8, paddingBottom: 18, paddingTop: 4}}>
                        <Text style={{color: priFontColor, marginBottom: 4, fontSize: smFontSize}}>{this.props.title}</Text>
                        <Text style={{color: supFontColor_001, fontSize: xsFontSize}}>{this.props.desc}</Text>
                    </View>
                    <View style={{position: 'absolute', left: 8, top: 96, flexDirection:'row', alignItems: 'center'}}>
                        <Icon name='play-circle-filled' style={{color: priColor, fontSize: smIconSize * 0.8, marginRight: 4}}/>
                        <Text style={{color: priColor, fontSize: xsFontSize}}>{this.props.hits}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

