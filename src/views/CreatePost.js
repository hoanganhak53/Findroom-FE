import React from 'react'
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
import Button from '@mui/material/Button';

const CreatePost = () => {
    const handleClickTI = (item) => {
        item.currentTarget.classList.toggle('active')
    }

    return (
        <div className='container'>
            <h2 className='font-weight-bold'>Đăng bài</h2>
            <div className='m-card'>
                <h3 className='box__title'>
                    <span className='box__icon'><HomeIcon /></span>
                    Thông tin phòng
                </h3>
                <div className="box__box display--block">
                    <div className="box__input">
                        <p className="input__name">Tên phòng</p>
                        <input type="text" className='input__input' placeholder='Tối đa 50 ký tự' />
                    </div>
                </div>
                <div className="box__box">
                    <div className="box__input">
                        <p className="input__name">Giá phòng</p>
                        <div className='input__container'>
                            <input type="text" className='input__input input__input--row' placeholder='3,500,000' />
                            <span className='input__span'>VNĐ/người</span>
                        </div>
                    </div>
                    <div className="box__input">
                        <p className="input__name">Đặt cọc</p>
                        <div className='input__container'>
                            <input type="text" className='input__input input__input--row' placeholder='3,500,000' />
                            <span className='input__span'>VNĐ/người</span>
                        </div>
                    </div>
                    <div className="box__input">
                        <p className="input__name">Diện tích</p>
                        <div className='input__container'>
                            <input type="text" className='input__input input__input--row' placeholder='25' />
                            <span className='input__span'>m2</span>
                        </div>
                    </div>
                    <div className="box__input">
                        <p className="input__name">Sức chứa</p>
                        <input type="text" className='input__input input__input--row' placeholder='3 nam hoặc 2 nữ' />
                    </div>
                </div>
                <div className="box__box display--block">
                    <div className="box__input">
                        <p className="input__name">Địa chỉ</p>
                        <input type="text" className='input__input' placeholder='173 Đường Phạm Hùng, Phường Trung Hoà, Quận Cầu Giấy, Hà Nội' />
                    </div>
                </div>
                <FormControl>
                    <FormLabel id="box__radio">Kiểu phòng ?</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="radio__group"
                        name="radio__group"
                    >
                        <FormControlLabel value="1" control={<Radio />} label="Tìm người ở ghép" />
                        <FormControlLabel value="2" control={<Radio />} label="Tìm người ở thuê" />
                        <FormControlLabel value="3" control={<Radio />} label="Căn hộ" />
                        <FormControlLabel value="4" control={<Radio />} label="Homestay" />
                        <FormControlLabel value="5" control={<Radio />} label="Nhà nguyên căn" />
                    </RadioGroup>
                </FormControl>
                <div className="box__box">
                    <div className="box__input">
                        <p className="input__name">Tiền điện</p>
                        <div className='input__container'>
                            <input type="text" className='input__input input__input--row' placeholder='3,500' />
                            <span className='input__span'>VNĐ/số</span>
                        </div>
                    </div>
                    <div className="box__input">
                        <p className="input__name">Tiền nước</p>
                        <div className='input__container'>
                            <input type="text" className='input__input input__input--row' placeholder='100,000' />
                            <span className='input__span'>VNĐ/người</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='m-card'>
                <h3 className='box__title'>
                    <span className='box__icon'><GridViewOutlinedIcon /></span>
                    Tiện ích
                </h3>
                <div className="box__container">
                    <div className="box__button" onClick={handleClickTI}>
                        <AccessAlarmIcon />
                        <span className='button__name'>Giờ giấc tự do</span>
                    </div>
                    <div className="box__button" onClick={handleClickTI}>
                        <TwoWheelerIcon />
                        <span className='button__name'>Chỗ để xe</span>
                    </div>
                    <div className="box__button" onClick={handleClickTI}>
                        <WifiIcon />
                        <span className='button__name'>Wifi</span>
                    </div>
                    <div className="box__button" onClick={handleClickTI}>
                        <AspectRatioIcon />
                        <span className='button__name'>Máy lạnh</span>
                    </div>
                    <div className="box__button" onClick={handleClickTI}>
                        <KeyIcon />
                        <span className='button__name'>Không chung chủ</span>
                    </div>
                    <div className="box__button" onClick={handleClickTI}>
                        <PetsIcon />
                        <span className='button__name'>Thú cưng</span>
                    </div>
                    <div className="box__button" onClick={handleClickTI}>
                        <RestaurantIcon />
                        <span className='button__name'>Nhà bếp</span>
                    </div>
                    <div className="box__button" onClick={handleClickTI}>
                        <AirlineSeatFlatIcon />
                        <span className='button__name'>Giường ngủ</span>
                    </div>
                    <div className="box__button" onClick={handleClickTI}>
                        <LocalDrinkIcon />
                        <span className='button__name'>WC riêng</span>
                    </div>
                    <div className="box__button" onClick={handleClickTI}>
                        <TvIcon />
                        <span className='button__name'>TV</span>
                    </div>
                    <div className="box__button" onClick={handleClickTI}>
                        <CalendarViewMonthIcon />
                        <span className='button__name'>Tủ đồ</span>
                    </div>
                </div>
            </div>
            <div className='m-card'>
                <h3 className='box__title'>
                    <span className='box__icon'><ErrorIcon /></span>
                    Thêm mô tả
                </h3>
                <div className="box__area">
                    <textarea id="area" rows="10" cols="120" placeholder='Thêm ghi chú về phòng trọ'></textarea>
                </div>
            </div>
            <div className='m-card'>
                <h3 className='box__title'>
                    <span className='box__icon'><CollectionsIcon /></span>
                    Đăng ảnh phòng
                </h3>
                <p className='box__content'>Tối thiểu 4 ảnh dung lượng max 5MB/ảnh</p>
                <input type="file" name="" id="up--image" multiple="multiple" />
            </div>
            <div className="btn__btn">
                <Button variant="contained" className='upload'>ĐĂNG PHÒNG NGAY</Button>
            </div>
        </div>
    )
}

export default CreatePost