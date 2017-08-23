import DubScreen from '../views/DubScreen'
import { connect } from 'react-redux'
import { actions } from '../redux/configureStore'

const mapStateToProps = (state) => {
    return {
        home_scroll_down: state.app.home_scroll_down
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        home_scroll_on: (...args) => dispatch(actions.app.home_scroll_on(...args))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DubScreen)