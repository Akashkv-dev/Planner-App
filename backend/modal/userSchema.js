const mongoose = require("mongoose")

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength: [4,"Name should be atleast 4 characters long"],
        maxlength: [20, "Name should be atmost 20 characters long"]

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    },
    plan:[
        {
            planName:{
                type:String
            },
            tasks:[
                {
                    task: {
                        type: String
                    },
                    done: {
                        type: Boolean,
                        default: false
                    }
                }
            ],
            deadline:{
                type:Date
            },
            startTime:{
                type:Date,
                default:Date.now
            },
            status:{
                type:String,
                default:'pending'
            },
            completed:{
                type:Number,
                default:0
            }
        }
    ]
})

module.exports= mongoose.model('users',userSchema)