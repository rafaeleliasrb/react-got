import React, { Component } from 'react';

class Casa extends Component {
    render() {
        window.$(document).ready(function() {
            window.$('.modal').modal();
        });

        let imagem = 'css/images/'+this.props.url;

        return (
            <div className="col s12 m4 l3">
                <div className="card">
                    <div className="card-image">
                        <img src={imagem} alt={this.props.casa} className={this.props.ativo ? '' : 'img-inativo'}></img>
                    </div>
                    <div className="card-content"> 
                        <p>{this.props.casa}</p>
                    </div>
                    <div className="card-action">
                        <a href="#modal1" onClick={this._abrirModal.bind(this)}
                            className="left">Ver descrição</a>
                        <a href="#" onClick={this._handleAlterar.bind(this)}>
                            {this.props.ativo ? 'Remover' : 'Incluir'}
                        </a>
                    </div>
                </div>
            </div> 
        );
    }
    
    _handleAlterar(event) {
        event.preventDefault();
        this.props.onAlterar(this.props.id);
    }

    _abrirModal(event) {
        event.preventDefault();
        const dadosModal = {
            casa: this.props.casa,
            lema: this.props.lema,
            descricao: this.props.descricao,
            membros: this.props.membros,
            url: this.props.url
        }
        this.props.montaModal(dadosModal);
    }
}

export default Casa;