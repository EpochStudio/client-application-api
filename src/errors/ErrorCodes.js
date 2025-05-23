const keys = [
  'OK',
  'BadRequest',
  'Unauthorized',
  'PaymentRequired',
  'Forbidden',
  'NotFound',
  'MethodNotAllowed',
  'NotAcceptable',
  'ProxyAuthenticationRequired',
  'RequestTimeout',
  'Conflict',
  'Gone',
  'LengthRequired',
  'PreconditionFailed',
  'PayloadTooLarge',
  'URITooLong',
  'UnsupportedMediaType',
  'RangeNotSatisfiable',
  'ExpectationFailed',
  'Teapot',
  'MisdirectRequest',
  'UnprocessableContent',
  'Locked',
  'FailedDependency',
  'TooEarly',
  'UpgradeRequired',
  'PreconditionRequired',
  'TooManyRequest',
  'RequestHeaderFieldsTooLarge',
  'UnavailableForLegalReasons',
  'InternalServerError',
  'NotImplemented',
  'BadGateway',
  'ServiceUnavailable',
  'GatewayTimeout',
  'HTTPVersionNotSupported',
  'VariantAlsoNegotiates',
  'InsufficientStorage',
  'LoopDetected',
  'NotExtended',
  'NetworkAuthenticationRequired'
]

const codes = [
  200,
  401,
  402,
  403,
  404,
  405,
  406,
  407,
  408,
  409,
  410,
  411,
  412,
  413,
  414,
  415,
  416,
  417,
  418,
  421,
  422,
  423,
  424,
  425,
  426,
  428,
  429,
  431,
  451,
  500,
  501,
  502,
  503,
  504,
  505,
  506,
  507,
  508,
  508,
  510,
  511
]

const StatusCode = Object.fromEntries(keys.map((key,index) => [key, codes[index]]))

module.exports = {
  StatusCode,
  _keys: keys,
  _codes: codes
};