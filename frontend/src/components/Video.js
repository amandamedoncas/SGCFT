import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export class Video extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
         id:0,
         idModulo: '',
         titulo:'',
        
        };
      
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIdModuloChange = this.handleIdModuloChange.bind(this);
        this.handleTituloChange = this.handleTituloChange.bind(this);
        
      }
      
      handleSubmit(e) {
        alert('Um video foi enviado: ' + JSON.stringify(this.state));
        this.setState({
            id:0,
            idModulo: '',
            titulo:'',
        });
        e.preventDefault();
      }
      
      handleIdModuloChange(e) {
        this.setState({
          idModulo: e.target.value
        });
      }
      
      handleTituloChange(e) {
        this.setState({
          titulo: e.target.value
        });
      }
      
      

      // GET (todas)
    buscarVideos() {
    fetch('/api/Videos')
      .then(response => response.json())
      .then(data => this.setState({ Video: data }));
  }
  
  // GET (por ID)
  buscarVideo(id) {
    fetch('/api/Videos/' + id)
      .then(response => response.json())
      .then(data => this.setState({ Videos: data }));
  }
  
  // POST
  inserirVideo(video) {
    fetch('/api/Videos', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(video)
    }).then((resposta) => {
      if (resposta.ok) {
        /* Tratamento depois de completar o POST com status 200 OK */;
      } else {
        /* Tratamento em caso de erro no serviço */
      }
    });
  }
  
  // PUT
  atualizarVideo(video) {
    fetch('/api/Videos/' + video.id, {
      method: 'put',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(video)
    }).then((resposta) => {
      if (resposta.ok) {
        /* Tratamento depois de completar o PUT com status 200 OK */;
      } else {
        /* Tratamento em caso de erro no serviço */
      }
    });
  }
  
  // DELETE
  excluirVideo(id) {
    fetch('/api/Videos/' + id, {
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
            <Form.Label>Modulo</Form.Label>
            <Form.Control type='text' placeholder='Modulo do video' value={this.state.idModulo} onChange={this.handleIdModuloChange} />
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