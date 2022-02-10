const { type } = require("express/lib/response");

module.exports = (mongoose) => {
    const User = mongoose.model(
        "user", mongoose.Schema({            
            isAdmin: { 
                type: Boolean, 
                default: false 
            },
            name: { 
                type: String, 
                required: true 
            },
            email: { 
                type: String, 
                required: true,
                unique: true,
                lowercase: true,
                match: [/\S+@\S+\.\S+/, 'is invalid'],
            },
            password: { 
                type: String, 
                required: true 
            },
        }, { timestamps: true })
    );
    return User;
};