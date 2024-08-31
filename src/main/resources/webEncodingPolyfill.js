// import * as webEncoding from 'web-encoding';
import * as textEncoding from 'text-encoding';

// globalThis.TextEncoder = webEncoding.TextEncoder;
// globalThis.TextDecoder = webEncoding.TextDecoder;

globalThis.TextEncoder = textEncoding.TextEncoder;
globalThis.TextDecoder = textEncoding.TextDecoder;
