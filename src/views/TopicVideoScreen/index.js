import React, { Component } from 'react'
import { BackHandler, StatusBar, TouchableOpacity, StyleSheet, Image, View, Easing, Animated, TouchableWithoutFeedback } from 'react-native'
import { Container, Thumbnail, Text, Content, Left, Right, Grid, Col, Row } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import PropTypes from 'prop-types'
import UltimateListView from "react-native-ultimate-listview"
import Video from 'react-native-video'
import Color from 'color'
import Slider from "react-native-slider"
import { mdl } from 'react-native-material-kit'
import Animation from 'lottie-react-native'
import Orientation from 'react-native-orientation'

import { Thumbsup } from '../../constants/Animations'
import { MockTopicVideoList, MockTopicVideoCommentList } from '../FakerMocks'
import LoadingSpinner from '../../components/LoadingSpinner'
import Theme from '../../constants/Theme'
import Styles from '../../constants/Styles'
const width = Theme.deviceWidth, height = Theme.deviceHeight
const { priColor, dotColor_001, isAndroid, xsFontSize, homeNavHeight, rootNavHeight, bakColor, supColor_001, dotFontColor_001, priColor_300, videoHeight, homeNavIconSize, videoControlHeight, mdIconSize, priFontColor, supFontColor_001, smIconSize, smFontSize } = Theme

export default class TopicVideoScreen extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            fullScreen: false
        }
    }

    setFullScreen(flag) {
        this.setState({
            fullScreen: flag 
        })
    }

    render() {
        return (
            <Container>
                <Grid style={{backgroundColor: bakColor}}>
                    <Row style={this.state.fullScreen? {height: width}:{height: videoHeight}}>
                        <VideoControl 
                            setFullScreen={this.setFullScreen.bind(this)}
                            video={'http://115.231.144.61/5/i/k/f/u/ikfuigucfiuexlzsmrnwfswgyyrozz/hc.yinyuetai.com/CA3A015C0E08A156E3C86D7F0619E128.mp4?sc=79354dcd37128aa8&br=794&vid=2862632&aid=4539&area=US&vst=0&ptp=mv&rd=yinyuetai.com'}
                            music={'http://link.hhtjim.com/baidu/100575177.mp3'} 
                            {...this.props}
                            />
                    </Row>
                    <Row style={this.state.fullScreen && {display: 'none'}}>
                        <CommentList
                            {...this.props} 
                            name={'上善若水'} 
                            avatar={'http://res.cloudinary.com/primecdn/image/upload/v1503382715/01d465573d01d36ac7253f9a014ee9_c0getz.jpg'} 
                            time={'2017-08-15 22:00'}
                            plays={214}
                            thumbsup={183}
                            num={6}
                            page={10}
                            />
                    </Row>
                </Grid>
            </Container>
        )
    }
}
    
class VideoControl extends Component {
    render() {
        return (
            <View>
                <VideoPlayer video={this.props.video} music={this.props.music} {...this.props} />
            </View>
        )
    }
}

class VideoPlayer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rate: 1,
            mrate: 1,
            volume: 1,
            muted: true,
            mmuted: false,
            resizeMode: 'cover', //'cover' & 'stretch'
            duration: 0.0,
            mduration: 0.0,
            currentTime: 0.0,
            currentMusicTime: 0.0,
            paused: true,
            mpaused: true,
            dropDown: 1,
            isReady: false,
            isOnPlay: false,
            waitTimes: 0,
            upWaitTimes: 5,
            control: true,
            controlTimes: 0,
            upControlTimes: 20,
            onSlide: false,
            currentSlideValue: 0.0,
            fullScreen: false
        }
    }

    video: Video

    componentDidMount() {
        let o = this
        BackHandler.addEventListener('topicvideo_back_from_videoscreen',() => { 
            if(this.state.fullScreen) {
                this.setFullScreen(false)
                this.onOrientationNormal()
                return true
            } else {
                BackHandler.addEventListener('home_navigation_back', () => {
                    BackHandler.exitApp()
                })
                this.onOrientationNormal()
                this.props.navigation.goBack()
                return true
            }
        })
    }

    setFullScreen(flag) {
        this.setState({
            fullScreen: flag
        })
        this.props.setFullScreen(flag)
    }

    onOrientationNormal() {
        Orientation.lockToPortrait()
    }

    onOrientationLeft() {
        Orientation.lockToLandscapeLeft()
    }

    onLoad = (data) => {
        this.setState({ duration: data.duration, isReady: true})
    }

    onMusicLoad = (data) => {
        this.setState({ mduration: data.duration})
    }

    onProgress = (data) => {
        //alert(data.currentTime + ":" + this.state.currentTime + ":" + this.state.waitTimes)
        let currentTime, waitTimes, control, controlTimes
        if(data.currentTime === this.state.currentTime) {
            currentTime = data.currentTime
            waitTimes = this.state.waitTimes + 1
            if(this.state.control) {
                if(this.state.controlTimes > this.state.upControlTimes) {
                    control = false
                    controlTimes = 0
                } else {
                    control = this.state.control
                    controlTimes = this.state.controlTimes + 1
                }
            } else {
                control = this.state.control
                controlTimes = this.state.controlTimes
            }
        } else {
            currentTime = data.currentTime
            waitTimes = 0
            if(this.state.control) {
                if(this.state.controlTimes > this.state.upControlTimes) {
                    control = false
                    controlTimes = 0
                } else {
                    control = this.state.control
                    controlTimes = this.state.controlTimes + 1
                }
            } else {
                control = this.state.control
                controlTimes = this.state.controlTimes
            }
        }

        if((this.state.currentTime - this.state.currentMusicTime) > 0.25) {
            this.setState({
                currentTime: data.currentTime,
                waitTimes: waitTimes,
                control: control,
                controlTimes: controlTimes,
                mpaused: false,
                mrate: 1
            })
        } else {
            this.setState({
                currentTime: data.currentTime,
                waitTimes: waitTimes,
                control: control,
                controlTimes: controlTimes
            })
        }
    }

    onMusicProgress = (data) => {
        if((this.state.currentMusicTime - this.state.currentTime) > 0.25) {
            this.setState({
                currentMusicTime: data.currentTime,
                mpaused: true,
                mrate: 0
            })
        } else {
            this.setState({
                currentMusicTime: data.currentTime,
                mpaused: false,
                mrate: 1
            })
        }
    }

    operControl() {
        this.setState({
            control: !this.state.control,
            controlTimes: 0
        })    
    }

    operSlide = (value) => {
        let t = value * this.state.duration
        this.setState({
            currentTime: t,
            controlTimes: 0,
            onSlide: false,
            currentSlideValue: value
        })
        this.video.seek(t)
        this.music.seek(t)
    }

    onSlide() {
        this.setState({
            onSlide: true
        })
    }

    onFullScreen() {
        if(this.state.fullScreen) {
            this.onOrientationNormal()
        } else {
            this.onOrientationLeft()
        }
        this.setFullScreen(!this.state.fullScreen)
    }

    onPause = () => {
        let paused = !this.state.paused
        if(paused) {
            this.setState({
                paused: paused,
                rate: 0,
                mpaused: paused,
                mrate: 0,
                isOnPlay: false
            })
        } else {
            this.setState({
                paused: paused,
                mpaused: paused,
                rate: 1,
                mrate: 1,
                isOnPlay: true
            })
        }
    }

    goBack() {
        if(this.state.fullScreen) {
            this.onOrientationNormal()
            this.setFullScreen(false)
        } else {
            BackHandler.addEventListener('home_navigation_back', () => {
                BackHandler.exitApp()
            })
            this.props.navigation.goBack()
        }
    }

    onEnd = () => {
        this.setState({ paused: true, mpaused: true, rate: 0, mrate: 1, currentTime: 0.0, currentMusicTime: 0.0 })
        this.video.seek(0)
        this.music.seek(0)
    }

    onAudioBecomingNoisy = () => {
        this.setState({ paused: true, rate: 0 })
    }

    onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
        this.setState({ paused: !event.hasAudioFocus })
    }

    onMusicAudioBecomingNoisy = () => {
        this.setState({ mpaused: true, mrate: 0 })
    }

    onAudioMusicFocusChanged = (event: { hasAudioFocus: boolean }) => {
        this.setState({ mpaused: !event.hasAudioFocus })
    }

    getCurrentTime() {
        let t = parseFloat(this.state.currentTime)
        let minutes = parseInt(t / 60)
        let seconds = parseInt(t % 60)
        minutes = minutes < 10 ? "0" + minutes : minutes
        seconds = seconds < 10 ? "0" + seconds : seconds
        return minutes + ":" + seconds
    }

    getTotalTime() {
        let t = parseFloat(this.state.duration)
        let minutes = parseInt(t / 60)
        let seconds = parseInt(t % 60)
        minutes = minutes < 10 ? "0" + minutes : minutes
        seconds = seconds < 10 ? "0" + seconds : seconds
        return minutes + ":" + seconds
    }

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0
    }

    renderRateControl(rate) {
        const isSelected = (this.state.rate === rate);

        return (
            <TouchableOpacity onPress={() => { this.setState({ rate }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                {rate}x
                </Text>
            </TouchableOpacity>
        )
    }

    renderResizeModeControl(resizeMode) {
        const isSelected = (this.state.resizeMode === resizeMode);

        return (
            <TouchableOpacity onPress={() => { this.setState({ resizeMode }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                {resizeMode}
                </Text>
            </TouchableOpacity>
        )
    }

    renderVolumeControl(volume) {
        const isSelected = (this.state.volume === volume)

        return (
            <TouchableOpacity onPress={() => { this.setState({ volume }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                {volume * 100}%
                </Text>
            </TouchableOpacity>
        )
    }

    renderPlayControl() {
        if(this.state.waitTimes >= this.state.upWaitTimes || (!this.state.paused && !this.state.isReady)) {
            return (
                <View style={this.state.fullScreen? {width: height, height: width, position: 'absolute', top: 0}:{width: width, height: videoHeight, position: 'absolute', top: 0}}>
                    <View style={this.state.fullScreen? {position: 'absolute', width: 50, height: 50, left: (height / 2 - 30), top: width / 2 - 30}:{position: 'absolute', width: 50, height: 50, left: (width / 2 - 30), top: videoHeight / 2 - 30}}>
                        <mdl.Spinner style={{width: 50, height: 50}} strokeColor={Theme.bakColor_50} />
                    </View>
                    <View style={{position: 'absolute', left: 8, top: 8}}>
                        <TouchableOpacity onPress={this.goBack.bind(this)}>
                            <View style={{borderRadius: 25, width: 34, height: 34, backgroundColor: 'rgba(0,0,0, 0.5)', alignItems: 'center', justifyContent: 'center'}}>
                                <Icon name="chevron-left" style={{top: isAndroid?0:1, color: priColor, fontSize: mdIconSize}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            if(this.state.control) {
                return (
                    <View style={this.state.fullScreen? {width: height, height: width, position: 'absolute', top: 0}:{width: width, height: videoHeight, position: 'absolute', top: 0}}>
                        <View style={this.state.fullScreen? {position: 'absolute', width: 50, height: 50, left: (height / 2 - 30), top: width / 2 - 30}:{position: 'absolute', width: 50, height: 50, left: (width / 2 - 30), top: videoHeight / 2 - 30}}>
                            <TouchableOpacity onPress={this.onPause}>
                                <View style={{borderRadius: 25, width: 50, height: 50, backgroundColor: 'rgba(0,0,0, 0.5)', alignItems: 'center', justifyContent: 'center'}}>
                                    <Image source={this.state.paused? require('../../assets/images/topic-video-control-play.png'):require('../../assets/images/topic-video-control-stop.png')} style={{width: 24, height: 24}} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{position: 'absolute', left: 8, top: 8}}>
                            <TouchableOpacity onPress={this.goBack.bind(this)}>
                                <View style={{borderRadius: 25, width: 34, height: 34, backgroundColor: 'rgba(0,0,0, 0.5)', alignItems: 'center', justifyContent: 'center'}}>
                                    <Icon name="chevron-left" style={{top: isAndroid?0:1, color: priColor, fontSize: mdIconSize}}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        }
    }

    renderTitle() {
        if(!this.state.paused && this.state.isReady && this.state.control) {
            return (
                <View style={{position: 'absolute', left: 0, right: 0, justifyContent: 'center', flexDirection: 'row', top: 8}}>
                    <Text style={[Styles.text, {color: Theme.bakColor}]}>
                        {this.props.navigation.state.params.title}
                    </Text>
                </View>
            )
        } else {
            return (
                <View />
            )
        }
    }

    render() {
        const flexCompleted = this.getCurrentTimePercentage()
        //const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100

        return (
            <View style={this.state.fullScreen? styles.fullScreenContainer : styles.container}>
                <StatusBar
                    barStyle={'light-content'}
                    backgroundColor={priFontColor}
                    translucent={false}
                    hidden={this.state.fullScreen? true:false}
                    animated={false}
                />
                <TouchableWithoutFeedback
                    style={this.state.fullScreen? styles.fullScreen : styles.videoScreen}
                    onPress={this.operControl.bind(this)}
                    >
                    <View>
                        <Video
                            ref={(ref: Video) => { this.video = ref }}
                            source={{uri: this.props.video}}
                            style={this.state.fullScreen? styles.fullScreen : styles.videoScreen}
                            rate={this.state.rate}
                            paused={this.state.paused}
                            volume={this.state.volume}
                            muted={this.state.muted}
                            resizeMode={this.state.resizeMode}
                            onLoad={this.onLoad}
                            onProgress={this.onProgress}
                            onEnd={this.onEnd}
                            onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                            onAudioFocusChanged={this.onAudioFocusChanged}
                            repeat={false}
                        />
                        <Video
                            ref={(ref: Video) => { this.music = ref }}
                            source={{uri: this.props.music}}
                            style={styles.hidden}
                            rate={this.state.mrate}
                            paused={this.state.mpaused}
                            volume={this.state.volume}
                            muted={this.state.mmuted}
                            resizeMode={this.state.resizeMode}
                            onLoad={this.onMusicLoad}
                            onProgress={this.onMusicProgress}
                            onEnd={this.onEnd}
                            onAudioBecomingNoisy={this.onMusicAudioBecomingNoisy}
                            onAudioFocusChanged={this.onMusicAudioFocusChanged}
                            repeat={false}
                        />
                    </View>
                </TouchableWithoutFeedback>
                
                { this.state.isReady && this.state.isOnPlay && this.state.control && (
                    <View style={{position: 'absolute', left: 0, right: 0, height: videoControlHeight, alignItems: 'center', justifyContent: 'center', backgroundColor: priFontColor, flexDirection: 'row', bottom: 0}}>
                        <View style={{flex: this.state.fullScreen? 0.15:.25, flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity onPress={this.onPause.bind(this)}>
                                <Icon name={this.state.paused? 'play' : 'pause'} style={{top: isAndroid?0:1, color: priColor, fontSize: mdIconSize, paddingLeft: 4, paddingRight: 4}}/>
                            </TouchableOpacity>
                            <Text style={{color: priColor}}>{this.getCurrentTime()}</Text>
                        </View>
                        <View style={{flex: this.state.fullScreen? 0.7:.5, flexDirection: 'row'}}>
                            <Slider
                                style={{flex: 1, position: 'relative', top: 1}} 
                                value={this.state.onSlide? this.state.currentSlideValue: flexCompleted}
                                onValueChange={this.operSlide.bind(this)}
                                onSlidingStart={this.onSlide.bind(this)}
                                trackStyle={{height: 3, backgroundColor: priColor_300}}
                                thumbStyle={{width: 16, height: 16, backgroundColor: supFontColor_001}}
                                />
                        </View>
                        <View style={{flex:this.state.fullScreen? 0.15:.25, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                            <Text style={{color: priColor}}>{this.getTotalTime()}</Text>
                            <TouchableOpacity onPress={this.onFullScreen.bind(this)}>
                                <Icon name={this.state.fullScreen? 'fullscreen-exit':'fullscreen'} style={{top: isAndroid?0:1, color: priColor, fontSize: mdIconSize, paddingLeft: 4, paddingRight: 4}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                
                { this.renderPlayControl() }

                { this.renderTitle() }
            </View>
        )
    }
}

class CommentList extends Component {
    static propTypes = {
        name: PropTypes.string,
        avatar: PropTypes.string,
        time: PropTypes.string,
        plays: PropTypes.number,
        thumbsup: PropTypes.number,
        num: PropTypes.number,
        page: PropTypes.number
    }

    constructor(props) {
        super(props)
    
        this.state = {
            page: props.page
        }
    }

    thumbsUp() {
        this.thumbsup_animation.play()
    }

    _keyExtractor = (item, index) => item.id

    _onPressItem = (item) => {
        //this.props.navigation.navigate('DubVideo', {title: item.title})
    }

    _header() {
        return (
            <View>
                <Row style={{width: width, height: Theme.commentHeadHeight, paddingLeft: 18, borderBottomWidth: 0.3, borderBottomColor: Theme.bakColor_50}}>
                    <Left>
                        <View style={{flexDirection: 'row'}}>
                            <Thumbnail source={{uri: this.props.avatar}} style={{marginRight: 16}} />
                            <View style={{position: 'absolute', width: 18, height: 18, left: 42, top: 42, zIndex: 1}}>
                                <Image source={require('../../assets/images/ic_medal1.png')} style={{width: 18, height: 18}} />
                            </View>
                            <View style={{paddingTop: 3}}>
                                <Row style={{alignItems: 'center'}}>
                                    <Text style={[Styles.text, {color: dotFontColor_001}]}>
                                        {this.props.name}
                                    </Text>
                                    <View>
                                        <Image source={require('../../assets/images/home_icon_vip_big.png')} style={{width: 40, height: 18}} />
                                    </View>
                                </Row>
                                <Row style={{paddingTop: 8}}>
                                    <Text style={[Styles.text, {marginRight: 4, fontSize: xsFontSize, color: priColor_300}]}>
                                        {this.props.time}
                                    </Text>
                                    <Text style={[Styles.text, {fontSize: xsFontSize, color: priColor_300}]}>
                                        {this.props.plays}播放
                                    </Text>
                                </Row>
                            </View>
                        </View>
                    </Left>
                    <Right>
                        <View style={{alignItems: 'flex-end'}}>
                            <TouchableWithoutFeedback
                                onPress={this.thumbsUp.bind(this)}
                                >
                                <Animation
                                    ref={thumbsup_animation => {this.thumbsup_animation = thumbsup_animation}}
                                    style={{width: 76, height: 76}}
                                    source={Thumbsup}
                                />
                            </TouchableWithoutFeedback>
                            <View style={{width: 76, justifyContent: 'center', flexDirection: 'row', top: -16}}>
                                <Text style={[Styles.text, {color: supFontColor_001, fontSize: smFontSize, color: priColor_300}]}>{this.props.thumbsup}</Text>
                            </View>
                        </View>
                    </Right>
                </Row>
                <Row>
                    <View style={{width: width, height: 10, backgroundColor: Theme.bakColor_50}} />
                </Row>
                <Row>
                    <Text style={[Styles.text, {fontSize: Theme.mdFontSize * 0.9, color: Color(priColor_300).darken(0.7), paddingLeft: 16, paddingTop: 8}]}>热门评论</Text>
                </Row>
            </View>
        )
    }
    // <Icon name={'thumb-up'} style={[Styles.icon, {fontSize: mdIconSize * 1.2, color: priColor_300}]} />

    _sleep = (time) => new Promise(resolve => setTimeout(() => resolve(), time))

    _onFetch = async (page = 1, startFetch, abortFetch) => {
        try {
            let pageLimit = this.props.num
            let skip = (page - 1) * pageLimit

            //Generate dummy data
            let rowData = MockTopicVideoCommentList({num: this.props.num})

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
            <CommentItem
                index={item.id}
                id={item.key}
                onPressItem={this._onPressItem.bind(this, item)}
                avatar={item.avatar}
                name={item.name}
                thumbsup={item.thumbsup}
                comment={item.comment}
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
            <UltimateListView
                {...this.props}
                ref={(ref) => this.refs = ref}
                onFetch={this._onFetch}
                keyExtractor={this._keyExtractor}
                item={this._renderItem}
                numColumns={1}
                header={this._header.bind(this)}
                paginationFetchingView={this._renderPaginationFetchingView}
                refreshableTitlePull={'下拉刷新: '}
                refreshableTitleRefreshing={'加载中...'}
                dateTitle={'最近更新于: '}
                refreshableTitleRelease={'释放刷新'}
                allLoadedText={'没有更多数据'}
                waitingSpinnerText={'加载中...'}
            />
        )
    }
}

class CommentItem extends Component {
    static propTypes = {
        
    }

    render() {
        return (
            <View style={{marginBottom: 8, borderBottomWidth: 0.3, borderBottomColor: Theme.bakColor_50}}>
                <Row style={{width: width, height: Theme.commentHeadHeight * 0.9, paddingLeft: 14, paddingRight: 20}}>
                    <Left>
                        <View style={{flexDirection: 'row'}}>
                            <Thumbnail source={{uri: this.props.avatar}} style={{marginRight: 12, width: 34, height: 34}} />
                            <View style={{paddingTop: 3}}>
                                <Row style={{alignItems: 'center'}}>
                                    <Text style={[Styles.text, {color: Color(priColor_300).darken(0.5), fontSize: smFontSize * 0.9}]}>
                                        {this.props.name}
                                    </Text>
                                </Row>
                                <Row>
                                    <Text style={[Styles.text, {marginRight: 4, fontSize: xsFontSize, color: priColor_300}]}>
                                        08-15 22:13
                                    </Text>
                                </Row>
                            </View>
                        </View>
                    </Left>
                    <Right>
                        <View style={{alignItems: 'flex-end'}}>
                            <Icon name={'thumb-up-outline'} style={[Styles.icon, {fontSize: mdIconSize, color: priColor_300}]} />
                            <Text style={[Styles.text, {color: supFontColor_001, fontSize: xsFontSize, color: priColor_300}]}>{this.props.thumbsup}</Text>
                        </View>
                    </Right>
                </Row>
                <Row>
                    <Text style={[Styles.text, {color: Color(priColor_300).darken(0.7), paddingLeft: 60, paddingRight: 8}]}>
                        {this.props.comment}
                    </Text>
                </Row>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    hidden: {
        width: 0,
        height: 0
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: priFontColor,
        height: videoHeight,
        width: width
    },
    fullScreenContainer: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: priFontColor,
        width: height, 
        height: width,
        top:0, 
        left: 0,
        zIndex: 9
    },
    videoScreen: {
        width: width,
        height: videoHeight
    },
    fullScreen: {
        width: height,
        height: width
    },
    controls: {
        backgroundColor: priFontColor,
        flexDirection: 'row',
        borderRadius: 0,
        alignItems: 'center',
        position: 'absolute',
        height: 60,
        bottom: 0,
        left: 0,
        right: 0,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 6,
        backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
        height: 6,
        backgroundColor: '#2C2C2C',
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
        paddingBottom: 10,
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    volumeControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: 'white',
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    }
})