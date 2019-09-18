import React, { Component, createRef } from 'react'

import {
    Card,
    Row,
    Col
} from 'antd'

import echarts from 'echarts'

import { getArticleAmount } from '../../requests'

import './dashboard.less'

export default class Dashboard extends Component {
    constructor() {
        super()
        this.articelAmount = createRef()
    }

    initArticleChart = () => {
        this.articleChart = echarts.init(this.articelAmount.current)
        getArticleAmount()
            .then(resp => {
                console.log(resp)
                console.log(Object.values(resp.amount))
                 // 指定图表的配置项和数据
                var option = {
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: resp.amount.map(item => item.month)
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: resp.amount.map(item => item.value),
                        type: 'line',
                        areaStyle: {}
                    }]
                };

                // 使用刚指定的配置项和数据显示图表。
                this.articleChart.setOption(option);
                    })
    }

    componentDidMount() {
        this.initArticleChart()
    }

    render() {
        return (
            <>
                <Card
                    title="概览"
                    bordered={false}
                >
                    <Row gutter={16}>
                        <Col className="gutter-row" span={6}>
                            <div className="fq-gutter-box" style={{backgroundColor: '#29B6F6'}}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="fq-gutter-box" style={{backgroundColor: '#AB47BC'}}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="fq-gutter-box" style={{backgroundColor: '#FF7043'}}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="fq-gutter-box" style={{backgroundColor: '#43A047'}}>col-6</div>
                        </Col>
                    </Row>
                </Card>
                <Card
                    title="最近浏览量"
                    bordered={false}
                >
                    <div ref={this.articelAmount} style={{height: '400px'}} />
                </Card>
            </>
        )
    }
}
