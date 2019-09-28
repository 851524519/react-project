import React, { Component } from 'react'

import { Card, Upload, Spin } from 'antd'

export default class Profile extends Component {
    state = {
        isUploading: false,
        avatarUrl: ''
    }
    handleUploadAvatar = (arg) => {
        console.log(arg)
        this.setState({
            isUploading: true
        })
    }
    render() {
        return (
            <Card
                title="个人设置"
                bordered={false}
            >
                <Upload
                    style={{
                        border: '1px solid #dedede',
                        width: 80,
                        height: 80,
                        display: 'block'
                    }}
                    showUploadList={false}
                    customRequest={this.handleUploadAvatar}
                >
                    <Spin
                       spinning={this.state.isUploading} 
                    >
                        {
                            this.state.avatarUrl ? <img src={this.state.avatarUrl} /> : <span>点击上传</span>
                        }
                    </Spin>
                </Upload>
            </Card>
        )
    }
}
