/**
 * ************************************
 *
 * @module next-persist
 * @author most-js
 * @description module that contains function to get state from cookies
 *
 * ************************************
 */

import jsCookie from 'js-cookie';
import cookie from 'cookie';

export default function getCookieStore(...args) {
  // if application is running client-side, parse and return cookie from browser
  if (typeof args[0] === 'string') {
    const cookieName = args[0];
    const state = args[1];
    const stateFromCookie = jsCookie.get(cookieName);
    return stateFromCookie ? JSON.parse(stateFromCookie) : state;
  } // if application is running server-side, parse and return cooking from request body
  else {
    const req = args[0].ctx.req;
    return cookie.parse(req.headers.cookie || '');
  }
}
