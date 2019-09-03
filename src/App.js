import React, { Component } from 'react'

import {
    Button
} from 'antd'

const testHOC = (WrappedComponent) => {
    return class HOCComponent extends Component {
        render() {
            return (
                <>
                    <WrappedComponent />
                    <div>这是高阶组件里的信息</div>
                </>
            )
        }
    }
}

@testHOC
class App extends Component {
    render() {
        return (
            <div>
                App
                <Button type="primary">ANTD</Button>
            </div>
        )
    }
}

export default App
