import React, { Component } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import '../components/css/Stilo.css';

export class Resposta extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
         id:0,
         idUsuario:0,
         idPergunta:0,
         solucao:'',
         modalAberta: false,
         perguntas: []
        
        };
      
        this.submit = this.submit.bind(this);
        this.handleIdUsuarioChange = this.handleIdUsuarioChange.bind(this);
        this.handleIdPerguntaChange = this.handleIdPerguntaChange.bind(this);
        this.handleSolucaohange = this.handleSolucaoChange.bind(this);
        this.cancelar = this.cancelar.bind(this);
        this.fecharModal = this.fecharModal.bind(this);
        this.abrirModalInserir = this.abrirModalInserir.bind(this);
        this.abrirModalAtualizar = this.abrirModalAtualizar.bind(this);
        
      }

      componentWillMount() {
        this.buscarRespostas();
      }
      
      buscarRespostas() {
        fetch('/api/Resposta')
          .then(response => response.json())
          .then(data => this.setState({ resposta: data }));
      }
    
      buscarResposta(id) {
        fetch('/api/Resposta/' + id)
          .then(response => response.json())
          .then(data => this.setState(
            {
              id: data.id,
              idPergunta: data.idPergunta,
              idUsuario: data.idUsuario,
              solucao: data.solucao
            }));
      }
      
      inserirResposta(resposta) {
        fetch('/api/Resposta', {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(resposta)
        }).then((resposta) => {
          if (resposta.ok) {
            this.buscarRespostas();
            this.cancelar();
          } else {
            alert(JSON.stringify(resposta));
          }
        });
      }
    
      atualizarResposta(resposta) {
        fetch('/api/Resposta/' + resposta.id, {
          method: 'put',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(resposta)
        }).then((resposta) => {
          if (resposta.ok) {
            this.buscarRespostas();
            this.cancelar();
          } else {
            alert(JSON.stringify(resposta));
          }
        });
      }
    
      excluirResposta(id) {
        console.log(id);
        fetch('/api/Resposta/' + id, {
          method: 'delete'
        }).then((resposta) => {
          if (resposta.ok) {
            this.buscarRespostas();
            this.cancelar();
          } else {
            alert(JSON.stringify(resposta));
          }
        });
      }

      submit(e) {
        e.preventDefault();
    
        const resposta = {
          id: this.state.id,
          idPergunta: this.state.idPergunta,
          idUsuario: this.state.idUsuario,
          solucao: this.state.solucao
        };
    
        if (this.state.id === 0) {
          this.inserirResposta(resposta);
        } else {
          this.atualizarResposta(resposta);
        }
      }
    
      handleIdPerguntaChange(e) {
        this.setState({
          idPergunta: e.target.value
        });
      }

      handleIdUsuarioChange(e) {
        this.setState({
          idUsuario: e.target.value
        });
      }

      handleSolucaoChange(e) {
        this.setState({
          solucao: e.target.value
        });
      }
    
      cancelar() {
        this.setState({
          id: 0,
          idPergunta:0,
          idUsuario:0,
         solucao:'',
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
    
        this.buscarRespostas(id);
      }
    
      renderTabela() {
        let colunasTabela = [];
        for (var i = 0; i < this.state.respostas.length; i++) {
          const resposta = this.state.respostas[i];
          const coluna = (
          <tr key={resposta.id}>
            <td>{resposta.idPergunta}</td>
            <td>{resposta.idUsuario}</td>
            <td>{resposta.solucao}</td>
           
            <td>
              <div>
                <Button variant="link" onClick={() => this.abrirModalAtualizar(resposta.id)}>Atualizar</Button>
                <Button variant="link" onClick={() => this.excluirAlternativa(resposta.id)}>Excluir</Button>
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
                <th> Identificador do Usuario </th>
                <th> Solução </th>
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
                  <Form.Label>Identificador da Pergunta</Form.Label>
                  <Form.Control type='number' placeholder='Informe o Id da Pergunta' value={this.state.idPergunta} onChange={this.handleIdPerguntaChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Identificador do Usuario</Form.Label>
                  <Form.Control type='number' placeholder='Informe o Id do Usuario' value={this.state.idUsuario} onChange={this.handleIdUsuarioChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Alternativa certa</Form.Label>
                  <Form.Control type='number' placeholder='Informe a Solução ' value={this.state.solucao} onChange={this.handleSolucaoChange} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button className="bt-can" variant="secondary" onClick={this.cancelar}>
                Cancelar
              </Button>
              <Button className="bt-conf" variant="primary" form="modalForm" type="submit">
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
      
    
