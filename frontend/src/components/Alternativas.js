import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export class Alternativas extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          id: 0,
          idPergunta:0,
          texto: '',
          certoErrado: 0
        };
      
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIdPerguntaChange = this.handleIdPerguntaChange.bind(this);
        this.handleTextoChange = this.handleTextoChange.bind(this);
        this.handleCertoErradoChange = this.handleCertoErradoChange.bind(this);
      }
      
      handleSubmit(e) {
        alert('Uma alternativa foi enviada: ' + JSON.stringify(this.state));
        this.setState({
          id: 0,
          idPergunta:0,
          texto: '',
          certoErrado: 0
        });
        e.preventDefault();
      }
      
      handleIdPerguntaChange(e) {
        this.setState({
          idPergunta: e.target.value
        });
      }
      
      handleTextoChange(e) {
        this.setState({
          texto: e.target.value
        });
      }

      handleCertoErradoChange(e) {
        this.setState({
          certoErrado: e.target.value
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
            <Form.Label>Pergunta</Form.Label>
            <Form.Control type='text' placeholder='Pergunta' value={this.state.idPergunta} onChange={this.handleIdPerguntaChange} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Texto</Form.Label>
            <Form.Control type='text' placeholder='Texto' value={this.state.texto} onChange={this.handleTextoChange} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Certa</Form.Label>
            <Form.Control type='text' placeholder='Alternativa é certa?' value={this.state.certoErrado} onChange={this.handleCertoErradoChange} />
        </Form.Group>
        <Button variant='primary' type='submit'>
            Inserir
        </Button>
        </Form>
    );
  }
}