import React, { Component } from 'react'

import {
    Card,
    Button
} from 'antd'

export default class Edit extends Component {
    render() {
        return (
            <div>
                <Card 
                 title='文章编辑' 
                 bordered={false}
                 extra={ <Button>取消</Button> }
                >
                    表单区域
                </Card>
            </div>
        )
    }
}
