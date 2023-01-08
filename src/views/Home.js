import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import banner from '../assets/banner.jpg';
import { PostList } from '../components/PostList';
import { TrendImg } from '../components/TrendImg';
import { TREND_IMG } from '../constants/trend';
import { searchPostSlice } from '../slices/post';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [postPagination, setPostPagination] = useState([]);
    const isLoading = useSelector((state) => state.post.isLoading);

    useEffect(() => {
        dispatch(searchPostSlice())
            .unwrap()
            .then((res) => {
                setPostPagination(res.data.result);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [dispatch]);

    return (
        <div className="container">
            <img
                className="d-block w-100 active-box-shadow"
                src={banner}
                alt="First slide"
            />
            <div className="m-card">
                <h4 className="font-weight-bold">Xu hướng tìm kiếm</h4>
                <br />
                <div className="row">
                    {TREND_IMG.map((img) => {
                        return (
                            <div className="col-sm" key={img.src}>
                                <TrendImg
                                    src={img.src}
                                    label={img.label}
                                    to={img.to}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="m-card">
                <div className="d-flex justify-content-between">
                    <h4 className="font-weight-bold">Phòng mới nhất</h4>
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => navigate('/search/1')}
                    >
                        Xem tất cả
                    </button>
                </div>
                <br />
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <PostList
                        posts={postPagination.filter((e) => !e.disabled)}
                    />
                )}
            </div>
        </div>
    );
};

export default Home;
