import React from "react";
import banner from "../assets/banner.jpg";
import { PostList } from "../components/PostList";
import { TrendImg } from "../components/TrendImg";
import { TREND_IMG } from "../constants/trend";


const Home = () => {

    return (
        <div className="container">
            <img className="d-block w-100 active-box-shadow" src={banner} alt="First slide" />
            <div className="m-card">
                <h4 className="font-weight-bold">Xu hướng tìm kiếm</h4>
                <br />
                <div className="row">
                    {
                        TREND_IMG.map(img => {
                            return (
                                <div className="col-sm" key={img.src}>
                                    <TrendImg
                                        src={img.src}
                                        label={img.label} />
                                </div>                                
                            )
                        })
                    }
                </div>
            </div>
            <div className="m-card">
                <div className="d-flex justify-content-between">
                    <h4 className="font-weight-bold">Phòng mới nhất</h4>
                    <button type="button" className="btn btn-outline-primary">Xem tất cả</button>
                </div>
                <br />
                <PostList />
            </div>
        </div>
    );
};

export default Home;
