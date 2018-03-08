const should = require('should');
const user = require('../api/user'); 

describe('user model test', () => {
  it.skip('create method', done => {
    user.create({
      body: {
        name: null,
        password: 'test'
      }
    }).then(() => {
      should.ok(true)
      return done();
    }).catch(err => {
      for (let key in err.errors) {
        console.log(key + ': ', err.errors[key].message)
      }
      should.ok(false)
      return done(err)
    })
  })

  it('find method', done => {
    user.find().then(result => {
      console.log('find length: ', result.length)
      should.ok(true)
      return done();
    }).catch(err => {
      for (let key in err.errors) {
        console.log(key + ': ', err.errors[key].message)
      }
      should.ok(false)
      return done(err)
    })
  })
})