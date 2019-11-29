import React, { Component } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import '../components/css/Stilo.css';

export class Pergunta extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
         id:0,
         idModulo: 0,
         texto:'',
         modalAberta: false,
         perguntas: []
        
        };
      
        this.submit = this.submit.bind(this);
        this.handleTextoChange = this.handleTextoChange.bind(this);
        this.handleIdModuloChange = this.handleIdModuloChange.bind(this);
        this.cancelar = this.cancelar.bind(this);
        this.fecharModal = this.fecharModal.bind(this);
        this.abrirModalInserir = this.abrirModalInserir.bind(this);
        this.abrirModalAtualizar = this.abrirModalAtualizar.bind(this);
        
      }

      componentWillMount() {
        this.buscarPerguntas();
      }
      
      buscarPerguntas() {
        fetch('/api/Pergunta')
          .then(response => response.json())
          .then(data => this.setState({ perguntas: data }));
      }
    
      buscarPergunta(id) {
        fetch('/api/Pergunta/' + id)
          .then(response => response.json())
          .then(data => this.setState(
            {
              id: data.id,
              idModulo: data.idModulo,
              texto: data.texto,
            }));
      }
      
      inserirPergunta(pergunta) {
        fetch('/api/Pergunta', {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(pergunta)
        }).then((resposta) => {
          if (resposta.ok) {
            this.buscarPerguntas();
            this.cancelar();
          } else {
            alert(JSON.stringify(resposta));
          }
        });
      }
    
      atualizarVideo(pergunta) {
        fetch('/api/Pergunta/' + pergunta.id, {
          method: 'put',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(pergunta)
        }).then((resposta) => {
          if (resposta.ok) {
            this.buscarPerguntas();
            this.cancelar();
          } else {
            alert(JSON.stringify(resposta));
          }
        });
      }
    
      excluirPergunta(id) {
        console.log(id);
        fetch('/api/Pergunta/' + id, {
          method: 'delete'
        }).then((resposta) => {
          if (resposta.ok) {
            this.buscarPerguntas();
            this.cancelar();
          } else {
            alert(JSON.stringify(resposta));
          }
        });
      }

      submit(e) {
        e.preventDefault();
    
        const pergunta = {
          id: this.state.id,
          texto: this.state.texto,
          idModulo: this.state.idModulo
        };
    
        if (this.state.id === 0) {
          this.inserirPergunta(pergunta);
        } else {
          this.atualizarPergunta(pergunta);
        }
      }
    
      handleTextoChange(e) {
        this.setState({
          texto: e.target.value
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
          texto: '',
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
    
        this.buscarPerguntas(id);
      }
    
      renderTabela() {
        let colunasTabela = [];
        for (var i = 0; i < this.state.perguntas.length; i++) {
          const pergunta = this.state.perguntas[i];
          const coluna = (
          <tr key={pergunta.id}>
            <td>{pergunta.texto}</td>
            <td>{pergunta.idModulo}</td>
           
            <td>
              <div>
                <Button variant="link" onClick={() => this.abrirModalAtualizar(pergunta.id)}>Atualizar</Button>
                <Button variant="link" onClick={() => this.excluirPergunta(pergunta.id)}>Excluir</Button>
              </div>
            </td>
          </tr>);
          colunasTabela.push(coluna);
        }
    
        return (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th> Texto </th>
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
                  <Form.Label>Texto</Form.Label>
                  <Form.Control type='text' placeholder='Informe o Texto' value={this.state.texto} onChange={this.handleTextoChange} />
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