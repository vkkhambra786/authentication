const mongoose=require("mongoose");
const bcrypt=require("bcryptjs")
 const userSchema=new mongoose.Schema({
     name:{type:String,required:true},
     email:{type:String,required:true,unique:true},
     password:{type:String,required:true}
 },{
     versionKey:false,
     timestamps:true
 })
 userSchema.pre("save",function(next){
     if(!this.isModified("password")) return next()

    
         this.password = bcrypt.hashSync(this.password, 8);
         return next()
 });

 userSchema.methods.checkPassword=function(password){
         const match=bcrypt.compareSync(password, this.password);
         return match

 }
 module.exports=mongoose.model("users",userSchema)