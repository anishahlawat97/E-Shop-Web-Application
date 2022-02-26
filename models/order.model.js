module.exports = (mongoose) => {
    const Order = mongoose.model(
        "order", mongoose.Schema({
            address: { 
                type: mongoose.Schema.Types.ObjectId,
                required: false,
                ref: "address" 
            },
            product: { 
                type: mongoose.Schema.Types.ObjectId,
                required: false,
                ref: "product"
             },
            quantity: Number,
            user: { 
                type: mongoose.Schema.Types.ObjectId,
                required: false,
                ref: "user"
             },
        }, { timestamps: true })
    );
    return Order;
};