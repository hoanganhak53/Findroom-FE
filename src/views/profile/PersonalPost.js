import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostList } from '../../components/PostList';
import { showMessage } from '../../slices/message';
import { allPersonalPost, deletePost } from '../../slices/post';

export const PersonalPost = () => {
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const [personalPost, setPersonalPost] = useState([]);

    const getPostList = useCallback(() => {
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

    useEffect(() => {
        getPostList();
    }, [getPostList]);

    const handleDelete = (postId) => {
        dispatch(deletePost(postId))
            .unwrap()
            .then(() => {
                getPostList();
                dispatch(
                    showMessage({
                        message: 'Xóa bài viết thành công',
                        severity: 'success',
                    })
                );
            })
            .catch((error) => {
                console.error(error);
                showMessage({
                    message: 'Xóa bài viết thất bại',
                    severity: 'error',
                });
            });
    };

    return (
        <div className="m-card">
            <div className="d-flex justify-content-between">
                <h4 className="font-weight-bold">
                    Bài đăng cá nhân - {personalPost.length} bài
                </h4>
            </div>
            <br />
            {personalPost.length ? (
                <PostList
                    posts={personalPost.reverse()}
                    showControl={true}
                    deletePost={handleDelete}
                />
            ) : (
                <p>Bạn chưa đăng bài viết nào</p>
            )}
        </div>
    );
};
