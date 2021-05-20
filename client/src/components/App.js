import React, { useEffect } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { connect } from "react-redux"
import * as actions from "../actions"

import Header from "./Header"
import Landing from "./Landing"
import Dashboard from "./Dashboard"
import SurveyNew from "./SurveyNew"

const App = (props) => {
  useEffect(() => {
    props.fetchUser()
  }, [])
  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />
        <Route path="/" exact component={Landing}></Route>
        <Route path="/surveys" exact component={Dashboard}></Route>
        <Route path="/surveys/new" exact component={SurveyNew}></Route>
      </BrowserRouter>
    </div>
  )
}

export default connect(null, actions)(App)
