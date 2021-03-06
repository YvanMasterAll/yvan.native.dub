import color from 'color'
import { Platform, Dimensions, PixelRatio } from 'react-native'
import _ from 'lodash'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
const width = deviceWidth
const height = deviceHeight
const platform = Platform.OS
const platformStyle = 'material'
const isAndroid = platform === 'ios'? false : true

export default {
    // Color
    Grey_00: '#FAFAFA',
    Grey_50: '#EEEEEE', 
    Grey_200: '#E0E0E0',
    Grey_300: '#9E9E9E',
    Grey_600: '#424242',
    Grey_800: '#212121',
    Green_A400: '#00E676',
    Green_500: '#4CAF50',
    Green_600: '#43A047',
    Purple_A400: '#D500F9',
    Yellow_A400: '#FFEA00',
    Pink_600: '#D81B60',

    // Color Theme
    get bakColor() {
        return this.Grey_00
    },
    get bakColor_50() {
        return this.Grey_50
    },
    get priColor() {
        return this.Grey_200
    },
    get priColor_300() {
        return this.Grey_300
    },
    get supColor_001() {
        return this.Green_A400
    },
    get supColor_002() {
        return this.Purple_A400
    },
    get dotColor_001() {
        return this.Yellow_A400
    },
    get priFontColor() {
        return this.Grey_800
    },
    get supFontColor_001() {
        return this.Grey_600
    },
    get supFontColor_002() {
        return this.Green_A400
    },
    get dotFontColor_001() {
        return this.Pink_600
    },

    // Height
    rootNavHeight: 56, 
    homeNavHeight: 48,
    videoControlHeight: 38,
    videoHeight: 210,
    carouselHeight: 210,
    commentHeadHeight: 88,

    // FontSize
    rootNavIconSize: 28,
    homeNavIconSize: 28,
    xsFontSize: 11,
    smFontSize: 13,
    mdFontSize: 16,
    lgFontSize: 24,
    xsIconSize: 0,
    smIconSize: 18,
    mdIconSize: 24,
    lgIconSize: 0,

    // Padding
    xsPadding: 2,
    smPadding: 4,
    mdPadding: 8,
    lgPadding: 16,

    // Platform
    platformStyle,
    width,
    height,
    deviceHeight,
    deviceWidth,
    platform,
    isAndroid,

    // AndroidRipple
    androidRipple: true,
    androidRippleColor: 'rgba(256, 256, 256, 0.3)',
    androidRippleColorDark: 'rgba(0, 0, 0, 0.15)',

    // Badge
    badgeBg: '#ED1727',
    badgeColor: '#fff',
    badgePadding: (platform === 'ios') ? 3 : 0,

    // Button
    btnFontFamily: (platform === 'ios') ? 'Roboto' : 'Roboto_medium',
    btnDisabledBg: '#b5b5b5',
    btnDisabledClr: '#f1f1f1',
    btnPadding: 6,

    // CheckBox
    CheckboxRadius: 0,
    CheckboxBorderWidth: 2,
    CheckboxPaddingLeft: 2,
    CheckboxPaddingBottom: (platform === 'ios') ? 0 : 5,
    CheckboxIconSize: (platform === 'ios') ? 18 : 14,
    CheckboxIconMarginTop: (platform === 'ios') ? undefined : 1,
    CheckboxFontSize: (platform === 'ios') ? 21 : 18,
    DefaultFontSize: 17,
    checkboxBgColor: '#039BE5',
    checkboxSize: 20,
    checkboxTickColor: '#fff',

    // Segment
    segmentBackgroundColor: '#3F51B5',
    segmentActiveBackgroundColor: '#fff',
    segmentTextColor: '#fff',
    segmentActiveTextColor: '#3F51B5',
    segmentBorderColor: '#fff',
    segmentBorderColorMain: '#3F51B5',

    // Card
    cardDefaultBg: '#fff',
    cardBorderColor: '#ccc',

    // Font
    fontFamily: 'Roboto',
    fontSizeBase: 15,

    get fontSizeSM() {
        return this.fontSizeBase * 0.9
    },
    get fontSizeH1() {
        return this.fontSizeBase * 1.8
    },
    get fontSizeH2() {
        return this.fontSizeBase * 1.6
    },
    get fontSizeH3() {
        return this.fontSizeBase * 1.4
    },
    get fontSizeT1() {
        return this.fontSizeBase * 1.3
    },
    get iconSizeT1() {
        return this.fontSizeBase * 1.9
    },
    get fontSizeDesc1() {
        return this.fontSizeBase * 1
    },

    // Footer
    footerHeight: 55,
    footerDefaultBg: '#3F51B5',


    // FooterTab
    tabBarTextColor: '#b3c7f9',
    tabBarTextSize: (platform === 'ios') ? 14 : 11,
    activeTab: '#fff',
    sTabBarActiveTextColor: '#007aff',
    tabBarActiveTextColor: '#fff',
    tabActiveBgColor: undefined,

    // Tab
    tabTintColor:'#3F51B5',
    tabDarkTintColor: '#36469C',
    tabIconDefault: '#b3c7f9',
    tabIconSelected: '#A2B3E0',
    tabDefaultBg: '#3F51B5',
    topTabBarTextColor: '#b3c7f9',
    topTabBarActiveTextColor: '#fff',
    topTabActiveBgColor: null,
    topTabBarBorderColor: '#fff',
    topTabBarActiveBorderColor: '#fff',

    // Header
    toolbarBtnColor: '#fff',
    toolbarDefaultBg: '#3F51B5',
    toolbarHeight: (platform === 'ios') ? 76 : 56,
    toolbarIconSize: (platform === 'ios') ? 20 : 22,
    toolbarSearchIconSize: (platform === 'ios') ? 20 : 23,
    toolbarInputColor: '#fff',
    searchBarHeight: (platform === 'ios') ? 30 : 40,
    toolbarInverseBg: '#222',
    toolbarTextColor: '#fff',
    toolbarDefaultBorder: '#3F51B5',
    iosStatusbar: 'light-content',

    get statusBarColor() {
        return color(this.toolbarDefaultBg).darken(0.2).hexString();
    },

    // Icon
    iconFamily: 'Ionicons',
    iconFontSize: (platform === 'ios') ? 30 : 28,
    iconMargin: 7,
    iconHeaderSize: (platform === 'ios') ? 29 : 24,

    // InputGroup
    inputFontSize: 17,
    inputBorderColor: '#D9D5DC',
    inputSuccessBorderColor: '#2b8339',
    inputErrorBorderColor: '#ed2f2f',
    inputGroupMarginBottom: 10,
    inputHeightBase: 50,
    inputPaddingLeft: 5,
    inputGroupRoundedBorderRadius: 30,

    get inputColor() {
        return this.textColor;
    },
    get inputColorPlaceholder() {
        return '#575757';
    },
    get inputPaddingLeftIcon() {
        return this.inputPaddingLeft * 8;
    },

    // Line Height
    btnLineHeight: 19,
    lineHeightH1: 32,
    lineHeightH2: 27,
    lineHeightH3: 22,
    iconLineHeight: (platform === 'ios') ? 37 : 30,
    lineHeight: (platform === 'ios') ? 20 : 24,

    // List
    listBorderColor: '#c9c9c9',
    listDividerBg: '#f4f4f4',
    listItemHeight: 45,
    listBtnUnderlayColor: '#DDD',

    // Changed Variable
    listItemPadding: (platform === 'ios') ? 10 : 12,
    listNoteColor: '#808080',
    listNoteSize: 13,

    // Progress Bar
    defaultProgressColor: '#E4202D',
    inverseProgressColor: '#1A191B',

    // Radio Button
    radioBtnSize: (platform === 'ios') ? 25 : 23,
    radioSelectedColorAndroid: '#5067FF',
    radioBtnLineHeight: (platform === 'ios') ? 29 : 24,
    radioColor: '#7e7e7e',

    get radioSelectedColor() {
        return color(this.radioColor).darken(0.2).hexString();
    },

    // Spinner
    defaultSpinnerColor: '#45D56E',
    inverseSpinnerColor: '#1A191B',

    // Tabs
    tabBgColor: '#F8F8F8',
    tabFontSize: 15,
    tabTextColor: '#222222',

    // Text
    textColor: '#000',
    inverseTextColor: '#fff',
    noteFontSize: 14,

    // Title
    titleFontfamily: (platform === 'ios') ? 'Roboto' : 'Roboto_medium',
    titleFontSize: 19,
    subTitleFontSize: 14,
    subtitleColor: '#FFF',
    titleFontColor: '#FFF',

    // Other
    borderRadiusBase: 2,
    borderWidth: (1/PixelRatio.getPixelSizeForLayoutSize(1)),
    contentPadding: 10,

    get darkenHeader() {
        return color(this.tabBgColor).darken(0.03).hexString();
    },

    dropdownBg: '#000',
    dropdownLinkColor: '#414142',
    inputLineHeight: 24,
    jumbotronBg: '#C9C9CE',
    jumbotronPadding: 30,

    // New Variable
    get defaultTextColor() {
        return this.textColor;
    },
    get btnPrimaryBg() {
        return this.brandPrimary;
    },
    get btnPrimaryColor() {
        return this.inverseTextColor;
    },
    get btnInfoBg() {
        return this.brandInfo;
    },
    get btnInfoColor() {
        return this.inverseTextColor;
    },
    get btnSuccessBg() {
        return this.brandSuccess;
    },
    get btnSuccessColor() {
        return this.inverseTextColor;
    },
    get btnDangerBg() {
        return this.brandDanger;
    },
    get btnDangerColor() {
        return this.inverseTextColor;
    },
    get btnWarningBg() {
        return this.brandWarning;
    },
    get btnWarningColor() {
        return this.inverseTextColor;
    },
    get btnTextSize() {
        return (platform === 'ios') ? this.fontSizeBase * 1.1 : this.fontSizeBase - 1;
    },
    get btnTextSizeLarge() {
        return this.fontSizeBase * 1.5;
    },
    get btnTextSizeSmall() {
        return this.fontSizeBase * 0.8;
    },
    get borderRadiusLarge() {
        return this.fontSizeBase * 3.8;
    },
    get iconSizeLarge() {
        return this.iconFontSize * 1.5;
    },
    get iconSizeSmall() {
        return this.iconFontSize * 0.6;
    },
};

const ThemeOfMaterial = {
    // Color
    Grey_50: '#EEEEEE', 
    Grey_200: '#E0E0E0',
    Grey_300: '#9E9E9E',
    Grey_600: '#424242',
    Grey_800: '#212121',
    Green_A400: '#00E676',
    Purple_A400: '#D500F9',
    Yellow_A400: '#FFEA00',
    Pink_300: '#F06292',

    // Color Theme
    get bakColor() {
        return this.Grey_50
    },
    get priColor() {
        return this.Grey_200
    },
    get priColor_300() {
        return this.Grey_300
    },
    get supColor_001() {
        return this.Green_A400
    },
    get supColor_002() {
        return this.Purple_A400
    },
    get dotColor_001() {
        return this.Yellow_A400
    },
    get priFontColor() {
        return this.Grey_800
    },
    get supFontColor_001() {
        return this.Grey_600
    },
    get dotFontColor_001() {
        return this.Pink_300
    },

    // Height
    rootNavHeight: 50, 
    homeNavHeight: 48,
    videoControlHeight: 38,
    videoHeight: 240,
    carouselHeight: 180,
    commentHeadHeight: 88,

    // FontSize
    rootNavIconSize: 28,
    homeNavIconSize: 28,
    xsFontSize: 11,
    smFontSize: 14,
    mdFontSize: 18,
    lgFontSize: 24,
    xsIconSize: 0,
    smIconSize: 18,
    mdIconSize: 24,
    lgIconSize: 0,

    // Padding
    xsPadding: 2,
    smPadding: 4,
    mdPadding: 8,
    lgPadding: 16,

    // Platform
    platformStyle,
    width,
    height,
    deviceHeight,
    deviceWidth,
    platform,
    isAndroid,

    // AndroidRipple
    androidRipple: true,
    androidRippleColor: 'rgba(256, 256, 256, 0.3)',
    androidRippleColorDark: 'rgba(0, 0, 0, 0.15)',

    // Badge
    badgeBg: '#ED1727',
    badgeColor: '#fff',
    badgePadding: (platform === 'ios') ? 3 : 0,

    // Button
    btnFontFamily: (platform === 'ios') ? 'Roboto' : 'Roboto_medium',
    btnDisabledBg: '#b5b5b5',
    btnDisabledClr: '#f1f1f1',
    btnPadding: 6,

    // CheckBox
    CheckboxRadius: 0,
    CheckboxBorderWidth: 2,
    CheckboxPaddingLeft: 2,
    CheckboxPaddingBottom: (platform === 'ios') ? 0 : 5,
    CheckboxIconSize: (platform === 'ios') ? 18 : 14,
    CheckboxIconMarginTop: (platform === 'ios') ? undefined : 1,
    CheckboxFontSize: (platform === 'ios') ? 21 : 18,
    DefaultFontSize: 17,
    checkboxBgColor: '#039BE5',
    checkboxSize: 20,
    checkboxTickColor: '#fff',

    // Segment
    segmentBackgroundColor: '#3F51B5',
    segmentActiveBackgroundColor: '#fff',
    segmentTextColor: '#fff',
    segmentActiveTextColor: '#3F51B5',
    segmentBorderColor: '#fff',
    segmentBorderColorMain: '#3F51B5',

    // Card
    cardDefaultBg: '#fff',
    cardBorderColor: '#ccc',

    // Font
    fontFamily: 'Roboto',
    fontSizeBase: 15,

    get fontSizeSM() {
        return this.fontSizeBase * 0.9
    },
    get fontSizeH1() {
        return this.fontSizeBase * 1.8
    },
    get fontSizeH2() {
        return this.fontSizeBase * 1.6
    },
    get fontSizeH3() {
        return this.fontSizeBase * 1.4
    },
    get fontSizeT1() {
        return this.fontSizeBase * 1.3
    },
    get iconSizeT1() {
        return this.fontSizeBase * 1.9
    },
    get fontSizeDesc1() {
        return this.fontSizeBase * 1
    },

    // Footer
    footerHeight: 55,
    footerDefaultBg: '#3F51B5',


    // FooterTab
    tabBarTextColor: '#b3c7f9',
    tabBarTextSize: (platform === 'ios') ? 14 : 11,
    activeTab: '#fff',
    sTabBarActiveTextColor: '#007aff',
    tabBarActiveTextColor: '#fff',
    tabActiveBgColor: undefined,

    // Tab
    tabTintColor:'#3F51B5',
    tabDarkTintColor: '#36469C',
    tabIconDefault: '#b3c7f9',
    tabIconSelected: '#A2B3E0',
    tabDefaultBg: '#3F51B5',
    topTabBarTextColor: '#b3c7f9',
    topTabBarActiveTextColor: '#fff',
    topTabActiveBgColor: null,
    topTabBarBorderColor: '#fff',
    topTabBarActiveBorderColor: '#fff',

    // Header
    toolbarBtnColor: '#fff',
    toolbarDefaultBg: '#3F51B5',
    toolbarHeight: (platform === 'ios') ? 76 : 56,
    toolbarIconSize: (platform === 'ios') ? 20 : 22,
    toolbarSearchIconSize: (platform === 'ios') ? 20 : 23,
    toolbarInputColor: '#fff',
    searchBarHeight: (platform === 'ios') ? 30 : 40,
    toolbarInverseBg: '#222',
    toolbarTextColor: '#fff',
    toolbarDefaultBorder: '#3F51B5',
    iosStatusbar: 'light-content',

    get statusBarColor() {
        return color(this.toolbarDefaultBg).darken(0.2).hexString();
    },

    // Icon
    iconFamily: 'Ionicons',
    iconFontSize: (platform === 'ios') ? 30 : 28,
    iconMargin: 7,
    iconHeaderSize: (platform === 'ios') ? 29 : 24,

    // InputGroup
    inputFontSize: 17,
    inputBorderColor: '#D9D5DC',
    inputSuccessBorderColor: '#2b8339',
    inputErrorBorderColor: '#ed2f2f',
    inputGroupMarginBottom: 10,
    inputHeightBase: 50,
    inputPaddingLeft: 5,
    inputGroupRoundedBorderRadius: 30,

    get inputColor() {
        return this.textColor;
    },
    get inputColorPlaceholder() {
        return '#575757';
    },
    get inputPaddingLeftIcon() {
        return this.inputPaddingLeft * 8;
    },

    // Line Height
    btnLineHeight: 19,
    lineHeightH1: 32,
    lineHeightH2: 27,
    lineHeightH3: 22,
    iconLineHeight: (platform === 'ios') ? 37 : 30,
    lineHeight: (platform === 'ios') ? 20 : 24,

    // List
    listBorderColor: '#c9c9c9',
    listDividerBg: '#f4f4f4',
    listItemHeight: 45,
    listBtnUnderlayColor: '#DDD',

    // Changed Variable
    listItemPadding: (platform === 'ios') ? 10 : 12,
    listNoteColor: '#808080',
    listNoteSize: 13,

    // Progress Bar
    defaultProgressColor: '#E4202D',
    inverseProgressColor: '#1A191B',

    // Radio Button
    radioBtnSize: (platform === 'ios') ? 25 : 23,
    radioSelectedColorAndroid: '#5067FF',
    radioBtnLineHeight: (platform === 'ios') ? 29 : 24,
    radioColor: '#7e7e7e',

    get radioSelectedColor() {
        return color(this.radioColor).darken(0.2).hexString();
    },

    // Spinner
    defaultSpinnerColor: '#45D56E',
    inverseSpinnerColor: '#1A191B',

    // Tabs
    tabBgColor: '#F8F8F8',
    tabFontSize: 15,
    tabTextColor: '#222222',

    // Text
    textColor: '#000',
    inverseTextColor: '#fff',
    noteFontSize: 14,

    // Title
    titleFontfamily: (platform === 'ios') ? 'Roboto' : 'Roboto_medium',
    titleFontSize: 19,
    subTitleFontSize: 14,
    subtitleColor: '#FFF',
    titleFontColor: '#FFF',

    // Other
    borderRadiusBase: 2,
    borderWidth: (1/PixelRatio.getPixelSizeForLayoutSize(1)),
    contentPadding: 10,

    get darkenHeader() {
        return color(this.tabBgColor).darken(0.03).hexString();
    },

    dropdownBg: '#000',
    dropdownLinkColor: '#414142',
    inputLineHeight: 24,
    jumbotronBg: '#C9C9CE',
    jumbotronPadding: 30,

    // New Variable
    get defaultTextColor() {
        return this.textColor;
    },
    get btnPrimaryBg() {
        return this.brandPrimary;
    },
    get btnPrimaryColor() {
        return this.inverseTextColor;
    },
    get btnInfoBg() {
        return this.brandInfo;
    },
    get btnInfoColor() {
        return this.inverseTextColor;
    },
    get btnSuccessBg() {
        return this.brandSuccess;
    },
    get btnSuccessColor() {
        return this.inverseTextColor;
    },
    get btnDangerBg() {
        return this.brandDanger;
    },
    get btnDangerColor() {
        return this.inverseTextColor;
    },
    get btnWarningBg() {
        return this.brandWarning;
    },
    get btnWarningColor() {
        return this.inverseTextColor;
    },
    get btnTextSize() {
        return (platform === 'ios') ? this.fontSizeBase * 1.1 : this.fontSizeBase - 1;
    },
    get btnTextSizeLarge() {
        return this.fontSizeBase * 1.5;
    },
    get btnTextSizeSmall() {
        return this.fontSizeBase * 0.8;
    },
    get borderRadiusLarge() {
        return this.fontSizeBase * 3.8;
    },
    get iconSizeLarge() {
        return this.iconFontSize * 1.5;
    },
    get iconSizeSmall() {
        return this.iconFontSize * 0.6;
    },
};

