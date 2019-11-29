import React, { Component } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import '../components/css/Stilo.css';

export class Alternativa extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          id: 0,
          idPergunta:0,
          texto: '',
          certoErrado: false,
          modalAberta: false,
          alternativas: []
        };
      
        this.submit = this.submit.bind(this);
        this.handleIdPerguntaChange = this.handleIdPerguntaChange.bind(this);
        this.handleTextoChange = this.handleTextoChange.bind(this);
        this.handleCertoErradoChange = this.handleCertoErradoChange.bind(this);
        this.cancelar = this.cancelar.bind(this);
        this.fecharModal = this.fecharModal.bind(this);
        this.abrirModalInserir = this.abrirModalInserir.bind(this);
        this.abrirModalAtualizar = this.abrirModalAtualizar.bind(this);
      }
      
      componentWillMount() {
        this.buscarAlternativas();
      }
      
      buscarAlternativas() {
        fetch('/api/Alternativa')
          .then(response => response.json())
          .then(data => this.setState({ alternativa: data }));
      }
    
      buscarAlternativa(id) {
        fetch('/api/Alternativa/' + id)
          .then(response => response.json())
          .then(data => this.setState(
            {
              id: data.id,
              idPergunta: data.idPergunta,
              texto: data.texto,
              certoErrado: data.certoErrado
            }));
      }
      
      inserirAlternativa(alternativa) {
        fetch('/api/Alternativa', {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(alternativa)
        }).then((resposta) => {
          if (resposta.ok) {
            this.buscarAlternativas();
            this.cancelar();
          } else {
            alert(JSON.stringify(resposta));
          }
        });
      }
    
      atualizarAlternativa(alternativa) {
        fetch('/api/Alternativa/' + alternativa.id, {
          method: 'put',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(alternativa)
        }).then((resposta) => {
          if (resposta.ok) {
            this.buscarAlternativas();
            this.cancelar();
          } else {
            alert(JSON.stringify(resposta));
          }
        });
      }
    
      excluirAlternativa(id) {
        console.log(id);
        fetch('/api/Alternativa/' + id, {
          method: 'delete'
        }).then((resposta) => {
          if (resposta.ok) {
            this.buscarAlternativas();
            this.cancelar();
          } else {
            alert(JSON.stringify(resposta));
          }
        });
      }

      submit(e) {
        e.preventDefault();
    
        const alternativa = {
          id: this.state.id,
          texto: this.state.texto,
          idPergunta: this.state.idPergunta,
          certoErrado: this.state.certoErrado
        };
    
        if (this.state.id === 0) {
          this.inserirAlternativa(alternativa);
        } else {
          this.atualizarAlternativa(alternativa);
        }
      }
    
      handleTextoChange(e) {
        this.setState({
          texto: e.target.value
        });
      }
    
      handleIdPerguntaChange(e) {
        this.setState({
          idPergunta: e.target.value
        });
      }

      handleCertoErradoChange(e) {
        this.setState({
          certoErrado: e.target.value
        });
      }
    
      cancelar() {
        this.setState({
          id: 0,
          texto: '',
          idPergunta:0,
          certoErrado:false,
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
    
        this.buscarAlternativas(id);
      }
    
      renderTabela() {
        let colunasTabela = [];
        for (var i = 0; i < this.state.alternativas.length; i++) {
          const alternativa = this.state.alternativas[i];
          const coluna = (
          <tr key={alternativa.id}>
            <td>{alternativa.texto}</td>
            <td>{alternativa.idPergunta}</td>
            <td>{alternativa.certoErrado}</td>
           
            <td>
              <div>
                <Button variant="link" onClick={() => this.abrirModalAtualizar(alternativa.id)}>Atualizar</Button>
                <Button variant="link" onClick={() => this.excluirAlternativa(alternativa.id)}>Excluir</Button>
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
                <th> Identificador da Pergunta </th>
                <th> Alternativa certa </th>
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
                  <Form.Label>Identificador da Pergunta</Form.Label>
                  <Form.Control type='number' placeholder='Informe o Id da Pergunta' value={this.state.idPergunta} onChange={this.handleIdPerguntaChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Alternativa certa</Form.Label>
                  <Form.Control type='number' placeholder='Alternativa certa? ' value={this.state.certoErrado} onChange={this.handleCertoErradoChange} />
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