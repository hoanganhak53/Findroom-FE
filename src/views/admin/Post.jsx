import React from 'react'
import Header from '../../components/Header'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EnhancedTable from './Table'
import MenuListComposition from './Menu';
import adminService from '../../services/admin.service';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Người đăng',
  },
  {
    id: 'room_name',
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
    id: 'room_type',
    numeric: false,
    disablePadding: false,
    label: 'Kiểu phòng',
  },
  {
    id: 'number_report',
    numeric: true,
    disablePadding: false,
    label: 'Số lần báo cáo',
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

const Post = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [pageReport, setPageReport] =  React.useState(0)
  const [limitReport, setLimitReport] =  React.useState(10)
  const [totalReport, setTotalReport] =  React.useState(0)
  const [report, setReport] = React.useState([])

  const [pagePending, setPagePending] =  React.useState(0)
  const [limitPending, setLimitPending] =  React.useState(10)
  const [totalPending, setTotalPending] =  React.useState(0)
  const [pending, setPending] = React.useState([])
  
  React.useEffect(()=>{
    const callApi = async () => {
      try {
        const res = await adminService.getPendingRoom(pagePending, limitPending)
        setPending(res.data.result)
        setTotalPending(res.data.total)
      } catch (error) {
        console.log("error", error)
      }
    }
    callApi()
  }, [pagePending, limitPending])

  React.useEffect(()=>{
    const callApi = async () => {
      try {
        const res = await adminService.getReportRoom(pageReport, limitReport)
        setReport(res.data.result)
        setTotalReport(res.data.total)
      } catch (error) {
        console.log("error", error)
      }
    }
    callApi()
  }, [pageReport, limitReport])

  return (
    <div className='admin__post'>
      <Header title={'Bài đăng phòng'} />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Tất cả bài đăng" {...a11yProps(0)} />
          <Tab label="Bài đăng chờ duyệt" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <EnhancedTable 
          title={'Tất cả bài đăng'} 
          headCells={headCells}
          rows={pending} 
          setRowsPerPage={setLimitPending} 
          rowsPerPage={limitPending} 
          setPage={setPagePending} 
          page={pagePending}
          total={totalPending}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MenuListComposition/>
      </TabPanel>
    </div>
  )
}

export default Post