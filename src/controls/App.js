import React from 'react'
import { NativeRouter as Router, Route } from 'react-router-native'
import { Text } from 'react-native'

import Navigator from './Navigator'

class App extends React.Component {
    render() {
        return (
             <Router>
                <Navigator />
            </Router>
        )
    }
}

export default App