import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PaginationComponent } from '../../components/PaginationComponent';
import { PostList } from '../../components/PostList';
import { getAllFavSilce } from '../../slices/post';

export const FavPost = () => {
    const { page: currentPage } = useParams();
    const dispatch = useDispatch();
    const [favPost, setFavPost] = useState([]);
    const [totalPost, setTotalPost] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let unsub = false;

        dispatch(getAllFavSilce(currentPage))
            .unwrap()
            .then((res) => {
                if (!unsub) {
                    setFavPost(res.data.result);
                    setTotalPost(res.data.total);
                }
            })
            .catch((error) => {
                console.error(error);
            });

        return () => {
            unsub = true;
        };
    }, [dispatch, currentPage]);

    const handleChangePage = (event, page) => {
        navigate(`/profile/favorite/${page}`);
    };

    return (
        <div className="m-card">
            <div className="d-flex justify-content-between">
                <h4 className="font-weight-bold">
                    Bài đăng yêu thích - {totalPost} bài
                </h4>
            </div>
            <br />
            {favPost.length ? (
                <Fragment>
                    <PostList posts={favPost} />
                    {totalPost > 10 && (
                        <PaginationComponent
                            totalTasks={totalPost}
                            paginate={handleChangePage}
                            currentPage={Number(currentPage)}
                        />
                    )}
                </Fragment>
            ) : (
                <p>Bạn chưa thích bài viết nào</p>
            )}
        </div>
    );
};
