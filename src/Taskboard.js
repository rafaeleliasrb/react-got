import React, { Component } from 'react';
import Estoria from './Estoria';
import EstoriaForm from './EstoriaForm';
import ModalBottom from './ModalBottom';
import jQuery from 'jquery';

class Taskboard extends Component {
    constructor() {
        super();
        this.state = {
            estorias : [],
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
        this._buscarEstorias();
    }

    _buscarEstorias() {
        jQuery.ajax({
            method: 'GET',
            url: 'http://localhost:3001/casas',
            success: estorias => this.setState({estorias})
        });
    }

    render() {
        const estorias = this._getEstorias();
        /*const titulo = this._getTitulo(estorias.length);*/
        const modal = this._getModal();

        return (
            <div className="section no-pad-bot" id="index-banner">
                <div className="container">
                    <EstoriaForm adicionarEstoria={this._adicionarEstoria.bind(this)}/>

                    {/*<h1 className="header center orange-text">Casas GoT</h1>
                    <h3>{titulo}</h3>*/}
                    <div className="row">
                        <div className="col s12 cards-container">
                            {estorias}
                        </div>
                    </div>
                    {modal}
                </div>
            </div>
        );
    }

    _adicionarEstoria(casa, lema, descricao, brasao, membros, url) {
        const estoria = {
            casa, 
            lema, 
            descricao, 
            brasao, 
            membros, 
            url
        };
        jQuery.post('http://localhost:3001/casas', estoria)
            .done(novaEstoria => {
                this.setState({estorias: this.state.estorias.concat([novaEstoria])}
            );
        }); 
    }

     _getEstorias() {
        return this.state.estorias.map(casa => 
            <Estoria 
                casa={casa.casa} descricao={casa.descricao} url={casa.url}
                membros={casa.membros} brasao={casa.brasao} lema={casa.lema}
                key={casa.id}
                id={casa.id}
                onDelete={this._excluirEstoria.bind(this)}
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
        this._timer = setInterval(() => this._buscarEstorias(), 5000);
    }

    componentWillUnmount() {
        console.log("Limpando o interval...");
        clearInterval(this._timer);
    }

    _excluirEstoria(idEstoria) {
        jQuery.ajax({
            method: 'DELETE',
            url: `http://localhost:3001/casas/${idEstoria}`
        });
        
        this.setState({estorias: this.state.estorias.filter(item => item.id !== idEstoria)});
    }

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