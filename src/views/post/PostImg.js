import React from 'react';
import ImageGallery from 'react-image-gallery';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReportIcon from '@mui/icons-material/Report';

const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
];

export const PostImg = () => {
    return (
        <div className="m-card">
            <ImageGallery
                items={images}
                useBrowserFullscreen={false}
                showPlayButton={false}
                thumbnailPosition="right"
                autoPlay={true}
            />
            <div className="pt-3 d-flex justify-content-between">
                <h5 className="font-weight-bold">
                    &nbsp;Phòng cho thuê đường Phạm Hùng, Quận Cầu Giấy
                </h5>
                <div className="d-flex">
                    <IconButton color="primary">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton color="warning">
                        <ReportIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};
