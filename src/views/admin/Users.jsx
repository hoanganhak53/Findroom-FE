import React from 'react'
import Header from '../../components/Header'
import {EnhancedTableUsers} from './Table'
import AdminService from '../../services/admin.service';

const headCells = [
    {
      id: 'username',
      numeric: false,
      disablePadding: false,
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
  const [page, setPage] =  React.useState(0)
  const [limit, setLimit] =  React.useState(10)
  const [total, setTotal] =  React.useState(0)
  const [users, setUsers] = React.useState([])
  const [refresh, setRefresh] = React.useState(false)
    React.useEffect(()=>{
      const callApi = async () => {
        try {
          const res = await AdminService.getUsersAdmin(page, limit)
          setUsers(res.data.result)
          setTotal(res.data.total)
        } catch (error) {
          console.log("error", error)
        }
      }
      callApi()
    }, [page, limit, refresh])
    return (
        <div className='admin__users'>
            <Header title={'Tài khoản khách hàng'} />
            <EnhancedTableUsers title={'Tất cả tài khoản'} 
              headCells={headCells} 
              rows={users} 
              setRowsPerPage={setLimit} 
              rowsPerPage={limit} 
              setPage={setPage} 
              page={page}
              total={total}
              setRefresh={setRefresh}
              refresh={refresh}
            />
        </div>
    )
}

export default Users