/**
 * ************************************
 *
 * @module  next-persist
 * @author  most-js
 * @description function to get cookies containing state
 *              on server side render
 *
 * ************************************
 */

const cookie = require('cookie');

function getCookieProps(ctx) {
  // checking if running on server or client
  if (ctx.req === undefined) return '';
  else return cookie.parse(ctx.req.headers.cookie || '');
}

module.exports = getCookieProps;
