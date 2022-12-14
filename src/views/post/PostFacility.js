import React from 'react'
import GridViewIcon from '@mui/icons-material/GridView';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import WifiIcon from '@mui/icons-material/Wifi';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import KeyIcon from '@mui/icons-material/Key';
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import TvIcon from '@mui/icons-material/Tv';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';

export const PostFacility = () => {
    return (
        <div className='m-card'>
            <div className='d-flex'>
                <GridViewIcon color='primary' />
                <h5 className="font-weight-bold">&nbsp;Tiện ích</h5>
            </div>
            <div className="box__container">
                <div className="box__button" >
                    <AccessAlarmIcon />
                    <span className='button__name'>Giờ giấc tự do</span>
                </div>
                <div className="box__button" >
                    <TwoWheelerIcon />
                    <span className='button__name'>Chỗ để xe</span>
                </div>
                <div className="box__button" >
                    <WifiIcon />
                    <span className='button__name'>Wifi</span>
                </div>
                <div className="box__button" >
                    <AspectRatioIcon />
                    <span className='button__name'>Máy lạnh</span>
                </div>
                <div className="box__button" >
                    <KeyIcon />
                    <span className='button__name'>Không chung chủ</span>
                </div>
                <div className="box__button" >
                    <AirlineSeatFlatIcon />
                    <span className='button__name'>Giường ngủ</span>
                </div>
                <div className="box__button" >
                    <LocalDrinkIcon />
                    <span className='button__name'>WC riêng</span>
                </div>
                <div className="box__button" >
                    <TvIcon />
                    <span className='button__name'>TV</span>
                </div>
                <div className="box__button" >
                    <CalendarViewMonthIcon />
                    <span className='button__name'>Tủ đồ</span>
                </div>
            </div>
        </div>
    )
}
