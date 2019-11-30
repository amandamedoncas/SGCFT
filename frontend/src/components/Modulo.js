import React, { Component } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import '../components/css/Stilo.css';

export class Modulo extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
         id:0,
         idTreinamento: '',
         titulo:'',
         modalAberta: false,
         modulos: []
        
        };
      
        this.submit = this.submit.bind(this);
        this.handleIdTreinamentoChange = this.handleIdTreinamentoChange.bind(this);
        this.handleTituloChange = this.handleTituloChange.bind(this);
        this.cancelar = this.cancelar.bind(this);
        this.fecharModal = this.fecharModal.bind(this);
        this.abrirModalInserir = this.abrirModalInserir.bind(this);
        this.abrirModalAtualizar = this.abrirModalAtualizar.bind(this);
        
      }

      componentWillMount() {
        this.buscarModulos();
      }
      
      buscarModulos() {
        fetch('/api/Modulo')
          .then(response => response.json())
          .then(data => this.setState({ modulos: data }));
      }
    
      buscarModulo(id) {
        fetch('/api/Modulo/' + id)
          .then(response => response.json())
          .then(data => this.setState(
            {
              id: data.id,
              idTreinamento: data.idTreinamento,
              titulo: data.titulo,
            }));
      }
      
      inserirModulo(modulo) {
        fetch('/api/Modulo', {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(modulo)
        }).then((resposta) => {
          if (resposta.ok) {
            this.buscarModulos();
            this.cancelar();
          } else {
            alert(JSON.stringify(resposta));
          }
        });
      }
    
      atualizarModulo(modulo) {
        fetch('/api/Modulo/' + modulo.id, {
          method: 'put',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(modulo)
        }).then((resposta) => {
          if (resposta.ok) {
            this.buscarModulos();
            this.cancelar();
          } else {
            alert(JSON.stringify(resposta));
          }
        });
      }
    
      excluirModulo(id) {
        console.log(id);
        fetch('/api/Modulo/' + id, {
          method: 'delete'
        }).then((resposta) => {
          if (resposta.ok) {
            this.buscarModulos();
            this.cancelar();
          } else {
            alert(JSON.stringify(resposta));
          }
        });
      }

      submit(e) {
        e.preventDefault();
    
        const modulo = {
          id: this.state.id,
          titulo: this.state.titulo,
          idTreinamento: this.state.idTreinamento
        };
    
        if (this.state.id === 0) {
          this.inserirModulo(modulo);
        } else {
          this.atualizarModulo(modulo);
        }
      }
    
      handleTituloChange(e) {
        this.setState({
          titulo: e.target.value
        });
      }
    
      handleIdTreinamentoChange(e) {
        this.setState({
          idTreinamento: e.target.value
        });
      }
    
      cancelar() {
        this.setState({
          id: 0,
          titulo: '',
          idTreinamento:0,
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
    
        this.buscarModulos(id);
      }
    
      renderTabela() {
        let colunasTabela = [];
        for (var i = 0; i < this.state.modulos.length; i++) {
          const modulo = this.state.modulos[i];
          const coluna = (
          <tr key={modulo.id}>
            <td>{modulo.titulo}</td>
            <td>{modulo.idTreinamento}</td>
           
            <td>
              <div>
                <Button variant="link" onClick={() => this.abrirModalAtualizar(modulo.id)}>Atualizar</Button>
                <Button variant="link" onClick={() => this.excluirModulo(modulo.id)}>Excluir</Button>
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
                <th> Identificador do Treinamento </th>
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
                  <Form.Label>Identificador do Treinamento</Form.Label>
                  <Form.Control type='number' placeholder='Informe o Id do Treinamento' value={this.state.idTreinamento} onChange={this.handleIdTreinamentoChange} />
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