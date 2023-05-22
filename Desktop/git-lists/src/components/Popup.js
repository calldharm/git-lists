import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react'

// A fluid reusable popup for entire app
// export default function Popup (
const Popup = (
    toggle=false,
    title="Warning", 
    body="Are you sure you want to take this action!", 
    closeTile="Close", 
    saveTitle="Save", 
    hideClose=false, 
    hideSave=true, 
    crossButtonHide=false
    ) =>
    {
        // const [hide, setHide] = useState(toggle)
        return (
            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
                hidden={false}
            >

            {toggle && (
               <Modal.Dialog>
                {/* <Modal.Header closeButton hidden={crossButtonHide} onClick={() => setHide(!toggle)} > */}
                <Modal.Header closeButton hidden={crossButtonHide} onClick={() => !toggle} >
                <Modal.Title style={{ overflowY:'auto' }}>
                    {title}
                </Modal.Title>
                </Modal.Header>

                <Modal.Body style={{ height:'8rem', maxHeight: '8rem', minHeight: '8rem', overflowY:'auto' }}>
                <p>{body}.</p>
                </Modal.Body>

                <Modal.Footer>
                {/* <Button variant="secondary" hidden={hideClose} onClick={() => setToggle(!toggle)}  > {closeTile} </Button>
                <Button variant="primary" hidden={hideSave} onClick={() => setToggle(!toggle)}  > {saveTitle} </Button> */}
                <Button variant="secondary" hidden={hideClose} onClick={() => !toggle}  > {closeTile} </Button>
                <Button variant="primary" hidden={hideSave} onClick={() => !toggle}  > {saveTitle} </Button>
                </Modal.Footer>
            </Modal.Dialog>
            )}

            </div>
        );
}

export default Popup