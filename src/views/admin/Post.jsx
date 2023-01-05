import React from 'react'
import Header from '../../components/Header'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EnhancedTable from './Table'
import MenuListComposition from './Menu';

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
    disablePadding: true,
    label: 'Người đăng',
  },
  {
    id: 'title',
    numeric: true,
    disablePadding: false,
    label: 'Tiêu đề',
  },
  {
    id: 'created_at',
    numeric: true,
    disablePadding: false,
    label: 'Ngày tạo',
  },
  {
    id: 'type_room',
    numeric: true,
    disablePadding: false,
    label: 'Kiểu phòng',
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
        <EnhancedTable title={'Tất cả bài đăng'} headCells={headCells}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MenuListComposition/>
      </TabPanel>
    </div>
  )
}

export default Post