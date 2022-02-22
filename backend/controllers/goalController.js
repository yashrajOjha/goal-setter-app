const { request } = require('express')
const asyncHandler = require('express-async-handler')
/*  handling express async using another dependency, Simple middleware for 
handling exceptions inside of async express routes and passing them to your express error handlers. */

const Goal = require('../models/goalModel')
//User cannot delete another users goal
const User = require('../models/userModel')

// @desc Get goals
// @access PRIVATE
// @route GET /api/goals
const getGoals = asyncHandler( async (req,res) =>{
    //show goals only for that user
    const goals = await Goal.find({
        user: req.user.id
    })
    // so here the idea is to find the goals and return to the console. 
    res.status(200).json(goals)
})

// @desc Setting goals
// @access PRIVATE
// @route POST /api/goals
const setGoal = asyncHandler(async (req,res) =>{
    // console.log(req.body); //inorder to use body we should add some middleware
    if(!req.body.text){
        res.status(400) // json({message:"Please add a text field "})
        throw new Error("Please add a text field")
    } //the next set of statements are executed when ther is a text, a text body is created and posted
    const goal = await Goal.create({
        text: req.body.text,
        user:req.user.id,
    })
    res.status(200).json(goal)
})

// @desc Updating goals
// @access PRIVATE
// @route PUT /api/goals/id
const updateGoal = asyncHandler( async (req,res) =>{
    /*the goal id is obtained and found throught the request.params.id
    and if the goal is not returned then we say goal not found*/
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    if(!req.user){
        res.status(401)
        throw new Error("User not found")
    }
    //to check if the user logged in and the goal's owner is the same
    if(goal.user.toString()!== req.user.id){
        res.status(401)
        throw new Error("User not authorized to update goals.")
    }else{
    const updatedGoalValue = await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true,})
    res.status(200).json(updatedGoalValue)
    }
})

// @desc Delete goals
// @access PRIVATE
// @route DELETE /api/goals/id
const deleteGoal = asyncHandler(async (req,res) =>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal cannot be deleted as it is not found')
    }
    if(!req.user){
        res.status(401)
        throw new Error("User not found")
    }
    //to check if the user logged in and the goal's owner is the same
    if(goal.user.toString()!== req.user.id){
        res.status(401)
        throw new Error("User not authorized to update goals.")
    }else{
    await goal.remove()
    res.status(200).json({id: req.params.id})} 
}) 

module.exports ={
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal ,
}