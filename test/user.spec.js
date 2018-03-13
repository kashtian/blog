const should = require('should');
const request = require('supertest');

describe('userApi model test', () => {
  let server;

  before(() => {
    process.env.PORT = 3006;
    const app = require('../server');
    server = request(app);
  })

  it('POST /user/add', done => {
    server.post('/api/user/add')
      .set('Accept', 'application/json')
      .expect(200)
      .send({
        name: 'kash3',
        password: 'test3',
        email: 'kash3@test.mail'
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        console.log('add user result: ', res.body);
        done()
      })
  })

  it.skip('POST /user/login', done => {
    server.post('/api/user/login')
      .set('Accept', 'application/json')
      .expect(200)
      .send({
        name: 'kash',
        password: 'test'
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        console.log('login result: ', res.body);
        done()
      })
  })

})
