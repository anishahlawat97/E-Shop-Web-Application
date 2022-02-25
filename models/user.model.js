const { type } = require("express/lib/response");

module.exports = (mongoose) => {
    const User = mongoose.model(
        "user", mongoose.Schema({            
            role: { 
                type: Boolean, 
                default: false 
            },
            firstName: { 
                type: String, 
                required: true 
            },
            lastName: { 
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
            contactNumber: {
                type: String,
                required: true
            }
        }, { timestamps: true })
    );
    return User;
};