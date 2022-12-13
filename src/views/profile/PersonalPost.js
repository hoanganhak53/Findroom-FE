import React from 'react'
import { PostList } from '../../components/PostList'

export const PersonalPost = () => {
    return (
        <div className='m-card'>
            <div className="d-flex justify-content-between">
                <h4 className="font-weight-bold">Bài đăng cá nhân - 1 bài</h4>
            </div>
            <br />
            <PostList />
        </div>
    )
}
