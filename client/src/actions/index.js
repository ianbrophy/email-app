import axios from "axios"
import { FETCH_USER } from "./types"

////default
// export const fetchUser = async () => {
//   const response = await axios.get("/api/current_user")
//   console.log(response)
//   dispatch({
//     type: "FETCH_USER",
//     payload: response,
//   })
// }

//v1
// export const fetchUser = () => {
//   return function (dispatch) {
//     axios.get("/api/current_user").then((res) => {
//       dispatch({
//         type: FETCH_USER,
//         payload: res,
//       })
//     })
//   }
// }

//v2
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user")
  dispatch({
    type: FETCH_USER,
    payload: res.data,
  })
}

export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post("/api/stripe", token)

  //we can use the same fetch user as above because authReducer will pick it up and update the user model
  dispatch({
    type: FETCH_USER,
    payload: res.data,
  })
}
