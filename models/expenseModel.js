const mongoose=require('mongoose');
const ExpenseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        maxlength:50
    },
    amount:{
        type:Number,
        required:true,
        trim:true,
        maxlength:20
        
    },
    type:{
        type:String,
        default:"expense"
    },
    date:{
        type:Date,
        required:true,
        trim:true,
        maxlength:20    
    },
    category:{
        type:String,
        required:true,
        trim:true,
        maxlength:20
           
    },
    description:{
        type:String,
        required:true,
        maxlength:20,
        trim:true
    },

},{timestamps:true})
module.exports=mongoose.model('Expense',ExpenseSchema)