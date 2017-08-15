import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Container, Text, Content, Grid, Col, Row } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons'
import PropTypes from 'prop-types'
import UltimateListView from "react-native-ultimate-listview"

import LoadingSpinner from '../../components/LoadingSpinner'
import TopicVideoItem from './TopicVideoItem'
import Theme from '../../constants/Theme'
const width = Theme.deviceWidth, height = Theme.deviceHeight

export default class TopicScreen extends Component {
    render() {
        return (
            <Container>
                <Text>This is TopicScreen</Text>
            </Container>
        )
    }
}

class TopicVideoList extends Component {
    static propTypes = {
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

    _sleep = (time) => new Promise(resolve => setTimeout(() => resolve(), time))

    _onFetch = async (page = 1, startFetch, abortFetch) => {
        try {
            let pageLimit = this.props.num
            let skip = (page - 1) * pageLimit

            //Generate dummy data
            let rowData = MockTopicVideoList({num: this.props.num})

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
            <TopicVideoItem
                index={item.id}
                id={item.key}
                avatar={item.avatar}
                name={item.name}
                title={item.title}
                hits={item.hits}
                thumbsup={item.thumbsup}
                comments={item.comments}
                video={item.video}
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
                    numColumns={1}
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