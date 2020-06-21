import React,{useEffect, useState} from 'react'
import '../static/style/components/Header.css'
import {Row, Col, Menu} from "antd"
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import {HomeFilled,PictureOutlined, CameraOutlined} from '@ant-design/icons'
import servicePath from '../config/apiURL'
const Header = () => {
    const [navArray, setNavArray] = useState([])
    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await axios(servicePath.getTypeInfo).then(
                (r)=>{
                    return r.data.data
                }
            )
            setNavArray(res)
        }
        fetchData()
    },[])

    const handleClick = (e)=>{
        if(e.key == 0){
            Router.push('/index')
        }else{
            Router.push('/list?id=' + e.key)
        }
    }

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">小龙圈</span>
                    <span className="header-txt">爱前端，更爱生活</span>
                </Col>
    
                <Col className="menu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        {/* 这里之后会写到数据库中 */}
                        <Menu.Item key="0">
                            <HomeFilled/>
                            首页
                        </Menu.Item>
                        <Menu.Item key="1">
                            <CameraOutlined />
                            视频
                        </Menu.Item>
                        <Menu.Item key="2">
                            <PictureOutlined/>
                            生活
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header