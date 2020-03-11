import React from 'react'

const ActionTypeButtons = () => {
  return (
    <div className="tasksbuttons">
      <Button className={activeButtons.frontEnd} onClick={e => getFrontEnd()} title="Front-End"></Button>
      <Button className={activeButtons.backEnd + " center"} onClick={e => getBackEnd()} title="Back-End"></Button>
      <Button className={activeButtons.bugs} onClick={e => getBugs()} title="Bugs"></Button>
    </div>
  )
}

export default ActionTypeButtons
