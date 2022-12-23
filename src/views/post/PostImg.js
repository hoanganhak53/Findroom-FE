import React from 'react';
import ImageGallery from 'react-image-gallery';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReportIcon from '@mui/icons-material/Report';

export const PostImg = ({ images, name }) => {
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
                <h5 className="font-weight-bold">&nbsp;{name}</h5>
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
