import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import eventBus from '../common/EventBus';
import { logout } from '../slices/auth';
import Search from '../components/Search';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import EmailIcon from '@mui/icons-material/Email';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';

export const NavBar = () => {
    //role
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    //menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
        } else {
            setShowModeratorBoard(false);
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
            <Link to={"/"} className="navbar-brand d-flex align-items-center">
                <span>Findroom&nbsp;</span>
                <OtherHousesIcon />
            </Link>
            <div className="navbar-nav mr-auto">
                {/* <li className="nav-item">
                    <Link to={"/home"} className="nav-link">
                        Home
                    </Link>
                </li> */}
                {showModeratorBoard && (
                    <li className="nav-item">
                        <Link to={"/mod"} className="nav-link">
                            Moderator Board
                        </Link>
                    </li>
                )}

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

            {currentUser ? (
                <li className="nav-item">
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem>
                            <Avatar /> Profile
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </li>
            ) : (
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
                        <Link to={"/login"} className="nav-link">
                            <AccountCircleIcon />
                            <span>&nbsp;Đăng nhập</span>
                        </Link>
                    </li>
                </div>
            )}
        </nav>
    )
}
