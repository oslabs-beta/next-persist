import { TextDecoder as UtilTextDecoder, TextEncoder as UtilTextEncoder } from 'util';

global.TextDecoder = UtilTextDecoder as unknown as typeof globalThis.TextDecoder;
global.TextEncoder = UtilTextEncoder as unknown as typeof globalThis.TextEncoder;
