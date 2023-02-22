import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal } from 'react-bootstrap';
import { Avatar } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import adminService from '../../services/admin.service';
import PostService from '../../services/post.service';
import MyLoading from './Modal';
import { useNavigate } from 'react-router-dom';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function MenuListComposition({ item }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [openUnlock, setOpenUnlock] = React.useState(false);
  const [promise, setPromise] = React.useState(false);
  const [title, setTitle] = React.useState('')
  const navigate = useNavigate()

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleViewRoom = () => {
    setOpen(false)
    navigate('/room/' + item._id)
  }

  const handleCensorRoom = () => {
    setTitle('Duyệt bài viết')
    setOpen(false)
    setOpenUnlock(true)
    setPromise(adminService.SensorRoom(item._id))
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <MoreVertIcon />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleViewRoom}>
                      <RemoveRedEyeIcon style={{ color: '#3498DB', marginRight: '8px' }} /> Xem chi tiết
                    </MenuItem>
                    {
                      item.status !== 'active' ?
                        <MenuItem onClick={handleCensorRoom}>
                          <AddCircleIcon style={{ color: '#3498DB', marginRight: '8px' }} /> Duyệt bài viết
                        </MenuItem>
                        :
                        <></>
                    }
                    {/* {
                      item.status === 'active' ?
                        <MenuItem onClick={handleClose}>
                          <CancelIcon style={{ color: '#F1C40F', marginRight: '8px' }} /> Từ chối bài viết
                        </MenuItem>
                        :
                        <></>
                    }
                    <MenuItem onClick={handleClose}>
                      <RemoveCircleIcon style={{ color: '#E74C3C', marginRight: '8px' }} /> Chặn bài viêt
                    </MenuItem> */}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <MyLoading
          open={openUnlock}
          setOpen={setOpenUnlock}
          title={title}
          promise={promise}
        />
      </div>
    </Stack>
  );
}

export function MenuListCompositionUsers({ item, setItems }) {
  const [open, setOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(item);
  const [openPopupInfo, setOpenPopupInfo] = React.useState(false);
  const [openUnlock, setOpenUnlock] = React.useState(false);
  const [promise, setPromise] = React.useState(false);
  const [title, setTitle] = React.useState('');

  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleCloseModal = () => {
    setOpenPopupInfo(false)
  }

  const handleInforUser = () => {
    setOpenPopupInfo(true)
    setOpen(false)
  }

  const handleUnlockUser = () => {
    setItems(prev => {
      return prev.map(i => {
        if(i.id === item.id){
          i.status = 'active'
        }
        return i
      })
    })
    setOpen(false)
    setOpenUnlock(true)
    setTitle('Mở khóa tài khoản')
    setPromise(adminService.UnlockUser(currentUser.id))
  }

  const handleLockUser = () => {
    setItems(prev => {
      return prev.map(i => {
        if(i.id === item.id){
          i.status = 'inactive'
        }
        return i
      })
    })
    setOpen(false)
    setOpenUnlock(true)
    setTitle('Chặn tài khoản')
    setPromise(adminService.LockUser(currentUser.id))
  }

  const handleDeleteUser = () => {
    setOpen(false)
    setOpenUnlock(true)
    setTitle('Xóa tài khoản')
    setPromise(adminService.DeleteUser(currentUser.id))
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <MoreVertIcon />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleInforUser}>
                      <InfoIcon style={{ color: '#3498DB', marginRight: '8px' }} /> Thông tin tài khoản
                    </MenuItem>
                    {item.status === 'active' ?
                      <MenuItem onClick={handleLockUser}>
                        <RemoveCircleIcon style={{ color: '#F1C40F', marginRight: '8px' }} /> Chặn tài khoản
                      </MenuItem>
                      : <MenuItem onClick={handleUnlockUser}>
                        <LockOpenIcon style={{ color: '#2ECC71', marginRight: '8px' }} /> Mở khóa tài khoản
                      </MenuItem>
                    }
                    <MenuItem onClick={handleDeleteUser}>
                      <DeleteIcon style={{ color: '#E74C3C', marginRight: '8px' }} /> Xóa tài khoản
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <div className='modal__admin'>
        <Modal show={openPopupInfo} onHide={handleCloseModal} centered>
          <Modal.Header>
            <Modal.Title>Thông tin tài khoản</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="m-card">
              <Avatar
                sx={{ width: 72, height: 72 }}
                src={currentUser.avatar_url}
              ></Avatar>
              <div className="col-lg-6 col-md-4 my-3">
                <h5 className="font-weight-bold">
                  {currentUser.full_name
                    ? currentUser.full_name
                    : currentUser.username}
                </h5>
              </div>
              <div className="col-12">
                <div className="d-flex my-3">
                  <DateRangeIcon color="action" />
                  <span className="ml-1 mr-1 text-muted">
                    Ngày tham gia:
                  </span>
                  <span>10/12/2022</span>
                </div>
                <div className="d-flex mb-3">
                  <MailOutlineIcon color="action" />
                  <span className="ml-1 mr-1 text-muted">Email:</span>
                  <span>{currentUser.email}</span>
                </div>
                <div className="d-flex">
                  <PhoneAndroidIcon color="action" />
                  <span className="ml-1 mr-1 text-muted">
                    Số điện thoại:
                  </span>
                  <span>{currentUser.phone_number}</span>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <MyLoading
        open={openUnlock}
        setOpen={setOpenUnlock}
        title={title}
        promise={promise}
      />
    </Stack>
  );
}

export function MenuListCompositionReport({ item, setRefresh, refresh }) {
  const [open, setOpen] = React.useState(false);
  const [openUnlock, setOpenUnlock] = React.useState(false);
  const [promise, setPromise] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const navigate = useNavigate()

  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleInforRoom = () => {
    navigate('/room/' + item.room_id)
    setOpen(false)
  }

  const handleLockUser = (id) => {
    setOpen(false)
    setOpenUnlock(true)
    setTitle('Chặn tài khoản')
    setRefresh(!refresh)
    setPromise(adminService.LockUser(id))
  }

  const handleDeleteRoom = () => {
    setOpen(false)
    setOpenUnlock(true)
    setTitle('Xóa bài bị báo cáo')
    setRefresh(!refresh)
    setPromise(PostService.delPost(item.room_id))
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <MoreVertIcon />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleInforRoom}>
                      <VisibilityIcon style={{ color: '#3498DB', marginRight: '8px' }} /> Xem bài bị tố cáo
                    </MenuItem>
                    <MenuItem onClick={handleDeleteRoom}>
                      <DeleteIcon style={{ color: '#E74C3C', marginRight: '8px' }} /> Xóa bài bị tố cáo
                    </MenuItem>
                    {/* <MenuItem>
                      <BlockOutlinedIcon style={{ color: '#2ECC71', marginRight: '8px' }} /> Hủy báo cáo
                    </MenuItem> */}
                    <MenuItem onClick={() => { handleLockUser(item.user_id) }}>
                      <LockOutlinedIcon style={{ color: '#F1C40F', marginRight: '8px' }} /> Khoá người dùng
                    </MenuItem>
                    {/* <MenuItem onClick={() => { handleLockUser(item.room_response.user_id) }}>
                      <RemoveCircleIcon style={{ color: '#E74C3C', marginRight: '8px' }} /> Chặn tài khoản
                    </MenuItem> */}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <MyLoading
        open={openUnlock}
        setOpen={setOpenUnlock}
        title={title}
        promise={promise}
      />
    </Stack>
  );
}

export function MenuListCompositionReceipts({ item, setRefresh, refresh }) {
  const [open, setOpen] = React.useState(false);
  const [openPopupInfo, setOpenPopupInfo] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleInfor= () => {
    setOpenPopupInfo(true)
    setOpen(false)
  }

  const handleCloseModal = () => {
    setOpenPopupInfo(false)
  }
  
  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <MoreVertIcon />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleInfor}>
                      <VisibilityIcon style={{ color: '#3498DB', marginRight: '8px' }} /> Xem chi tiết hóa đơn
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <div className='modal__admin'>
        <Modal show={openPopupInfo} onHide={handleCloseModal} centered>
          <Modal.Header>
            <Modal.Title>Thông tin hóa đơn</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="m-card">
              <div className="col-12">
                <div className="d-flex my-3">
                  <span className="ml-1 mr-1 text-muted">
                    Tài khoản:
                  </span>
                  <span>{item.owner.full_name}</span>
                </div>
                <div className="d-flex my-3">
                  <span className="ml-1 mr-1 text-muted">
                    Tên phòng:
                  </span>
                  <span>{' ' + item.room_response.room_name}</span>
                </div>
                <div className="d-flex my-3">
                  <span className="ml-1 mr-1 text-muted">
                    Ngày tạo:
                  </span>
                  <span>{item.created_at}</span>
                </div>
                <div className="d-flex my-3">
                  <span className="ml-1 mr-1 text-muted">
                    Hình thức thanh toán:
                  </span>
                  <span>Momo</span>
                </div>
                <div className="d-flex my-3">
                  <span className="ml-1 mr-1 text-muted">
                    Số tiền:
                  </span>
                  <span>{item.total + ' VNĐ'}</span>
                </div>
                <div className="d-flex my-3">
                  <span className="ml-1 mr-1 text-muted">
                    Trạng thái:
                  </span>
                  <span>Thành công</span>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Stack>
  );
}