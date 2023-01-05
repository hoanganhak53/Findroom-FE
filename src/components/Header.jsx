import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const Header = ({ title }) => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    return (
        <div className='header__admin'>
            <h3>{title}</h3>
            <div className='admin__search'>
                <input type="text" />
                <div className="icon__search">
                    <SearchIcon/>
                </div>
            </div>
            <div>
                <span className="admin__fullname">
                    {user.full_name}
                </span>
                <div className="avatar">
                    <img src={user.avatar_url || 'https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg'} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Header