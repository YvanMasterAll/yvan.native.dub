import React, { Component } from 'react'
import { StatusBar, BackHandler, TouchableOpacity, StyleSheet, Image, View, Easing, Animated, TouchableWithoutFeedback } from 'react-native'
import { Left, Right, Thumbnail, Text, Button, Grid, Row, Col, Container } from 'native-base'
import * as Animatable from 'react-native-animatable'
import Animation from 'lottie-react-native'
import { mdl } from 'react-native-material-kit'
import moment from 'moment'
import Slider from "react-native-slider"
import Orientation from 'react-native-orientation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Color from 'color'

import Styles from '../../constants/Styles'
import {checked_done} from '../../constants/Animations'
import Theme from '../../constants/Theme'
const width = Theme.deviceWidth, height = Theme.deviceHeight
const { isAndroid, priColor, homeNavHeight, bakColor, supColor_001, priColor_300, videoHeight, homeNavIconSize, videoControlHeight, mdIconSize, priFontColor, supFontColor_001, smIconSize, smFontSize } = Theme

export default class TopicVideoFullScreen extends Component {
    render() {
        return (
            <Container>
                <VideoControl {...this.props} />
            </Container>
        )
    }
}

import Video from 'react-native-video'
class VideoControl extends Component {
    render() {
        return (
            <VideoPlayer video={this.props.navigation.state.params.video} currentTime={this.props.navigation.state.params.currentTime} {...this.props} />
        )
    }
}

class VideoPlayer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain', //'cover' & 'stretch'
            duration: 0.0,
            currentTime: props.currentTime,
            paused: false,
            dropDown: 1,
            isReady: false,
            waitTimes: 0,
            upWaitTimes: 5,
            control: true,
            controlTimes: 0,
            upControlTimes: 20,
            onSlide: false,
            currentSlideValue: 0.0,
            exit: false
        }
    }

    video: Video

    componentDidMount() {
        let o = this
        BackHandler.addEventListener('topicvideo_back_from_fullscreen',() => {
            o.setState({
                paused: true,
                rate: 0
            })
            o.setState({exit: true})
            o.props.topicvideo_play_on({play_id: o.props.video, seek: true, seek_time: o.state.currentTime, fullScreen: false})
            o.onOrientationNormal()
            BackHandler.addEventListener('home_navigation_back', () => {
                BackHandler.exitApp()
            })
            o.props.navigation.goBack()
            return true
        })
        o.onOrientationLeft()
    }

    onBackHandle() {
        this.setState({
            paused: true,
            rate: 0
        })
        this.onExit(this)
    }

    onExit(o) {
        o.setState({exit: true})
        o.props.topicvideo_play_on({play_id: o.props.video, seek: true, seek_time: o.state.currentTime, fullScreen: false})
        o.onOrientationNormal()
    }

    onOrientationNormal() {
        Orientation.lockToPortrait()
    }

    onOrientationLeft() {
        Orientation.lockToLandscapeLeft()
    }

    onLoad = (data) => {
        this.video.seek(this.props.currentTime)
        this.setState({ duration: data.duration, isReady: true})
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

        this.setState({
            currentTime: data.currentTime,
            waitTimes: waitTimes,
            control: control,
            controlTimes: controlTimes
        })
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
    }

    onSlide() {
        this.setState({
            onSlide: true
        })
    }

    goBack() {
        this.setState({
            paused: true,
            rate: 0
        })
        this.onExit(this)
        BackHandler.addEventListener('home_navigation_back', () => {
            BackHandler.exitApp()
        })
        this.props.navigation.goBack()
    }

    onPause = () => {
        this.setState({
            paused: !this.state.paused,
            rate: !this.state.paused? 0 : 1
        })
    }

    onEnd = () => {
        this.setState({ paused: true, currentTime: 0.0, rate: 0 })
        this.video.seek(0)
    }

    onAudioBecomingNoisy = () => {
        this.setState({ paused: true, rate: 0 })
    }

    onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
        this.setState({ paused: !event.hasAudioFocus })
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
                <View style={{width: width, height: height, position: 'absolute'}}>
                    <View style={{position: 'absolute', width: 50, height: 50, left: (height / 2 - 30), top: width / 2 - 30}}>
                        <mdl.Spinner style={{width: 50, height: 50}} strokeColor={Theme.bakColor_50} />
                    </View>
                    <View style={{position: 'absolute', left: 15, top: 15}}>
                        <TouchableOpacity onPress={this.goBack.bind(this)}>
                            <View style={{borderRadius: 25, width: 30, height: 30, backgroundColor: 'rgba(0,0,0, 0.5)', alignItems: 'center', justifyContent: 'center'}}>
                                <Icon name="chevron-left" style={{top: isAndroid?0:1, color: priColor, fontSize: mdIconSize, backgroundColor: 'transparent'}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            if(this.state.control) {
                return (
                    <View style={{width: width, height: height, position: 'absolute'}}>
                        <View style={{position: 'absolute', width: 50, height: 50, left: (height / 2 - 30), top: width / 2 - 30}}>
                            <TouchableOpacity onPress={this.onPause}>
                                <View style={{borderRadius: 25, width: 50, height: 50, backgroundColor: 'rgba(0,0,0, 0.5)', alignItems: 'center', justifyContent: 'center'}}>
                                    <Image source={this.state.paused? require('../../assets/images/topic-video-control-play.png'):require('../../assets/images/topic-video-control-stop.png')} style={{width: 24, height: 24}} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{position: 'absolute', left: 15, top: 15}}>
                            <TouchableOpacity onPress={this.goBack.bind(this)}>
                                <View style={{borderRadius: 25, width: 34, height: 34, backgroundColor: 'rgba(0,0,0, 0.5)', alignItems: 'center', justifyContent: 'center'}}>
                                    <Icon name="chevron-left" style={{top: isAndroid?0:1, color: priColor, fontSize: mdIconSize, backgroundColor: 'transparent'}}/>
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
                <View style={{position: 'absolute', left: 0, right: 0, justifyContent: 'center', flexDirection: 'row', top: 15}}>
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
        //const flexRemaining = (1 - this.getCurrentTimePercentage())
    
        if(this.state.exit) {
            return (
                <View></View>
            )
        }
        return (
            <View style={[styles.container]}>
                <StatusBar
                    hidden={true}
                    animated={false}
                    />
                <TouchableWithoutFeedback
                    style={styles.fullScreen}
                    onPressIn={this.operControl.bind(this)}
                    >
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
                </TouchableWithoutFeedback>
                
                { this.state.isReady && this.state.control && (
                    <View style={{position: 'absolute', left: 0, right: 0, height: videoControlHeight, alignItems: 'center', justifyContent: 'center', backgroundColor: priFontColor, flexDirection: 'row', bottom: 0}}>
                        <View style={{flex: .15, flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity onPress={this.onPause}>
                                <Icon name={this.state.paused? 'play' : 'pause'} style={{top: isAndroid?0:1, color: priColor, fontSize: mdIconSize, paddingLeft: 4, paddingRight: 4}}/>
                            </TouchableOpacity>
                            <Text style={{color: priColor, backgroundColor: 'transparent', fontSize: Theme.xsFontSize}}>{this.getCurrentTime()}</Text>
                        </View>
                        <View style={{flex: .7, flexDirection: 'row'}}>
                            <Slider
                                style={{flex: 1, position: 'relative', top: 1}}
                                value={this.state.onSlide? this.state.currentSlideValue: flexCompleted}
                                onValueChange={this.operSlide.bind(this)}
                                onSlidingStart={this.onSlide.bind(this)}
                                trackStyle={{height: 3, backgroundColor: Color(priFontColor).darken(.5)}}
                                thumbStyle={{width: 16, height: 16, backgroundColor: priColor}}
                                />
                        </View>
                        <View style={{flex:.15, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                            <Text style={{color: priColor, backgroundColor: 'transparent', fontSize: Theme.xsFontSize}}>{this.getTotalTime()}</Text>
                            <TouchableOpacity onPress={this.goBack.bind(this)}>
                                <Icon name='fullscreen-exit' style={{top: isAndroid?0:1, color: priColor, fontSize: mdIconSize, paddingLeft: 4, paddingRight: 4}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
               
                { this.renderPlayControl() }

                {this.renderTitle()}
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
        flex: 1,
        position: 'absolute',
        backgroundColor: priFontColor,
        width: height,
        height: width,
        left: 0,
        top: 0
    },
    fullScreen: {
        height: '100%',
        width: '100%'
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

class DubbingPlayer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rate: 1,
            volume: 1,
            muted: true,
            mmuted: false,
            resizeMode: 'contain',
            duration: 0.0,
            mduration: 0.0,
            currentTime: 0.0,
            currentMusicTime: 0.0,
            paused: true,
            mpaused: true
        }
    }

    video: Video

    onPause = () => {
        this.setState({
            paused: !this.state.paused,
            mpaused: !this.state.paused
        })
    }

    onLoad = (data) => {
        this.setState({ duration: data.duration })
    }

    onMusicLoad = (data) => {
        this.setState({ mduration: data.duration })
    }

    onProgress = (data) => {
        if((this.state.currentTime - this.state.currentMusicTime) > 0.25) {
            this.setState({
                currentTime: data.currentTime,
                mpaused: false
            })
        } else {
            this.setState({
                currentTime: data.currentTime,
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

    onEnd = () => {
        this.setState({ paused: true })
        this.video.seek(0)
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
        const isSelected = (this.state.volume === volume);

        return (
            <TouchableOpacity onPress={() => { this.setState({ volume }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                {volume * 100}%
                </Text>
            </TouchableOpacity>
        )
    }

    render() {
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.fullScreen}
                    onPress={this.onPause}
                    >
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

                </TouchableOpacity>

                <View style={styles.controls}>
                    <View style={styles.generalControls}>
                        <View style={styles.rateControl}>
                        {this.renderRateControl(0.25)}
                        {this.renderRateControl(0.5)}
                        {this.renderRateControl(1.0)}
                        {this.renderRateControl(1.5)}
                        {this.renderRateControl(2.0)}
                        </View>

                        <View style={styles.volumeControl}>
                        {this.renderVolumeControl(0.5)}
                        {this.renderVolumeControl(1)}
                        {this.renderVolumeControl(1.5)}
                        </View>

                        <View style={styles.resizeModeControl}>
                        {this.renderResizeModeControl('cover')}
                        {this.renderResizeModeControl('contain')}
                        {this.renderResizeModeControl('stretch')}
                        </View>
                    </View>

                    <View style={styles.trackingControls}>
                        <View style={styles.progress}>
                            <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
                            <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}


