const app = require('../../src/app');

describe('\'comments\' service', () => {
  it('registered the service', () => {
    const service = app.service('comments');
    expect(service).toBeTruthy();
  });
});
