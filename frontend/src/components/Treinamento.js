import React, { Component } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import '../components/css/Stilo.css';

export class Treinamento extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
         id:0,
         tema: '',
         idAutor: '',
         tipo:0,
         senha:'',
         modalAberta: false,
         treinamentos: []
        };
      
        this.submit = this.submit.bind(this);
        this.handleTemaChange = this.handleTemaChange.bind(this);
        this.handleIdAutorChange = this.handleIdAutorChange.bind(this);
        this.handleTipoChange = this.handleTipoChange.bind(this);
        this.handleSenhaChange = this.handleSenhaChange.bind(this);
        this.cancelar = this.cancelar.bind(this);
        this.fecharModal = this.fecharModal.bind(this);
        this.abrirModalInserir = this.abrirModalInserir.bind(this);
        this.abrirModalAtualizar = this.abrirModalAtualizar.bind(this);
      }

      componentWillMount() {
        this.buscarTreinamentos();
      }
    
      buscarTreinamentos() {
        fetch('/api/Treinamento')
          .then(response => response.json())
          .then(data => this.setState({ treinamentos: data }));
      }
    
      buscarTreinamento(id) {
        fetch('/api/Treinamento/' + id)
          .then(response => response.json())
          .then(data => this.setState(
            {
              id: data.id,
              tema: data.cpf,
              idAutor: data.nome,
              senha: data.senha,
              tipo: data.email
            }));
      }
      
      inserirTreinamento(treinamento) {
        fetch('/api/Treinamento', {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(treinamento)
        }).then((resposta) => {
          if (resposta.ok) {
            this.buscarTreinamentos();
            this.cancelar();
          } else {
            alert(JSON.stringify(resposta));
          }
        });
      }
    
      atualizarTreinamento(treinamento) {
        fetch('/api/Treinamento/' + treinamento.id, {
          method: 'put',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(treinamento)
        }).then((resposta) => {
          if (resposta.ok) {
            this.buscarTreinamentos();
            this.cancelar();
          } else {
            alert(JSON.stringify(resposta));
          }
        });
      }
    
      excluirTreinamento(id) {
        console.log(id);
        fetch('/api/Treinamento/' + id, {
          method: 'delete'
        }).then((resposta) => {
          if (resposta.ok) {
            this.buscarTreinamentos();
            this.cancelar();
          } else {
            alert(JSON.stringify(resposta));
          }
        });
      }
    
      submit(e) {
        e.preventDefault();
    
        const treinamento = {
          id: this.state.id,
          tema: this.state.cpf,
          idAutor: this.state.nome,
          senha: this.state.senha,
          tipo: this.state.email
        };
    
        if (this.state.id === 0) {
          this.inserirTreinamento(treinamento);
        } else {
          this.atualizarTreinamento(treinamento);
        }
      }
    
      handleTemaChange(e) {
        this.setState({
          tema: e.target.value
        });
      }
    
      handleIdAutorChange(e) {
        this.setState({
          idAutor: e.target.value
        });
      }
    
    
      handleTipoChange(e) {
        this.setState({
          tipo: e.target.value
        });
      }
    
      handleSenhaChange(e) {
        this.setState({
          senha: e.target.value
        });
      }
    
      cancelar() {
        this.setState({
          id: 0,
          tema: '',
          idAutor:0,
          senha:'',
          tipo: '',
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
    
        this.buscarTreinamentos(id);
      }
    
      renderTabela() {
        let colunasTabela = [];
        for (var i = 0; i < this.state.treinamentos.length; i++) {
          const treinamento = this.state.treinamentos[i];
          const coluna = (
          <tr key={treinamento.id}>
            <td>{treinamento.tema}</td>
            <td>{treinamento.idAutor}</td>
            <td>{treinamento.tipo}</td>
            <td>{treinamento.senha}</td>
            <td>
              <div>
                <Button variant="link" onClick={() => this.abrirModalAtualizar(treinamento.id)}>Atualizar</Button>
                <Button variant="link" onClick={() => this.excluirTreinamento(treinamento.id)}>Excluir</Button>
              </div>
            </td>
          </tr>);
          colunasTabela.push(coluna);
        }
    
        return (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th> Tema </th>
                <th> Identificador do Autor </th>
                <th> Tipo </th>
                <th> Senha </th>
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
                  <Form.Label>Tema</Form.Label>
                  <Form.Control type='text' placeholder='Informe o Tema' value={this.state.tema} onChange={this.handleTemaChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Identificador do Autor</Form.Label>
                  <Form.Control type='number' placeholder='Informe o Id do Autor' value={this.state.idAutor} onChange={this.handleIdAutorChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Tipo</Form.Label>
                  <Form.Control type='text' placeholder='informe o tipo de treinamento' value={this.state.tipo} onChange={this.handleTipoChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type='text' placeholder='Informe a Senha' value={this.state.senha} onChange={this.handleSenhaChange} />
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