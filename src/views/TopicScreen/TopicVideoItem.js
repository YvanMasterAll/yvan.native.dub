import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, Image, View, Easing, Animated, TouchableWithoutFeedback } from 'react-native'
import { Left, Right, Thumbnail, Text, Button, Grid, Row, Col } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable'
import Animation from 'lottie-react-native'
import { mdl } from 'react-native-material-kit'
import moment from 'moment'
import Slider from "react-native-slider"

import {checked_done} from '../../constants/Animations'
import Theme from '../../constants/Theme'
const width = Theme.deviceWidth, height = Theme.deviceHeight

export default class TopicVideoItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            paused: true
        }
    }

    render() {
        return (
            <Grid style={s.container}>
                <Row style={{padding: 8}}>
                    <Left style={s.verticalCenter}>
                        <Thumbnail source={{uri: this.props.avatar}} />
                        <Text style={s.mdRight}>{this.props.name}</Text>
                    </Left>
                    <Right>
                        <Button iconLeft bordered>
                            <Icon name='add' />
                            <Text>关注</Text>
                        </Button>
                    </Right>
                </Row>
                <Row>
                    <Col>
                        <VideoControl video={this.props.video} music={this.props.music} {...this.props} />
                    </Col>
                </Row>
                <Row style={{padding: 16}}>
                    <Left style={s.verticalCenter}>
                        <Icon name='play-circle-filled' />
                        <Text style={s.smRight}>{this.props.hits}</Text>
                    </Left>
                    <Right style={s.verticalCenter}>
                        <Icon name='thumb-up' style={s.mdRight} />
                        <Text style={s.smRight}>{this.props.thumbsup}</Text>
                        <Icon name='message' style={s.mdRight} />
                        <Text style={s.smRight}>{this.props.comments}</Text>
                        <Icon name='share' style={s.mdRight} />
                        <Text style={s.smRight}>分享</Text>
                    </Right>
                </Row>
            </Grid>
        )
    }
}

const s = StyleSheet.create({
    container: {
        width: width,
    },
    verticalCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    smRight: {
        marginLeft: 4
    },
    mdRight: {
        marginLeft: 8
    }
})

import Video from 'react-native-video'
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
            muted: false,
            resizeMode: 'contain', //'cover' & 'stretch'
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
            dropDown: 1,
            isReady: false,
            waitTimes: 0,
            upWaitTimes: 5,
            control: true,
            controlTimes: 0,
            upControlTimes: 20,
            onSlide: false,
            currentSlideValue: 0.0
        }
    }

    video: Video

    onLoad = (data) => {
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

    gotoFullScreen() {
        this.setState({
            paused: true
        })
        this.props.navigation.navigate("TopicVideoFullScreen", {type: 'normal', video: this.props.video, currentTime: this.state.currentTime})
    }

    onPause = () => {
        this.setState({
            paused: !this.state.paused
        })
    }

    onEnd = () => {
        this.setState({ paused: true, currentTime: 0.0 })
        this.video.seek(0)
    }

    onAudioBecomingNoisy = () => {
        this.setState({ paused: true })
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
                <View style={{position: 'absolute', width: 30, height: 30, left: (width / 2 - 15), top: 110 - 15}}>
                    <mdl.Spinner />
                </View>
            )
        } else {
            if(this.state.control) {
                return (
                    <View style={{position: 'absolute', width: 50, height: 50, left: (width / 2 - 25), top: 110 - 25}}>
                        <TouchableOpacity onPress={this.onPause}>
                            <Icon name={this.state.paused? 'play-arrow' : 'pause'} style={{color: '#fff', fontSize: 40}}/>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    }

    render() {
        const flexCompleted = this.getCurrentTimePercentage()
        //const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    style={styles.fullScreen}
                    onPress={this.operControl.bind(this)}
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
                    <View style={{position: 'absolute', left: 0, right: 0, height: 34, alignItems: 'center', backgroundColor: '#000', flexDirection: 'row', bottom: 0}}>
                        <View style={{width: 70, flexDirection: 'row'}}>
                            <TouchableOpacity onPress={this.onPause}>
                                <Icon name={this.state.paused? 'play-arrow' : 'pause'} style={{color: '#fff', fontSize: 20}}/>
                            </TouchableOpacity>
                            <Text style={{color: '#fff'}}>{this.getCurrentTime()}</Text>
                        </View>
                        <View style={{width: width - 140}}>
                            <Slider
                                style={{width: width - 140}} 
                                value={this.state.onSlide? this.state.currentSlideValue: flexCompleted}
                                onValueChange={this.operSlide.bind(this)}
                                onSlidingStart={this.onSlide.bind(this)}
                                trackStyle={{}}
                                thumbStyle={{}}
                                />
                        </View>
                        <View style={{width: 70, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Text style={{color: '#fff'}}>{this.getTotalTime()}</Text>
                            <TouchableOpacity onPress={this.gotoFullScreen.bind(this)}>
                                <Icon name='fullscreen' style={{color: '#fff', fontSize: 20}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
               
                { this.renderPlayControl() }
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        height: 220,
        width: width
    },
    fullScreen: {
        height: 220,
        width: width
    },
    controls: {
        backgroundColor: '#000',
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




