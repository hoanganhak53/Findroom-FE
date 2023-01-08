import React from 'react';
import { useNavigate } from 'react-router-dom';

export const TrendImg = (props) => {
    const navigate = useNavigate();

    return (
        <figure
            className="figure active-hover"
            onClick={() => navigate(props.to)}
        >
            <img
                src={props.src}
                className="figure-img img-fluid rounded t-img active-box-shadow"
                alt="trend-img"
            />
            <figcaption className="figure-caption text-center font-weight-bold">
                {props.label}
            </figcaption>
        </figure>
    );
};
