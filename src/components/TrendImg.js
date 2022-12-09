import React from 'react'

export const TrendImg = (props) => {
    return (
        <figure className="figure active-hover">
            <img src={props.src}
                className="figure-img img-fluid rounded t-img active-box-shadow"
                alt="trend-img" />
            <figcaption className="figure-caption text-center font-weight-bold">
                {props.label}
            </figcaption>
        </figure>
    )
}