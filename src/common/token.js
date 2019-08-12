import Cookies from 'js-cookie'

const accessTokenKey = process.env.ACCESS_TOKEN.KEY;

export const getAccessToken  = (() => {
  return Cookies.get(accessTokenKey)
});

export const setAccessToken = ((accessToken, rememberMe) => {
  if(rememberMe) {
    return Cookies.set(accessTokenKey, accessToken, {expires: process.env.ACCESS_TOKEN.EXPIRES})
  } else {
    return Cookies.set(accessTokenKey, accessToken)
  }
});

export const removeAccessToken = (() => {
  return Cookies.remove(accessTokenKey)
});
