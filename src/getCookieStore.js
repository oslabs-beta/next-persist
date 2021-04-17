const Cookie = require('js-cookie');
const cookie = require('cookie');

function getCookieStore (...args) {
  // if application is running client-side, parse and return cookie from browser
  if (typeof args[0] === 'string') {
    const cookieName = args[0];
    const state = args[1];
    const stateFromCookie = Cookie.get(cookieName);
    return stateFromCookie ? JSON.parse(stateFromCookie) : state;
  } // if application is running server-side, parse and return cooking from request body
  else {
    const req = args[0].ctx.req;
    return cookie.parse(req.headers.cookie || '');
  }
};

module.exports = getCookieStore;