import React from 'react'
import { PostList } from '../../components/PostList'

export const FavPost = () => {
    return (
        <div className='m-card'>
            <div className="d-flex justify-content-between">
                <h4 className="font-weight-bold">Bài đăng yêu thích - 1 bài</h4>
            </div>
            <br />
            <PostList />
        </div>
    )
}
