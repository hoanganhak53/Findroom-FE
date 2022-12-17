import React, { useEffect, useRef, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import WifiIcon from '@mui/icons-material/Wifi';
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
import { createPostSlice } from '../slices/post';
import { showMessage } from '../slices/message';


const MIN_IMG = 4;

const CreatePost = () => {
    const [body, setBody] = useState({})
    const [listImg, setListImg] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleInputBody = (e)=>{
        const attribute = e.target.dataset?.body
        const value = e.target.value
        if(attribute){
            setBody(prev=> {
                prev[attribute] = (value === '' || isNaN(value)) ? value : +value
                return prev
            })
        }
        console.log(body)
    }

    const handleClickTI = (item) => {
        item.currentTarget.classList.toggle('active');
        const attribute = item.currentTarget.dataset?.body
        if(!attribute) return;
        setBody(prev=> {
            prev[attribute] = !prev[attribute]
            return prev
        })
        console.log(body)
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
                clientAllowedFormats: ['png', 'jpg', 'jpeg', 'gif'],
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

    const handleSubmit = ()=>{
        setBody(prev => {
            prev.upload_room_images = listImg.map(item => item.original)
            return prev
        })
        setLoading(true);
        dispatch(createPostSlice(body))
            .unwrap()
            .then((e) => {
                console.log("first", e)
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
    }

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
                            />
                            <span className="input__span">m2</span>
                        </div>
                    </div>
                    <div className="box__input">
                        <p className="input__name">Sức chứa</p>
                        <input
                            type="text"
                            className="input__input input__input--row"
                            placeholder="3 nam hoặc 2 nữ"
                            // data-body="room_area"
                            // onChange={handleInputBody}
                        />
                    </div>
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
                        />
                    </div>
                </div>
                <FormControl>
                    <FormLabel id="box__radio">Kiểu phòng ?</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="radio__group"
                        name="radio__group"
                        // onChange={(e)=>console.log(e)}
                    >
                        <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label="Tìm người ở ghép"
                        />
                        <FormControlLabel
                            value="2"
                            control={<Radio />}
                            label="Tìm người ở thuê"
                        />
                        <FormControlLabel
                            value="3"
                            control={<Radio />}
                            label="Căn hộ"
                        />
                        <FormControlLabel
                            value="4"
                            control={<Radio />}
                            label="Homestay"
                        />
                        <FormControlLabel
                            value="5"
                            control={<Radio />}
                            label="Nhà nguyên căn"
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
                                placeholder="100,000"
                                data-body="water_price"
                                onChange={handleInputBody}
                            />
                            <span className="input__span">VNĐ/người</span>
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
                    <div className="box__button" onClick={handleClickTI}>
                        <AccessAlarmIcon />
                        <span className="button__name">Giờ giấc tự do</span>
                    </div>
                    <div className="box__button" onClick={handleClickTI} data-body='parking_situation'>
                        <TwoWheelerIcon />
                        <span className="button__name">Chỗ để xe</span>
                    </div>
                    <div className="box__button" onClick={handleClickTI}>
                        <WifiIcon />
                        <span className="button__name">Wifi</span>
                    </div>
                    <div className="box__button" onClick={handleClickTI} data-body='air_conditioner'>
                        <AspectRatioIcon />
                        <span className="button__name">Máy lạnh</span>
                    </div>
                    <div className="box__button" onClick={handleClickTI} data-body='share_home_as_landlord'>
                        <KeyIcon />
                        <span className="button__name">Chung chủ</span>
                    </div>
                    <div className="box__button" onClick={handleClickTI} data-body='room_pets_allowed'>
                        <PetsIcon />
                        <span className="button__name">Thú cưng</span>
                    </div>
                    <div className="box__button" onClick={handleClickTI} data-body='room_kitchen'>
                        <RestaurantIcon />
                        <span className="button__name">Nhà bếp</span>
                    </div>
                    <div className="box__button" onClick={handleClickTI} data-body='room_bed'>
                        <AirlineSeatFlatIcon />
                        <span className="button__name">Giường ngủ</span>
                    </div>
                    <div className="box__button" onClick={handleClickTI} data-body='room_bathroom'>
                        <LocalDrinkIcon />
                        <span className="button__name">WC riêng</span>
                    </div>
                    <div className="box__button" onClick={handleClickTI} data-body='room_tivi'>
                        <TvIcon />
                        <span className="button__name">TV</span>
                    </div>
                    <div className="box__button" onClick={handleClickTI}>
                        <CalendarViewMonthIcon />
                        <span className="button__name">Tủ đồ</span>
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
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                    {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Đăng bài</span>
                </button>
            </div>
        </div>
    );
};

export default CreatePost;
