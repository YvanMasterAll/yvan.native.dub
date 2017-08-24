import React, { Component } from 'react';
import { BackHandler, Image, StatusBar, StyleSheet, View, TouchableOpacity, ActivityIndicator, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { Container, Text, Content, Grid, Col, Row } from 'native-base'
import Svg, { Path, Defs, LinearGradient, Stop, Ellipse, Text as SvgText } from 'react-native-svg'
import Icon from 'react-native-vector-icons/MaterialIcons'
import PropTypes from 'prop-types'
import UltimateListView from "react-native-ultimate-listview"

import ImageCarousel from '../../components/ImageCarousel'
import LoadingSpinner from '../../components/LoadingSpinner'
import Theme from '../../constants/Theme'
const width = Theme.deviceWidth, height = Theme.deviceHeight
const { priColor, carouselHeight, homeNavHeight, bakColor, supColor_001, priColor_300, mdFontSize, videoHeight, xsFontSize, homeNavIconSize, videoControlHeight, mdIconSize, priFontColor, supFontColor_001, smIconSize, smFontSize } = Theme

const images = [
    'http://res.cloudinary.com/primecdn/image/upload/v1502439122/swiper-1_u3bck0.jpg',
    'http://res.cloudinary.com/primecdn/image/upload/v1502439153/swiper-4_rrqqdz.jpg',
    'http://res.cloudinary.com/primecdn/image/upload/v1502439116/swiper-3_tfobzn.jpg',
    'http://res.cloudinary.com/primecdn/image/upload/v1502439123/swiper-2_xvktwv.jpg'
]

export default class DubScreen extends Component {
    componentDidMount() {
        BackHandler.removeEventListener('home_navigation_back')
    }

    render() {
        return (
            <Container style={{top: -60, width: width, height: height, position: 'absolute'}}>
                <StatusBar
                    barStyle={this.props.home_scroll_down? 'dark-content' : 'light-content'}
                    backgroundColor={this.props.home_scroll_down? bakColor:"transparent"}
                    translucent={true}
                    animated={false}
                />
                <Grid style={{paddingTop: 60}}>
                    <DubVideoList {...this.props} icon={require('../../assets/images/home-love.png')} title={'猜你喜欢'} desc={'定制推荐, 如你所想'} num={10} page={10} />
                </Grid>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    carousel: {
        height: carouselHeight + 10
    },
    track: {
        height: 'auto',
        marginBottom: 10
        //flexDirection: 'row'
    },
    trackItem: {
        alignItems: 'center'
    },
    dot: {
        marginBottom: 8
    }
})

import { MockDubVideoList } from '../FakerMocks'
import DubVideoItem from './DubVideoItem'
class DubVideoSolidItem extends Component {
    static propTypes = {
        icon: PropTypes.number,
        title: PropTypes.string,
        desc: PropTypes.string,
        num: PropTypes.number
    }

    componentDidMount() {
        this._onFetch()
    }

    _onPressItem = (item) => {
        this.props.navigation.navigate('DubVideo', {title: item.title})
    }

    _sleep = (time) => new Promise(resolve => setTimeout(() => resolve(), time))

    _onFetch = async () => {
        let o = this
        let items = MockDubVideoList({num: this.props.num})
        items.map(function(item, index) {
            o.state.items.push(item)
        })
        await this._sleep(500)
        o.setState({refreshing: false, items: o.state.items, isReady: true})
    }

    constructor(props) {
        super(props)

        this.state = {
            items: [],
            isReady: false
        }
    }

    render() {
        let t = []
        let o = this
        return (
            <View>
                <View style={{paddingLeft: 12, height: 56, alignItems: 'center', flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={this.props.icon} style={{width: 28, height: 28, marginRight: 8}} />
                        <Text style={{fontSize: mdFontSize, color: priFontColor}}>{this.props.title}</Text>
                    </View>
                    <View style={{position: 'absolute', right: 8}}>
                        <Text style={{fontSize: smFontSize, color: priColor_300}}>{this.props.desc}</Text>
                    </View>
                </View>
                <View>
                    {!this.state.isReady && (
                        <ActivityIndicator style={{height: 240}}
                            size={'large'}
                            color={'#000'}
                        />
                    )}
                    {this.state.isReady && this.state.items.map((item, index) => {
                        if(index % 2 == 0) {
                            t = item
                            return
                        }
                        return (
                            <Row key={item.id}>
                                <Col>
                                    <TouchableWithoutFeedback onPress={o._onPressItem.bind(o, item)}>
                                        <View style={{marginRight: 2, width: width / 2 - 2}} >
                                            <Image source={{uri: item.image}} style={{height: 100}}/>
                                            <View style={{paddingLeft: 8, paddingBottom: 18, paddingTop: 4}}>
                                                <Text style={{color: supFontColor_001, marginBottom: 4, fontSize: smFontSize}}>{item.title}</Text>
                                                <Text style={{color: priColor_300, fontSize: xsFontSize}}>{item.desc}</Text>
                                            </View>
                                            <View style={{position: 'absolute', left: 8, top: 82, flexDirection:'row', alignItems: 'center'}}>
                                                <Icon name='play-circle-filled' style={{color: priColor, fontSize: smIconSize * 0.8, marginRight: 4, backgroundColor: 'transparent'}}/>
                                                <Text style={{color: priColor, fontSize: xsFontSize, backgroundColor: 'transparent'}}>{item.hits}</Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </Col>
                                <Col>
                                    <TouchableWithoutFeedback onPress={o._onPressItem.bind(o, t)} key={t.id}>
                                        <View style={{marginLeft: 2, width: width / 2 - 2}} >
                                            <Image source={{uri: t.image}} style={{height: 100}}/>
                                            <View style={{paddingLeft: 8, paddingBottom: 18, paddingTop: 4}}>
                                                <Text style={{color: supFontColor_001, marginBottom: 4, fontSize: smFontSize}}>{t.title}</Text>
                                                <Text style={{color: priColor_300, fontSize: xsFontSize}}>{item.desc}</Text>
                                            </View>
                                            <View style={{position: 'absolute', left: 8, top: 82, flexDirection:'row', alignItems: 'center'}}>
                                                <Icon name='play-circle-filled' style={{color: priColor, fontSize: smIconSize * 0.8, marginRight: 4, backgroundColor: 'transparent'}}/>
                                                <Text style={{color: priColor, fontSize: xsFontSize, backgroundColor: 'transparent'}}>{item.hits}</Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </Col>
                            </Row>
                        )
                    })}
                </View>
                <Row style={{borderTopWidth: 0.3, borderTopColor: Theme.bakColor_50}}>
                    <Col>
                        <TouchableWithoutFeedback>
                            <View style={{height: 46, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: smFontSize, color: Theme.supFontColor_002}}>查看更多</Text>
                                <Icon name="keyboard-arrow-right" style={{color: Theme.supFontColor_002, fontSize: smFontSize, marginLeft: 4}} />
                            </View>
                        </TouchableWithoutFeedback>
                    </Col>
                    <Col>
                        <TouchableWithoutFeedback>
                            <View style={{height: 46, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: smFontSize, color: Theme.supFontColor_002}}>换一批看看</Text>
                                <Icon name="refresh" style={{color: Theme.supFontColor_002, fontSize: smFontSize, marginLeft: 4}} />
                            </View>
                        </TouchableWithoutFeedback>
                    </Col>
                    <View style={{position: 'absolute', width: .5, height: 20, backgroundColor: Theme.bakColor_50, left: width / 2, top: 13}} />
                </Row>
                <Row>
                    <IntervalZone height={12} />
                </Row>
            </View>
        )
    }
}
class DubVideoList extends Component {
    static propTypes = {
        icon: PropTypes.number,
        title: PropTypes.string,
        desc: PropTypes.string,
        num: PropTypes.number,
        page: PropTypes.number
    }

    constructor(props) {
        super(props)

        this.state = {
            page: props.page,
            scrollDown: false,
            scrollHeight: 100
        }
    }

    _keyExtractor = (item, index) => item.id

    _onPressItem = (item) => {
        this.props.navigation.navigate('DubVideo', {title: item.title})
    }

    _header() {
        return (
            <View>
                <View style={styles.carousel}>
                    <ImageCarousel images={images} />
                    <View style={{position: 'absolute', top: 200}}>
                        <CarouselCover />
                    </View>
                </View>
                <Tracks {...this.props}/>
                <IntervalZone height={12} />
                <DubVideoSolidItem {...this.props} icon={require('../../assets/images/home-star.png')} title={'今日更新'} desc={'最新视频不容错过'} num={4} />
                <DubVideoSolidItem {...this.props} icon={require('../../assets/images/home-mission.png')} title={'每日一句'} desc={'每日一练滴水石穿'} num={4} />
                <View style={{paddingLeft: 12, height: 56, alignItems: 'center', flexDirection: 'row', marginTop: 8}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={this.props.icon} style={{width: 28, height: 28, marginRight: 8}} />
                        <Text style={{fontSize: mdFontSize, color: priFontColor}}>{this.props.title}</Text>
                    </View>
                    <View style={{position: 'absolute', right: 8}}>
                        <Text style={{fontSize: smFontSize, color: priColor_300}}>{this.props.desc}</Text>
                    </View>
                </View>
            </View>
        )
    }

    _sleep = (time) => new Promise(resolve => setTimeout(() => resolve(), time))

    _onFetch = async (page = 1, startFetch, abortFetch) => {
        try {
            let pageLimit = this.props.num
            let skip = (page - 1) * pageLimit

            //Generate dummy data
            let rowData = MockDubVideoList({num: this.props.num})

            //Simulate the end of the list if there is no more data returned from the server
            if (page === this.state.page) {
                rowData = []
            }

            //Simulate the network loading in ES7 syntax (async/await)
            await this._sleep(2000);
            startFetch(rowData, pageLimit);
        } catch (err) {
            abortFetch() //manually stop the refresh or pagination if it encounters network error
        }
    }

    _renderItem = (item, index, separator) => {
        return (
            <DubVideoItem
                index={item.id}
                id={item.key}
                onPressItem={this._onPressItem.bind(this, item)}
                title={item.title}
                hits={item.hits}
                image={item.image}
                desc={item.desc}
            />
        )
    }

    _renderPaginationFetchingView = () => {
        return (
            <LoadingSpinner height={60} text="loading..."/>
        )
    }

    onScroll = (event) => {
        let verticalHeight = event.nativeEvent.contentOffset.y
        if(verticalHeight >= this.state.scrollHeight && !this.state.scrollDown) {
            this.setState({
                scrollDown: true
            })
            this.props.home_scroll_on({home_scroll_down: true})
        }
        if(verticalHeight < this.state.scrollHeight && this.state.scrollDown) {
            this.setState({
                scrollDown: false
            })
            this.props.home_scroll_on({home_scroll_down: false})
        }
    }

    onScrollEndDrag = (event) => {
        let verticalHeight = event.nativeEvent.contentOffset.y
        if(verticalHeight >= this.state.scrollHeight && !this.state.scrollDown) {
            this.setState({
                scrollDown: true
            })
            this.props.home_scroll_on({home_scroll_down: true})
        }
        if(verticalHeight < this.state.scrollHeight && this.state.scrollDown) {
            this.setState({
                scrollDown: false
            })
            this.props.home_scroll_on({home_scroll_down: false})
        }
    }

    render() {
        return (
            <Row>
                <UltimateListView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    onMomentumScrollEnd={this.onScroll.bind(this)}
                    onScrollEndDrag={this.onScrollEndDrag.bind(this)}
                    ref={(ref) => this.refs = ref}
                    onFetch={this._onFetch}
                    keyExtractor={this._keyExtractor}
                    item={this._renderItem}
                    numColumns={2}
                    header={this._header.bind(this)}
                    paginationFetchingView={this._renderPaginationFetchingView}
                    refreshableTitlePull={'下拉刷新: '}
                    refreshableTitleRefreshing={'加载中...'}
                    dateTitle={'最近更新于: '}
                    refreshableTitleRelease={'释放刷新'}
                    allLoadedText={'没有更多数据'}
                    waitingSpinnerText={'加载中...'}
                />
            </Row>
        )
    }
}

class IntervalZone extends Component {
    render() {
        return (
            <View style={{width: width, height: this.props.height, backgroundColor: Theme.bakColor_50}} />
        )
    }
}

class CarouselCover extends Component {
    render() {
        return (
            <Svg
                height="20"
                width={Theme.deviceWidth}
                viewBox={"0 0 " + Theme.deviceWidth / 10 + " " + 2}
                >
                <Path
                    d={"M0 0 Q" + Theme.deviceWidth / 20 + ",2.0 " + Theme.deviceWidth / 10 + ",0 L" + Theme.deviceWidth / 10 + " 2.4 L0 2.4 L0 0"}
                    fill={bakColor}
                    strokeWidth='0'
                />
            </Svg>
        )
    }
}

class Tracks extends Component {
    render() {
        return (
            <Row style={styles.track}>
                <Col style={styles.trackItem}>
                    <Row style={styles.dot}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("Punch") }}>
                            <Image source={require('../../assets/images/home-track-001.png')} style={{width: 40, height: 40}} />
                        </TouchableOpacity>
                    </Row>
                    <Row><Text style={{fontSize: xsFontSize, color: supFontColor_001}}>每日打卡</Text></Row>
                </Col>
                <Col style={styles.trackItem}>
                    <Row style={styles.dot}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("Rank") }}>
                            <Image source={require('../../assets/images/home-track-002.png')} style={{width: 40, height: 40}} />
                        </TouchableOpacity>
                    </Row>
                    <Row><Text style={{fontSize: xsFontSize, color: supFontColor_001}}>排行榜</Text></Row>
                </Col>
                <Col style={styles.trackItem}>
                    <Row style={styles.dot}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("Vip") }}>
                            <Image source={require('../../assets/images/home-track-003.png')} style={{width: 40, height: 40}} />
                        </TouchableOpacity>
                    </Row>
                    <Row><Text style={{fontSize: xsFontSize, color: supFontColor_001}}>VIP专区</Text></Row>
                </Col>
                <Col style={styles.trackItem}>
                    <Row style={styles.dot}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("Activity") }}>
                            <Image source={require('../../assets/images/home-track-004.png')} style={{width: 40, height: 40}} />
                        </TouchableOpacity>
                    </Row>
                    <Row><Text style={{fontSize: xsFontSize, color: supFontColor_001}}>精彩活动</Text></Row>
                </Col>
                <Col style={styles.trackItem}>
                    <Row style={styles.dot}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("Sort") }}>
                            <Image source={require('../../assets/images/home-track-005.png')} style={{width: 40, height: 40}} />
                        </TouchableOpacity>
                    </Row>
                    <Row><Text style={{fontSize: xsFontSize, color: supFontColor_001}}>分类视频</Text></Row>
                </Col>
            </Row>
        )
    }
}

class Dot extends Component {
    static propTypes = {
        dot: PropTypes.string,
        startColor: PropTypes.string,
        stopColor: PropTypes.string
    }

    render() {
        return (
            <View>
                <Svg
                    width='44'
                    height='44'
                    viewBox={"0 0 44 44"}
                    >
                    <Defs>
                        <LinearGradient id="grad" x1="0" y1="22" x2="44" y2="22">
                            <Stop offset="0%" stopColor={this.props.startColor} stopOpacity=".5" />
                            <Stop offset="100%" stopColor={this.props.stopColor} stopOpacity="1" />
                        </LinearGradient>
                    </Defs>
                    <Ellipse cx="22" cy="22" rx="22" ry="22" fill="url(#grad)" />
                    <SvgText
                        fill="#fff"
                        stroke="none"
                        fontSize="24"
                        fontWeight="normal"
                        x="21"
                        y="8"
                        textAnchor="middle"
                    >{this.props.dot}</SvgText>
                </Svg>
            </View>
        )
    }
}





