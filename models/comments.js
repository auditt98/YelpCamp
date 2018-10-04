var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    author : {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        profileImage: String
    },
    text : String,
    createdAt:{
        type: Date,
        default: Date.now
    }
});

var Comments = mongoose.model("Comments", commentSchema);
module.exports= Comments;