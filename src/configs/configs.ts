export default {
  jwtSecret: () => process.env.JWT_SECRET || 'secret',
  jwtTtl: () => process.env.JWT_TTL || '60s',
  redisHost: () => process.env.REDIS_HOST || '',
  redisPort: () => parseInt(process.env.REDIS_PORT || ''),
  redisProductTtl: () => process.env.REDIS_PRODUCT_TTL || 3600,
  mongoHost: () => process.env.MONGO_HOST || '',
  productsApiUrl: () => process.env.PRODUCTS_API_URL,
  rootUser: () => process.env.ROOT_USER || '',
  rootPass: () => process.env.ROOT_PASS || '',
  logLevel: () => process.env.LOG_LEVEL || 'debug',
  port: () => process.env.PORT || 3000
};