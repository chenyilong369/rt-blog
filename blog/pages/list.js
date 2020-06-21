import React,{useState,useEffect} from 'react'
import Head from 'next/head'
import {List , Col, Row, Breadcrumb} from 'antd'
import {CalendarOutlined, FolderOutlined, FireTwoTone} from '@ant-design/icons'
import Header from "../components/Header"
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import axios from 'axios'
import servicePath from '../config/apiURL'
import Link from 'next/link'
import marked from  'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

const MyList = (list) => {
    const renderer = new marked.Renderer()
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        highlight: function (code) {
            return hljs.highlightAuto(code).value
        }
    })
    const [ mylist, setMylist ] = useState(list.data)
    useEffect(()=>{
        setMylist(list.data)
    })
    return(
        <>
            <Head>
                <title>List</title>
            </Head>
            <Header/>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                    <div>
                        <div>
                            <Breadcrumb>
                                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                <Breadcrumb.Item>视频教程</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <List
                            header={<div>最新博客</div>}
                            itemLayout="vertical"
                            dataSource={mylist}
                            renderItem={item => (
                                <List.Item>
                                    <div className="list-title">
                                        <Link href={{pathname:'/detailed', query:{id: item.id}}}>
                                            <a>{item.title}</a>
                                        </Link>
                                    </div>
                                    <div className="list-icon">
                                        <span><CalendarOutlined />{item.addTime}</span>
                                        <span><FolderOutlined />{item.typeName}</span>
                                        <span><FireTwoTone/>{item.view_count}人</span>
                                    </div>
                                    <div className="list-content"
                                        dangerouslySetInnerHTML={{__html: marked("" + item.introduce)}}></div>
                                </List.Item>
                            )}
                        />
                    </div>
                </Col>

                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author/>
                    <Advert/>
                </Col>
            </Row>
            <Footer/>
        </>
    )
}

MyList.getInitialProps = async (context)=> {
    let id = context.query.id
    const promise = new Promise((resolve)=>{
        axios(servicePath.getListById + id).then(
            (res)=>{
                //console.log('------>', res.data)
                resolve(res.data)
            }
        )
    })

    return await promise
}

export default MyList