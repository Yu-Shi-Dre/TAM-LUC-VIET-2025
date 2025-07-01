const mongoose = require('mongoose');
module.exports = mongoose.model('Job', new mongoose.Schema({ title: String, location: String, type: String, salaryType: String, description: String }));