var mongoose = require('mongoose');

var caregiverSchema = mongoose.Schema({
	_id:{ type: Number, default: 0 },
	first_name: String,
    last_name: String,
    gender: Number,
    email: String,
    phonenumber: String,
    password: String,
    image_path: String,
    home_address: String,
    city: String,
    zip_code: String,
    state: String,
    description: String,
    rating: Number,
    latitude: Number,
    longtitude: Number,
    pet_ids: Array
});

module.exports = mongoose.model('tbl_caregiver', caregiverSchema);