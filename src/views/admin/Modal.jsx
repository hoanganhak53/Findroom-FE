import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import DelayingAppearance from './Loading'

const MyLoading = ({open, setOpen, title, promise}) => {
    const handleCloseModal = () => {
        setOpen(false)
    }
    return (
        <div className='modal'>
            <Modal show={open} onHide={handleCloseModal} centered>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <DelayingAppearance promise={promise}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MyLoading