import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Modal, Form, Button } from 'react-bootstrap';

const HeaderComponent: React.FC = () => {

    const handlePrint = () => {
        window.print();
      };

    const [showBugReportModal, setShowBugReportModal] = useState(false);
    const [bugDescription, setBugDescription] = useState('');

    const handleBugReportClick = () => {
        setShowBugReportModal(true);
    };

    const handleCloseBugReportModal = () => {
        setShowBugReportModal(false);
    };

    const handleBugDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBugDescription(event.target.value);
    };

    const handleSubmitBugReport = () => {
        // Add your logic to submit the bug report
        // You can use the 'bugDescription' state variable here
        // For simplicity, we are just closing the modal in this example
        setBugDescription('');
        handleCloseBugReportModal();
    };

  return (
    <div>
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/voting-pywer" style = {{marginLeft: '17px'}}>Voting Pywer</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
            <Nav className="mr-auto">
            <Nav.Link href="#/about">About</Nav.Link>
            </Nav>
            <Nav>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handlePrint}>Print</NavDropdown.Item>
                <NavDropdown.Item onClick={handleBugReportClick}>Report Bug</NavDropdown.Item>
            </NavDropdown>
            </Nav>
        </Navbar.Collapse>
        </Navbar>

      <Modal show={showBugReportModal} onHide={handleCloseBugReportModal}>
        <Modal.Header closeButton>
          <Modal.Title>Report Bug</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="bugDescription">
              <Form.Label>Brief Description of the Bug</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter bug description"
                value={bugDescription}
                onChange={handleBugDescriptionChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseBugReportModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitBugReport}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default HeaderComponent;
