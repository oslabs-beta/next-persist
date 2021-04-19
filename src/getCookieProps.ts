/**
 * ************************************
 *
 * @module next-persist
 * @author most-js
 * @description module that contains function to get state from cookies
 *              this version is run server side
 *
 * ************************************
 */
import cookie from 'cookie';

import { NextPageContext } from 'next';

export default function getCookieStore(
  ctx: NextPageContext
): { [key: string]: string } | string {
  // checking if running on build or request
  if (ctx.req === undefined) return '';
  else return cookie.parse(ctx.req.headers.cookie || '');
}
