import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SSRProvider from 'react-bootstrap/SSRProvider';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';

// Photo Gallery Component
const PhotoGallery = ({ photos }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const photosPerPage = 20; // Number of photos per page

    // Calculate the index of the first and last photo for the current page
    const indexOfLastPhoto = currentPage * photosPerPage;
    const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
    const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

    // Determine the total number of pages
    const totalPages = Math.ceil(photos.length / photosPerPage);

    // Handle pagination click
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Generate pagination items
    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => handlePageChange(number)}
            >
                {number}
            </Pagination.Item>
        );
    }

    return (
        <Container>
            <h2 className="mb-4">Photo Gallery</h2>
            <Row xs={1} md={3} className="g-4">
                {currentPhotos.map((photo) => (
                    <Col key={photo.id}>
                        <Card>
                            <Card.Img variant="top" src={photo.thumbnailUrl} alt={photo.title} />
                            <Card.Body>
                                <Card.Title>{photo.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Pagination Component */}
            <Pagination className="mt-4 justify-content-center">
                {paginationItems}
            </Pagination>
        </Container>
    );
};

// Example Home Component
const Home = () => (
    <Container>
        <h2>Home Page</h2>
        <p>Welcome to the Home page!</p>
    </Container>
);

// Main App Component with Routing
const App = ({ photosString }) => {
    return (
        <SSRProvider>
            <Router basename="/test">
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                                <Nav.Link as={Link} to="/">Gallery</Nav.Link>
                                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">
                                        Separated link
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<PhotoGallery photos={photosString} />} />
                </Routes>
            </Router>
        </SSRProvider>
    );
};

export { App };
