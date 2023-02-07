import React, { useEffect, useState } from 'react';
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
import { allOrdersFromUser } from '../../slices/post';
import { useDispatch } from 'react-redux';

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

export const Orders = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [listOrders, setListOrders] = useState([]);
    useEffect(() => {
        let unsub = false;

        dispatch(allOrdersFromUser())
            .unwrap()
            .then((res) => {
                if (!unsub) {
                    setListOrders(res.data.result);
                }
            })
            .catch((error) => {
                console.error(error);
            });

        return () => {
            unsub = true;
        };
    }, [dispatch]);

    return (
        <div className="m-card">
            <div className="d-flex justify-content-between">
                <h4 className="font-weight-bold">
                    Hóa đơn đã tạo- {listOrders.length} hóa đơn
                </h4>
            </div>
            <br />
            {listOrders.length && (
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
                            {listOrders.map((row) => (
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
