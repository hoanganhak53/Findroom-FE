import React from 'react'
import { PostDesc } from './PostDesc'
import { PostFacility } from './PostFacility'
import { PostImg } from './PostImg'
import { PostInfor } from './PostInfor'

export const PostDetail = () => {
  return (
    <div className='mb-3'>
      <PostImg />
      <PostInfor />
      <PostFacility />
      <PostDesc />
    </div>
  )
}
