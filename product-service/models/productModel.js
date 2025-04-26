/**
 * This model is implemented for
 * the Product management
 */
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const productSchema = mongoose.Schema({
	vendor: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Vendor",
		alias: "restaurant"
	},
	vendorEmail: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
		alias: "itemName"
	},
	category: {
		type: String,
		required: true,
	},
	productBrand: {
		type: String,
		required: true,
	},
	productCode: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
	picURL: {
		type: String,
		required: true,
		default: "https://res.cloudinary.com/dfmnpw0yp/image/upload/v1679235307/assets/tsuh9f6v1reihgqxwxrz.ico",
	},
	price: {
		type: Number,
		required: true,
	},
	ingredients: {
		type: String,
		required: true,
	},
	usage: {
		type: String,
		required: true,
	},
	warnings: {
		type: String,
		required: true,
	},
	discountNote: {
		type: String,
		required: true,
	},
	discountPrice: {
		type: Number,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	preparationTime: {
		type: Number, // in minutes
		required: false,
	  },
	  availability: {
		type: Boolean,
		default: true,
	  },
	  customizations: {
		type: String,
		required: false,
	  },
	  createdAt: {
		type: Date,
		default: Date.now,
	  },
	  updatedAt: {
		type: Date,
		default: Date.now,
	  }
}, {
	// Enable the aliases feature
	toJSON: { virtuals: true, aliases: true },
	toObject: { virtuals: true, aliases: true }
  });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;


// /**
//  * This model is implemented for
//  * the Product management
//  */
// const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);

// const productSchema = mongoose.Schema({
// 	vendor: {
// 		type: mongoose.Schema.Types.ObjectId,
// 		required: true,
// 		ref: "Vendor",
// 	},
// 	vendorEmail: {
// 		type: String,
// 		required: true,
// 	},
// 	title: {
// 		type: String,
// 		required: true,
// 	},
// 	category: {
// 		type: String,
// 		required: true,
// 	},
// 	productBrand: {
// 		type: String,
// 		required: true,
// 	},
// 	productCode: {
// 		type: String,
// 		required: true,
// 		unique: true,
// 	},
// 	description: {
// 		type: String,
// 		required: true,
// 	},
// 	picURL: {
// 		type: String,
// 		required: true,
// 		default: "https://res.cloudinary.com/dfmnpw0yp/image/upload/v1679235307/assets/tsuh9f6v1reihgqxwxrz.ico",
// 	},
// 	price: {
// 		type: Number,
// 		required: true,
// 	},
// 	ingredients: {
// 		type: String,
// 		required: true,
// 	},
// 	usage: {
// 		type: String,
// 		required: true,
// 	},
// 	warnings: {
// 		type: String,
// 		required: true,
// 	},
// 	discountNote: {
// 		type: String,
// 		required: true,
// 	},
// 	discountPrice: {
// 		type: Number,
// 		required: true,
// 	},
// 	quantity: {
// 		type: Number,
// 		required: true,
// 	},
// });

// const Product = mongoose.model("Product", productSchema);

// module.exports = Product;
