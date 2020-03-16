import React from 'react'

const Mockups = () => {
  return (
    <div id="mockups">
      <div>
        <img src="./dashboard.png" alt=""/>
        <p>See overall progress on your projects.</p>
      </div>
      <div style={{backgroundColor: '#E5E7EC'}}>
        <p>Add your project’s functionality in the form of user requests, or actions.</p>
        <img src="./actions.png" alt=""/>
      </div>
      <div>
        <img src="./tasks.png" alt=""/>
        <p>Check off tasks to reach your goal!</p>
      </div>
    </div>
  )
}

export default Mockups
