import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export class Respostas extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
         id:0,
         idUsuario: '',
         idPergunta: '',
         solucao:'',
        
        };
      
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIdUsuarioChange = this.handleIdUsuarioChange.bind(this);
        this.handleIdPerguntaChange = this.handleIdPerguntaChange.bind(this);
        this.handleSolucaohange = this.handleSolucaoChange.bind(this);
        
      }
      
      handleSubmit(e) {
        alert('Um resposta foi enviado: ' + JSON.stringify(this.state));
        this.setState({
            id:0,
            idUsuario: '',
            idPergunta: '',
            solucao:'',
        });
        e.preventDefault();
      }
      
      handleIdUsuarioChange(e) {
        this.setState({
          idUsuario: e.target.value
        });
      }

      handleIdPerguntaChange(e) {
        this.setState({
          idPergunta: e.target.value
        });
      }
      
      handleSolucaoChange(e) {
        this.setState({
          solucao: e.target.value
        });
      }
      
      

      // GET (todas)
    buscarRespostas() {
    fetch('/api/Respostas')
      .then(response => response.json())
      .then(data => this.setState({ Resposta: data }));
  }
  
  // GET (por ID)
  buscarResposta(id) {
    fetch('/api/Respostas/' + id)
      .then(response => response.json())
      .then(data => this.setState({ Respostas: data }));
  }
  
  // POST
  inserirResposta(resposta) {
    fetch('/api/Respostas', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(resposta)
    }).then((resposta) => {
      if (resposta.ok) {
        /* Tratamento depois de completar o POST com status 200 OK */;
      } else {
        /* Tratamento em caso de erro no serviço */
      }
    });
  }
  
  // PUT
  atualizarResposta(resposta) {
    fetch('/api/Respostas/' + resposta.id, {
      method: 'put',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(resposta)
    }).then((resposta) => {
      if (resposta.ok) {
        /* Tratamento depois de completar o PUT com status 200 OK */;
      } else {
        /* Tratamento em caso de erro no serviço */
      }
    });
  }
  
  // DELETE
  excluirResposta(id) {
    fetch('/api/Respostas/' + id, {
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
            <Form.Label>Autor</Form.Label>
            <Form.Control type='text' placeholder='Autor da resposta' value={this.state.idUsuario} onChange={this.handleIdUsuarioChange} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Pergunta</Form.Label>
            <Form.Control type='text' placeholder='Pergunta da resposta' value={this.state.idPergunta} onChange={this.handleIdPerguntaChange} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Titulo</Form.Label>
            <Form.Control type='text' placeholder='Titulo<' value={this.state.solucao} onChange={this.handleSolucaoChange} />
        </Form.Group>
        <Button variant='primary' type='submit'>
            Inserir
        </Button>
        </Form>
    );
  }
}