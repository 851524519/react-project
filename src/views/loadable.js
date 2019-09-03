// 这个文件是 react-loadable的原理

import React, { Component } from 'react'

const Loadable = ({
    loader,
    loading: Loading
}) => {
    return class LoadableComponent extends Component {
        state = {
            LoadedComponent: null
        }

        componentDidMount() {
            loader()
                .then(resp => {
                    this.setState({
                        LoadedComponent: resp.default
                    })
                })
        }
        render() {
            const {
                LoadedComponent
            } = this.state
            return (
                LoadedComponent
                ?
                <LoadedComponent />
                :
                 <Loading />
               
            )
        }
    }
}

export default Loadable