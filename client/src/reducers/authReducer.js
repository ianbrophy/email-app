import { FETCH_USER } from "../actions/types"

export default function (state = {}, action) {
  console.log(action)
  switch (action.type) {
    case FETCH_USER:
      //this line means that the return will be 'null' the user model or false
      return action.payload || false
    //no change needed
    default:
      return state
  }
}
