import React from 'react'

const Status = ({status}) => {
    if(status === 'active'){
        return (
            <div className='admin__status'>
                <div className="content">
                    ACTIVE
                </div>
            </div>
        )
    }
    return (
        <div className='admin__status'>
            <div className="content warning">
                PENDING
            </div>
        </div>
    )
}

export default Status

export const StatusUsers = ({status}) => {
    if(status === 'active'){
        return (
            <div className='admin__status'>
                <div className="content">
                    ACTIVE
                </div>
            </div>
        )
    }
    if(status === 'inactive'){
        return (
            <div className='admin__status'>
                <div className="content warning">
                    INACTIVE
                </div>
            </div>
        )
    }
    return (
        <div className='admin__status'>
            <div className="content block">
                Block
            </div>
        </div>
    )
}

export const StatusReceipt = ({status}) => {
    if(status){
        return (
            <div className='admin__status'>
                <div className="content">
                    SUCCESS
                </div>
            </div>
        )
    }
    return (
        <div className='admin__status'>
            <div className="content block">
                FAILDED
            </div>
        </div>
    )
}