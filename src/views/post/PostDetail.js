import { Avatar, CircularProgress, IconButton, Tooltip } from '@mui/material';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { detailPostSilce } from '../../slices/post';
import { firestore } from '../chat/firebase/firebase';
import { PostDesc } from './PostDesc';
import { PostFacility } from './PostFacility';
import { PostImg } from './PostImg';
import { PostInfor } from './PostInfor';

export const PostDetail = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
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

    const openChat = async () => {
        const user = currentUser.email.split('.')[0];
        const owner = room?.owner_info?.email.split('.')[0];
        const queryConverstation = query(
            collection(firestore, 'conversation'),
            where(user, '==', true),
            where(owner, '==', true)
        );
        await getDocs(queryConverstation).then((c) => {
            if (c.docs.length === 1) {
                navigate(`/chat/${c.docs[0].id}`);
            } else {
                const docData = {};
                docData[user] = true;
                docData[owner] = true;
                docData['full_email'] = [
                    currentUser.email,
                    room?.owner_info?.email,
                ];
                addDoc(collection(firestore, 'conversation'), docData).then(
                    (c) => {
                        navigate(`/chat/${c.id}`);
                    }
                );
            }
        });
    };

    return (
        <Fragment>
            {room ? (
                <Fragment>
                    <PostImg
                        images={room?.upload_room_images}
                        name={room?.room_name}
                        room_id={room?._id}
                        is_fav={room?.is_favorite_room}
                        email={room?.owner_info?.email}
                    />
                    <PostInfor room={room} />
                    <PostFacility room={room} />
                    <PostDesc desc={room.notes} />
                    {currentUser &&
                        room?.owner_info?.email !== currentUser.email && (
                            <div className="message-box">
                                <Tooltip
                                    title="Nhắn tin với chủ nhà"
                                    placement="left"
                                >
                                    <IconButton
                                        color="primary"
                                        onClick={openChat}
                                    >
                                        <Avatar
                                            src="https://cdn.tgdd.vn/2020/03/GameApp/unnamed-200x200-2.png"
                                            sx={{
                                                width: '60px',
                                                height: '60px',
                                            }}
                                            className="shadow-lg"
                                        />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        )}
                </Fragment>
            ) : (
                <div className="justify-content-center d-flex mt-5">
                    <CircularProgress size="5rem" />
                </div>
            )}
        </Fragment>
    );
};
