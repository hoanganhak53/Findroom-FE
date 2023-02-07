import { Avatar, CircularProgress, IconButton, Tooltip } from '@mui/material';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { detailPostSilce, resultOrdersFromMomo } from '../../slices/post';
import { firestore } from '../chat/firebase/firebase';
import { PostDesc } from './PostDesc';
import { PostFacility } from './PostFacility';
import { PostImg } from './PostImg';
import { PostInfor } from './PostInfor';
import { Modal } from 'react-bootstrap';
import { convertToVND } from '../../utilities/convert';

export const PostDetail = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const { roomId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [room, setRoom] = useState();
    const [show, setShow] = useState(location.search ? true : false);
    const [order, setOrder] = useState();

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

    useEffect(() => {
        if (location.search) {
            dispatch(resultOrdersFromMomo(location.search))
                .unwrap()
                .then((res) => {
                    console.log(res.data.result);
                    setOrder(res.data.result);
                });
        }
    }, [location.search, dispatch]);

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
                        room={room}
                        isShow={location.search ? true : false}
                        setShowOrder={setShow}
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
            {location.search && (
                <Modal show={show} onHide={() => setShow(false)} centered>
                    <Modal.Header>
                        <Modal.Title>Thông tin hóa đơn</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="d-flex flex-row">
                                <span className="col-4 text-muted">
                                    Người dùng
                                </span>
                                <span className="col-8">
                                    {order?.owner?.full_name
                                        ? order?.owner?.full_name
                                        : order?.owner?.username}
                                </span>
                            </div>
                            <div className="d-flex flex-row">
                                <span className="col-4 text-muted">
                                    Dịch vụ
                                </span>
                                <span className="col-8">
                                    {order?.room_response?.room_name}
                                </span>
                            </div>
                            <div className="d-flex flex-row">
                                <span className="col-4 text-muted">
                                    Ngày tạo
                                </span>
                                <span className="col-8">
                                    {order?.created_at}
                                </span>
                            </div>
                            <div className="d-flex flex-row">
                                <span className="col-4 text-muted">
                                    Hình thức thanh toán
                                </span>
                                <span className="col-8">
                                    Thanh toán qua Momo
                                </span>
                            </div>
                            <div className="d-flex flex-row">
                                <span className="col-4 text-muted">
                                    Số tiền
                                </span>
                                <span className="col-8">
                                    {convertToVND(order?.total)}
                                </span>
                            </div>
                            <div className="d-flex flex-row">
                                <span className="col-4 text-muted">
                                    Trạng thái
                                </span>
                                <span
                                    className={`col-8 ${
                                        order?.is_paid
                                            ? 'text-success'
                                            : 'text-danger'
                                    }`}
                                >
                                    {order?.is_paid ? 'Thành công' : 'Thất bại'}
                                </span>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            className="btn btn-danger"
                            onClick={() => setShow(false)}
                        >
                            Đóng
                        </button>
                    </Modal.Footer>
                </Modal>
            )}
        </Fragment>
    );
};
