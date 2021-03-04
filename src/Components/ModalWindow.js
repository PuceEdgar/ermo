import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap/";

const ModalButton = (props) => {
  const { setShow, name, classDescription } = props;
  return (
    <button className={classDescription} onClick={() => setShow(true)}>
      {name}
    </button>
  );
};

const ModalHeader = (props) => {
  const { name } = props;
  return (
    <Modal.Header closeButton>
      <Modal.Title>{name}</Modal.Title>
    </Modal.Header>
  );
};

const ModalBody = (props) => {
  const { bodyComponent, setShow } = props;

  return (
    <Modal.Body>
      {React.cloneElement(bodyComponent, { setShow: setShow })}
    </Modal.Body>
  );
};

const ModalFooter = (props) => {
  const { setShow } = props;

  return (
    <Modal.Footer>
      <Button
        type="button"
        className="btn btn-secondary"
        onClick={() => setShow(false)}
      >
        Close
      </Button>
    </Modal.Footer>
  );
};

const ModalWindow = (props) => {
  const { headerName, buttonName, bodyComponent, classDescription } = props;
  const [show, setShow] = useState(false);
  return (
    <>
      <ModalButton
        setShow={setShow}
        name={buttonName}
        classDescription={classDescription}
      />
      <Modal
        size="xl"
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="staticBackdropLabel"
      >
        <ModalHeader name={headerName} />
        <ModalBody bodyComponent={bodyComponent} setShow={setShow} />
        <ModalFooter setShow={setShow} />
      </Modal>
    </>
  );
};

export default ModalWindow;
