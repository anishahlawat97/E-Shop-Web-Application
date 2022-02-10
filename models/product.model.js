module.exports = (mongoose) => {
    const Product = mongoose.model(
        "product", mongoose.Schema({
            name: { 
                type: String, 
                required: true, 
            },
            category: { 
                type: String, 
                required: true, 
            },
            manufacturer: { 
                type: String, 
                required: true,
            },
            availableItems: { 
                type: Number, 
                required: true, 
            },
            price: { 
                type: mongoose.Types.Decimal128, 
                required: true, 
            },
            imageURL: { 
                type: String, 
                default: "", 
            },
            description: { 
                type: String, 
            }
        }, { timestamps: true })
    );
    return Product;
};