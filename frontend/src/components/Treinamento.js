import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export class Treinamento extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
         id:0,
         tema: '',
         idAutor: '',
         tipo:0,
         senha:''
        };
      
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTemaChange = this.handleTemaChange.bind(this);
        this.handleIdAutorChange = this.handleIdAutorChange.bind(this);
        this.handleTipoChange = this.handleTipoChange.bind(this);
        this.handleSenhaChange = this.handleSenhaChange.bind(this);
      }
      
      handleSubmit(e) {
        alert('Um treinamento foi enviado: ' + JSON.stringify(this.state));
        this.setState({
            id:0,
            tema: '',
            idAutor: '',
            tipo:0,
            senha:''
        });
        e.preventDefault();
      }
      
      handleTemaChange(e) {
        this.setState({
          tema: e.target.value
        });
      }
      
      handleIdAutorChange(e) {
        this.setState({
          idAutor: e.target.value
        });
      }
      
      handleTipoChange(e) {
        this.setState({
          tipo: e.target.value
        });
      }
         
      handleSenhaChange(e) {
        this.setState({
          senha: e.target.value
        });
      }
      

      // GET (todas)
    buscarTreinamentos() {
    fetch('/api/Treinamentos')
      .then(response => response.json())
      .then(data => this.setState({ Treinamento: data }));
  }
  
  // GET (por ID)
  buscarTreinamento(id) {
    fetch('/api/Treinamentos/' + id)
      .then(response => response.json())
      .then(data => this.setState({ Treinamentos: data }));
  }
  
  // POST
  inserirTreinamento(treinamento) {
    fetch('/api/Treinamentos', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(treinamento)
    }).then((resposta) => {
      if (resposta.ok) {
        /* Tratamento depois de completar o POST com status 200 OK */;
      } else {
        /* Tratamento em caso de erro no serviço */
      }
    });
  }
  
  // PUT
  atualizarTreinamento(treinamento) {
    fetch('/api/Treinamentos/' + treinamento.id, {
      method: 'put',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(treinamento)
    }).then((resposta) => {
      if (resposta.ok) {
        /* Tratamento depois de completar o PUT com status 200 OK */;
      } else {
        /* Tratamento em caso de erro no serviço */
      }
    });
  }
  
  // DELETE
  excluirTreinamento(id) {
    fetch('/api/Treinamentos/' + id, {
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
            <Form.Label>Tema</Form.Label>
            <Form.Control type='text' placeholder='Tema do treinamento' value={this.state.tema} onChange={this.handleTemaChange} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Autor</Form.Label>
            <Form.Control type='text' placeholder='Autor<' value={this.state.autor} onChange={this.handleIdAutorChange} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Tipo</Form.Label>
            <Form.Control type='number' placeholder='Tipo' value={this.state.tipo} onChange={this.handleTipoChange} />
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