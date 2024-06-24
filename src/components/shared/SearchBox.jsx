import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export const SearchBox = () => {
  return (
    <Form className="d-flex me-auto w-50">
      <InputGroup>
        <FormControl
          aria-describedby='button-search'
          placeholder="Search for products"
          type='text'
          name='q'
          id='q'
        />
        <Button variant="outline-primary" type='submit' id='button-search'>
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  )
}
