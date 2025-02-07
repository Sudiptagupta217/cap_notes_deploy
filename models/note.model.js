const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    title:{type:String, require:true},
    description:{type:String, require:true},
    userId:{type:mongoose.Schema.ObjectId, ref:"user", require:true},
    user:{type:String, require:true}
},{
    versionKey:false
})

const Notemodel = mongoose.model("note",noteSchema)

module.exports = {Notemodel}

