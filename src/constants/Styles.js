import { StyleSheet, Dimensions, StatusBar } from 'react-native'
import Theme from './Theme'
const width = Theme.deviceWidth, height = Theme.deviceHeight
const { isAndroid, priColor, homeNavHeight, bakColor, supColor_001, priColor_300, videoHeight, homeNavIconSize, videoControlHeight, mdIconSize, priFontColor, supFontColor_001, smIconSize, smFontSize } = Theme

export default StyleSheet.create({
    icon: {
        top: isAndroid? 0 : 1,
        backgroundColor: 'transparent',
        color: supFontColor_001,
        fontSize: mdIconSize
    },
    text: {
        backgroundColor: 'transparent',
        color: priFontColor,
        fontSize: smFontSize
    }
})