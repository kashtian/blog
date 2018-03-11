const should = require('should');
const { userApi } = require('../api/user'); 

describe('userApi model test', () => {
  it('create method', done => {
    userApi.create({
      body: {
        name: 'kash2',
        password: '123456',
        email: 'kash@test.mail'
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

  it.skip('find method', done => {
    userApi.find().then(result => {
      console.log('find: ', result)
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

  it.skip('remove method', done => {
    userApi.remove().then(result => {
      console.log('remove: ', result)
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

  it.skip('update method', done => {
    userApi.update().then(result => {
      console.log('update: ', result)
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
