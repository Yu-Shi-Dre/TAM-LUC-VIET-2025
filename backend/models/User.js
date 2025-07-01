const mongoose = require('mongoose');
module.exports = mongoose.model('User', new mongoose.Schema({ code: String, firebaseUID: String, role: String }));