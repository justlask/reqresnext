import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import AuthService from '../auth/AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button'
import TaskCard from '../tasks/TaskCard'
import AddTask from '../tasks/AddTask'
import EditActionModal from './EditActionModal'
import MoreActionOptions from './MoreActionOptions'
// import ActionTypeButtons from './ActionTypeButtons'

const Action = (props) => {
  const service = new AuthService();
  const [action, setAction] = useState({});
  const [tasks, setTasks] = useState([]);
  const [popOut, setPopOut] = useState('popouthidden');
  const [type, setType] = useState('front-end');
  const [activeButtons, setActiveButtons] = useState({frontEnd: 'activeActionButton', backEnd: 'notActiveActionButton', bugs: 'notActiveActionButton'});
  const [project, setProject] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false);

  useEffect(() => {
    let actionID = props.match.params.actionID

    service.getAction(actionID)
    .then(response => {
      setAction(response);
      setProject(response.project.title)
    })

    service.getTasks(actionID, 'front-end')
    .then(response => {
      setTasks(response)
      setActiveButtons({frontEnd: 'activeActionButton', backEnd: 'notActiveActionButton', bugs: 'notActiveActionButton'})
    })

  }, [])

  const loadAction = () => {
    let actionID = props.match.params.actionID

    service.getAction(actionID)
    .then(response => {
      setAction(response)
      setProject(response.project.title)
    })

    service.getTasks(actionID, 'front-end')
    .then(response => {
      setTasks(response)
      setActiveButtons({frontEnd: 'activeActionButton', backEnd: 'notActiveActionButton', bugs: 'notActiveActionButton'})
    })
  }


  const getFrontEnd = () => {
    service.getTasks(props.match.params.actionID, 'front-end')
    .then(response => {
      setTasks(response)
      setActiveButtons({frontEnd: 'activeActionButton', backEnd: 'notActiveActionButton', bugs: 'notActiveActionButton'})
    })
  }

  const getBackEnd = () => {
    service.getTasks(props.match.params.actionID, 'back-end')
    .then(response => {
      setTasks(response)
      setActiveButtons({frontEnd: 'notActiveActionButton', backEnd: 'activeActionButton', bugs: 'notActiveActionButton'})
    })
  }

  const getBugs = () => {
    service.getTasks(props.match.params.actionID, 'bug')
    .then(response => {
      setTasks(response)
      setActiveButtons({frontEnd: 'notActiveActionButton', backEnd: 'notActiveActionButton', bugs: 'activeActionButton'})
    })
  }


  const taskDone = () => {
    let actionID = props.match.params.actionID

    service.getTasks(actionID, 'front-end')
    .then(response => {
      setTasks(response)
      setActiveButtons({frontEnd: 'activeActionButton', backEnd: 'notActiveActionButton', bugs: 'notActiveActionButton'})
    })
  }


  const loadTasks = () => {
    if (tasks) {
      return tasks.map((task, i) => {
        return (
          <TaskCard project={props.match.params.projectID} action={props.match.params.actionID} taskDone={taskDone} task={task} key={task._id} index={i} />
        )
      })
    }
  }

  const updateTasks = (response) => {
    setTasks(response)
  }


  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const showMoreOptions = () => {
    setMoreOptions(!moreOptions)
  }
  
  const deleteAction = () => {
    let actionID = action._id
    let projectID = props.match.params.projectID


    service.deleteAction(actionID, projectID)
    .then(response => {
      props.history.push(`/project/${projectID}`)
    })

  }


  const markComplete = () => {
    service.markActionComplete(action._id)
    .then(response => {
      loadAction();
      showMoreOptions();
    })
  }

  const markIncomplete = () => {
    service.markActionIncomplete(action._id)
    .then(response => {
      loadAction();
      showMoreOptions();
    })
  }


  return (
    <main className="actionpage">
      <div className="icons">
        <Link to={`/project/${props.match.params.projectID}`}><FontAwesomeIcon className="chevron" style={{color: '#0C0C3E' }}icon={faChevronLeft} /><sub>{project}</sub></Link>
        <div>
          <Button className="viewMore" title={<FontAwesomeIcon style={{color: '#0C0C3E' }}icon={faEllipsisH} />} onClick={e => showMoreOptions(e)}></Button>
          <MoreActionOptions markComplete={markComplete} markIncomplete={markIncomplete} action={action} toggleModal={toggleModal} deleteAction={e => deleteAction(e)} show={moreOptions}/>
        </div>
      </div>
      <div className="title">
        <h3>{action.title}</h3>
        <p>{action.description}</p>
      </div>
      <div className="flexrow2">
        <img src={action.image} alt=""/>
        <div className="tasksform">
          <AddTask action={action._id} updateTasks={updateTasks} />
          {/* <ActionTypeButtons /> */}
          <div className="tasksbuttons">
            <Button className={activeButtons.frontEnd} onClick={e => getFrontEnd()} title="Front-End"></Button>
            <Button className={activeButtons.backEnd + " center"} onClick={e => getBackEnd()} title="Back-End"></Button>
            <Button className={activeButtons.bugs} onClick={e => getBugs()} title="Bugs"></Button>
          </div>
          <div className="tasks">
            <div className="thetasks">
              {loadTasks()}
            </div>
          </div>
        </div>
      </div>
      <EditActionModal loadAction={loadAction} action={action} show={isOpen} onClose={toggleModal}> /></EditActionModal>
    </main>
  )

}

export default Action
