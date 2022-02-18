const asyncHandler = require('express-async-handler')
/*  handling express async using another dependency, Simple middleware for 
handling exceptions inside of async express routes and passing them to your express error handlers. */

// @desc Get goals
// @access PRIVATE
// @route GET /api/goals
const getGoals = asyncHandler( async (req,res) =>{
    res.status(200).json({message:"Get Goals from controller"})
})

// @desc Setting goals
// @access PRIVATE
// @route POST /api/goals
const setGoal = asyncHandler(async (req,res) =>{
    // console.log(req.body); //inorder to use body we should add some middleware
    if(!req.body.text){
        res.status(400) // json({message:"Please add a text field "})
        throw new Error("Please add a text field")
    }
    res.status(200).json({message:"Set Goals from controller"})
})

// @desc Updating goals
// @access PRIVATE
// @route PUT /api/goals/id
const updateGoal = asyncHandler( async (req,res) =>{
    res.status(200).json({message:`Update goal ${req.params.id}`})
})

// @desc Delete goals
// @access PRIVATE
// @route DELETE /api/goals/id
const deleteGoal = asyncHandler(async (req,res) =>{
    res.status(200).json({message:`Delete goal ${req.params.id}`})
}) 

module.exports ={
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal ,
}