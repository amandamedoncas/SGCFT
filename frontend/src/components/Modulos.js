import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export class Modulos extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
         id:0,
         treinamento: '',
         titulo:'',
        
        };
      
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTreinamentoChange = this.handleTreinamentoChange.bind(this);
        this.handleTituloChange = this.handleTituloChange.bind(this);
        
      }
      
      handleSubmit(e) {
        alert('Um modulo foi enviado: ' + JSON.stringify(this.state));
        this.setState({
            id:0,
            treinamento: '',
            titulo:'',
        });
        e.preventDefault();
      }
      
      handleTreinamentoChange(e) {
        this.setState({
          treinamento: e.target.value
        });
      }
      
      handleTituloChange(e) {
        this.setState({
          titulo: e.target.value
        });
      }
      
      

      // GET (todas)
    buscarModulos() {
    fetch('/api/Modulos')
      .then(response => response.json())
      .then(data => this.setState({ Modulo: data }));
  }
  
  // GET (por ID)
  buscarModulo(id) {
    fetch('/api/Modulos/' + id)
      .then(response => response.json())
      .then(data => this.setState({ Modulos: data }));
  }
  
  // POST
  inserirModulo(modulo) {
    fetch('/api/Modulos', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(modulo)
    }).then((resposta) => {
      if (resposta.ok) {
        /* Tratamento depois de completar o POST com status 200 OK */;
      } else {
        /* Tratamento em caso de erro no serviço */
      }
    });
  }
  
  // PUT
  atualizarModulo(modulo) {
    fetch('/api/Modulos/' + modulo.id, {
      method: 'put',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(modulo)
    }).then((resposta) => {
      if (resposta.ok) {
        /* Tratamento depois de completar o PUT com status 200 OK */;
      } else {
        /* Tratamento em caso de erro no serviço */
      }
    });
  }
  
  // DELETE
  excluirModulo(id) {
    fetch('/api/Modulos/' + id, {
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
            <Form.Label>Treinamento</Form.Label>
            <Form.Control type='text' placeholder='Treinamento do modulo' value={this.state.treinamento} onChange={this.handleTreinamentoChange} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Titulo</Form.Label>
            <Form.Control type='text' placeholder='Titulo<' value={this.state.titulo} onChange={this.handleTituloChange} />
        </Form.Group>
        <Button variant='primary' type='submit'>
            Inserir
        </Button>
        </Form>
    );
  }
}