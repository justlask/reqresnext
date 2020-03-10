import React from 'react'
import Button from '../Button'

const MoreUserOptions = (props) => {
  return (props.show) ? (
    <div className="editaccountbtns">
      <Button className="noButtonEdit" title="Edit Account" onClick={e => props.toggleEdit(e)}></Button>
      <Button className="noButtonEdit" title="Delete Account" onClick={e => props.deleteAccount(e)}></Button>
    </div>
  ) : null
}

export default MoreUserOptions;
