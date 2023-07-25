import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type: String,
        required:true
    },
    author:{
        type:String,
    },
    likes:{
        type:Number
    },
    status:{
        type: String,
        default:"Inactive"
    },
    slug:{
        type:String,
        required:true
    },
    dateCreated:{
        type:Date,
        default: Date.now()
    }
});

const userPostModel = mongoose.model("Post",postSchema)
export default userPostModel;