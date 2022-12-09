import React from 'react'
import GridViewIcon from '@mui/icons-material/GridView';

export const PostFacility = () => {
    return (
        <div className='m-card'>
            <div className='d-flex'>
                <GridViewIcon color='primary' />
                <h5 className="font-weight-bold">&nbsp;Tiện ích</h5>
            </div>
            <div className='mt-2'>
                tiện ích
            </div>
        </div>
    )
}
