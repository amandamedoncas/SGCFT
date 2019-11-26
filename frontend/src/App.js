import React from 'react';
import { Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Home } from './components/Home';
import { Tarefas } from './components/Tarefas';
import { Alternativas } from './components/Alternativas';
import { Usuarios } from './components/Usuarios';
import { Treinamentos } from './components/Treinamentos';
import { Modulos } from './components/Modulos';
import { Videos } from './components/Videos';
import { Perguntas } from './components/Perguntas';
import { Respostas } from './components/Respostas';
function App() {
  return (
    <Container className="">
      <BrowserRouter>
        <Navbar bg='light' expand='lg'>
          <Navbar.Brand as={Link} to="/">SGCFT</Navbar.Brand>
         
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <NavDropdown title='Cadastros' id='basic-nav-dropdown'>
                <NavDropdown.Item as={Link} to='/tarefas'>Tarefas</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/usuarios'>Usuarios</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/videos'>Videos</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/treinamentos'>Treinamento</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/modulos'>Modulos</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/perguntas'>Perguntas</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/alternativas'>Alternativas</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/respostas'>Respostas</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/tarefas" component={Tarefas} />
          <Route path="/alternativas" component={Alternativas} />
          <Route path="/usuarios" component={Usuarios} />
          <Route path="/treinamentos" component={Treinamentos} />
          <Route path="/modulos" component={Modulos} />
          <Route path="/modulos" component={Videos} />
          <Route path="/modulos" component={Perguntas} />
          <Route path="/modulos" component={Respostas} />
        </Switch>
      </BrowserRouter>

    </Container>
  );
}

export default App;
