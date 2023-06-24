import mongoose from "mongoose";
import {Schema} from "mongoose";

const token = new Schema({
    sessionToken : {
        type : String,
        required : true
    }
});

export default mongoose.model("Tokens", token);