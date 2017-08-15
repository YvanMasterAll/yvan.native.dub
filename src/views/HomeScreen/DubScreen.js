import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Container, Text, Content, Grid, Col, Row } from 'native-base'
import Svg, { Path, Defs, LinearGradient, Stop, Ellipse, Text as SvgText } from 'react-native-svg'
import Icon from 'react-native-vector-icons/MaterialIcons'
import PropTypes from 'prop-types'
import UltimateListView from "react-native-ultimate-listview"

import ImageCarousel from '../../components/ImageCarousel'
import LoadingSpinner from '../../components/LoadingSpinner'
import Theme from '../../constants/Theme'
const width = Theme.deviceWidth, height = Theme.deviceHeight

const images = [
    'http://res.cloudinary.com/primecdn/image/upload/v1502439122/swiper-1_u3bck0.jpg',
    'http://res.cloudinary.com/primecdn/image/upload/v1502439153/swiper-4_rrqqdz.jpg',
    'http://res.cloudinary.com/primecdn/image/upload/v1502439116/swiper-3_tfobzn.jpg',
    'http://res.cloudinary.com/primecdn/image/upload/v1502439123/swiper-2_xvktwv.jpg'
]

export default class DubScreen extends Component {
    render() {
        return (
            <Container>
                <Grid>
                    <DubVideoList {...this.props} icon={'favorite-border'} title={'猜你喜欢'} desc={'定制推荐, 如你所想'} num={10} page={10} />
                </Grid>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    carousel: {
        height: 190
    },
    track: {
        height: 'auto'
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
        icon: PropTypes.string,
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
        await this._sleep(2000)
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
            <View style={{marginTop: 20}}>
                <View style={{paddingLeft: 12, height: 56, alignItems: 'center', flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name={this.props.icon} style={{fontSize: Theme.iconSizeT1, marginRight: 8}}/>
                        <Text style={{fontSize: Theme.fontSizeT1}}>{this.props.title}</Text>
                    </View>
                    <View style={{position: 'absolute', right: 8}}>
                        <Text>{this.props.desc}</Text>
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
                                    <TouchableOpacity onPress={o._onPressItem.bind(o, item)}>
                                        <View style={{marginRight: 2, width: width / 2 - 2}} >
                                            <Image source={{uri: item.image}} style={{height: 120}}/>
                                            <View style={{paddingLeft: 8, paddingBottom: 18, paddingTop: 4}}>
                                                <Text style={{color: 'black', marginBottom: 4}}>{item.title}</Text>
                                                <Text>{item.desc}</Text>
                                            </View>
                                            <View style={{position: 'absolute', left: 8, top: 94, flexDirection:'row', alignItems: 'center'}}>
                                                <Icon name='play-circle-filled' style={{color: '#fff', fontSize: 16, marginRight: 4}}/>
                                                <Text style={{color: '#fff'}}>{item.hits}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Col>
                                <Col>
                                    <TouchableOpacity onPress={o._onPressItem.bind(o, t)} key={t.id}>
                                        <View style={{marginLeft: 2, width: width / 2 - 2}} >
                                            <Image source={{uri: t.image}} style={{height: 120}}/>
                                            <View style={{paddingLeft: 8, paddingBottom: 18, paddingTop: 4}}>
                                                <Text style={{color: 'black', marginBottom: 4}}>{t.title}</Text>
                                                <Text>{t.desc}</Text>
                                            </View>
                                            <View style={{position: 'absolute', left: 8, top: 94, flexDirection:'row', alignItems: 'center'}}>
                                                <Icon name='play-circle-filled' style={{color: '#fff', fontSize: 16, marginRight: 4}}/>
                                                <Text style={{color: '#fff'}}>{t.hits}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Col>
                            </Row>
                        )
                    })}
                </View>
                <Row>
                    <Col>
                        <TouchableOpacity style={{height: 56, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Text>查看更多</Text>
                            <Icon name="keyboard-arrow-right" style={{fontSize: 18, marginLeft: 4}} />
                        </TouchableOpacity>
                    </Col>
                    <Col>
                        <TouchableOpacity style={{height: 56, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Text>换一批看看</Text>
                            <Icon name="refresh" style={{fontSize: 18, marginLeft: 4}} />
                        </TouchableOpacity>
                    </Col>
                </Row>
            </View>
        )
    }
}
class DubVideoList extends Component {
    static propTypes = {
        icon: PropTypes.string,
        title: PropTypes.string,
        desc: PropTypes.string,
        num: PropTypes.number,
        page: PropTypes.number
    }

    constructor(props) {
        super(props)

        this.state = {
            page: props.page
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
                    <View style={{position: 'absolute', top: 170}}>
                        <CarouselCover />
                    </View>
                </View>
                <Tracks {...this.props}/>
                <DubVideoSolidItem {...this.props} icon={'stars'} title={'今日更新'} desc={'最新视频不容错过'} num={4} />
                <DubVideoSolidItem {...this.props} icon={'perm-contact-calendar'} title={'每日一句'} desc={'每日一练滴水石穿'} num={4} />
                <View style={{paddingLeft: 12, height: 56, alignItems: 'center', flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name={this.props.icon} style={{fontSize: Theme.iconSizeT1, marginRight: 8}}/>
                        <Text style={{fontSize: Theme.fontSizeT1}}>{this.props.title}</Text>
                    </View>
                    <View style={{position: 'absolute', right: 8}}>
                        <Text>{this.props.desc}</Text>
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
            <LoadingSpinner height={height * 0.2} text="loading..."/>
        )
    }

    render() {
        return (
            <Row style={{marginTop: 20}}>
                <UltimateListView
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

class CarouselCover extends Component {
    render() {
        return (
            <Svg
                height="20"
                width={Theme.deviceWidth}
                viewBox={"0 0 " + Theme.deviceWidth / 10 + " " + 2}
                >
                <Path
                    d={"M0 0 Q" + Theme.deviceWidth / 20 + ",1.8 " + Theme.deviceWidth / 10 + ",0 L" + Theme.deviceWidth / 10 + " 2 L0 2 L0 0"}
                    fill="#fff"
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
                            <Dot dot={'暑'} startColor={'purple'} stopColor={'red'} />
                        </TouchableOpacity>
                    </Row>
                    <Row><Text style={{fontSize: Theme.fontSizeSM}}>每日打卡</Text></Row>
                </Col>
                <Col style={styles.trackItem}>
                    <Row style={styles.dot}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("Rank") }}>
                            <Dot dot={'假'} startColor={'yellow'} stopColor={'red'} />
                        </TouchableOpacity>
                    </Row>
                    <Row><Text style={{fontSize: Theme.fontSizeSM}}>排行榜</Text></Row>
                </Col>
                <Col style={styles.trackItem}>
                    <Row style={styles.dot}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("Vip") }}>
                            <Dot dot={'快'} startColor={'red'} stopColor={'grey'} />
                        </TouchableOpacity>
                    </Row>
                    <Row><Text style={{fontSize: Theme.fontSizeSM}}>VIP专区</Text></Row>
                </Col>
                <Col style={styles.trackItem}>
                    <Row style={styles.dot}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("Activity") }}>
                            <Dot dot={'乐'} startColor={'grey'} stopColor={'green'} />
                        </TouchableOpacity>
                    </Row>
                    <Row><Text style={{fontSize: Theme.fontSizeSM}}>精彩活动</Text></Row>
                </Col>
                <Col style={styles.trackItem}>
                    <Row style={styles.dot}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("Sort") }}>
                            <Dot dot={'!'} startColor={'purple'} stopColor={'brown'} />
                        </TouchableOpacity>
                    </Row>
                    <Row><Text style={{fontSize: Theme.fontSizeSM}}>分类视频</Text></Row>
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





