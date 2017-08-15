import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { Container, Text, Content, Grid, Col, Row, Button } from 'native-base'
import ImageCarousel from '../../components/ImageCarousel'
import Svg, { Path, Defs, LinearGradient, Stop, Ellipse, Text as SvgText } from 'react-native-svg'
import Icon from 'react-native-vector-icons/MaterialIcons'
import PropTypes from 'prop-types'

import Theme from '../../constants/Theme'

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
                <Content showsVerticalScrollIndicator={false}>
                    <Grid>
                        <Row style={styles.carousel}>
                            <ImageCarousel images={images} />
                            <View style={{position: 'absolute', top: 170}}>
                                <CarouselCover />
                            </View>
                        </Row>
                        <Tracks {...this.props}/>
                        <DubVideoList {...this.props} solid icon={'stars'} title={'今日更新'} desc={'最新视频不容错过'} items={MockVideoList({num: 4})} />
                        <DubVideoList {...this.props} solid icon={'perm-contact-calendar'} title={'每日一句'} desc={'每日一练滴水石穿'} items={MockVideoList({num: 4})} />
                        <DubVideoList {...this.props} icon={'favorite-border'} title={'猜你喜欢'} desc={'定制推荐, 如你所想'} items={MockVideoList({num: 10})} length={100} />
                    </Grid>
                </Content>
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
 
import { MockVideoList } from '../FakerMocks'
import DubVideoItem from './DubVideoItem'
class DubVideoList extends Component {
    static propTypes = {
        items: PropTypes.array
    }

    constructor(props) {
        super(props)

        this.state = {
            items: props.items,
            refreshing: false,
            hasMore: true
        }
    }

    _keyExtractor = (item, index) => item.id

    _onPressItem = (item) => {
        this.props.navigation.navigate('DubVideo', {title: item.title})
    }

    _header() {
        return (
            <View style={{paddingLeft: 12, height: 56, alignItems: 'center', flexDirection: 'row'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name={this.props.icon} style={{fontSize: Theme.iconSizeT1, marginRight: 8}}/>
                    <Text style={{fontSize: Theme.fontSizeT1}}>{this.props.title}</Text>
                </View>
                <View style={{position: 'absolute', right: 8}}>
                    <Text>{this.props.desc}</Text>
                </View>
            </View>
        )
    }

    _footer() {
        if(this.props.solid) {
            return (
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
            )
        } else {
            return (
                <View>
                    { this.state.refreshing && !this.state.hasMore && (<View style={{height: 40, alignItems: 'center', justifyContent: 'center'}}><Text>没有更多数据</Text></View>) }
                    { this.state.refreshing && this.state.hasMore && (<ActivityIndicator style={{height: 40}} size="large" color="#ee735c"/>) }
                </View>
            )
        }

    }

    _onRefresh() {
        if(!this.props.solid) {
            this.setState({ refreshing: true })
            if(this.props.items.length >= this.props.length) {
                this.setState({ hasMore: false })
                return
            }
            let o = this
            setTimeout(function(){
                let items = MockVideoList({num: 10})
                items.map(function(item, index) {
                    o.state.items.push(item)
                })
                o.setState({refreshing: false, items: o.state.items})
            },3000)
        }
    }

    _renderItem = ({item}) => {
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

    render() {
        return (
            <Row style={{marginTop: 20}}>
                <FlatList
                    data={this.state.items}
                    ref={r=>this.refs=r}
                    initialNumToRender={4}
                    ListHeaderComponent={this._header.bind(this)}
                    ListFooterComponent={this._footer.bind(this)}
                    numColumns={2}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    onEndReachedThreshold={0.1}
                    onEndReached={this._onRefresh.bind(this)}
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





