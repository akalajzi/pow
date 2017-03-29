export function setToken(value) {
  document.cookie = 'powtoken='+value;
}

export function getToken() {
  const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)powtoken\s*=\s*([^;]*).*$)|^.*$/, "$1");
  return cookieValue;
}

export function setCookie(key, value, expires=null) {
  let cookie = key + '=' + value;
  if (expires) {
    cookie += '; expires=' + expires;
  }
  document.cookie = cookie;
}
