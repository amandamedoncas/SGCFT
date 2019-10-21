import React from 'react';
import { Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Home } from './components/Home';
import { Tarefas } from './components/Tarefas';

function App() {
  return (
    <Container className="">
      <BrowserRouter>
        <Navbar bg='light' expand='lg'>
          <Navbar.Brand as={Link} to="/">Nome da Minha Aplicação</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <NavDropdown title='Cadastros' id='basic-nav-dropdown'>
                <NavDropdown.Item as={Link} to='/tarefas'>Tarefas</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/tarefas" component={Tarefas} />
        </Switch>
      </BrowserRouter>

    </Container>
  );
}

export default App;
