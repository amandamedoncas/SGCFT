import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export class Pergunta extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
         id:0,
         idModulo: 0,
         texto:'',
        
        };
      
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTituloChange = this.handleTextoChange.bind(this);
        
      }
      
      handleSubmit(e) {
        alert('Um pergunta foi enviado: ' + JSON.stringify(this.state));
        this.setState({
            id:0,
            idModulo: 0,
            texto:'',
        });
        e.preventDefault();
      }

      handleTituloChange(e) {
        this.setState({
          titulo: e.target.value
        });
      }
            
      handleIdModuloChange(e) {
        this.setState({
          titulo: e.target.value
        });
      }
      
      

      // GET (todas)
    buscarPerguntas() {
    fetch('/api/Perguntas')
      .then(response => response.json())
      .then(data => this.setState({ Pergunta: data }));
  }
  
  // GET (por ID)
  buscarPergunta(id) {
    fetch('/api/Perguntas/' + id)
      .then(response => response.json())
      .then(data => this.setState({ Perguntas: data }));
  }
  
  // POST
  inserirPergunta(pergunta) {
    fetch('/api/Perguntas', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(pergunta)
    }).then((resposta) => {
      if (resposta.ok) {
        /* Tratamento depois de completar o POST com status 200 OK */;
      } else {
        /* Tratamento em caso de erro no serviço */
      }
    });
  }
  
  // PUT
  atualizarPergunta(pergunta) {
    fetch('/api/Perguntas/' + pergunta.id, {
      method: 'put',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(pergunta)
    }).then((resposta) => {
      if (resposta.ok) {
        /* Tratamento depois de completar o PUT com status 200 OK */;
      } else {
        /* Tratamento em caso de erro no serviço */
      }
    });
  }
  
  // DELETE
  excluirPergunta(id) {
    fetch('/api/Perguntas/' + id, {
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
            <Form.Label>Texto</Form.Label>
            <Form.Control type='text' placeholder='Texto<' value={this.state.texto} onChange={this.handleTextoChange} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Modulo</Form.Label>
            <Form.Control type='text' placeholder='Texto<' value={this.state.idModulo} onChange={this.handleIdModuloChange} />
        </Form.Group>
        <Button variant='primary' type='submit'>
            Inserir
        </Button>
        </Form>
    );
  }
}