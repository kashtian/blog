const should = require('should');
const request = require('supertest');

// unit test
describe.skip('article test', () => {
  let articleApi;
  before(() => {
    articleApi = require('../api/article').articleApi
  })  

  it.skip('add method', done => {
    articleApi.add({
      body: {
        author: '测试作者',
        type: '后端',
        title: '测试文章标题',
        content: '测试文章内容'
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

  it.skip('updateById method', done => {
    articleApi.updateById({
      body: {
        id: '5aa88e14bfdd6009538932b5',
        author: '测试作者修改'
      }
    }).then(res => {
      console.log('updateById result: ', res)
      should.ok(true);
      return done();
    }).catch(err => {
      console.log('error: ', err.message)
      should.ok(false)
      return done(err)
    })
  })

  it.skip('deleteById method', done => {
    articleApi.deleteById({
      body: {
        id: '5aa88e14bfdd6009538932b5'
      }
    }).then(res => {
      console.log('deleteById result: ', res)
      should.ok(true);
      return done();
    }).catch(err => {
      console.log('error: ', err.message)
      should.ok(false)
      return done(err)
    })
  })

  it.skip('getArticles method', done => {
    articleApi.getArticles({
      body: {
        conditions: {
          author: '测试作者'
        },
        limit: 1
      }
    }).then(res => {
      console.log('getArticles result: ', res)
      should.ok(true);
      return done();
    }).catch(err => {
      console.log('error: ', err.message)
      should.ok(false)
      return done(err)
    })
  })
})

// route test
describe('aritcle route test', () => {
  let server;

  before(() => {
    process.env.PORT = 3006;
    const app = require('../server');
    server = request(app);
  })

  it('POST /api/article/get', done => {
    server.post('/api/article/get')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        console.log('get result: ', res.body);
        done()
      })
  })
})
