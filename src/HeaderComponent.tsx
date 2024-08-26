import React, { useState, useRef } from 'react';
import { Navbar, Nav, NavDropdown, Modal, Form, Button } from 'react-bootstrap';
import './HeaderComponent.css';

const HeaderComponent: React.FC = () => {
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handlePrint = () => {
        if (dropdownRef.current) {
            // Close the dropdown menu before printing
            const dropdownToggle = dropdownRef.current.querySelector('.dropdown-toggle');
            if (dropdownToggle) {
                (dropdownToggle as HTMLElement).click(); // Programmatically close the dropdown
            }
        }
        setTimeout(() => window.print(), 100); // Add a slight delay to ensure dropdown is closed
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
        setBugDescription('');
        handleCloseBugReportModal();
    };

    return (
        <div>
            <Navbar bg="light" className="navbar">
                <Navbar.Brand href="/voting-pywer" className="navbar-brand">Voting Pywer</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#/about" className="nav-link">About</Nav.Link>
                </Nav>
                <Nav>
                    <NavDropdown title="Settings" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={handlePrint} className="nav-dropdown-item">Print</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleBugReportClick} className="nav-dropdown-item">Report Bug</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>

            <Modal show={showBugReportModal} onHide={handleCloseBugReportModal}>
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title className="modal-title">Report Bug</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <Form>
                        <Form.Group controlId="bugDescription">
                            <Form.Label>Brief Description of the Bug</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter bug description"
                                value={bugDescription}
                                onChange={handleBugDescriptionChange}
                                className="form-control"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseBugReportModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitBugReport} className="btn-primary">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default HeaderComponent;