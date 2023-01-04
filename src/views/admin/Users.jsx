import React from 'react'
import Header from '../../components/Header'
import EnhancedTable from './Table'

const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Tài khoản',
    },
    {
      id: 'number_post',
      numeric: true,
      disablePadding: false,
      label: 'Số bài đăng',
    },
    {
      id: 'number_report',
      numeric: true,
      disablePadding: false,
      label: 'Số lần bị báo cáo',
    },
    {
      id: 'created_at',
      numeric: true,
      disablePadding: false,
      label: 'Ngày tạo',
    },
    {
      id: 'status',
      numeric: true,
      disablePadding: false,
      label: 'Trạng thái',
    },
    {
      id: 'menu',
      numeric: true,
      disablePadding: false,
    },
  ];

const Users = () => {
    return (
        <div className='admin__users'>
            <Header title={'Tài khoản khách hàng'} />
            <EnhancedTable title={'Tất cả tài khoản'} headCells={headCells}/>
        </div>
    )
}

export default Users