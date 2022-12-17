import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DateRangeIcon from '@mui/icons-material/DateRange';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const location = useLocation();
    const navigate = useNavigate();
    const [isActiveButton, setActiveButton] = useState(
        location.pathname.includes('favorite')
    );

    const switchListPost = (url, to) => {
        if (isActiveButton === to) {
            navigate(url);
            setActiveButton(!isActiveButton);
        }
    };
    return (
        <div className="container">
            <div className="m-card d-flex">
                <Avatar
                    sx={{ width: 72, height: 72 }}
                    src={currentUser.avatar_url}
                ></Avatar>
                <div className="col-lg-6 col-md-4">
                    <h5 className="font-weight-bold">
                        {currentUser.full_name
                            ? currentUser.full_name
                            : currentUser.username}
                    </h5>
                    <button
                        className="btn btn-sm btn-outline-secondary mt-2"
                        onClick={() => navigate('/edit-profile')}
                    >
                        Chỉnh sửa thông tin cá nhân
                    </button>
                </div>
                <div className="col-6">
                    <div className="d-flex mb-3">
                        <DateRangeIcon color="action" />
                        <span className="ml-1 mr-1 text-muted">
                            Ngày tham gia:
                        </span>
                        <span>10/12/2022</span>
                    </div>
                    <div className="d-flex mb-3">
                        <MailOutlineIcon color="action" />
                        <span className="ml-1 mr-1 text-muted">Email:</span>
                        <span>{currentUser.email}</span>
                    </div>
                    <div className="d-flex">
                        <PhoneAndroidIcon color="action" />
                        <span className="ml-1 mr-1 text-muted">
                            Số điện thoại:
                        </span>
                        <span>{currentUser.phone_number}</span>
                    </div>
                </div>
            </div>
            <div className="container mt-3">
                <button
                    className={
                        'btn mr-2 ' +
                        (isActiveButton ? 'btn-outline-primary' : 'btn-primary')
                    }
                    onClick={() => switchListPost('/profile', true)}
                >
                    Bài đăng cá nhân
                </button>
                <button
                    className={
                        'btn ' +
                        (isActiveButton ? 'btn-primary' : 'btn-outline-primary')
                    }
                    onClick={() => switchListPost('favorite', false)}
                >
                    Bài đăng yêu thích
                </button>
            </div>
            <Outlet />
        </div>
    );
};

export default Profile;
