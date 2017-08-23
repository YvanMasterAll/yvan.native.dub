import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, Image, View, TouchableWithoutFeedback } from 'react-native'
import { Text } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Theme from '../../constants/Theme'

const width = Theme.deviceWidth
const { priColor, homeNavHeight, bakColor, supColor_001, priColor_300, mdFontSize, videoHeight, xsFontSize, homeNavIconSize, videoControlHeight, mdIconSize, priFontColor, supFontColor_001, smIconSize, smFontSize } = Theme

export default class DubVideoItem extends Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPressItem}>
                <View style={{marginRight: 4, width: width / 2 - 2}} >
                    <Image source={{uri: this.props.image}} style={{height: 100}}/>
                    <View style={{paddingLeft: 8, paddingBottom: 18, paddingTop: 4}}>
                        <Text style={{color: supFontColor_001, marginBottom: 4, fontSize: smFontSize}}>{this.props.title}</Text>
                        <Text style={{color: priColor_300, fontSize: xsFontSize}}>{this.props.desc}</Text>
                    </View>
                    <View style={{position: 'absolute', left: 8, top: 84, flexDirection:'row', alignItems: 'center'}}>
                        <Icon name='play-circle-filled' style={{color: priColor, fontSize: smIconSize * 0.8, marginRight: 4, backgroundColor: 'transparent'}}/>
                        <Text style={{color: priColor, fontSize: xsFontSize, backgroundColor: 'transparent'}}>{this.props.hits}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

