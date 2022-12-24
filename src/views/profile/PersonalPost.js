import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostList } from '../../components/PostList';
import { allPersonalPost } from '../../slices/post';

export const PersonalPost = () => {
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const [personalPost, setPersonalPost] = useState([]);

    useEffect(() => {
        dispatch(
            allPersonalPost({
                pageable: {
                    page: 0,
                    page_size: 0,
                    offset: 0,
                    total: 0,
                    sort: [
                        {
                            property: 'string',
                            direction: 'string',
                        },
                    ],
                    load_more_able: true,
                },
                request: {
                    user_id: currentUser.id,
                    is_pending: true,
                },
            })
        )
            .unwrap()
            .then((res) => {
                setPersonalPost(res.data.result);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [dispatch, currentUser.id]);

    return (
        <div className="m-card">
            <div className="d-flex justify-content-between">
                <h4 className="font-weight-bold">
                    Bài đăng cá nhân - {personalPost.length} bài
                </h4>
            </div>
            <br />
            {personalPost.length ? (
                <PostList posts={personalPost} showControl={true} />
            ) : (
                <p>Bạn chưa đăng bài viết nào</p>
            )}
        </div>
    );
};
