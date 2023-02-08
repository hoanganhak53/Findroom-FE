import React from 'react'
import Header from '../../components/Header'
import { EnhancedTableReport } from './Table'
import AdminService from '../../services/admin.service';

const headCells = [
    {
        id: 'user',
        numeric: false,
        disablePadding: false,
        label: 'Người báo cáo',
    },
    {
        id: 'room',
        numeric: false,
        disablePadding: false,
        label: 'Bài viết bị báo cáo',
    },
    {
        id: 'reason',
        numeric: false,
        disablePadding: false,
        label: 'Lý do',
    },
    {
        id: 'created_at',
        numeric: false,
        disablePadding: false,
        label: 'Ngày tạo',
    },
    {
        id: 'menu',
        numeric: true,
        disablePadding: false,
    },
];
const Reports = () => {
    const [page, setPage] = React.useState(0)
    const [limit, setLimit] = React.useState(10)
    const [total, setTotal] = React.useState(0)
    const [reports, setReports] = React.useState([])
    const [refresh, setRefresh] = React.useState(false)
    React.useEffect(() => {
        const callApi = async () => {
            try {
                const res = await AdminService.getReportAdmin(page, limit)
                setReports(res.data.result)
                setTotal(res.data.total)
            } catch (error) {
                console.log("error", error)
            }
        }
        callApi()
    }, [page, limit, refresh])
    return (
        <div className='admin__reports'>
            <Header title={'Báo cáo'} />
            <EnhancedTableReport title={'Báo cáo bài viết'}
                headCells={headCells}
                rows={reports}
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

export default Reports