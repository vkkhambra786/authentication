const app=require("./index")
const connect=require("./config/db")




 app.listen(2337,async(req,res)=>{
     try{
         await connect()
         console.log("listening on port  2337")
     }catch(err){
         console.log(err.message)
     }
 })