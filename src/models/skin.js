import mongoose from "mongoose";

const skinSchema = new mongoose.Schema({
	_id: Number,
	name: String,
	price: Number
});

const Skin = mongoose.model('Skin', skinSchema);

export { Skin }