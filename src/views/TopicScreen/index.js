// import React, { Component } from 'react';
// import { Image, StyleSheet, View, TouchableOpacity } from 'react-native'
// import { Container, Text, Content, Grid, Col, Row } from 'native-base'
// import Icon from 'react-native-vector-icons/MaterialIcons'
// import PropTypes from 'prop-types'
// import UltimateListView from "react-native-ultimate-listview"

// import { MockTopicVideoList } from '../FakerMocks'
// import LoadingSpinner from '../../components/LoadingSpinner'
// import TopicVideoItem from './TopicVideoItem'
// import Theme from '../../constants/Theme'
// const width = Theme.deviceWidth, height = Theme.deviceHeight
// const { homeNavHeight, rootNavHeight } = Theme

// // import VideoMock from '../VideoMock'
// // import AudioMock from '../AudioMock'
// export default class TopicScreen extends Component {
//     render() {
//         return (
//             <Container>
//                 <TopicVideoList {...this.props} num={3} page={10} />
//             </Container>
//         )
//     }
// }
// //<View style={{position: 'absolute', zIndex: 9, width: 1000, height: 1000, left: 0, top: -100, bottom: -100, backgroundColor: '#333'}} />

// class TopicVideoList extends Component {
//     static propTypes = {
//         num: PropTypes.number,
//         page: PropTypes.number
//     }

//     constructor(props) {
//         super(props)

//         this.state = {
//             page: props.page
//         }
//     }

//     _keyExtractor = (item, index) => item.id

//     _sleep = (time) => new Promise(resolve => setTimeout(() => resolve(), time))

//     _onFetch = async (page = 1, startFetch, abortFetch) => {
//         try {
//             let pageLimit = this.props.num
//             let skip = (page - 1) * pageLimit
            
//             //Generate dummy data
//             let rowData = MockTopicVideoList({num: this.props.num})
            
//             //Simulate the end of the list if there is no more data returned from the server
//             if (page === this.state.page) {
//                 rowData = []
//             }

//             //Simulate the network loading in ES7 syntax (async/await)
//             await this._sleep(1000);
//             startFetch(rowData, pageLimit);
//         } catch (err) {
//             abortFetch() //manually stop the refresh or pagination if it encounters network error
//         }
//     }

//     _renderItem = (item, index, separator) => {
//         return (
//             <TopicVideoItem
//                 {...this.props}
//                 index={item.id}
//                 id={item.key}
//                 avatar={item.avatar}
//                 name={item.name}
//                 title={item.title}
//                 hits={item.hits}
//                 thumbsup={item.thumbsup}
//                 comments={item.comments}
//                 video={item.video}
//                 music={item.music}
//             />
//         )
//     }

//     _renderPaginationFetchingView = () => {
//         return (
//             <LoadingSpinner height={height * 0.2} text="loading..."/>
//         )
//     }

//     render() {
//         return (
//             <Row>
//                 <UltimateListView
//                     ref={(ref) => this.refs = ref}
//                     onFetch={this._onFetch}
//                     keyExtractor={this._keyExtractor}
//                     item={this._renderItem}
//                     refreshableMode="advanced"
//                     numColumns={1}
//                     paginationFetchingView={this._renderPaginationFetchingView}
//                     refreshableTitlePull={'下拉刷新: '}
//                     refreshableTitleRefreshing={'加载中...'}
//                     dateTitle={'最近更新于: '}
//                     refreshableTitleRelease={'释放刷新'}
//                     allLoadedText={'没有更多数据'}
//                     waitingSpinnerText={'加载中...'}
//                 />
//             </Row>
//         )
//     }
// }


import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, Image, View, Easing, Animated, TouchableWithoutFeedback } from 'react-native'
import { Container, Text, Content, Grid, Col, Row } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import PropTypes from 'prop-types'
import UltimateListView from "react-native-ultimate-listview"
import Video from 'react-native-video'
import Slider from "react-native-slider"
import { mdl } from 'react-native-material-kit'

import { MockTopicVideoList } from '../FakerMocks'
import LoadingSpinner from '../../components/LoadingSpinner'
import TopicVideoItem from './TopicVideoItem'
import Theme from '../../constants/Theme'
const width = Theme.deviceWidth, height = Theme.deviceHeight
const { priColor, homeNavHeight, rootNavHeight, bakColor, supColor_001, priColor_300, videoHeight, homeNavIconSize, videoControlHeight, mdIconSize, priFontColor, supFontColor_001, smIconSize, smFontSize } = Theme

export default class TopicVideoScreen extends Component {
    render() {
        return (
            <Grid>
                <Row>
                    <VideoControl 
                        video={'http://v4.music.126.net/20170821000334/b4f404e387f36cf19ee019b00d9f9b68/web/cloudmusic/ICAhIDUgMCJgJTEwIWA4JA==/mv/5477119/4db60173f972fdd3d17ab12dfea644db.mp4'}
                        music={'http://m10.music.126.net/20170820184351/dcf2e10828da48840be244f8d9785128/ymusic/a8ed/2621/e9c7/ce01f3e558c66835faa14efcdd866e1b.mp3'} 
                        />
                </Row>
                <Row>
                    <DubVideoList {...this.props} name={'上善若水'} avatar={''} time={'2017-08-15 22:00'} plays={214} num={4} page={10} />
                </Row>
            </Grid>
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
            rate: 0,
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

    onOrientationNormal() {
        Orientation.lockToPortrait()
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
                mpaused: false
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
                mpaused: true
            })
        } else {
            this.setState({
                currentMusicTime: data.currentTime,
                mpaused: false
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

    gotoFullScreen() {
        this.setState({
            paused: true
        })
        this.props.topicvideo_play_on({play_id: this.props.video, seek: false, seek_time: 0.0, fullScreen: false})
        this.props.navigation.navigate("TopicVideoFullScreen", {type: 'normal', video: this.props.video, currentTime: this.state.currentTime})
    }

    onPause = () => {
        let paused = !this.state.paused
        if(paused) {
            this.setState({
                paused: paused,
                mpaused: paused,
                isOnPlay: false
            })
        } else {
            this.setState({
                paused: paused,
                mpaused: paused,
                isOnPlay: true
            })
        }
        
    }

    onEnd = () => {
        this.setState({ paused: true, mpaused: true, currentTime: 0.0, currentMusicTime: 0.0 })
        this.video.seek(0)
        this.music.seek(0)
    }

    onAudioBecomingNoisy = () => {
        this.setState({ paused: true })
    }

    onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
        this.setState({ paused: !event.hasAudioFocus })
    }

    onMusicAudioBecomingNoisy = () => {
        this.setState({ mpaused: true })
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
                <View style={{width: width, height: videoHeight, position: 'absolute', top: 0}}>
                    <View style={{position: 'absolute', width: 50, height: 50, left: (width / 2 - 30), top: videoHeight / 2 - 30}}>
                        <mdl.Spinner style={{width: 50, height: 50}} />
                    </View>
                    <View style={{position: 'absolute', left: 15, top: 15}}>
                        <TouchableOpacity onPress={()=>alert("go back")}>
                            <View style={{borderRadius: 25, width: 30, height: 30, backgroundColor: 'rgba(0,0,0, 0.5)', alignItems: 'center', justifyContent: 'center'}}>
                                <Icon name="chevron-left" style={{color: priColor, fontSize: mdIconSize}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            if(this.state.control) {
                return (
                    <View style={{width: width, height: videoHeight, position: 'absolute', top: 0}}>
                        <View style={{position: 'absolute', width: 50, height: 50, left: (width / 2 - 30), top: videoHeight / 2 - 30}}>
                            <TouchableOpacity onPress={this.onPause}>
                                <View style={{borderRadius: 25, width: 50, height: 50, backgroundColor: 'rgba(0,0,0, 0.5)', alignItems: 'center', justifyContent: 'center'}}>
                                    <Icon name={this.state.paused? 'play' : 'pause'} style={{color: priColor, fontSize: 38}}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{position: 'absolute', left: 15, top: 15}}>
                            <TouchableOpacity onPress={()=>alert("go back")}>
                                <View style={{borderRadius: 25, width: 34, height: 34, backgroundColor: 'rgba(0,0,0, 0.5)', alignItems: 'center', justifyContent: 'center'}}>
                                    <Icon name="chevron-left" style={{color: priColor, fontSize: mdIconSize}}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        }
    }

    render() {
        const flexCompleted = this.getCurrentTimePercentage()
        //const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100

        return (
            <View style={this.state.fullScreen? styles.fullScreenContainer : styles.container}>
                <TouchableWithoutFeedback
                    style={styles.fullScreen}
                    onPress={this.operControl.bind(this)}
                    >
                    <View>
                        <Video
                            ref={(ref: Video) => { this.video = ref }}
                            source={{uri: this.props.video}}
                            style={styles.fullScreen}
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
                            rate={this.state.rate}
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
                        <View style={{flex: .25, flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity onPress={this.onPause.bind(this)}>
                                <Icon name={this.state.paused? 'play' : 'pause'} style={{color: priColor, fontSize: mdIconSize, paddingLeft: 4, paddingRight: 4}}/>
                            </TouchableOpacity>
                            <Text style={{color: priColor}}>{this.getCurrentTime()}</Text>
                        </View>
                        <View style={{flex: .5, flexDirection: 'row'}}>
                            <Slider
                                style={{flex: 1, position: 'relative', top: 1}} 
                                value={this.state.onSlide? this.state.currentSlideValue: flexCompleted}
                                onValueChange={this.operSlide.bind(this)}
                                onSlidingStart={this.onSlide.bind(this)}
                                trackStyle={{height: 3, backgroundColor: priColor_300}}
                                thumbStyle={{width: 16, height: 16, backgroundColor: supFontColor_001}}
                                />
                        </View>
                        <View style={{flex:.25, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                            <Text style={{color: priColor}}>{this.getTotalTime()}</Text>
                            <TouchableOpacity onPress={this.gotoFullScreen.bind(this)}>
                                <Icon name='fullscreen' style={{color: priColor, fontSize: mdIconSize, paddingLeft: 4, paddingRight: 4}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
               
                { this.renderPlayControl() }
            </View>
        )
    }
}

class CommentList extends Component {
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
                <View style={{paddingLeft: 12, height: 56, alignItems: 'center', flexDirection: 'row', marginTop: 8}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name={this.props.icon} style={{fontSize: mdIconSize * 1.1, color: priColor_300, marginRight: 8, position: 'relative', top: 1}}/>
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
            <LoadingSpinner height={height * 0.2} text="loading..."/>
        )
    }

    render() {
        return (
            <Row>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: priFontColor,
        height: height,
        width: width
    },
    fullScreen: {
        width: width,
        height: videoHeight
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