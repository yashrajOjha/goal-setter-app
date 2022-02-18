// functions running during request response cycle
const errorHandler = (err,req,res,next)=>{
    const statusCode = (res.statusCode)? res.statusCode:500;
    res.status(statusCode)
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV === 'production' ?null: err.stack //if the code is in production then show null else show the line number
    })
}

module.exports = {
    errorHandler,
}