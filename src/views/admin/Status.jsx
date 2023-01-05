import React from 'react'

const Status = ({status}) => {
    if(!status){
        return (
            <div className='admin__status'>
                <div className="content">
                    ACTIVE
                </div>
            </div>
        )
    }
}

export default Status

export const StatusUsers = ({status}) => {
    if(!status){
        return (
            <div className='admin__status'>
                <div className="content">
                    ACTIVE
                </div>
            </div>
        )
    }
}
