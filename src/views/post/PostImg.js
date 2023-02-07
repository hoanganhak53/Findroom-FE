import React, { Fragment, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import {
    FormControl,
    FormControlLabel,
    IconButton,
    Radio,
    RadioGroup,
    TextField,
    Tooltip,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReportIcon from '@mui/icons-material/Report';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from '../../slices/message';
import { Modal } from 'react-bootstrap';
import {
    addFavSilce,
    deleteFavSilce,
    reportRoomSlice,
    saveByMomo,
} from '../../slices/post';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {
    addDoc,
    collection,
    getDocs,
    query,
    Timestamp,
    where,
} from 'firebase/firestore';
import { firestore } from '../chat/firebase/firebase';

const reasonList = [
    'Hình ảnh sai, đã qua cắt ghép, chỉnh sửa',
    'Thông tin mô tả không đúng',
    'Không liên lạc được với chủ nhà',
    'Có dấu hiệu lừa đảo',
    'Lý do khác',
];

export const PostImg = ({ room, isShow, setShowOrder }) => {
    const images = room?.upload_room_images;
    const name = room?.room_name;
    const room_id = room?._id;
    const is_fav = room?.is_favorite_room;
    const email = room?.owner_info?.email;
    const roles = room?.owner_info?.roles;
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [is_fav_post, setFavPost] = useState(is_fav);
    const [radio, setRadio] = useState();
    const [report, setReport] = useState('');
    const [show, setShow] = useState(false);
    const [showSchedule, setShowSchedule] = useState(false);
    const [schedule, setSchedule] = useState({
        time: moment(new Date()),
        location: '',
        name: '',
        phone_number: '',
    });

    const addToFavorites = () => {
        if (is_fav_post) {
            dispatch(
                deleteFavSilce({
                    room_id,
                })
            )
                .unwrap()
                .then(() => {
                    dispatch(
                        showMessage({
                            message: 'Bạn đã bỏ thích bài viết',
                            severity: 'success',
                        })
                    );
                    setFavPost(!is_fav_post);
                });
        } else {
            dispatch(
                addFavSilce({
                    room_id,
                })
            )
                .unwrap()
                .then(() => {
                    dispatch(
                        showMessage({
                            message: 'Bạn đã thích bài viết',
                            severity: 'success',
                        })
                    );
                    setFavPost(!is_fav_post);
                });
        }
    };

    const reportRoom = () => {
        const reason = radio === '4' ? report : reasonList[radio];
        dispatch(
            reportRoomSlice({
                room_id,
                reason,
            })
        )
            .unwrap()
            .then(() => {
                dispatch(
                    showMessage({
                        message: 'Báo cáo bài viết thành công',
                        severity: 'success',
                    })
                );
            });
        setShow(false);
    };

    const handleOpen = () => {
        setShow(true);
    };

    const handleClose = () => {
        setRadio();
        setReport('');
        setShow(false);
    };

    const handleCloseSchedule = () => {
        setSchedule({
            time: moment(new Date()),
            location: '',
            name: '',
            phone_number: '',
        });
        setShowSchedule(false);
    };

    const createSchedule = async () => {
        const user = currentUser.email.split('.')[0];
        const owner = email.split('.')[0];
        const newSchedule = schedule;
        newSchedule.time = schedule.time.format('HH:mm D [tháng] M, YYYY');
        newSchedule.img = images[0].original;
        newSchedule.room_id = room_id;

        const queryConverstation = query(
            collection(firestore, 'conversation'),
            where(user, '==', true),
            where(owner, '==', true)
        );
        await getDocs(queryConverstation).then((c) => {
            if (c.docs.length === 1) {
                const docData = {
                    content: '',
                    converstationId: c.docs[0].id,
                    created_at: Timestamp.fromDate(new Date()),
                    sender: currentUser.id,
                    schedule: newSchedule,
                };
                console.log(docData);
                addDoc(collection(firestore, 'messages'), docData);
            } else {
                const docData = {};
                docData[user] = true;
                docData[owner] = true;
                docData['full_email'] = [currentUser.email, email];
                addDoc(collection(firestore, 'conversation'), docData).then(
                    (c) => {
                        const scheduleData = {
                            content: '',
                            converstationId: c.id,
                            created_at: Timestamp.fromDate(new Date()),
                            sender: currentUser.id,
                            schedule: newSchedule,
                        };
                        addDoc(collection(firestore, 'messages'), scheduleData);
                    }
                );
            }
        });

        setSchedule({
            time: moment(new Date()),
            location: '',
            name: '',
            phone_number: '',
        });
        setShowSchedule(false);
        dispatch(
            showMessage({
                message: 'Đặt lịch hẹn với chủ nhà thành công',
                severity: 'success',
            })
        );
    };

    const depositByMomo = () => {
        if (isShow) {
            setShowOrder(true);
        } else {
            dispatch(
                saveByMomo({
                    body: {
                        total: room.deposit,
                        user_id: currentUser.id,
                        room,
                    },
                    callback: `http://localhost:3000/room/${room_id}`,
                })
            )
                .unwrap()
                .then((res) => {
                    window.open(res.data.result.payUrl, '_blank', 'noreferrer');
                });
        }
    };

    return (
        <Fragment>
            <div className="m-card">
                <ImageGallery
                    items={images}
                    useBrowserFullscreen={false}
                    showPlayButton={false}
                    thumbnailPosition="right"
                    autoPlay={true}
                />
                <div className="pt-3 d-flex justify-content-between">
                    <h5 className="font-weight-bold">&nbsp;{name}</h5>
                    {currentUser && email !== currentUser.email && (
                        <div className="d-flex">
                            {roles !== null && roles.includes('ADMIN') && (
                                <Tooltip placement="bottom" title="Đặt cọc">
                                    <IconButton onClick={depositByMomo}>
                                        <LocalMallIcon color="primary" />
                                    </IconButton>
                                </Tooltip>
                            )}

                            <Tooltip placement="bottom" title="Đặt lịch hẹn">
                                <IconButton
                                    onClick={() => setShowSchedule(true)}
                                >
                                    <PendingActionsIcon color="action" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip
                                placement="bottom"
                                title={is_fav_post ? 'Bỏ thích' : 'Yêu thích'}
                            >
                                <IconButton
                                    color={is_fav_post ? 'error' : 'primary'}
                                    onClick={addToFavorites}
                                >
                                    <FavoriteIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip placement="bottom" title="Báo cáo">
                                <IconButton
                                    color="warning"
                                    onClick={handleOpen}
                                >
                                    <ReportIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    )}
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Báo cáo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Hãy chọn vấn đề</h5>
                    <p className="text-muted ">
                        Khi nhận thấy dấu hiệu lừa đảo, giả mạo hãy báo cáo ngay
                        cho findroom để nhận giúp đỡ.
                    </p>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="radio__group"
                            name="radio__group"
                            onChange={(e) => setRadio(e.target.value)}
                        >
                            {reasonList.map((v, i) => (
                                <FormControlLabel
                                    key={i}
                                    value={i}
                                    control={<Radio />}
                                    label={v}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                    {radio === '4' && (
                        <TextField
                            label="Lý do bạn báo cáo"
                            variant="standard"
                            sx={{ width: '100%' }}
                            onChange={(e) => setReport(e.target.value)}
                        />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={handleClose}>
                        Hủy
                    </button>
                    <button
                        className="btn btn-primary ml-3"
                        onClick={reportRoom}
                        disabled={
                            !radio || (radio === '4' && report?.length === 0)
                        }
                    >
                        Báo cáo
                    </button>
                </Modal.Footer>
            </Modal>
            <Modal show={showSchedule} onHide={handleCloseSchedule}>
                <Modal.Header>
                    <Modal.Title>Đặt lịch hẹn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TextField
                        label="Địa điểm"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        className="mt-2"
                        onChange={(e) =>
                            setSchedule((prev) => {
                                prev.location = e.target.value;
                                return { ...prev };
                            })
                        }
                    />
                    <TextField
                        label="Họ tên bạn"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        className="mt-4"
                        onChange={(e) =>
                            setSchedule((prev) => {
                                prev.name = e.target.value;
                                return { ...prev };
                            })
                        }
                    />
                    <TextField
                        label="Số điện thoại"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        className="mt-4"
                        onChange={(e) =>
                            setSchedule((prev) => {
                                prev.phone_number = e.target.value;
                                return { ...prev };
                            })
                        }
                    />
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DateTimePicker
                            label="Ngày hẹn"
                            renderInput={(params) => <TextField {...params} />}
                            value={schedule.time}
                            onChange={(newValue) => {
                                setSchedule((prev) => {
                                    prev.time = newValue;
                                    return prev;
                                });
                                console.log(schedule);
                            }}
                            className="w-100 mt-4"
                        />
                    </LocalizationProvider>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-danger"
                        onClick={handleCloseSchedule}
                    >
                        Hủy
                    </button>
                    <button
                        className="btn btn-primary ml-3"
                        onClick={createSchedule}
                        disabled={
                            !schedule.location?.length ||
                            !schedule.name?.length ||
                            !schedule.phone_number?.length
                        }
                    >
                        Đặt lịch hẹn
                    </button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};
