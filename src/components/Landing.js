import { Link } from 'react-router-dom';
import { Jumbotron, Button, DropdownButton, Dropdown, Row, Col } from 'react-bootstrap';

function Landing(props) {
  return (
    <Jumbotron 
      style={{ width: "80vw" }}
      className="questionBox rounded-3 bg-dark border border-success border-3">
      <Row className="text-center h1 text-success mb-3">
        <Col>
          Welcome to My Quiz App
        </Col>
      </Row>
      <Row>
        <Col className="mb-3">
          <p className="text-info text-left mb-3">
            In this app you will select a category, and answer 20 multiple choice questions related to the category you selected. After answering all questions you will be given your score.</p>
          <p className="text-info text-left mb-3">
            This App was created with React.js, React-Bootstrap, Axios, and Open Trivia DB.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <DropdownButton 
            id="dropdown-basic" 
            title={props.category} 
            onSelect={props.categorySelect}>
              {props.CatJson.map(cat => (
                <Dropdown.Item eventKey={ cat.id }>
                  { cat.name }
                </Dropdown.Item>
              ))}
          </DropdownButton>
        </Col>
        <Col>
          <Button className="px-6" variant="primary">
            <Link 
              to={{pathname:"/Quiz"}} 
              className="beginButton">
                Begin
            </Link>
          </Button>
        </Col> 
      </Row>
    </Jumbotron>
  )
}

export default Landing