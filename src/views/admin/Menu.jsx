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
import MyLoading from './Modal';

export default function MenuListComposition() {
  const [open, setOpen] = React.useState(false);
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
          <MoreVertIcon/>
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
                    <MenuItem onClick={handleClose}>
                        <RemoveRedEyeIcon style={{color:'#3498DB', marginRight:'8px'}}/> Xem chi tiết
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <AddCircleIcon style={{color:'#3498DB', marginRight:'8px'}}/> Duyệt bài viết
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <CancelIcon style={{color:'#F1C40F', marginRight:'8px'}}/> Từ chối bài viết
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <RemoveCircleIcon style={{color:'#E74C3C', marginRight:'8px'}}/> Chặn bài viêt
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}

export function MenuListCompositionUsers({item}) {
    const [open, setOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState(item);
    const [openPopupInfo, setOpenPopupInfo] = React.useState(false);
    const [openUnlock, setOpenUnlock] = React.useState(false);
    const [promise, setPromise] = React.useState(false);

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
      setOpen(false)
      setOpenUnlock(true)
      setPromise(adminService.UnlockUser(currentUser.id))
    }

    const handleLockUser = () => {
      setOpen(false)
      setOpenUnlock(true)
      setPromise(adminService.LockUser(currentUser.id))
    }

    const handleDeleteUser = () => {
      setOpen(false)
      setOpenUnlock(true)
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
            <MoreVertIcon/>
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
                          <InfoIcon style={{color:'#3498DB', marginRight:'8px'}}/> Thông tin tài khoản
                      </MenuItem>
                      <MenuItem onClick={handleUnlockUser}>
                          <LockOpenIcon style={{color:'#2ECC71', marginRight:'8px'}}/> Mở khóa tài khoản
                      </MenuItem>
                      <MenuItem onClick={handleLockUser}>
                          <RemoveCircleIcon style={{color:'#F1C40F', marginRight:'8px'}}/> Chặn tài khoản
                      </MenuItem>
                      <MenuItem onClick={handleDeleteUser}>
                          <DeleteIcon style={{color:'#E74C3C', marginRight:'8px'}}/> Xóa tài khoản
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
          title={'Mở khóa tài khoản'}
          promise={promise}
        />
      </Stack>
    );
  }