import React, { Component } from 'react';
import Casa from './Casa';
import EstoriaForm from './EstoriaForm';
import ModalBottom from './ModalBottom';
import jQuery from 'jquery';

class Taskboard extends Component {
    constructor() {
        super();
        this.state = {
            casas : [],
            showModal: false,
            dadosModal : {
                casa: '',
                lema: '',
                descricao: '',
                membros: '',
                url: ''
            }
        }
    }

    componentWillMount() {
        this._buscarCasas();
    }

    _buscarCasas() {
        jQuery.ajax({
            method: 'GET',
            url: `http://localhost:3001/casas`,
            success: casas => this.setState({ 
                casas: casas                
            })
        });        
    }
    render() {
        const casasAtivas = this._getCasasAtivas();
        const casasInativas = this._getCasasInativas();
        const modal = this._getModal();

        return (
            <div>
                <div className="section no-pad-bot" id="index-banner">
                    <div className="container">
                        <h3>Minhas Casas Desk</h3>
                        <div className="row">
                            {casasAtivas}
                        </div>

                        <h3>Casas Disponíveis</h3>
                        <div className="row">
                            {casasInativas}
                        </div>
                    </div>
                    {modal}
                </div>
            </div>
        );
    }
     _getCasasAtivas() {
        let casasAtivas = this.state.casas.filter(item => item.ativo === true);
        console.log("casasAtivas: " + casasAtivas);
        return casasAtivas.map(casa => 
            <Casa 
                casa={casa.casa} descricao={casa.descricao} url={casa.url}
                membros={casa.membros} brasao={casa.brasao} lema={casa.lema}
                key={casa.id}
                id={casa.id}
                ativo={casa.ativo}
                onAlterar={this._alterar.bind(this)}
                montaModal={this._montaModal.bind(this)}/>);
    }

     _getCasasInativas() {
        let casasInativas = this.state.casas.filter(item => item.ativo === false);
        return casasInativas.map(casa => 
            <Casa 
                casa={casa.casa} descricao={casa.descricao} url={casa.url}
                membros={casa.membros} brasao={casa.brasao} lema={casa.lema}
                key={casa.id}
                id={casa.id}
                ativo={casa.ativo}
                onAlterar={this._alterar.bind(this)}
                montaModal={this._montaModal.bind(this)}/>);
    }    

    _getTitulo(totalDeEstorias) {
        let titulo;
        if(totalDeEstorias === 0) {
            titulo = "Backlog vazio";
        }
        else if(totalDeEstorias === 1) {
            titulo = "1 casa";
        }
        else {
            titulo = `${totalDeEstorias} casas`;
        }
        return titulo;
    }

    componentDidMount() {
        this._timer = setInterval(() => this._buscarCasas(), 5000);
    }

    componentWillUnmount() {
        console.log("Limpando o interval...");
        clearInterval(this._timer);
    }

  _alterar(id) {
        let casas = this.state.casas;

        let index = casas.findIndex(item => item.id === id);
        casas[index].ativo = !casas[index].ativo;

            this.setState({
                casas: casas
            });

        jQuery.ajax({
            method: 'PUT',
            data: JSON.stringify(casas[index]),
            url: `http://localhost:3001/casas/${id}`,
            contentType: "application/json",
        })                   
    }//fim ativar


    _getModal() {
        return (<ModalBottom casa={this.state.dadosModal.casa} 
                    lema={this.state.dadosModal.lema} 
                    descricao={this.state.dadosModal.descricao} 
                    membros={this.state.dadosModal.membros}
                    url={this.state.dadosModal.url}/>);
    }

    _montaModal(dadosModal) {
        const dados = { 
                casa: dadosModal.casa,
                lema: dadosModal.lema,
                descricao: dadosModal.descricao,
                membros: dadosModal.membros,
                url: dadosModal.url
            }
        
        this.setState({dadosModal : dados});
    }
}

export default Taskboard;