/* eslint-disable prettier/prettier */
import cookie from 'cookie'
import Cookie from 'js-cookie'

const nextPersistCookie = {};

nextPersistCookie.setCookie = (nextPersistConfig, state) => {
  const { key, allowList } = nextPersistConfig;

  if (!allowList) {
    Cookie.set(key, state);
  } else {
    const allowedState = allowList.reduce((acc, cur) => {
      acc[cur] = state[cur];
      return acc;
    }, {});
    Cookie.set(key, allowedState);
  }

};

nextPersistCookie.getCookie = (req) => {
  if (req) {
    return cookie.parse(req ? req.ctx.req.headers.cookie || "" : global.cookie);  
  } 
  return cookie.parse(document.cookie);
};

module.exports = nextPersistCookie;
