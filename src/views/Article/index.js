import React, { Component } from 'react'
import moment from 'moment'
import { Card, Button, Table, Tag } from 'antd'
import { getArticles } from '../../requests'

const ButtonGroup = Button.Group

const titleDisplayMap = {
  id: 'id',
  title: '标题',
  author: '作者',
  createAt: '创建时间',
  amount: '阅读量'
}

export default class ArticleList extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: [],
      columns: [],
      total: 0,
      isLoading: false,
      offset: 0,
      limited: 10
    }
  }

  createColumns = (columnKeys) => {
    const columns =  columnKeys.map(item => {
      if(item === 'amount') {
        return {
          title: titleDisplayMap[item],
          key: item,
          render: (record) => {
            const { amount } = record
            return <Tag color={ amount > 230 ? 'red' : 'green' }>{record.amount}</Tag>
          }
        }
      }
      if(item === 'createAt') {
        return {
          title: titleDisplayMap[item],
          key: item,
          render: (record) => {
            const { createAt } = record
            return moment(createAt).format('YYYY年MM月DD日 hh:mm:ss')
          }
        }
      }
      return {
        title: titleDisplayMap[item],
        dataIndex: item,
        key: item,
      }
    })
    columns.push({
      title: '操作',
      key: 'action',
      render: () => {
        return (
          <ButtonGroup>
            <Button size='small' type="primary">编辑</Button>
            <Button size='small' type="danger">删除</Button>
          </ButtonGroup>
        )
      }
    })
    return columns
  }

  getDate = () => {
    this.setState({
      isLoading: true
    })
    getArticles(this.state.offset, this.state.limited)
        .then(resp => {
          const columnKeys = Object.keys(resp.list[0])
          const columns = this.createColumns(columnKeys)
            this.setState({
              total: resp.total,
              columns,
              dataSource: resp.list,
            })
        })
        .catch(err => {
          // 错误处理
        })
        .finally(() => {
          this.setState({
            isLoading: false
          })
        })
  }

  onPageChange = (page, pageSize) => {
    this.setState({
      offset: pageSize * (page - 1),
      limited: pageSize
    }, () => {
      this.getDate()
    })
  }

  ononShowSizeChange = (current, size) => {
    this.setState({
      offset: 0,
      limited: size
    }, () => {
      this.getDate()
    })
  }

  componentDidMount() {
      this.getDate()
  }
    render() {
        return (
            <Card 
                title="文章列表" 
                bordered={false}
                extra={ <Button>导出excel</Button> }
            >
               <Table 
                rowKey={record => record.id}
                loading={this.state.isLoading}
                dataSource={this.state.dataSource} 
                columns={this.state.columns}
                pagination={{
                  current: this.state.offset / this.state.limited + 1,
                  total: this.state.total,
                  hideOnSinglePage: true,
                  onChange: this.onPageChange,
                  showQuickJumper: true,
                  showSizeChanger: true,
                  onShowSizeChange: this.ononShowSizeChange,
                  pageSizeOptions: ['10', '15', '20', '30']
                }}
               />
            </Card>
        )
    }
}
