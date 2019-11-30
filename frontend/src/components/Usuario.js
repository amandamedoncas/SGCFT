import React, { Component } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import '../components/css/Stilo.css';

export class Usuario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      cpf: '',
      nome: '',
      email: '',
      senha:'',
      modalAberta: false,
      usuarios: []
    };

    this.submit = this.submit.bind(this);
    this.handleCPFChange = this.handleCPFChange.bind(this);
    this.handleNomeChange = this.handleNomeChange.bind(this);
    this.handleSenhaChange = this.handleSenhaChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.cancelar = this.cancelar.bind(this);
    this.fecharModal = this.fecharModal.bind(this);
    this.abrirModalInserir = this.abrirModalInserir.bind(this);
    this.abrirModalAtualizar = this.abrirModalAtualizar.bind(this);
  }

  componentWillMount() {
    this.buscarUsuarios();
  }

  buscarUsuarios() {
    fetch('/api/Usuario')
      .then(response => response.json())
      .then(data => this.setState({ usuarios: data }));
  }

  buscarUsuario(id) {
    fetch('/api/Usuario/' + id)
      .then(response => response.json())
      .then(data => this.setState(
        {
          id: data.id,
          cpf: data.cpf,
          nome: data.nome,
          senha: data.senha,
          email: data.email
        }));
  }
  
  inserirUsuario(usuario) {
    fetch('/api/Usuario', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(usuario)
    }).then((resposta) => {
      if (resposta.ok) {
        this.buscarUsuarios();
        this.cancelar();
      } else {
        alert(JSON.stringify(resposta));
      }
    });
  }

  atualizarUsuario(usuario) {
    fetch('/api/Usuario/' + usuario.id, {
      method: 'put',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(usuario)
    }).then((resposta) => {
      if (resposta.ok) {
        this.buscarUsuarios();
        this.cancelar();
      } else {
        alert(JSON.stringify(resposta));
      }
    });
  }

  excluirUsuario(id) {
    console.log(id);
    fetch('/api/Usuario/' + id, {
      method: 'delete'
    }).then((resposta) => {
      if (resposta.ok) {
        this.buscarUsuarios();
        this.cancelar();
      } else {
        alert(JSON.stringify(resposta));
      }
    });
  }

  submit(e) {
    e.preventDefault();

    const usuario = {
      id: this.state.id,
      cpf: this.state.cpf,
      nome: this.state.nome,
      senha: this.state.senha,
      email: this.state.email
    };

    if (this.state.id === 0) {
      this.inserirUsuario(usuario);
    } else {
      this.atualizarUsuario(usuario);
    }
  }

  handleCPFChange(e) {
    this.setState({
      cpf: e.target.value
    });
  }

  handleNomeChange(e) {
    this.setState({
      nome: e.target.value
    });
  }


  handleEmailChange(e) {
    this.setState({
      email: e.target.value
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
      cpf: '',
      nome: '',
      senha:'',
      email: '',
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

    this.buscarUsuarios(id);
  }

  renderTabela() {
    let colunasTabela = [];
    for (var i = 0; i < this.state.usuarios.length; i++) {
      const usuario = this.state.usuarios[i];
      const coluna = (
      <tr key={usuario.id}>
        <td>{usuario.cpf}</td>
        <td>{usuario.nome}</td>
        <td>{usuario.email}</td>
        <td>{usuario.senha}</td>
        <td>
          <div>
            <Button variant="link" onClick={() => this.abrirModalAtualizar(usuario.id)}>Atualizar</Button>
            <Button variant="link" onClick={() => this.excluirUsuario(usuario.id)}>Excluir</Button>
          </div>
        </td>
      </tr>);
      colunasTabela.push(coluna);
    }

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th> CPF </th>
            <th> Nome </th>
            <th> Email </th>
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
          <Form id="FormCadastro" onSubmit={this.submit}>
            <Form.Group>
              <Form.Label>CPF</Form.Label>
              <Form.Control type='text' placeholder='Informe CPF' value={this.state.cpf} onChange={this.handleCPFChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control type='text' placeholder='Informe o Nome' value={this.state.nome} onChange={this.handleNomeChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type='text' placeholder='informe o Email' value={this.state.email} onChange={this.handleEmailChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Senha</Form.Label>
              <Form.Control type='text' placeholder='Informe a Senha' value={this.state.senha} onChange={this.handleSenhaChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="bt-can" variant="secondary" onClick={this.cancelar}>
            Cancelar
          </Button>
          <Button className="bt-con" variant="primary" form="modalForm" type="submit">
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