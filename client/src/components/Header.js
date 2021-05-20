import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import fetchUser from "../reducers/authReducer"
import Payments from "./Payments"

class Header extends React.Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return "Working on it..."
      case false:
        return (
          <a className="ui blue button " href="/auth/google">
            Log in with Google
          </a>
        )
      default:
        return (
          <>
            <Link className=" item" to="/surveys">
              Dashboard
            </Link>
            <Link className="item" to="/surveys/new">
              New Survey
            </Link>
            <div>
              <Payments />
            </div>
            <div className="item">Credits: {this.props.auth.credits}</div>
            <div className="item">
              <a className="ui green button " href="/api/logout">
                Logout
              </a>
            </div>
          </>
        )
    }
  }

  checkUser() {
    console.log(this.props.auth)
  }

  render() {
    this.checkUser()

    console.log("props: ", this.props)
    return (
      <div className="ui  secondary   menu " style={{ padding: "5px" }}>
        <Link className="ui red button circular" to={this.props.auth ? "/surveys" : "/"}>
          <h2>Email Survey App</h2>
        </Link>
        <h2 className="ui mobile only grid">Mobile</h2>
        <div className="right menu">
          <div className="item">{this.renderContent()}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  //return{auth:state.auth}
  return { auth }
}

export default connect(mapStateToProps, { fetchUser })(Header)
