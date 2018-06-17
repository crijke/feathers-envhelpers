const DEVELOPMENT_ENV = 'development';
const PRODUCTION_ENV = 'production';

const validateEnv = name => {
  if (name && (name !== name.toLowerCase())) {
    throw new Error(`invalid NODE_ENV value '${name}', environment name must be lowercase.`);
  }
};

const testEnv = (env) => process.env.NODE_ENV ? process.env.NODE_ENV === env : env === DEVELOPMENT_ENV;

module.exports = () => app => {
  validateEnv(process.env.NODE_ENV);

  app.isDevelopment = () => testEnv(DEVELOPMENT_ENV);

  app.isProduction = () => testEnv(PRODUCTION_ENV);

  app.isEnv = env => testEnv(env);

  app.getEnv = () => process.env.NODE_ENV || DEVELOPMENT_ENV;
};
