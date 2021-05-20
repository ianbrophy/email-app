import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import reducers from "./reducers"
import App from "./components/App.js"
import reduxThunk from "redux-thunk"

//start empty store with reducer and middleware
// const store = createStore(() => [], {}, applyMiddleware())

// const store = createStore(reducers, {}, applyMiddleware())
const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
)
if (module.hot) {
  module.hot.accept()
}
console.log("STRIPE KEY", process.env.REACT_APP_STRIPE_KEY)
console.log("STRIPE KEY", process.env.NODE_ENV)
