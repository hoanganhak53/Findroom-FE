import React, { useEffect, useRef, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
// import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
// import WifiIcon from '@mui/icons-material/Wifi';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import KeyIcon from '@mui/icons-material/Key';
import PetsIcon from '@mui/icons-material/Pets';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import TvIcon from '@mui/icons-material/Tv';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import ErrorIcon from '@mui/icons-material/Error';
import CollectionsIcon from '@mui/icons-material/Collections';
import ImageGallery from 'react-image-gallery';
import { useDispatch } from 'react-redux';
import {
    createPostSlice,
    detailPostSilce,
    updatePostSlice,
} from '../slices/post';
import { showMessage } from '../slices/message';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { createPostSchema } from '../utilities/schema';
import KitchenIcon from '@mui/icons-material/Kitchen';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import SecurityIcon from '@mui/icons-material/Security';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
    generateAddressCode,
    generateAddressGoogleApis,
} from '../utilities/utils';

const MIN_IMG = 4;
const ROOM_TYPE = {
    NOT_SHARED: 'NotShared',
    SHARED: 'Shared',
    HOUSE: 'House',
    APARTMENT: 'Apartment',
    DORMITORY: 'Dormitory',
};

const CreatePost = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [body, setBody] = useState({});
    const [listImg, setListImg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [contentValidate, setContentValidate] = useState('');
    const handleClose = () => setShow(false);
    const dispatch = useDispatch();

    const handleInputBody = (e) => {
        const attribute = e.target.dataset?.body;
        const value = e.target.value;
        if (attribute) {
            setBody((prev) => {
                prev[attribute] = value === '' || isNaN(value) ? value : +value;
                return prev;
            });
        }
        console.log(body);
    };

    const handleClickTI = (item) => {
        item.currentTarget.classList.toggle('active');
        const attribute = item.currentTarget.dataset?.body;
        if (!attribute) return;
        setBody((prev) => {
            prev[attribute] = !prev[attribute];
            return prev;
        });
        console.log(body);
    };

    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: process.env.REACT_APP_CLOUD,
                uploadPreset: process.env.REACT_APP_UPLOAD,
                folder: 'findroom/room',
                multiple: true,
                maxImageFileSize: 5000000,
                maxImageWidth: 2000,
                clientAllowedFormats: ['png', 'jpg', 'jpeg', 'gif', 'jfif'],
            },
            (error, result) => {
                if (!error && result && result.event === 'success') {
                    setListImg((prev) => [
                        ...prev,
                        {
                            original: result.info.secure_url,
                            thumbnail: result.info.thumbnail_url,
                        },
                    ]);
                }
            }
        );
    }, [setListImg]);

    useEffect(() => {
        if (roomId) {
            dispatch(detailPostSilce(roomId))
                .unwrap()
                .then((res) => {
                    const room = res.data.result;
                    const id = room._id;
                    setListImg(room.upload_room_images);
                    delete room.upload_room_images;
                    delete room.owner_info;
                    delete room._id;
                    room.id = id;
                    setBody(room);
                    for (let key in room) {
                        if (room[key] === true) {
                            const item = document.querySelector(
                                `[data-body=${key}]`
                            );
                            if (item) {
                                item.classList.toggle('active');
                            }
                        }
                    }
                })
                .catch(() => {
                    navigate('/not-found');
                });
        } else {
            setBody({});
            setListImg([]);
        }
    }, [roomId, dispatch, navigate]);

    const handleSubmitUpdate = async () => {
        try {
            await createPostSchema.validate({
                ...body,
                upload_room_images: listImg,
            });
        } catch (error) {
            setShow(true);
            setContentValidate(error.message);
            return false;
        }
        setLoading(true);
        dispatch(
            updatePostSlice({
                ...body,
                upload_room_images: listImg,
            })
        )
            .unwrap()
            .then((e) => {
                console.log('first', e);
                dispatch(
                    showMessage({
                        message: 'Sửa bài đăng thành công!',
                        severity: 'success',
                    })
                );
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });

        navigate(`/room/${roomId}`);
    };

    const handleSubmit = async () => {
        const ggMapApis = await generateAddressGoogleApis(
            body.exact_room_address
        );
        let geocoding_api = {},
            full_address_object = {};

        if (ggMapApis?.length) {
            geocoding_api = {
                location: ggMapApis[0]?.geometry?.location,
                viewport: ggMapApis[0]?.geometry?.viewport,
                location_type: ggMapApis[0]?.geometry?.location_type,
            };

            full_address_object = await generateAddressCode(
                ggMapApis[0].address_components
            );
        }
        if (!body.room_gender) body.room_gender = 'any';
        if (!body.room_type) body.room_type = ROOM_TYPE.SHARED;

        try {
            await createPostSchema.validate({
                ...body,
                ...geocoding_api,
                ...full_address_object,
                upload_room_images: listImg,
            });
        } catch (error) {
            setShow(true);
            setContentValidate(error.message);
            return false;
        }
        setLoading(true);

        dispatch(
            createPostSlice({
                ...body,
                ...geocoding_api,
                ...full_address_object,
                upload_room_images: listImg,
            })
        )
            .unwrap()
            .then((e) => {
                console.log('first', e);
                dispatch(
                    showMessage({
                        message: 'Tạo bài đăng thành công!',
                        severity: 'success',
                    })
                );
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });

        navigate('/profile/1');
    };

    return (
        <div className="container">
            <h2 className="font-weight-bold">Đăng bài</h2>
            <div className="m-card">
                <h3 className="box__title">
                    <span className="box__icon">
                        <HomeIcon />
                    </span>
                    Thông tin phòng
                </h3>
                <div className="box__box display--block">
                    <div className="box__input">
                        <p className="input__name">Tên phòng</p>
                        <input
                            type="text"
                            className="input__input"
                            placeholder="Tối đa 50 ký tự"
                            data-body="room_name"
                            onChange={handleInputBody}
                            defaultValue={body.room_name}
                        />
                    </div>
                </div>
                <div className="box__box">
                    <div className="box__input">
                        <p className="input__name">Giá phòng</p>
                        <div className="input__container">
                            <input
                                type="text"
                                className="input__input input__input--row"
                                placeholder="3,500,000"
                                data-body="room_price"
                                onChange={handleInputBody}
                                defaultValue={body.room_price}
                            />
                            <span className="input__span">VNĐ/người</span>
                        </div>
                    </div>
                    <div className="box__input">
                        <p className="input__name">Đặt cọc</p>
                        <div className="input__container">
                            <input
                                type="text"
                                className="input__input input__input--row"
                                placeholder="3,500,000"
                                data-body="deposit"
                                onChange={handleInputBody}
                                defaultValue={body.deposit}
                            />
                            <span className="input__span">VNĐ/người</span>
                        </div>
                    </div>
                    <div className="box__input">
                        <p className="input__name">Diện tích</p>
                        <div className="input__container">
                            <input
                                type="text"
                                className="input__input input__input--row"
                                placeholder="25"
                                data-body="room_area"
                                onChange={handleInputBody}
                                defaultValue={body.room_area}
                            />
                            <span className="input__span">m2</span>
                        </div>
                    </div>
                    {/* <div className="box__input">
                        <p className="input__name">Sức chứa</p>
                        <input
                            type="text"
                            className="input__input input__input--row"
                            placeholder="3 nam hoặc 2 nữ"
                            // data-body="room_area"
                            // onChange={handleInputBody}
                        />
                    </div> */}
                </div>
                <div className="box__box display--block">
                    <div className="box__input">
                        <p className="input__name">Địa chỉ</p>
                        <input
                            type="text"
                            className="input__input"
                            placeholder="173 Đường Phạm Hùng, Phường Trung Hoà, Quận Cầu Giấy, Hà Nội"
                            data-body="exact_room_address"
                            onChange={handleInputBody}
                            defaultValue={body.exact_room_address}
                        />
                    </div>
                </div>
                <FormControl>
                    <FormLabel id="box__radio">Kiểu phòng?</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="radio__group"
                        name="radio__group"
                        onChange={(e) =>
                            setBody((prev) => ({
                                ...prev,
                                room_type: e.target.value,
                            }))
                        }
                        defaultValue={ROOM_TYPE.SHARED}
                    >
                        <FormControlLabel
                            value={ROOM_TYPE.SHARED}
                            control={<Radio />}
                            label="Phòng ở ghép"
                        />
                        <FormControlLabel
                            value={ROOM_TYPE.NOT_SHARED}
                            control={<Radio />}
                            label="Phòng cho thuê"
                        />
                        <FormControlLabel
                            value={ROOM_TYPE.APARTMENT}
                            control={<Radio />}
                            label="Căn hộ"
                        />
                        <FormControlLabel
                            value={ROOM_TYPE.DORMITORY}
                            control={<Radio />}
                            label="Homestay"
                        />
                        <FormControlLabel
                            value={ROOM_TYPE.HOUSE}
                            control={<Radio />}
                            label="Nhà nguyên căn"
                        />
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <FormLabel id="box__radio">Giới tính?</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="radio__group"
                        name="radio__group"
                        onChange={(e) =>
                            setBody((prev) => {
                                prev.room_gender = e.target.value;
                                return prev;
                            })
                        }
                        defaultValue="any"
                    >
                        <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Nam"
                        />
                        <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Nữ"
                        />
                        <FormControlLabel
                            value="any"
                            control={<Radio />}
                            label="Nam và nữ"
                        />
                    </RadioGroup>
                </FormControl>
                <div className="box__box">
                    <div className="box__input">
                        <p className="input__name">Tiền điện</p>
                        <div className="input__container">
                            <input
                                type="text"
                                className="input__input input__input--row"
                                placeholder="3,500"
                                data-body="electric_price"
                                onChange={handleInputBody}
                                defaultValue={body.electric_price}
                            />
                            <span className="input__span">VNĐ/số</span>
                        </div>
                    </div>
                    <div className="box__input">
                        <p className="input__name">Tiền nước</p>
                        <div className="input__container">
                            <input
                                type="text"
                                className="input__input input__input--row"
                                placeholder="30,000"
                                data-body="water_price"
                                onChange={handleInputBody}
                                defaultValue={body.water_price}
                            />
                            <span className="input__span">VNĐ/số</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="m-card">
                <h3 className="box__title">
                    <span className="box__icon">
                        <GridViewOutlinedIcon />
                    </span>
                    Tiện ích
                </h3>
                <div className="box__container">
                    {/* <div className="box__button" onClick={handleClickTI}>
                        <AccessAlarmIcon />
                        <span className="button__name">Giờ giấc tự do</span>
                    </div> */}
                    <div
                        className="box__button"
                        onClick={handleClickTI}
                        data-body="parking_situation"
                    >
                        <TwoWheelerIcon />
                        <span className="button__name">Chỗ để xe</span>
                    </div>
                    {/* <div className="box__button" onClick={handleClickTI}>
                        <WifiIcon />
                        <span className="button__name">Wifi</span>
                    </div> */}
                    <div
                        className="box__button"
                        onClick={handleClickTI}
                        data-body="air_conditioner"
                    >
                        <AspectRatioIcon />
                        <span className="button__name">Máy lạnh</span>
                    </div>
                    <div
                        className="box__button"
                        onClick={handleClickTI}
                        data-body="share_home_as_landlord"
                    >
                        <KeyIcon />
                        <span className="button__name">Không chung chủ</span>
                    </div>
                    <div
                        className="box__button"
                        onClick={handleClickTI}
                        data-body="room_pets_allowed"
                    >
                        <PetsIcon />
                        <span className="button__name">Thú cưng</span>
                    </div>
                    <div
                        className="box__button"
                        onClick={handleClickTI}
                        data-body="room_kitchen"
                    >
                        <RestaurantIcon />
                        <span className="button__name">Nhà bếp</span>
                    </div>
                    <div
                        className="box__button"
                        onClick={handleClickTI}
                        data-body="room_bed"
                    >
                        <AirlineSeatFlatIcon />
                        <span className="button__name">Giường ngủ</span>
                    </div>
                    <div
                        className="box__button"
                        onClick={handleClickTI}
                        data-body="room_bathroom"
                    >
                        <LocalDrinkIcon />
                        <span className="button__name">WC riêng</span>
                    </div>
                    <div
                        className="box__button"
                        onClick={handleClickTI}
                        data-body="room_tivi"
                    >
                        <TvIcon />
                        <span className="button__name">TV</span>
                    </div>
                    <div
                        className="box__button"
                        onClick={handleClickTI}
                        data-body="room_closet"
                    >
                        <CalendarViewMonthIcon />
                        <span className="button__name">Tủ đồ</span>
                    </div>
                    <div
                        className="box__button"
                        onClick={handleClickTI}
                        data-body="room_refrigerator"
                    >
                        <KitchenIcon />
                        <span className="button__name">Tủ lạnh</span>
                    </div>
                    <div
                        className="box__button"
                        onClick={handleClickTI}
                        data-body="room_washing_machine"
                    >
                        <LocalLaundryServiceIcon />
                        <span className="button__name">Máy giặt</span>
                    </div>
                    <div
                        className="box__button"
                        onClick={handleClickTI}
                        data-body="security_guard"
                    >
                        <SecurityIcon />
                        <span className="button__name">Bảo vệ</span>
                    </div>
                </div>
            </div>
            <div className="m-card">
                <h3 className="box__title">
                    <span className="box__icon">
                        <ErrorIcon />
                    </span>
                    Thêm mô tả
                </h3>
                <div className="box__area">
                    <textarea
                        id="area"
                        rows="10"
                        cols="120"
                        placeholder="Thêm ghi chú về phòng trọ"
                        data-body="notes"
                        onChange={handleInputBody}
                        defaultValue={body.notes}
                    ></textarea>
                </div>
            </div>
            <div className="m-card">
                <h3 className="box__title mb-3">
                    <span className="box__icon">
                        <CollectionsIcon />
                    </span>
                    Đăng ảnh phòng
                </h3>
                <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => widgetRef.current.open()}
                >
                    Upload image
                </button>
                <span className="box__content ml-2">
                    Tối thiểu 4 ảnh dung lượng max 5MB/ảnh
                    {listImg.length > 0 && listImg.length < MIN_IMG && (
                        <span className="text-danger ml-2">
                            Cần upload thêm {MIN_IMG - listImg.length} ảnh
                        </span>
                    )}
                </span>
                {listImg.length !== 0 && (
                    <div className="mt-4">
                        <ImageGallery
                            items={listImg}
                            useBrowserFullscreen={false}
                            showPlayButton={false}
                            thumbnailPosition="right"
                            autoPlay={true}
                        />
                        <button
                            className="btn btn-sm btn-outline-danger mt-3"
                            onClick={() => setListImg([])}
                        >
                            Xóa tất cả
                        </button>
                    </div>
                )}
            </div>
            <div className="d-flex mt-4 mb-4 justify-content-center">
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={roomId ? handleSubmitUpdate : handleSubmit}
                >
                    {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>{roomId ? 'Cập nhật' : 'Đăng bài'}</span>
                </button>
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>Biểu mẫu không hợp lệ</Modal.Title>
                </Modal.Header>
                <Modal.Body>{contentValidate}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreatePost;
