import React, {useState} from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';

interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

function PhotoGallery({ photos }: {
    photos: Photo[];
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const photosPerPage = 20;

    const indexOfLastPhoto = currentPage * photosPerPage;
    const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
    const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

    const totalPages = Math.ceil(photos.length / photosPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

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
        <>
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

                <Pagination className="mt-4 justify-content-center">
                    {paginationItems}
                </Pagination>
            </Container>
        </>
    );
}

export { PhotoGallery, Photo };
