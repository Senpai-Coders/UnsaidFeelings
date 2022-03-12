const mongoose=require('mongoose')

const Schema=mongoose.Schema;
const userSchema=mongoose.Schema({
    to:{type: String,   required : true },
    from:{type: String, default : 'Anonymous'},
    message:{type: String, required:true},
    cat:{type: Date, default:Date.now},
    bg_color:{type: String, default : 'bg-white'},
    txt_color:{type: String, default : 'text-gray-600'}
})
module.exports=mongoose.model('lettermessagecontainer',userSchema)
