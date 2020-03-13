import React from 'react'

// move buttons into here to have better logic regarding class names
// use onFocus onBlur

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
