const db = require('../../index.js');

exports.grabUser = (user, cb) => {
  db.User.findById({_id: user}).
  populate('tools').
  populate('projects').
  exec((err, result) => {
    if (err) { cb(err, null); } else { cb(null, result); }
  })
};
