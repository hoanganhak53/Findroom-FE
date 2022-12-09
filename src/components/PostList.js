import React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'; import GroupsIcon from '@mui/icons-material/Groups';
import GridViewIcon from '@mui/icons-material/GridView';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useNavigate } from 'react-router-dom';

export const PostList = () => {
    const navigate = useNavigate()

    return (
        <div className="container">
            <div className="d-flex active-hover" onClick={() => navigate("/room")}>
                <img src="https://www.ohanaliving.vn/901fe85ffb44c318bd9a87211b445826.jpg"
                    className="figure-img img-fluid rounded active-box-shadow"
                    style={{ width: '216px', height: '152px'}}
                    alt="trend-img" />
                <div className='d-flex flex-column justify-content-between pl-3 pb-2'>
                    <h5>Phòng cho thuê đường Phạm Hùng, Quận Cầu Giấy</h5>
                    <div className='d-flex'>
                        <HomeOutlinedIcon />
                        <span>&nbsp;Phòng cho thuê</span>
                    </div>
                    <div className='d-flex'>
                        <div className='d-flex mr-5'>
                            <GroupsIcon />
                            <span>&nbsp;Nam và nữ</span>
                        </div>
                        <div className='d-flex mr-5'>
                            <GridViewIcon />
                            <span>&nbsp;25m²</span>
                        </div>
                        <div className='d-flex text-info'>
                            <LocalAtmIcon />
                            <span>&nbsp;3.7 tr/phòng</span>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <MyLocationIcon />
                        <span>&nbsp;173 Đường Phạm Hùng, Phường Trung Hoà, Quận Cầu Giấy, Hà Nội</span>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}