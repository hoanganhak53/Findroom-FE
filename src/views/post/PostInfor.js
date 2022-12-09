import React from 'react'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { Avatar } from '@mui/material';

export const PostInfor = () => {
    return (
        <div className="row justify-content-between">
            <div className="col-7 m-card">
                <div className='d-flex'>
                    <HomeRoundedIcon color='primary' />
                    <h5 className="font-weight-bold">&nbsp;Thông tin phòng</h5>
                </div>
                <div className='pt-1 d-flex justify-content-between'>
                    <div>
                        <span className='text-muted'>Giá phòng</span>
                        <p>5,000,000 đồng</p>
                    </div>
                    <div>
                        <span className='text-muted'>Diện tích</span>
                        <p>35 mét vuông</p>
                    </div>
                    <div>
                        <span className='text-muted'>Đặt cọc</span>
                        <p>5,000,000 đồng</p>
                    </div>
                    <div>
                        <span className='text-muted'>Kiểu phòng</span>
                        <p>Phòng cho thuê</p>
                    </div>
                </div>
                <div className='d-flex justify-content-between'>
                    <div>
                        <span className='text-muted'>Trạng thái</span>
                        <p className='text-success'>Còn phòng: 0/3</p>
                    </div>
                    <div>
                        <span className='text-muted'>Tiền điện</span>
                        <p>4,000 đồng/số</p>
                    </div>
                    <div>
                        <span className='text-muted'>Tiền nước</span>
                        <p>30,000 đồng/số</p>
                    </div>
                    <div>
                        <span className='text-muted'>Sức chứa</span>
                        <p>3 nam hoặc nữ</p>
                    </div>
                </div>
                <div className='d-flex'>
                    <div>
                        <span className='text-muted'>Địa chỉ</span>
                        <p>173 Đường Phạm Hùng, Phường Trung Hoà, Quận Cầu Giấy, Hà Nội</p>
                    </div>
                </div>
            </div>
            <div className="col-4 m-card h-50">
                <div className='d-flex'>
                    <PersonRoundedIcon color='primary' />
                    <h5 className="font-weight-bold">&nbsp;Thông tin chủ phòng</h5>
                </div>
                <div className='d-flex align-items-center'>
                    <Avatar >M</Avatar>
                    <div className='d-flex flex-column ml-2'>
                        <span className='font-weight-bold'>Hoang Anh</span>
                        <span className='text-muted'>SĐT: 0912345678</span>
                    </div>
                </div>
                <p className='pt-2'>
                    <span className='font-weight-bold'>Ngày đăng: </span>
                    11-12-2022
                </p>
            </div>
        </div>
    )
}
