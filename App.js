import React from 'react'
import Root from './src/controls/Root'
import { store } from './src/redux/configureStore'

export default class App extends React.Component {
    render() {
        return (
            <Root store={store} />
        )
    }
}
