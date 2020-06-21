import React, {useState} from 'react'
import 'antd/dist/antd.css'
import { Button, Card, Input, Spin, message } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import '../static/css/login.css'
import axios from 'axios'
import servicePath from '../config/apiURL'


function Login(props){ 
  const [userName, setUserName] = useState('') 
  const [passWord, setPassWord] = useState('') 
  const [isLoading, setInLoading] = useState(false)
  const checkLogin = () => {
    setInLoading(true)
    if(!userName){
      message.error('用户名不能为空')
      setTimeout(()=>{
        setInLoading(false)
      },500)
      return false;
    }else if(!passWord){
      message.error('密码不能为空')
      setTimeout(()=>{
        setInLoading(false)
      },500)
      return false;
    }
    let dataProps = {
      'userName': userName,
      'passWord': passWord
    }

    axios({
      method: 'post',
      url: servicePath.checkLogin,
      data: dataProps,
      withCredentials: true
    }).then(
      res => {
        setInLoading(false)
        if(res.data.data=='登录成功'){
          localStorage.setItem('openId',res.data.openId)
          props.history.push('/index')
        }else{
          message.error('用户名密码错误')
        }
      }
    )
  }

  return(
    <div className="login-div">
      <Spin tip="Loading···" spinning={isLoading}>
        <Card title="JSChen blog System" bordered={true} style={{width: 400}}>
          <Input 
            id="username" 
            size="large" 
            placeholder="Enter Your UserName" 
            prefix={<UserOutlined style={{color: 'rgba(0,0,0,0.25'}} />} 
            onChange={(e)=>{setUserName(e.target.value)}}
          />
          <Input.Password 
            id="username" 
            size="large" 
            placeholder="Enter Your PassWord" 
            prefix={<KeyOutlined style={{color: 'rgba(0,0,0,0.25'}} />} 
            onChange={(e)=>{setPassWord(e.target.value)}}
            style={{marginTop: '20px'}}
          />
          <Button 
            type="primary"
            size="large"
            block
            onClick={checkLogin}
            style={{marginTop: '20px'}}
          >
            Login In
          </Button>
        </Card>
      </Spin>
    </div>
  )
}

export default Login