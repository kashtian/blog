const should = require('should');
const user = require('../api/user'); 

describe('user model test', () => {
  it.skip('create method', done => {
    user.create({
      body: {
        name: 'kash2',
        password: '123456'
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
    user.find().then(result => {
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
    user.remove().then(result => {
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
    user.update().then(result => {
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
