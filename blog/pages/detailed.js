import React,{Component} from 'react'
import Head from 'next/head'
import {Breadcrumb, Col, Row, Affix} from 'antd'
import Header from "../components/Header"
import {CalendarOutlined, FolderOutlined, FireTwoTone} from '@ant-design/icons'
import Author from "../components/Author";
import axios from 'axios'
import Footer from "../components/Footer";
import Advert from "../components/Advert";
import '../static/style/pages/detailed.css'
import marked from  'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'
import MarkNav from "markdown-navbar"
import 'markdown-navbar/dist/navbar.css'
import servicePath from '../config/apiURL'
const Detailed = (props) => {
    const tocify = new Tocify()
    const renderer = new marked.Renderer()

    renderer.heading=function(text,level,raw){
        const anchor = tocify.add(text, level)
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
    }

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

    let html = marked(props.article_content)

    return (
        <>
            <Head>
                <title>Detailed</title>
            </Head>
            <Header/>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                    <div>
                        <div className="bread-div">
                            <Breadcrumb>
                                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                <Breadcrumb.Item><a href="/">列表</a></Breadcrumb.Item>
                                <Breadcrumb.Item>XXX</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div>
                            <div className="detailed-title">
                                1111
                            </div>
                            <div className="list-icon center">
                                <span><CalendarOutlined/>2020-05-24</span>
                                <span><FolderOutlined/>教程</span>
                                <span><FireTwoTone/>5555</span>
                            </div>
                            <div className="detailed-content"
                            dangerouslySetInnerHTML={{__html: html}}>

                            </div>
                        </div>
                    </div>
                </Col>

                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author/>
                    <Advert/>
                    <Affix offsetTop={5}>
                        <div className="detailed-nav comm-box">
                            <div className="nav-title">文章目录</div>
                            {tocify && tocify.render()}
                        </div>
                    </Affix>
                </Col>

            </Row>
            <Footer/>
        </>
    )
}

Detailed.getInitialProps = async (context) => {
    console.log(context.query.id)

    let id = context.query.id

    const promise = new Promise((resolve)=>{
        axios(servicePath.getArticleById+id).then(
            (res)=>{
                console.log(res)
                resolve(res.data.data[0])
            }
        )
    })

    return await promise
}
export default Detailed