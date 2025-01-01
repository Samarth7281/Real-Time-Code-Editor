import React from 'react'
import Avatar from 'react-avatar'

const Client = ({username}) => {
  return (
    <div className='#client flex flex-col items-center'>
      <Avatar name={username} size={50} round={14}/>
      <span className='mt-1 font-bold'>{username}</span>
    </div>
  )
}

export default Client
