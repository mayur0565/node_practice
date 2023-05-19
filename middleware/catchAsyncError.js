module.exports.catchAsyncError= (handleFunction)=>(req,res,next)=>{
   Promise.resolve(handleFunction(req,res,next)).catch(next)
}


