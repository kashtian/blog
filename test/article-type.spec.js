const should = require('should');
const request = require('supertest');
const { articleTypeApi } = require('../api/article-type'); 

describe('articleType test', () => {
  let server;

  before(() => {
    process.env.PORT = 3006;
    const app = require('../server');
    server = request(app);
  })

  it.skip('add method', done => {
    articleTypeApi.add({
      body: {
        name: '前端'
      }
    }).then(res => {
      console.log('add result: ', res)
      should.ok(true);
      return done();
    }).catch(err => {
      console.log('error: ', err.message)
      should.ok(false)
      return done(err)
    })
  })

  it.skip('getTypes method', done => {
    articleTypeApi.getTypes()
    .then(res => {
      console.log('get types result: ', res)
      should.ok(true);
      return done();
    }).catch(err => {
      console.log('error: ', err.message)
      should.ok(false)
      return done(err)
    })
  })

  it.skip('updateById method', done => {
    articleTypeApi.updateById({
      body: {
        id: '5aa7ac1780b61a1d3b8cb7459',
        name: '大前端'
      }
    }).then(res => {
      console.log('update result: ',  res)
      should.ok(true);
      return done();
    }).catch(err => {
      console.log('error: ', err.message)
      should.ok(false)
      return done(err)
    })
  })

  it.skip('deleteById method', done => {
    articleTypeApi.deleteById({
      body: {
        id: '5aa7a9ea9cf2d51c824435aa'
      }
    }).then(res => {
      console.log('delete result: ',  res)
      should.ok(true);
      return done();
    }).catch(err => {
      console.log('error: ', err.message)
      should.ok(false)
      return done(err)
    })
  })

  it('POST /api/articletype/getall', done => {
    server.post('/api/articletype/getall')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        console.log('getall result: ', res.body);
        done()
      })
  })

})
