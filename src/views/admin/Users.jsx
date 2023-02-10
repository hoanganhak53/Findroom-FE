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
      id: 'number_room',
      numeric: true,
      disablePadding: false,
      label: 'Số bài đăng',
    },
    {
      id: 'number_reported',
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
  const [search, setSearch] =  React.useState(false)
  const [loading, setLoading] =  React.useState(false)
  const [keyword, setKeyword] =  React.useState('')
    React.useEffect(()=>{
      const callApi = async () => {
        try {
          setLoading(true)
          const res = await AdminService.getUsersAdmin(page, limit, keyword)
          setUsers(res.data.result)
          setTotal(res.data.total)
          setLoading(false)
        } catch (error) {
          console.log("error", error)
          setLoading(false)
        }
      }
      callApi()
    }, [page, limit, refresh, search])
    return (
        <div className='admin__users'>
            <Header title={'Tài khoản khách hàng'} />
            <EnhancedTableUsers title={'Tất cả tài khoản'} 
              headCells={headCells} 
              rows={users} 
              setRows={setUsers}
              setRowsPerPage={setLimit} 
              rowsPerPage={limit} 
              setPage={setPage} 
              page={page}
              total={total}
              setRefresh={setRefresh}
              refresh={refresh}
              search={search}
              setSearch={setSearch}
              keyword={keyword}
              setKeyword={setKeyword}
              loading={loading}
              setLoading={setLoading}
            />
        </div>
    )
}

export default Users