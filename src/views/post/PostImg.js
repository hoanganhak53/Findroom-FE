import React, { Fragment, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import {
    FormControl,
    FormControlLabel,
    IconButton,
    Radio,
    RadioGroup,
    TextField,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReportIcon from '@mui/icons-material/Report';
import { useDispatch } from 'react-redux';
import { showMessage } from '../../slices/message';
import { Modal } from 'react-bootstrap';
import {
    addFavSilce,
    deleteFavSilce,
    reportRoomSlice,
} from '../../slices/post';

const user = JSON.parse(localStorage.getItem('user'));
const reasonList = [
    'Hình ảnh sai, đã qua cắt ghép, chỉnh sửa',
    'Thông tin mô tả không đúng',
    'Không liên lạc được với chủ nhà',
    'Có dấu hiệu lừa đảo',
    'Lý do khác',
];

export const PostImg = ({ images, name, room_id, is_fav }) => {
    const dispatch = useDispatch();
    const [is_fav_post, setFavPost] = useState(is_fav);
    const [radio, setRadio] = useState();
    const [report, setReport] = useState('');
    const [show, setShow] = useState(false);

    const addToFavorites = () => {
        if (!user) {
            dispatch(
                showMessage({
                    message: 'Hãy đăng nhập để sử dụng tính năng này',
                    severity: 'info',
                })
            );
        } else {
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
        if (!user) {
            dispatch(
                showMessage({
                    message: 'Hãy đăng nhập để sử dụng tính năng này',
                    severity: 'info',
                })
            );
        } else {
            setShow(true);
        }
    };

    const handleClose = () => {
        setRadio();
        setReport('');
        setShow(false);
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
                    <div className="d-flex">
                        <IconButton
                            color={is_fav_post ? 'error' : 'primary'}
                            onClick={addToFavorites}
                        >
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton color="warning" onClick={handleOpen}>
                            <ReportIcon />
                        </IconButton>
                    </div>
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
        </Fragment>
    );
};
