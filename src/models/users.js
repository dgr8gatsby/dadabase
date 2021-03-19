const mongoose = require ('mongoose');

const UserSchema = new mongoose.Schema ({
  user_id: {type: String, required: true},
  auth_source: {type: String, required: false},
});

// Export the model
module.exports = new mongoose.model ('User', UserSchema);
