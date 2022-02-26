module.exports = (mongoose) => {
    const User = mongoose.model(
        "user", mongoose.Schema({            
            role: { 
                type: String,                 
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
                // match: [/\S+@\S+\.\S+/, 'is invalid'],
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