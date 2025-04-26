// const Product = require("../models/productModel");
// const asyncHandler = require("express-async-handler");

// //add a product according to vendor's email
// const addProduct = asyncHandler(async (req, res) => {
// 	const {
// 		vendorEmail,
// 		title,
// 		category,
// 		productBrand,
// 		productCode,
// 		description,
// 		picURL,
// 		price,
// 		ingredients,
// 		usage,
// 		warnings,
// 		discountNote,
// 		discountPrice,
// 		quantity,
// 	} = req.body;

// 	if (
// 		!vendorEmail ||
// 		!title ||
// 		!category ||
// 		!productBrand ||
// 		!productCode ||
// 		!description ||
// 		!picURL ||
// 		!price ||
// 		!ingredients ||
// 		!usage ||
// 		!warnings ||
// 		!discountNote ||
// 		!discountPrice ||
// 		!quantity
// 	) {
// 		res.status(400);
// 		throw new Error("Please Fill all the fields");
// 	} else {
// 		const product = new Product({
// 			vendor: req.vendor._id,
// 			vendorEmail,
// 			title,
// 			category,
// 			productBrand,
// 			productCode,
// 			description,
// 			picURL,
// 			price,
// 			ingredients,
// 			usage,
// 			warnings,
// 			discountNote,
// 			discountPrice,
// 			quantity,
// 		});

// 		const addedProduct = await product.save();

// 		res.status(201).json(addedProduct);
// 	}
// });

// //get all of products
// const getProducts = asyncHandler(async (req, res) => {
// 	const products = await Product.find();
// 	res.json(products);
// });

// //get products for each of vendors
// const getProductsForEachVendor = asyncHandler(async (req, res) => {
// 	const products = await Product.find({ vendor: req.vendor._id });
// 	res.json(products);
// });

// //get product according to their id
// const getProductById = asyncHandler(async (req, res) => {
// 	const product = await Product.findById(req.params.id);

// 	if (product) {
// 		res.json(product);
// 	} else {
// 		res.status(404).json({ message: "Product not found" });
// 	}
// });

// //update product details
// const updateProduct = asyncHandler(async (req, res) => {
// 	const {
// 		title,
// 		category,
// 		productBrand,
// 		productCode,
// 		description,
// 		picURL,
// 		price,
// 		ingredients,
// 		usage,
// 		warnings,
// 		discountNote,
// 		discountPrice,
// 		quantity,
// 	} = req.body;

// 	const product = await Product.findById(req.params.id);

// 	if (product) {
// 		product.title = title;
// 		product.category = category;
// 		product.productBrand = productBrand;
// 		product.productCode = productCode;
// 		product.description = description;
// 		product.picURL = picURL;
// 		product.price = price;
// 		product.ingredients = ingredients;
// 		product.usage = usage;
// 		product.warnings = warnings;
// 		product.discountNote = discountNote;
// 		product.discountPrice = discountPrice;
// 		product.quantity = quantity;

// 		const updatedProduct = await product.save();
// 		res.json(updatedProduct);
// 	} else {
// 		res.status(404);
// 		throw new Error("Product not found");
// 	}
// });

// // delete a single product
// const deleteProduct = asyncHandler(async (req, res) => {
// 	const product = await Product.findById(req.params.id);

// 	if (product) {
// 		await product.remove();
// 		res.json({ message: "Product  Removed" });
// 	} else {
// 		res.status(404);
// 		throw new Error("Product  not Found");
// 	}
// });

// module.exports = {
// 	addProduct,
// 	getProducts,
// 	getProductsForEachVendor,
// 	getProductById,
// 	updateProduct,
// 	deleteProduct,
// };


const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// Add a product according to vendor's email
const addProduct = asyncHandler(async (req, res) => {
	const {
		vendorEmail,
		title,
		category,
		productBrand,
		productCode,
		description,
		picURL,
		price,
		ingredients,
		usage,
		warnings,
		discountNote,
		discountPrice,
		quantity,
		// New fields from your UI
		itemName,
		preparationTime,
		availability,
		customizations,
	} = req.body;

	// Maintain backward compatibility while supporting new fields
	const actualTitle = itemName || title;
	const actualVendor = req.vendor._id;

	if (
		!vendorEmail ||
		!actualTitle ||
		!category ||
		!productBrand ||
		!productCode ||
		!description ||
		!picURL ||
		!price ||
		!ingredients ||
		!usage ||
		!warnings ||
		!discountNote ||
		!discountPrice ||
		!quantity
	) {
		res.status(400);
		throw new Error("Please Fill all the required fields");
	} else {
		const product = new Product({
			vendor: actualVendor,
			vendorEmail,
			title: actualTitle,
			category,
			productBrand,
			productCode,
			description,
			picURL,
			price,
			ingredients,
			usage,
			warnings,
			discountNote,
			discountPrice,
			quantity,
			// Add new fields if they exist
			preparationTime: preparationTime || undefined,
			availability: availability !== undefined ? availability : true,
			customizations: customizations || "",
			createdAt: Date.now(),
			updatedAt: Date.now(),
		});

		const addedProduct = await product.save();

		res.status(201).json(addedProduct);
	}
});

// Get all products
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find();
	res.json(products);
});

// Get products for each vendor
const getProductsForEachVendor = asyncHandler(async (req, res) => {
	const products = await Product.find({ vendor: req.vendor._id });
	res.json(products);
});

// Get product according to their id
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404).json({ message: "Product not found" });
	}
});

// Update product details
const updateProduct = asyncHandler(async (req, res) => {
	const {
		title,
		category,
		productBrand,
		productCode,
		description,
		picURL,
		price,
		ingredients,
		usage,
		warnings,
		discountNote,
		discountPrice,
		quantity,
		// New fields from your UI
		itemName,
		preparationTime,
		availability,
		customizations,
	} = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		// Handle both title and itemName for backward compatibility
		product.title = itemName || title || product.title;
		product.category = category || product.category;
		product.productBrand = productBrand || product.productBrand;
		product.productCode = productCode || product.productCode;
		product.description = description || product.description;
		product.picURL = picURL || product.picURL;
		product.price = price !== undefined ? price : product.price;
		product.ingredients = ingredients || product.ingredients;
		product.usage = usage || product.usage;
		product.warnings = warnings || product.warnings;
		product.discountNote = discountNote || product.discountNote;
		product.discountPrice = discountPrice !== undefined ? discountPrice : product.discountPrice;
		product.quantity = quantity !== undefined ? quantity : product.quantity;

		// Update new fields if they exist
		if (preparationTime !== undefined) product.preparationTime = preparationTime;
		if (availability !== undefined) product.availability = availability;
		if (customizations !== undefined) product.customizations = customizations;
		
		// Always update the updatedAt field
		product.updatedAt = Date.now();

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

// Delete a single product
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		// Use remove() for older mongoose versions or deleteOne() for newer versions
		try {
			await product.remove();
		} catch (error) {
			await Product.deleteOne({ _id: req.params.id });
		}
		res.json({ message: "Product Removed" });
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

module.exports = {
	addProduct,
	getProducts,
	getProductsForEachVendor,
	getProductById,
	updateProduct,
	deleteProduct,
};