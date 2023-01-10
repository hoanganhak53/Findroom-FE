import React, { Fragment } from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import GridViewIcon from '@mui/icons-material/GridView';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useNavigate } from 'react-router-dom';
import { getRoomPrice } from '../utilities/convert';
import { GENDER } from '../constants/gender';
import { ROOM_TYPE } from '../constants/roomType';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

export const PostList = ({ posts, showControl = false, deletePost }) => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = (postId) => {
        deletePost(postId);
        handleClose();
    };

    return (
        <div className="container">
            {posts?.length &&
                posts.map((e) => (
                    <Fragment key={e._id}>
                        <div className="d-flex">
                            <img
                                src={e?.upload_room_images[0]?.original}
                                className="figure-img img-fluid rounded active-box-shadow active-hover"
                                style={{
                                    width: '25%',
                                    height: '152px',
                                }}
                                alt="trend-img"
                                onClick={() => navigate(`/room/${e._id}`)}
                            />
                            <div className="d-flex flex-column justify-content-between pl-3 pb-2 col-9">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex  align-items-center">
                                        <h5
                                            onClick={() =>
                                                navigate(`/room/${e._id}`)
                                            }
                                        >
                                            {e?.room_name}
                                        </h5>
                                        {showControl && (
                                            <div className="ml-1">
                                                <div className="admin__status">
                                                    <span
                                                        className={`content ${
                                                            e?.pending
                                                                ? 'warning'
                                                                : ''
                                                        }`}
                                                    >
                                                        {e?.pending
                                                            ? 'PENDING'
                                                            : 'ACTIVE'}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {showControl && (
                                        <Fragment>
                                            <IconButton
                                                aria-label="more"
                                                id="long-button"
                                                aria-controls={
                                                    open
                                                        ? 'long-menu'
                                                        : undefined
                                                }
                                                aria-expanded={
                                                    open ? 'true' : undefined
                                                }
                                                aria-haspopup="true"
                                                onClick={handleClick}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                PaperProps={{
                                                    style: {
                                                        boxShadow:
                                                            'rgba(100, 100, 111, 0.2) 0px 1px 4px 0px',
                                                    },
                                                }}
                                            >
                                                <MenuItem
                                                    onClick={() =>
                                                        handleDelete(e._id)
                                                    }
                                                >
                                                    <DeleteOutlineIcon /> Xóa
                                                    bài đăng
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() =>
                                                        navigate(
                                                            `/edit-post/${e._id}`
                                                        )
                                                    }
                                                >
                                                    <EditIcon /> Chỉnh sửa bài
                                                    đăng
                                                </MenuItem>
                                            </Menu>
                                        </Fragment>
                                    )}
                                </div>

                                <div className="d-flex">
                                    <HomeOutlinedIcon />
                                    <span>&nbsp;{ROOM_TYPE[e?.room_type]}</span>
                                </div>
                                <div className="d-flex">
                                    <div className="d-flex mr-5">
                                        <GroupsIcon />
                                        <span>
                                            &nbsp;{GENDER[e?.room_gender]}
                                        </span>
                                    </div>
                                    <div className="d-flex mr-5">
                                        <GridViewIcon />
                                        <span>&nbsp;{e?.room_area}m²</span>
                                    </div>
                                    <div className="d-flex text-info">
                                        <LocalAtmIcon />
                                        <span>
                                            &nbsp;{getRoomPrice(e?.room_price)}
                                        </span>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <MyLocationIcon />
                                    <span>&nbsp;{e?.exact_room_address}</span>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </Fragment>
                ))}
        </div>
    );
};
