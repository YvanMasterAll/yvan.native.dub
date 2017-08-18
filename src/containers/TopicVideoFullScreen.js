import TopicVideoFullScreen from '../views/TopicVideoFullScreen'
import { connect } from 'react-redux'
import { actions } from '../redux/configureStore'

const mapStateToProps = (state) => {
    return {
        topicvideo: state.video.topicvideo
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        topicvideo_play_on: (...args) => dispatch(actions.video.topicvideo_play_on(...args))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopicVideoFullScreen)