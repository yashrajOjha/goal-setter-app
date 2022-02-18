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