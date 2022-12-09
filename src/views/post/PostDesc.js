import React from 'react'
import InfoIcon from '@mui/icons-material/Info';

export const PostDesc = () => {
    return (
        <div className='m-card'>
            <div className='d-flex'>
                <InfoIcon color='primary' />
                <h5 className="font-weight-bold">&nbsp;Mô tả thêm</h5>
            </div>
            <div className='mt-2'>
                Cho người nước ngoài và hộ gia đình, sinh viên người đi làm thuê căn hộ khách sạn cao cấp khép kín có ban công thoáng mát 
            </div>
        </div>
    )
}
