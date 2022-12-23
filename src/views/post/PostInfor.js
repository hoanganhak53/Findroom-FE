import React from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { Avatar } from '@mui/material';
import { convertTime, convertToVND } from '../../utilities/convert';
import { ROOM_TYPE } from '../../constants/roomType';
import { GENDER } from '../../constants/gender';

export const PostInfor = ({ room }) => {
    return (
        <div className="row justify-content-between">
            <div className="col-7 m-card">
                <div className="d-flex">
                    <HomeRoundedIcon color="primary" />
                    <h5 className="font-weight-bold">&nbsp;Thông tin phòng</h5>
                </div>
                <div className="pt-1 d-flex justify-content-between">
                    <div>
                        <span className="text-muted">Giá phòng</span>
                        <p>{convertToVND(room.room_price)}</p>
                    </div>
                    <div>
                        <span className="text-muted">Diện tích</span>
                        <p>{room.room_area} mét vuông</p>
                    </div>
                    <div>
                        <span className="text-muted">Đặt cọc</span>
                        <p>{convertToVND(room.deposit)}</p>
                    </div>
                    <div>
                        <span className="text-muted">Kiểu phòng</span>
                        <p>{ROOM_TYPE[room.room_type]}</p>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>
                        <span className="text-muted">Trạng thái</span>
                        <p className="text-success">
                            {room.pending ? 'Hết phòng' : 'Còn phòng'}
                        </p>
                    </div>
                    <div>
                        <span className="text-muted">Tiền điện</span>
                        <p>{convertToVND(room.electric_price)}/số</p>
                    </div>
                    <div>
                        <span className="text-muted">Tiền nước</span>
                        <p>{convertToVND(room.water_price)}/số</p>
                    </div>
                    <div>
                        <span className="text-muted">Giới tính</span>
                        <p>{GENDER[room.room_gender]}</p>
                    </div>
                </div>
                <div className="d-flex">
                    <div>
                        <span className="text-muted">Địa chỉ</span>
                        <p>{room.exact_room_address}</p>
                    </div>
                </div>
            </div>
            <div className="col-4 m-card h-50">
                <div className="d-flex">
                    <PersonRoundedIcon color="primary" />
                    <h5 className="font-weight-bold">
                        &nbsp;Thông tin chủ phòng
                    </h5>
                </div>
                <div className="d-flex align-items-center">
                    <Avatar src={room?.owner_info.avatar_url} />
                    <div className="d-flex flex-column ml-2">
                        <span className="font-weight-bold">
                            {room?.owner_info.full_name
                                ? room?.owner_info.full_name
                                : room?.owner_info.username}
                        </span>
                        <span className="text-muted">
                            SĐT: {room?.owner_info.phone_number}
                        </span>
                    </div>
                </div>
                <p className="pt-2">
                    <span className="font-weight-bold">Ngày đăng: </span>
                    {convertTime(room.created_date)}
                </p>
            </div>
        </div>
    );
};
