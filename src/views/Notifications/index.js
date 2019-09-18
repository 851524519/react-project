import React, { Component } from 'react'

import { Card, Button, List, Avatar, Badge } from 'antd'

const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

export default class Notifications extends Component {
    render() {
        return (
           <Card
            title="通知中心"
            bordered={false}
            extra={ <Button>全部标记为已读</Button> }
           >
               <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                    <List.Item
                        extra={ <Button>标记为已读</Button> }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<Badge dot>{item.title}</Badge>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>
                    )}
                />
           </Card>
        )
    }
}
