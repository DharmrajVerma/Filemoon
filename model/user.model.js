const {Schema,model,} = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema = new Schema({
    fullname: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    mobile: {
        type : String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        trim:true,
        required: true,
        match:[
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            { message :'Invalid email'}
        ]
    },password: {
        type: String,
        required: true,
        trim: true
    }
},{timestamps : true})

userSchema.pre('save', async function() {
    const count = await model("User").countDocuments({
        mobile: this.mobile
    });

    if (count > 0) {
        throw new Error("Mobile number already exists");
    }
});

userSchema.pre('save',async function(){
    const count = await model("User").countDocuments({
        email : this.email
    })
    if(count > 0){
        throw new Error("email already exist")
    }

} )

userSchema.pre('save', async function(){
    const encryptedPassword = await bcrypt.hash(this.password.toString(),12)
    this.password =encryptedPassword
})
const UserModel = model("User", userSchema)
module.exports = UserModel
