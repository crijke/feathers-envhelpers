const feathers = require('@feathersjs/feathers');
const { expect } = require('chai');
const environment = require('../lib');

describe('feathers-envhelpers', () => {
  const app = feathers().configure(environment());

  describe('isProduction', () => {
    it('returns true in production', () => {
      process.env.NODE_ENV = 'production';
      expect(app.isProduction()).to.equal(true);
    });
    it('returns false in development', () => {
      process.env.NODE_ENV = 'development';
      expect(app.isProduction()).to.equal(false);
    });
    it('returns false in unknown env', () => {
      process.env.NODE_ENV = 'staging';
      expect(app.isProduction()).to.equal(false);
    });
    it('returns false in empty env', () => {
      delete process.env.NODE_ENV;
      expect(app.isProduction()).to.equal(false);
    });
  });

  describe('isDevelopment', () => {
    it('returns true in development', () => {
      process.env.NODE_ENV = 'development';
      expect(app.isDevelopment()).to.equal(true);
    });
    it('returns false in production', () => {
      process.env.NODE_ENV = 'production';
      expect(app.isDevelopment()).to.equal(false);
    });
    it('returns false in unknown env', () => {
      process.env.NODE_ENV = 'staging';
      expect(app.isDevelopment()).to.equal(false);
    });
    it('returns true in empty env', () => {
      delete process.env.NODE_ENV;
      expect(app.isDevelopment()).to.equal(true);
    });
  });

  describe('isEnv', () => {
    it('returns true for current env', () => {
      process.env.NODE_ENV = 'staging';
      expect(app.isEnv('staging')).to.equal(true);
    });
    it('returns false other env', () => {
      process.env.NODE_ENV = 'staging';
      expect(app.isEnv('integrationtest')).to.equal(false);
    });
    it('returns false for empty env', () => {
      delete process.env.NODE_ENV;
      expect(app.isEnv('staging')).to.equal(false);
    });
  });

  describe('env validation', () => {
    it('crashes if env is uppercase', () => {
      process.env.NODE_ENV = 'PRODUCTION';
      expect(() => feathers().configure(environment())).to.throw("invalid NODE_ENV value 'PRODUCTION', " +
        'environment name must be lowercase.');
    });
    it('crashed if env if mixed case', () => {
      process.env.NODE_ENV = 'Staging';
      expect(() => feathers().configure(environment())).to.throw("invalid NODE_ENV value 'Staging', " +
        'environment name must be lowercase.');
    });
  });

  afterEach(() => {
    delete process.env.NODE_ENV;
  });
});
