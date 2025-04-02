const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},

})

UserSchema.pre('save',async function (next){
    if(this.isModified('password')||this.isNew){
        try{
            const saltRound = 10;
            const hashedPassword = await bcrypt.hash(this.password,saltRound)
            this.password = hashedPassword
        }catch(err){
            console.log(err)
        }
    }else{
        next()
    }
})


const User = mongoose.model("User",UserSchema)
module.exports = User