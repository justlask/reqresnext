import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import AuthService from '../auth/AuthService';
import Button from '../Button';
import ImageUpload from './ImageUpload';
import UserCard from './UserCard';
import UserEdit from './UserEdit';
import UserDelete from './UserDelete'
import MoreUserOptions from './MoreUserOptions'
import Teams from '../teams/Teams'

const Profile = (props) => {
  const service = new AuthService();
  const [user, setUser] = useState(props.loggedInUser);
  const [image, setImage] = useState(props.loggedInUser.image);
  const [teams, setTeams] = useState(props.loggedInUser.teams);
  const [update, setUpdate] = useState(false);
  const [isDeleteAccount, setIsDeleteAccount] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false);

  useEffect(()=> {
    service.getUserInfo(props.loggedInUser.id)
    .then(user => {
      setUser(user)
      setImage(user.image)
      setTeams(user.teams)
    })
  }, [])

  const updateAccount = (response) => {
    service.getUserInfo(user.id)
    .then(user => {
      setUser(user)
      setImage(user.image)
      setTeams(user.teams)
    })
  }

  const handleEdit = () => {
    setUpdate(!update);
    showMoreOptions();
  }

  const updateUser = () => {
    service.getUserInfo(user.id)
    .then(user => {
      setUser(user)
      setImage(user.image)
      setTeams(user.teams)
      setUpdate(false)
    })
  }

  const handleCard = () => {
    if (update) return <UserEdit user={user} updateUser={updateUser}/>
    if (isDeleteAccount) return <UserDelete user={user} updateUser={updateUser} logoutUser={props.logoutUser} />
    else return <UserCard user={user}/>
  }

  const showMoreOptions = () => {
    setMoreOptions(!moreOptions)
  }

  const deleteAccount = () => {
    setIsDeleteAccount(!isDeleteAccount)
    showMoreOptions();
  }

  return (
    <main className="accountpage">
      <div className="accountInfo">
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          <Button className="editaccount" title={<FontAwesomeIcon style={{color: '#0C0C3E' }}icon={faEllipsisH} />} onClick={e => showMoreOptions(e)}></Button>
          <MoreUserOptions toggleEdit={handleEdit} deleteAccount={deleteAccount} show={moreOptions}/>
        </div>
        <div className="userInfo">
        <ImageUpload image={image} updateAccount={updateAccount}/>
          {handleCard()}
        </div>
      </div>
      {(teams) ? <Teams user={user} teams={teams} updateUser={updateUser}/> : null}
    </main>
  )

}

export default Profile
