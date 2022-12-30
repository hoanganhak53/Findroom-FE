import { CircularProgress } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { detailPostSilce } from '../../slices/post';
import { PostDesc } from './PostDesc';
import { PostFacility } from './PostFacility';
import { PostImg } from './PostImg';
import { PostInfor } from './PostInfor';

export const PostDetail = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [room, setRoom] = useState();

    useEffect(() => {
        dispatch(detailPostSilce(roomId))
            .unwrap()
            .then((res) => {
                setRoom(res.data.result);
            })
            .catch(() => {
                navigate('/not-found');
            });
    }, [dispatch, roomId, navigate]);

    if (!roomId) {
        navigate('/not-found');
    }

    return (
        <Fragment>
            {room ? (
                <Fragment>
                    <PostImg
                        images={room?.upload_room_images}
                        name={room?.room_name}
                        room_id={room?._id}
                        is_fav={room?.is_favorite_room}
                    />
                    <PostInfor room={room} />
                    <PostFacility room={room} />
                    <PostDesc desc={room.notes} />
                </Fragment>
            ) : (
                <div className="justify-content-center d-flex mt-5">
                    <CircularProgress size="5rem" />
                </div>
            )}
        </Fragment>
    );
};
