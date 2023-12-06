import { Api } from "./Api"
export const token_key = 'E_COMMERCE_TOKEN'

export const setToken = token => {
  window.localStorage.setItem(token_key, token)
}

export const getToken = () => {
  let token = window.localStorage.getItem(token_key)
  if (!!token) return token
  return false
}

export const isLogin = () => {
  if (!!getToken()) {
    return true
  }
  return false
}

export const logout = () => {
  window.localStorage.clear()
}

export const dailyCheckIn = () => {
  const date = new Date();
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // month is zero-based
  let dd = date.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formatted = dd + '/' + mm + '/' + yyyy;
  const lastVisit = localStorage.getItem('date');
  if(formatted != lastVisit) {
    localStorage.setItem('date', formatted)
    Api.postRequest('/api/viewlog/addView')
  }
}
