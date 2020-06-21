import {Avatar, Divider} from "antd"
import React from "react"
import {QqOutlined, WechatOutlined, GithubOutlined} from '@ant-design/icons'
import '../static/style/components/Author.css'
const Author = () => {
    return(
        <div className="author-div comm-box">
            <div>
                <Avatar
                    size="100"
                    src="https://b-ssl.duitang.com/uploads/item/201604/03/20160403111103_fEwyZ.thumb.224_0.jpeg"
                />
            </div>
            <div className="author-introduction">
                爱好编程，目前是ACM校队成员
                <Divider>社交账号</Divider>
                <Avatar size={28} className="account"><QqOutlined/></Avatar>
                <Avatar size={28} className="account"><WechatOutlined /></Avatar>
                <Avatar size={28} className="account"><GithubOutlined /></Avatar>
            </div>
        </div>
    )
}

export default Author