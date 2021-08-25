const BASE_URL_KEY = 'baseUrl'
const TOKEN_KEY = 'token'
const DATA_USER_KEY = 'data_user'
const LOVE_KEY = 'love'

// BASE URL

export function setBaseUrl(url) {
  let trimmedUrl = url.replace(/\/$/, '')
  localStorage.setItem(BASE_URL_KEY, trimmedUrl)
}

export function getBaseUrl() {
  return localStorage.getItem(BASE_URL_KEY)
}

export function removeBaseUrl() {
  localStorage.removeItem(BASE_URL_KEY)
}

// TOKEN

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}

// Love

export function setLove(item) {
  localStorage.setItem(LOVE_KEY, item)
}

export function getLove() {
  return localStorage.getItem(LOVE_KEY)
}

export function removeLove() {
  localStorage.removeItem(LOVE_KEY)
}


// DATA LOGIN

export function setDataUser(data_user) {
  localStorage.setItem(DATA_USER_KEY, data_user)
}

export function getDataUser() {
  return JSON.parse(localStorage.getItem(DATA_USER_KEY))
}

export function removeDataUser() {
  localStorage.removeItem(DATA_USER_KEY)
}
