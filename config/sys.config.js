 const port = process.env.PORT || '3011';

 const mongoConfig = {
   url: 'mongodb://localhost:27017/blog'
 }

 module.exports = {
     port,
     mongoConfig
 }