// export { default as getLocalStore} from './src/getLocalStore';
// export { default as setLocalStore } from './src/setLocalStore';
// export { default as getCookieStore } from './src/getCookieStore';
// export { default as setCookieStore } from './src/setCookieStore';
// export { default as NextPersistWrapper } from './src/NextPersistWrapper'

// module.exports = require('./src/next-persist-cookieStore')
// module.exports = require('./src/next-persist-localStore')
// module.exports = require('./src/NextPersistWrapper')

const getLocalStore = require('./src/getLocalStore');
const setLocalStore = require('./src/setLocalStore');
const getCookieStore = require('./src/getCookieStore');
const setCookieStore = require('./src/setCookieStore');

module.exports = { getLocalStore, setLocalStore, getCookieStore, setCookieStore };
