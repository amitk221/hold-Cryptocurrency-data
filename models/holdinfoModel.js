const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema model
const holdDataSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    last: {
        type: String,
        required:true
    },
    buy: {
        type: String,
        required:true
    },
    sell:{
         type : String,
         required:true
    },
    volume:{
        type : String,
        required:true
    },
    base_unit:{
        type : String,
        required:true
    }
});

const HoldData = mongoose.model("HoldData",holdDataSchema);

// export module
module.exports =HoldData;