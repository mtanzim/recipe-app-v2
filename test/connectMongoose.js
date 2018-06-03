
const mongoose = require('mongoose');
module.exports =  function () {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGO_URI_LOC, {
    useMongoClient: true
  }).then(
    () => {
      // util.log(`Connected to Mongo on ${mongoUri}`)
    },
    (err) => {
      util.log(err);
    }
  );
};
