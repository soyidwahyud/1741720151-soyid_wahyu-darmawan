export default function AuthAdminHeader() {
  const admintoken = JSON.parse(localStorage.getItem('admintoken'))

  if (admintoken && admintoken.accessToken){
    return {
      Authorization: 'Bearer ' + admintoken.accessToken
    }
  }
  else {
    return {}
  }
}
