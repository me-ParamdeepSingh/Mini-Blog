import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },
    username: {
        type:String,
        required:true,
    },
    age:{
        type:Number,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    city:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    join: {
        type: Date,
        default: Date.now
    },
    verify_link: {
        type:String,
        default: ""
    },
    is_verify: {
        type: String,
        default: 'false'
    },
    fail_count: {
        type: Number,
        default: 0
    },
    session_time: {
        type: Date,
        default: ""
    }

    

});


// Modal

const userModel = mongoose.model("user",userSchema);

export default userModel;