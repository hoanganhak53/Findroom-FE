import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { convertToVND } from '../../utilities/convert';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#007bff',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    minHeight: '80px',
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const rows = [
    {
        id: 13,
        is_paid: true,
        total: 1000,
        user_id: 8,
        room_id: '63a1931ee447c449340623bd',
        owner: {
            id: 8,
            username: 'hoanganhadmin',
            email: 'hoanganhadmin@gmail.com',
            phone_number: '0912345678',
            full_name: 'Hoang Anh',
        },
        room_response: {
            user_id: 1,
            room_name: '❌XINH ĐẸP QUÁ!! Bancon 6TR5 Đủ Nội thất Nhé ạ',
        },
        created_at: '2023/02/07 17:01:46',
    },
    {
        id: 131,
        is_paid: true,
        total: 1000,
        user_id: 8,
        room_id: '63a1931ee447c449340623bd',
        owner: {
            id: 8,
            username: 'hoanganhadmin',
            email: 'hoanganhadmin@gmail.com',
            phone_number: '0912345678',
            full_name: 'Hoang Anh',
        },
        room_response: {
            user_id: 1,
            room_name: '❌XINH ĐẸP QUÁ!! Bancon 6TR5 Đủ Nội thất Nhé ạ',
        },
        created_at: '2023/02/07 17:01:46',
    },
    {
        id: 3,
        is_paid: true,
        total: 1000,
        user_id: 8,
        room_id: '63a1931ee447c449340623bd',
        owner: {
            id: 8,
            username: 'hoanganhadmin',
            email: 'hoanganhadmin@gmail.com',
            phone_number: '0912345678',
            full_name: 'Hoang Anh',
        },
        room_response: {
            user_id: 1,
            room_name: '❌XINH ĐẸP QUÁ!! Bancon 6TR5 Đủ Nội thất Nhé ạ',
        },
        created_at: '2023/02/07 17:01:46',
    },
    {
        id: 1,
        is_paid: true,
        total: 1000,
        user_id: 8,
        room_id: '63a1931ee447c449340623bd',
        owner: {
            id: 8,
            username: 'hoanganhadmin',
            email: 'hoanganhadmin@gmail.com',
            phone_number: '0912345678',
            full_name: 'Hoang Anh',
        },
        room_response: {
            user_id: 1,
            room_name: '❌XINH ĐẸP QUÁ!! Bancon 6TR5 Đủ Nội thất Nhé ạ',
        },
        created_at: '2023/02/07 17:01:46',
    },
];

export const Orders = () => {
    const navigate = useNavigate();

    return (
        <div className="m-card">
            <div className="d-flex justify-content-between">
                <h4 className="font-weight-bold">
                    Hóa đơn đã tạo- {rows.length} hóa đơn
                </h4>
            </div>
            <br />
            {rows.length && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell sx={{ width: '35%' }}>
                                    Dịch vụ
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Số tiền
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Phương thức thanh toán
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Ngày tạo
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Trạng thái
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row?.id}>
                                    <StyledTableCell
                                        component="th"
                                        scope="row"
                                        onClick={() =>
                                            navigate(`/room/${row?.room_id}`)
                                        }
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        {row?.room_response?.room_name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {convertToVND(row?.total)}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        Thanh toán qua Momo
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row?.created_at}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <span
                                            className={`${
                                                row?.is_paid
                                                    ? 'text-success'
                                                    : 'text-danger'
                                            }`}
                                        >
                                            {row?.is_paid
                                                ? 'Thành công'
                                                : 'Thất bại'}
                                        </span>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};
