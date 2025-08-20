import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded } from './postsSlice'
import { nanoid } from '@reduxjs/toolkit'
import { selectAllUsers } from '../users/usersSlice'
import { addNewPost } from './postsSlice'

function AddPostForm() {

  const [title, setTitle] =  useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')


    const dispatch = useDispatch()
    const users = useSelector(selectAllUsers)


    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle' 
  

  const handleSubmit = () => {

    if(canSave){
      try {
        setAddRequestStatus('pending')
        dispatch(addNewPost({ title, content, userId })).unwrap()
         setTitle('')
        setContent('')
        setUserId('')
      } catch (error) {
        console.log(error)
      }
      finally{
        setAddRequestStatus('idle')
      }
    }
  }
    // const userNameId = users.find((user)=> Number(user.id) === Number(userId)) 
  
    //     dispatch(postAdded( title, content, userId  ))
    //     setTitle('')
    //     setContent('')
    //     setUserId('')
    // }
  
  return (
      <div>
      <label htmlFor="postTitle">Title</label>
      <input name="postTitle" id="postTitle" type="text" onChange={(e)=>setTitle(e.target.value)} value={title} />
      <label htmlFor="postContent">Content</label>     
      <textarea name="postContent" id="postContent" onChange={(e) => setContent(e.target.value)} value={content} />
      <label htmlFor="user">User</label> 
      <select onChange={(e) =>{ 
         setUserName(user.name)
         setUserId(e.target.value)}} value={userId} name="user" id="user">
        <option value=""></option>
        {
        users.map(user => (
        <option value={user.id} key={user.id}>{user.name}</option>
      ))}
      </select >
      <button disabled={!canSave} onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default AddPostForm
