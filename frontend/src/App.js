import React from 'react';
import { Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Home } from './components/Home';
import { Alternativa } from './components/Alternativa';
import { Usuario } from './components/Usuario';
import { Treinamento } from './components/Treinamento';
import { Modulo } from './components/Modulo';
import { Video } from './components/Video';
import { Pergunta } from './components/Pergunta';
import { Resposta } from './components/Resposta';
function App() {
  return (
    <Container className="">
      <BrowserRouter>
        <Navbar bg='light' expand='lg'>
        
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link as={Link} to="/"> Home </Nav.Link>
              <NavDropdown title='Cadastros' id='basic-nav-dropdown'>
                <NavDropdown.Item as={Link} to='/usuario'> Usuario </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/video'> Video </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/treinamento'> Treinamento </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/modulo'> Modulo </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/pergunta'> Pergunta </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/alternativa'> Alternativa </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/resposta'> Resposta </NavDropdown.Item>
              </NavDropdown>
              
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/alternativa" component={Alternativa} />
          <Route path="/usuario" component={Usuario} />
          <Route path="/treinamento" component={Treinamento} />
          <Route path="/modulo" component={Modulo} />
          <Route path="/video" component={Video} />
          <Route path="/pergunta" component={Pergunta} />
          <Route path="/resposta" component={Resposta} />
        </Switch>
      </BrowserRouter>

    </Container>
  );
}

export default App;
