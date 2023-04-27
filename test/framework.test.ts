'use strict';

const assert = require('assert');

const mm = require('egg-mock');

describe('测试typescript', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'example',
      customEgg: true,
    });
    return app.ready();
  });
  after(() => app.close());
  afterEach(mm.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, framework-example_123456')
      .expect(200);
  });

  it('should GET /rend', () => {
    return app.httpRequest()
      .get('/rend')
      .expect(200);
  });

  it('should load config', () => {
    assert(app.config.test.key === 'framework-example_123456');
  });

  it('should load service', async () => {
    const ctx = app.mockContext();
    const data = await ctx.service.test.get(123);
    assert.deepEqual(data, {
      id: 123,
      name: 'framework-example_123456',
    });
  });

  it('should load application extend', () => {
    assert(app.appName === 'YA_DAN');
  });

  it('should load ctx extend', () => {
    const ctx = app.mockContext();
    assert(ctx.tx_guid === 'YA_DAN_tx_guid');
  });
});