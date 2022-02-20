const express = require('express')
const router = express.Router()
const {getGoals,setGoal,updateGoal,deleteGoal} =require('../controllers/goalController')
const {protect} = require('../middleware/authMiddleware')
/*router .get('/',(req,res)=>{
    // res.send('Get Goals') //this is to check if the respond is working of not
    res.status(200).json({message:'Get Goals'})
}) //get request,takes the link and request response variable */
//calling functions from other files

/* router.get('/',getGoals)
//post request
router.post('/',setGoal) 
The code above can be converted to just one line using route method, it is effectively decluttering the statements
*/
router.route('/').get(protect,getGoals).post(protect, setGoal)

/* //update request, to update we also need to pass on the id
router.put('/:id',updateGoal)

//delete request
router.delete('/:id',deleteGoal) 
Similar to the get and post we can change the route for put and delete method*/
router.route('/:id').put(protect,updateGoal).delete(protect,deleteGoal) 

module.exports = router