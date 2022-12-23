import React from 'react';
import GridViewIcon from '@mui/icons-material/GridView';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import KeyIcon from '@mui/icons-material/Key';
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import TvIcon from '@mui/icons-material/Tv';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import PetsIcon from '@mui/icons-material/Pets';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import KitchenIcon from '@mui/icons-material/Kitchen';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import SecurityIcon from '@mui/icons-material/Security';

export const PostFacility = ({ room }) => {
    return (
        <div className="m-card">
            <div className="d-flex">
                <GridViewIcon color="primary" />
                <h5 className="font-weight-bold">&nbsp;Tiện ích</h5>
            </div>
            <div className="box__container">
                {room.parking_situation && (
                    <div className="box__button">
                        <TwoWheelerIcon />
                        <span className="button__name">Chỗ để xe</span>
                    </div>
                )}
                {room.air_conditioner && (
                    <div className="box__button">
                        <AspectRatioIcon />
                        <span className="button__name">Máy lạnh</span>
                    </div>
                )}
                {room.share_home_as_landlord && (
                    <div className="box__button">
                        <KeyIcon />
                        <span className="button__name">Không chung chủ</span>
                    </div>
                )}
                {room.room_pets_allowed && (
                    <div className="box__button">
                        <PetsIcon />
                        <span className="button__name">Thú cưng</span>
                    </div>
                )}
                {room.room_kitchen && (
                    <div className="box__button">
                        <RestaurantIcon />
                        <span className="button__name">Nhà bếp</span>
                    </div>
                )}
                {room.room_bed && (
                    <div className="box__button">
                        <AirlineSeatFlatIcon />
                        <span className="button__name">Giường ngủ</span>
                    </div>
                )}
                {room.room_bathroom && (
                    <div className="box__button">
                        <LocalDrinkIcon />
                        <span className="button__name">WC riêng</span>
                    </div>
                )}
                {room.room_tivi && (
                    <div className="box__button">
                        <TvIcon />
                        <span className="button__name">TV</span>
                    </div>
                )}
                {room.room_closet && (
                    <div className="box__button">
                        <CalendarViewMonthIcon />
                        <span className="button__name">Tủ đồ</span>
                    </div>
                )}
                {room.room_refrigerator && (
                    <div className="box__button">
                        <KitchenIcon />
                        <span className="button__name">Tủ lạnh</span>
                    </div>
                )}
                {room.room_washing_machine && (
                    <div className="box__button">
                        <LocalLaundryServiceIcon />
                        <span className="button__name">Máy giặt</span>
                    </div>
                )}
                {room.security_guard && (
                    <div className="box__button">
                        <SecurityIcon />
                        <span className="button__name">Bảo vệ</span>
                    </div>
                )}
            </div>
        </div>
    );
};
