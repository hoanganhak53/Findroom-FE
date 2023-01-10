import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PaginationComponent } from '../../components/PaginationComponent';
import { PostList } from '../../components/PostList';
import { showMessage } from '../../slices/message';
import { allPersonalPost, deletePost } from '../../slices/post';

export const PersonalPost = () => {
    const { page: currentPage } = useParams();
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const [personalPost, setPersonalPost] = useState([]);
    const [totalPost, setTotalPost] = useState([]);
    const navigate = useNavigate();

    const getPostList = useCallback(() => {
        dispatch(
            allPersonalPost({
                body: {
                    request: {
                        user_id: currentUser.id,
                        is_pending: true,
                    },
                },
                page: currentPage,
            })
        )
            .unwrap()
            .then((res) => {
                setPersonalPost(res.data.result);
                setTotalPost(res.data.total);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [dispatch, currentUser.id, currentPage]);

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

    const handleChangePage = (event, page) => {
        navigate(`/profile/${page}`);
    };

    return (
        <div className="m-card">
            <div className="d-flex justify-content-between">
                <h4 className="font-weight-bold">
                    Bài đăng cá nhân - {totalPost} bài
                </h4>
            </div>
            <br />
            {personalPost.length ? (
                <Fragment>
                    <PostList
                        posts={personalPost}
                        showControl={true}
                        deletePost={handleDelete}
                    />
                    {totalPost > 10 && (
                        <PaginationComponent
                            totalTasks={totalPost}
                            paginate={handleChangePage}
                            currentPage={Number(currentPage)}
                        />
                    )}
                </Fragment>
            ) : (
                <p>Bạn chưa đăng bài viết nào</p>
            )}
        </div>
    );
};
