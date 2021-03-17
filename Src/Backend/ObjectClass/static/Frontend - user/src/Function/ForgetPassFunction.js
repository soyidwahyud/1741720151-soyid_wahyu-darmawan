import axios from "axios";


export const forgetPass = forget => {
  return axios
    .post('/user/forget_pass', {
      email_user: forget.email_user,
    })
    .then(response => {
      // localStorage.setItem('admintoken', response.data)
      localStorage.setItem('email', JSON.stringify(response.data))
      return response.data
      localStorage.getItem('email')
    })
    .catch(err =>{
      console.log(err)
      return {error:err};
    })
}
