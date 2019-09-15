import React, { Component } from 'react'
import moment from 'moment'
import { Card, Button, Table, Tag, Modal, Typography, message } from 'antd'
import { getArticles, deleteArticleById } from '../../requests'
import XLSX from 'xlsx'

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
      limited: 10,
      deleteArticleTitle: '',
      isShowArticleModal: false,
      deleteAtricleConfirmLoading: false,
      deleteArticleID: null
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
      render: (record) => {
        return (
          <ButtonGroup>
            <Button size='small' type="primary">编辑</Button>
            <Button size='small' type="danger" onClick={this.showDeleteArticleModal.bind(this, record)}>删除</Button>
          </ButtonGroup>
        )
      }
    })
    return columns
  }

  showDeleteArticleModal = (record) => {
    // 使用函数的方式调用，定制化没有那么强

    // Modal.confirm({
    //   content: <Typography>确定要删除<span style={{color: '#f00'}}>{record.title}</span>吗？</Typography>,
    //   title: '此操作不可逆，请谨慎！！！',
    //   okText: '快点，别墨迹！！！',
    //   cancelText: '考虑一下',
    //   onOk() {
    //     deleteArticle(record.id)
    //       .then(resp => {
    //         console.log(resp)
    //       })
    //   }
    // })
    this.setState({
      isShowArticleModal: true,
      deleteArticleTitle: record.title,
      deleteArticleID: record.id
    })
  }

  deleteArticle = () => {
    this.setState({
      deleteAtricleConfirmLoading: true
    })
    deleteArticleById(this.state.deleteArticleID)
      .then(resp => {
        message.success(resp.msg)
        // 这里的需求是删除完成之后调到第一页
        this.setState({
          offset: 0
        }, () => {
          this.getDate()
        })
       
      })
      .finally(() => {
        this.setState({
          deleteAtricleConfirmLoading: false,
          isShowArticleModal: false
        })
      })
  }

  hideDeleteModal = () => {
    this.setState({
      isShowArticleModal: false,
      deleteArticleTitle: '',
      deleteAtricleConfirmLoading: false
    })
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

  toExcel = () => {
    // 在实际项目中，实际上这个功能是前端发送一个ajax请求到后台，然后后端返回一个文件下载的地址
    const data = [Object.keys(this.state.dataSource[0])]

    for (let i = 0; i < this.state.dataSource.length; i++) {
      // data.push(Object.values(this.state.dataSource[i]))
      data.push([
        this.state.dataSource[i].id,
        this.state.dataSource[i].title,
        this.state.dataSource[i].author,
        this.state.dataSource[i].amount,
        moment(this.state.dataSource[i].createAt).format('YYYY年MM月DD日 hh:mm:ss')
      ])
    }
    /* convert state to workbook */
		const ws = XLSX.utils.aoa_to_sheet(data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		/* generate XLSX file and send to client */
    XLSX.writeFile(wb, `articles-${this.state.offset / this.state.limited + 1}-${moment().format
      ('YYYYMMDDHHmmss')}.xlsx`)
  }

  componentDidMount() {
      this.getDate()
  }
    render() {
        return (
            <Card 
                title="文章列表" 
                bordered={false}
                extra={ <Button onClick={this.toExcel}>导出excel</Button> }
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
               <Modal
                  title= '此操作不可逆，请谨慎！！！'
                  visible={this.state.isShowArticleModal}
                  onCancel={this.hideDeleteModal}
                  maskClosable={false}
                  confirmLoading={this.state.deleteAtricleConfirmLoading}
                  onOk={this.deleteArticle}
               >
                 <Typography>
                   确定要删除
                   <span style={{color: '#f00'}}>{this.state.deleteArticleTitle}</span>
                   吗？
                 </Typography>
               </Modal>
            </Card>
        )
    }
}
