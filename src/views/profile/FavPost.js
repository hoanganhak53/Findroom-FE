import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PostList } from '../../components/PostList';
import { getAllFavSilce } from '../../slices/post';

export const FavPost = () => {
    const dispatch = useDispatch();
    const [favPost, setFavPost] = useState([]);

    useEffect(() => {
        dispatch(getAllFavSilce())
            .unwrap()
            .then((res) => {
                setFavPost(res.data.result);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [dispatch]);

    return (
        <div className="m-card">
            <div className="d-flex justify-content-between">
                <h4 className="font-weight-bold">
                    Bài đăng yêu thích - {favPost.length} bài
                </h4>
            </div>
            <br />
            {favPost.length ? (
                <PostList posts={favPost.reverse()} />
            ) : (
                <p>Bạn chưa thích bài viết nào</p>
            )}
        </div>
    );
};
