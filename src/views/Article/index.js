import React, { Component } from 'react'
import { Card, Button, Table } from 'antd'
const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
    {
        title: '操作',
        dataIndex: 'actions',
        key: 'actions',
        render: (text, record, index) => {
            console.log(text, record, index)
            return <Button>编辑</Button>
        }
      },
  ];

export default class ArticleList extends Component {
    render() {
        return (
            <Card 
                title="文章列表" 
                bordered={false}
                extra={ <Button>导出excel</Button> }
            >
               <Table 
                dataSource={dataSource} 
                columns={columns}
               />
            </Card>
        )
    }
}
