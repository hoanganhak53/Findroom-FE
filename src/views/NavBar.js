import React, { useCallback, useEffect, useState } from 'react';
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
import { ROLES } from '../constants/roles';
import Dropdown from 'react-bootstrap/Dropdown';
import PersonIcon from '@mui/icons-material/Person';
import { firestore } from './chat/firebase/firebase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

export const NavBar = () => {
    //role
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const navigate = useNavigate();
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            setShowAdminBoard(currentUser.roles.includes(ROLES.admin));
        } else {
            setShowAdminBoard(false);
        }

        eventBus.on('logout', () => {
            logOut();
        });

        return () => {
            eventBus.remove('logout');
        };
    }, [currentUser, logOut]);

    const openChat = async () => {
        const user = currentUser.email.split('.')[0];
        const queryConverstation = query(
            collection(firestore, 'conversation'),
            where(user, '==', true),
            where('admin@gmail', '==', true)
        );
        await getDocs(queryConverstation).then((c) => {
            if (c.docs.length === 1) {
                navigate(`/chat/${c.docs[0].id}`);
            } else {
                const docData = {};
                docData[user] = true;
                docData['admin@gmail'] = true;
                docData['full_email'] = [currentUser.email, 'admin@gmail.com'];
                addDoc(collection(firestore, 'conversation'), docData).then(
                    (c) => {
                        navigate(`/chat/${c.id}`);
                    }
                );
            }
        });
    };

    return (
        <nav className="navbar navbar-expand navbar-dark bg-primary">
            <Link
                to={'/home'}
                className="navbar-brand d-flex align-items-center"
            >
                <span>Findroom&nbsp;</span>
                <OtherHousesIcon />
            </Link>
            <div className="navbar-nav mr-auto">
                {showAdminBoard && (
                    <li className="nav-item">
                        <Link to={'/admin'} className="nav-link">
                            Admin
                        </Link>
                    </li>
                )}
            </div>

            <div className="navbar-nav ml-auto">
                <Search placeholder="Tìm kiếm phòng trên findroom" />
                <li className="nav-item">
                    {currentUser?.email === 'admin@gmail.com' ? (
                        <Link
                            onClick={openChat}
                            className="nav-link d-flex align-items-center"
                        >
                            <EmailIcon />
                            <span>&nbsp;Nhắn tin</span>
                        </Link>
                    ) : (
                        <Link
                            className="nav-link d-flex align-items-center"
                            to={'/chat/O3rvH4Oe69qx9tK91gCx'}
                        >
                            <EmailIcon />
                            <span>&nbsp;Nhắn tin</span>
                        </Link>
                    )}
                </li>
                <li className="nav-item">
                    <Link
                        to={'/create-post'}
                        className="nav-link d-flex align-items-center"
                    >
                        <PostAddIcon />
                        <span>&nbsp;Đăng bài</span>
                    </Link>
                </li>
                <li className="nav-item">
                    {currentUser ? (
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="primary"
                                className="nav-link d-flex align-items-center"
                            >
                                <Avatar
                                    sx={{ width: 24, height: 24 }}
                                    src={currentUser.avatar_url}
                                ></Avatar>
                                <span>
                                    &nbsp;
                                    {currentUser.full_name
                                        ? currentUser.full_name
                                        : currentUser.username}
                                </span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/profile/1">
                                    <PersonIcon color="primary" /> Thông tin cá
                                    nhân
                                </Dropdown.Item>
                                <Dropdown.Item href="/login" onClick={logOut}>
                                    <Logout color="warning" /> Đăng xuất
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <Link to={'/login'} className="nav-link">
                            <AccountCircleIcon />
                            <span>&nbsp;Đăng nhập</span>
                        </Link>
                    )}
                </li>
            </div>
        </nav>
    );
};
