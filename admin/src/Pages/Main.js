import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'
import AdminIndex from './AdminIndedx'

function Main(){
  return(
    <Router>
      <Route path="/index/" component={AdminIndex}></Route>
      <Route path="/" exact component={Login}></Route>
    </Router>
  )
}

export default Main