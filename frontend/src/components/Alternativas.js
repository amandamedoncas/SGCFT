import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export class Alternativas extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          descricao: '',
          prioridade: 0
        };
      
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDescricaoChange = this.handleDescricaoChange.bind(this);
        this.handlePrioridadeChange = this.handlePrioridadeChange.bind(this);
      }
      
      handleSubmit(e) {
        alert('Uma alternativa foi enviada: ' + JSON.stringify(this.state));
        this.setState({
          descricao: '',
          prioridade: 0
        });
        e.preventDefault();
      }
      
      handleDescricaoChange(e) {
        this.setState({
          descricao: e.target.value
        });
      }
      
      handlePrioridadeChange(e) {
        this.setState({
          prioridade: e.target.value
        });
      }
      

      // GET (todas)
buscarAlternativas() {
    fetch('/api/alternativas')
      .then(response => response.json())
      .then(data => this.setState({ alternativas: data }));
  }
  
  // GET (por ID)
  buscarAlternativa(id) {
    fetch('/api/alternativas/' + id)
      .then(response => response.json())
      .then(data => this.setState({ alternativas: data }));
  }
  
  // POST
  inserirAlternativa(alternativa) {
    fetch('/api/alternativas', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(alternativa)
    }).then((resposta) => {
      if (resposta.ok) {
        /* Tratamento depois de completar o POST com status 200 OK */;
      } else {
        /* Tratamento em caso de erro no serviço */
      }
    });
  }
  
  // PUT
  atualizarAlternativa(alternativa) {
    fetch('/api/alternativas/' + alternativa.id, {
      method: 'put',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(alternativa)
    }).then((resposta) => {
      if (resposta.ok) {
        /* Tratamento depois de completar o PUT com status 200 OK */;
      } else {
        /* Tratamento em caso de erro no serviço */
      }
    });
  }
  
  // DELETE
  excluirAlternativa(id) {
    fetch('/api/alternativas/' + id, {
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
            <Form.Label>Descrição</Form.Label>
            <Form.Control type='text' placeholder='Descrição da alternativa' value={this.state.descricao} onChange={this.handleDescricaoChange} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Prioridade</Form.Label>
            <Form.Control type='number' placeholder='Prioridade' value={this.state.prioridade} onChange={this.handlePrioridadeChange} />
        </Form.Group>
        <Button variant='primary' type='submit'>
            Inserir
        </Button>
        </Form>
    );
  }
}