import React from 'react'

function GoalItem({goal}) {
  return (
    <div className='goal'>
        <div>
            {new Date(goal.createdAt).toLocaleString('en-US')}
        </div>
        <h3>{goal.text}</h3>
    </div>
  )
}

export default GoalItem