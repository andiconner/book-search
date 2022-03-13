import React, { useState } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation} from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

import { REMOVE_BOOK } from '../utils/mutations';



const SavedBooks = () => {
  const [userData, setUserData] = useState({});
  const { data: userData } = useQuery(QUERY_GET_ME);
  const loggedIn = Auth.loggedIn();

  const handleDeleteBook = useMutation(REMOVE_BOOK, {
    variables: { bookId }
})
if (loading) return <div>...loading</div>
if (error) return <div>Error</div>
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    return userData.books.map(({bookId, authors, description, title, image, link}) => {


  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' nClick={handleDeleteBook}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
});
}

export default SavedBooks;
