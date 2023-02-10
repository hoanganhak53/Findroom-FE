import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People';
import PaidIcon from '@mui/icons-material/Paid';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { useNavigate, useLocation  } from 'react-router-dom';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const SideBar = () => {
    const navigate = useNavigate()

    const handleActive = (e)=>{
        const name = e.currentTarget.getAttribute('name')
        if(name === 'return') {
            navigate('/')
            return
        }
        const itemActive = document.querySelector('.sidebar__item.active')
        itemActive?.classList.remove('active')
        e.currentTarget.classList.add('active')
        navigate('/admin/' + name)
    }

    const location = useLocation()
    const name = location.pathname.split('/')[2]

    return (
        <div className='sidebar'>
            <div className="sidebar__header" onClick={()=>navigate('/admin')}>
                <HomeIcon/>
                <h4>Dashboard</h4>
            </div>
            <div className="sidebar__body">
                <ul className="sidebar__items">
                    <li className={name !== 'posts' ? "sidebar__item" : "sidebar__item active"} onClick={handleActive} name='posts'>
                        <DescriptionIcon/>
                        <span>Bài đăng</span>
                    </li>
                    <li className={name !== 'users' ? "sidebar__item" : "sidebar__item active"} onClick={handleActive} name='users'>
                        <PeopleIcon/>
                        <span>Tài khoản</span>
                    </li>
                    <li className={name !== 'receipts' ? "sidebar__item" : "sidebar__item active"} onClick={handleActive} name='receipts'>
                        <PaidIcon/>
                        <span>Hóa đơn</span>
                    </li>
                    <li className={name !== 'reports' ? "sidebar__item" : "sidebar__item active"} onClick={handleActive} name='reports'>
                        <CircleNotificationsIcon/>
                        <span>Báo cáo</span>
                    </li>
                    <li className={"sidebar__item" } onClick={handleActive} name='return'>
                        <ArrowCircleLeftIcon/>
                        <span>Trở về</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar