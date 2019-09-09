import Cookies from 'js-cookie'

const tokenKey = process.env.VUE_APP_TOKEN.KEY;

export const getToken = (() => {
    return Cookies.get(tokenKey);
});

export const setToken = ((token, rememberMe) => {
    if (rememberMe) {
        return Cookies.set(tokenKey, token, {expires: parseInt(process.env.VUE_APP_TOKEN.EXPIRES)})
    } else {
        return Cookies.set(tokenKey, token)
    }
});

export const removeToken = (() => {
    return Cookies.remove(tokenKey)
});
