import React, { Component } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import '../components/css/Stilo.css';

export class Video extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
         id:0,
         idModulo: '',
         titulo:'',
         modalAberta: false,
         videos: []
        
        };
      
        this.submit = this.submit.bind(this);
        this.handleIdModuloChange = this.handleIdModuloChange.bind(this);
        this.handleTituloChange = this.handleTituloChange.bind(this);
        this.cancelar = this.cancelar.bind(this);
        this.fecharModal = this.fecharModal.bind(this);
        this.abrirModalInserir = this.abrirModalInserir.bind(this);
        this.abrirModalAtualizar = this.abrirModalAtualizar.bind(this);
        
      }

      componentWillMount() {
        this.buscarVideos();
      }
      
      buscarVideos() {
        fetch('/api/Video')
          .then(response => response.json())
          .then(data => this.setState({ videos: data }));
      }
    
      buscarVideo(id) {
        fetch('/api/Video/' + id)
          .then(response => response.json())
          .then(data => this.setState(
            {
              id: data.id,
              idModulo: data.idModulo,
              titulo: data.titulo,
            }));
      }
      
      inserirVideo(video) {
        fetch('/api/Video', {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(video)
        }).then((resposta) => {
          if (resposta.ok) {
            this.buscarVideos();
            this.cancelar();
          } else {
            alert(JSON.stringify(resposta));
          }
        });
      }
    
      atualizarVideo(video) {
        fetch('/api/Video/' + video.id, {
          method: 'put',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(video)
        }).then((resposta) => {
          if (resposta.ok) {
            this.buscarVideos();
            this.cancelar();
          } else {
            alert(JSON.stringify(resposta));
          }
        });
      }
    
      excluirVideo(id) {
        console.log(id);
        fetch('/api/Video/' + id, {
          method: 'delete'
        }).then((resposta) => {
          if (resposta.ok) {
            this.buscarVideos();
            this.cancelar();
          } else {
            alert(JSON.stringify(resposta));
          }
        });
      }

      submit(e) {
        e.preventDefault();
    
        const video = {
          id: this.state.id,
          titulo: this.state.titulo,
          idModulo: this.state.idModulo
        };
    
        if (this.state.id === 0) {
          this.inserirVideo(video);
        } else {
          this.atualizarVideo(video);
        }
      }
    
      handleTituloChange(e) {
        this.setState({
          titulo: e.target.value
        });
      }
    
      handleIdModuloChange(e) {
        this.setState({
          idModulo: e.target.value
        });
      }
    
      cancelar() {
        this.setState({
          id: 0,
          titulo: '',
          idModulo:0,
          modalAberta: false
        });
      }
    
      fecharModal() {
        this.setState({
          modalAberta: false
        });
        this.cancelar();
      }
    
      abrirModalInserir() {
        this.setState({
          modalAberta: true
        })
      }
    
      abrirModalAtualizar(id) {
        this.setState({
          id: id,
          modalAberta: true
        });
    
        this.buscarVideos(id);
      }
    
      renderTabela() {
        let colunasTabela = [];
        for (var i = 0; i < this.state.videos.length; i++) {
          const video = this.state.videos[i];
          const coluna = (
          <tr key={video.id}>
            <td>{video.titulo}</td>
            <td>{video.idModulo}</td>
           
            <td>
              <div>
                <Button variant="link" onClick={() => this.abrirModalAtualizar(video.id)}>Atualizar</Button>
                <Button variant="link" onClick={() => this.excluirVideo(video.id)}>Excluir</Button>
              </div>
            </td>
          </tr>);
          colunasTabela.push(coluna);
        }
    
        return (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th> Titulo </th>
                <th> Identificador do Modulo </th>
                <th> Opções </th>
              </tr>
            </thead>
            <tbody>
              {colunasTabela}
            </tbody>
          </Table>
        );
      }
    
      renderModal() {
        return (
          <Modal show={this.state.modalAberta} onHide={this.fecharModal}>
            <Modal.Header closeButton>
              <Modal.Title>Cadastro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form id="modalForm" onSubmit={this.submit}>
                <Form.Group>
                  <Form.Label>titulo</Form.Label>
                  <Form.Control type='text' placeholder='Informe o Titulo' value={this.state.titulo} onChange={this.handleTituloChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Identificador do Modulo</Form.Label>
                  <Form.Control type='number' placeholder='Informe o Id do Modulo' value={this.state.idModulo} onChange={this.handleIdModuloChange} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.cancelar}>
                Cancelar
              </Button>
              <Button variant="primary" form="modalForm" type="submit">
                Confirmar
              </Button>
            </Modal.Footer>
          </Modal>
        );
      }
    
      render() {
        return (
          <div>
            <Button variant="primary" className="bt-cadastro" onClick={this.abrirModalInserir}>Cadastro</Button>
            {this.renderTabela()}
            {this.renderModal()}
          </div>
        );
      }
    
}