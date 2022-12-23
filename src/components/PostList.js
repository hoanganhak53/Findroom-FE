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

export const PostList = ({ posts }) => {
    const navigate = useNavigate();

    return (
        <div className="container">
            {posts?.length &&
                posts.map((e) => (
                    <Fragment key={e._id}>
                        <div className="d-flex">
                            <img
                                src={e?.upload_room_images[0]?.original}
                                className="figure-img img-fluid rounded active-box-shadow active-hover"
                                style={{ width: '216px', height: '152px' }}
                                alt="trend-img"
                                onClick={() => navigate(`/room/${e._id}`)}
                            />
                            <div className="d-flex flex-column justify-content-between pl-3 pb-2">
                                <h5 onClick={() => navigate('/room')}>
                                    {e?.room_name}
                                </h5>
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
