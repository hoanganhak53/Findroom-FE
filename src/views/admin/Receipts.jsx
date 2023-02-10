import React from 'react'
import Header from '../../components/Header';
import adminService from '../../services/admin.service';
import { EnhancedTableReceipts } from './Table';

const headCells = [
    {
        id: 'username',
        numeric: false,
        disablePadding: false,
        label: 'Tài khoản',
    },
    {
        id: 'title',
        numeric: false,
        disablePadding: false,
        label: 'Tiêu đề',
    },
    {
        id: 'created_at',
        numeric: false,
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
        id: 'total',
        numeric: true,
        disablePadding: false,
        label: 'Số tiền',
    },
    {
        id: 'menu',
        numeric: true,
        disablePadding: false,
    },
];

const Receipts = () => {
    const [page, setPage] = React.useState(0)
    const [limit, setLimit] = React.useState(10)
    const [total, setTotal] = React.useState(0)
    const [receipts, setReceipts] = React.useState([])
    const [refresh, setRefresh] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        const callApi = async () => {
            try {
                setLoading(true)
                const res = await adminService.getOrderAdmin(page, limit)
                setReceipts(res.data.result.map(item => {
                    item.username = item.owner.username
                    item.title = item.room_response.room_name
                    return item
                }))
                setTotal(res.data.total)
                setLoading(false)
            } catch (error) {
                console.log("error", error)
                setLoading(false)
            }
        }
        callApi()
    }, [page, limit, refresh])
    return (
        <div className='admin__receipts'>
            <Header title={'Hóa đơn'} />
            <EnhancedTableReceipts title={'Tất cả tài khoản'}
                headCells={headCells}
                rows={receipts}
                setRows={setReceipts}
                setRowsPerPage={setLimit}
                rowsPerPage={limit}
                setPage={setPage}
                page={page}
                total={total}
                setRefresh={setRefresh}
                setLoading={setLoading}
                loading={loading}
            />
        </div>
    )
}

export default Receipts