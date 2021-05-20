import React from "react"
import StripeCheckout from "react-stripe-checkout"
import { connect } from "react-redux"
import * as actions from "../actions"

class Payments extends React.Component {
  render() {
    return (
      <>
        <StripeCheckout
          name="Email-App"
          description="$5 for 5 email credits"
          //amount in cents (USD) to charge
          amount={500}
          //expects a callback func that is called after recieveing an auth token from the stripe api
          token={(token) => {
            console.log(token)
            this.props.handleToken(token)
          }}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <button className="ui button primary">Add Credits</button>
        </StripeCheckout>
      </>
    )
  }
}
export default connect(null, actions)(Payments)
