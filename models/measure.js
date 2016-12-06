var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var measure = new Schema({
	simId: 		{ type: String, required: true},
	timestamp: 		{ type: Date , required: true},
	temperature: { type: Number , required: true}
});

module.exports = mongoose.model('Measure', measure);