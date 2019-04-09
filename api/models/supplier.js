/*** Module dependencies.*/
var mongoose = require("mongoose");
/*** supplier Schema*/
var priceSchedule = new mongoose.Schema({
	startQty: {type: String},
	endQty: {type: String},
	price: {type: String}
});
var DBschema = new mongoose.Schema({
	companyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Company"
	},
	itemId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Item"
	},
	supplierName: {type: String},
	demoPrice: {type: Number},
	listPrice: {type: String}, // list price is the price that regular consumers would pay if they bought this from an online store
	dealerPrice: {type: String}, //dealer is price my company pays for the products
	priceDate:{type:String},
	leadTimeDays: {type: Number},
	supplySource: {type: String},
	priceSchedule: [priceSchedule],
	deleted: {
		type: Boolean,
		default: false
	}
},
{
	timestamps: true
});
module.exports = mongoose.model("Supplier", DBschema);