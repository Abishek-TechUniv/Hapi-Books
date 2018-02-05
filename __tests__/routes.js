const Routes = require('../routes');
const server = require('../src/server.js');

describe('Testing Hapi routes', () => {
  it('should have correct no. of routes', () => {
    expect(Routes.length).toBe(server.table('localhost')[0].table.length);
  });

  it('should return a json object on request', (done) => {
    const request = {
      method: 'GET',
      url: '/books',
    };

    server.inject(request, (response) => {
      expect(typeof response.result).toBe('object');
      done();
    });
  });

  it('Should return 200 status code for sucessful GET request', (done) => {
    const request = {
      method: 'GET',
      url: '/books',
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  it('Should return an array with objects having rating property', (done) => {
    const request = {
      method: 'GET',
      url: '/books',
    };
    server.inject(request, (response) => {
      expect(typeof response.result.data[0].rating).toBe('number');
      done();
    });
  });
});
