module.exports = (mongoose) => {
    const Order = mongoose.model(
        "order", mongoose.Schema({
            address: { id: String },
            product: { id: String },
            quantity: Number,
            user: { type: String },
        }, { timestamps: true })
    );
    return Order;
};