import React, { Component, createRef } from 'react'

import {
    Card,
    Button,
    Form,
    DatePicker, 
    Input
} from 'antd'

import { getArticleById } from '../../requests'

import E from 'wangeditor'

import './editor.less'

import moment from 'moment'

const formItemLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 16
    }
}

@Form.create()
class Edit extends Component {
    constructor () {
        super() 
        this.editorRef = createRef()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values)
              console.log(values.createAt.valueOf())
            }
          })
    }

    initEditor = () => {
        this.editor = new E(this.editorRef.current)
        this.editor.customConfig.onchange = (html) => {
            // html 即变化之后的内容
           this.props.form.setFieldsValue({
               content: html
           })
        }
        this.editor.create()
    }
    
    componentDidMount() {
        this.initEditor()
        getArticleById(this.props.match.params.id)
            .then(resp => {
                const { id, ...data } = resp
                data.createAt = moment(data.createAt)
                this.props.form.setFieldsValue(data)
                this.editor.txt.html(data.content)
            })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Card 
                 title='文章编辑' 
                 bordered={false}
                 extra={ <Button>取消</Button> }
                >
                    <Form
                     onSubmit={this.handleSubmit}
                     {...formItemLayout}
                    >
                        <Form.Item
                            label="标题"
                        >
                            {getFieldDecorator('title', {
                                rules: [
                                        { 
                                            required: true, 
                                            message: '标题是必填的'
                                        }
                                    ],
                            })(
                                <Input
                                placeholder="标题"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item
                            label="作者"
                        >
                            {getFieldDecorator('author', {
                                rules: [
                                        { 
                                            required: true, 
                                            message: '作者是必填的'
                                        }
                                    ],
                            })(
                                <Input
                                placeholder="admin"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item
                            label="阅读量"
                        >
                            {getFieldDecorator('amount', {
                                rules: [
                                        { 
                                            required: true, 
                                            message: '阅读量是必填的'
                                        }
                                    ],
                            })(
                                <Input
                                placeholder="0"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item
                            label="创建时间"
                        >
                            {getFieldDecorator('createAt', {
                                rules: [
                                        { 
                                            required: true, 
                                            message: '时间是必填的'
                                        }
                                    ],
                            })(
                                <DatePicker showTime placeholder="选择时间" />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="内容"
                        >
                            {getFieldDecorator('content', {
                                rules: [
                                        { 
                                            required: true, 
                                            message: '内容是必填的'
                                        }
                                    ],
                            })(
                                <div className="fq-editor" ref={this.editorRef} />
                            )}
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 4 }}>
                            <Button type="primary" htmlType="submit">
                                保存修改
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default  Edit