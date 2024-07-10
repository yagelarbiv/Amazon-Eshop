import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getFilterUrl } from '../../utils';

export const SearchBox = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { search } = useLocation();

  const submitHandler = (e) => {
    e.preventDefault();
    const filterURI = getFilterUrl(search, { query: query });
    navigate(filterURI);
  };

  useEffect(() => {
    getFilterUrl(search, { query: query });
    if (!query) {
      return;
    }
    const filterURI = getFilterUrl(search, { query: query });
    navigate(filterURI);
  }, [navigate, query, search]);

  return (
    <Form onSubmit={(e) => submitHandler(e)} className="d-flex me-auto w-50">
      <InputGroup>
        <FormControl
          aria-describedby='button-search'
          placeholder="Search for products"
          type='text'
          name='q'
          id='q'
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="outline-primary" type='submit' id='button-search'>
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  )
}
