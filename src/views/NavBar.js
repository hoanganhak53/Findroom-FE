import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import eventBus from '../common/EventBus';
import { logout } from '../slices/auth';
import Search from '../components/Search';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import EmailIcon from '@mui/icons-material/Email';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Logout from '@mui/icons-material/Logout';
import { ROLES } from "../constants/roles";
import Dropdown from 'react-bootstrap/Dropdown';
import PersonIcon from '@mui/icons-material/Person';

export const NavBar = () => {
    //role
    const [showAdminBoard, setShowAdminBoard] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            setShowAdminBoard(currentUser.roles.includes(ROLES.admin));
        } else {
            setShowAdminBoard(false);
        }

        eventBus.on("logout", () => {
            logOut();
        });

        return () => {
            eventBus.remove("logout");
        };
    }, [currentUser, logOut]);

    return (
        <nav className="navbar navbar-expand navbar-dark bg-primary">
            <Link to={"/home"} className="navbar-brand d-flex align-items-center">
                <span>Findroom&nbsp;</span>
                <OtherHousesIcon />
            </Link>
            <div className="navbar-nav mr-auto">
                {/* <li className="nav-item">
                    <Link to={"/home"} className="nav-link">
                        Home
                    </Link>
                </li> */}

                {showAdminBoard && (
                    <li className="nav-item">
                        <Link to={"/admin"} className="nav-link">
                            Admin Board
                        </Link>
                    </li>
                )}

                {currentUser && (
                    <li className="nav-item">
                        <Link to={"/user"} className="nav-link">
                            User
                        </Link>
                    </li>
                )}
            </div>

            <div className="navbar-nav ml-auto">
                <Search placeholder='Tìm kiếm phòng trên findroom' />
                <li className="nav-item">
                    <Link to={"/"} className="nav-link d-flex align-items-center">
                        <EmailIcon />
                        <span>&nbsp;Nhắn tin</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/"} className="nav-link d-flex align-items-center">
                        <PostAddIcon />
                        <span>&nbsp;Đăng bài</span>
                    </Link>
                </li>
                <li className="nav-item">
                    {currentUser ? (
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" className='nav-link d-flex align-items-center'>
                                <Avatar sx={{ width: 24, height: 24 }}>M</Avatar>
                                <span>&nbsp;{currentUser.username}</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1" onClick={() => navigate('/profile')}>
                                    <PersonIcon color='primary'/> Thông tin cá nhân
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-2" onClick={logOut}>
                                    <Logout color='warning'/> Đăng xuất
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <Link to={"/login"} className="nav-link">
                            <AccountCircleIcon />
                            <span>&nbsp;Đăng nhập</span>
                        </Link>
                    )}

                </li>
            </div>
        </nav>
    )
}