import {createStore, bindActionCreators, applyMiddleware, compose, combineReducers} from 'redux'
import * as app from './modules/app'

//extend store abilities
const primeMiddleware = (store) => (next) => (action) => {
    action && next(action)
}

const middleware = [ primeMiddleware ]

//extend middlewares
const extendedCreateStore = compose(
    applyMiddleware(...middleware)
)(createStore)

//multi reducer
const reducer = combineReducers({
    app: app.reducer
})

export const store = extendedCreateStore(reducer);
    
export const actions = {
    app: bindActionCreators(
        app.actions,
        store.dispatch
    )
}



