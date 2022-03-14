const mongoose = require('mongoose')

const unsentFeelings = mongoose.Schema({
    to:{type: String,   required : true },
    from:{type: String, default : 'Anonymous'},
    message:{type: String, required:true},
    cat:{type: Date, default:Date.now},
    bg_color:{type: String, default : 'bg-white'},
    txt_color:{type: String, default : 'text-gray-600'},
    views : { type : Number, default : 0 }
})

module.exports=mongoose.model('unsentFeeling', unsentFeelings)