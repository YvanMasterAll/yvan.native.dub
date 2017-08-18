import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Image
} from 'react-native';
import { Text, Container } from 'native-base'
import Carousel from 'react-native-looped-carousel'

import Theme from '../constants/Theme'

const width = Theme.deviceWidth, height = Theme.deviceHeight

export default class ImageCarousel extends Component {
    constructor(props) {
        super(props)

        this.state = {
            size: { width, height: 180 }
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                <Carousel
                    delay={3000}
                    style={this.state.size}
                    autoplay
                    pageInfo
                    currentPage={0}
                    onAnimateNextPage={(p) => console.log(p)}
                >
                {
                    this.props.images.map((image, index) => 
                        <View style={[{ backgroundColor: '#BADA55' }, this.state.size ]} key={index}><Image source={{uri: image}} style={{width: '100%', height: '100%'}}/></View>
                    )
                }
                </Carousel>
            </View>
        )
    }
}