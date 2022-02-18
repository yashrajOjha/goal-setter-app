// @desc Get goals
// @access PRIVATE
// @route GET /api/goals
const getGoals = (req,res) =>{
    res.status(200).json({message:"Get Goals from controller"})
}

// @desc Setting goals
// @access PRIVATE
// @route POST /api/goals
const setGoal = (req,res) =>{
    // console.log(req.body); //inorder to use body we should add some middleware
    if(!req.body.text){
        res.status(400) // json({message:"Please add a text field "})
        throw new Error("Please add a text field")
    }
    res.status(200).json({message:"Set Goals from controller"})
}

// @desc Updating goals
// @access PRIVATE
// @route PUT /api/goals/id
const updateGoal = (req,res) =>{
    res.status(200).json({message:`Update goal ${req.params.id}`})
}

// @desc Delete goals
// @access PRIVATE
// @route DELETE /api/goals/id
const deleteGoal = (req,res) =>{
    res.status(200).json({message:`Delete goal ${req.params.id}`})
}

module.exports ={
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal ,
}