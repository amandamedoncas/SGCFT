import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export class Usuarios extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
         id:0,
         nome: '',
         email: '',
         cpf: '',
         senha:''
        };
      
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNomeChange = this.handleNomeChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleCpfChange = this.handleCpfChange.bind(this);
        this.handleSenhaChange = this.handleSenhaChange.bind(this);
      }
      
      handleSubmit(e) {
        alert('Um usuario foi enviado: ' + JSON.stringify(this.state));
        this.setState({
            id: 0,
            nome: '',
            email: '',
            cpf: '',
            senha:''
        });
        e.preventDefault();
      }
      
      handleNomeChange(e) {
        this.setState({
          nome: e.target.value
        });
      }
      
      handleEmailChange(e) {
        this.setState({
          email: e.target.value
        });
      }
      
      handleCpfChange(e) {
        this.setState({
          cpf: e.target.value
        });
      }
         handleSenhaChange(e) {
        this.setState({
          senha: e.target.value
        });
      }
      

      // GET (todas)
    buscarUsuarios() {
    fetch('/api/Usuarios')
      .then(response => response.json())
      .then(data => this.setState({ Usuarios: data }));
  }
  
  // GET (por ID)
  buscarUsuario(id) {
    fetch('/api/Usuarios/' + id)
      .then(response => response.json())
      .then(data => this.setState({ Usuarios: data }));
  }
  
  // POST
  inserirUsuario(usuario) {
    fetch('/api/Usuarios', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(usuario)
    }).then((resposta) => {
      if (resposta.ok) {
        /* Tratamento depois de completar o POST com status 200 OK */;
      } else {
        /* Tratamento em caso de erro no serviço */
      }
    });
  }
  
  // PUT
  atualizarUsuario(usuario) {
    fetch('/api/Usuarios/' + usuario.id, {
      method: 'put',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(usuario)
    }).then((resposta) => {
      if (resposta.ok) {
        /* Tratamento depois de completar o PUT com status 200 OK */;
      } else {
        /* Tratamento em caso de erro no serviço */
      }
    });
  }
  
  // DELETE
  excluirUsuario(id) {
    fetch('/api/Usuarios/' + id, {
      method: 'delete'
    }).then((resposta) => {
      if (resposta.ok) {
        /* Tratamento depois de completar o DELETE com status 200 OK */;
      } else {
        /* Tratamento em caso de erro no serviço */
      }
    });
  }
  


  render() {
    return (
        <Form onSubmit={this.handleSubmit}>
        <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control type='text' placeholder='Nome do usuario' value={this.state.nome} onChange={this.handleNomeChange} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type='text' placeholder='Email' value={this.state.email} onChange={this.handleEmailChange} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Cpf</Form.Label>
            <Form.Control type='text' placeholder='Cpf' value={this.state.cpf} onChange={this.handleCpfChange} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Senha</Form.Label>
            <Form.Control type='text' placeholder='Senha' value={this.state.senha} onChange={this.handleSenhaChange} />
        </Form.Group>
        <Button variant='primary' type='submit'>
            Inserir
        </Button>
        </Form>
    );
  }
}