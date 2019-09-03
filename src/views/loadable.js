import React, { Component } from 'react'

const Loadable = ({
    loader,
    loading: Loading
}) => {
    return class LoadableComponent extends Component {
        state = {
            LoadedComponent: null
        }
        render() {
            return (
                <div>
                    <Loading />
                </div>
            )
        }
    }
}

export default Loadable