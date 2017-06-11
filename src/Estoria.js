import React, { Component } from 'react';

class Estoria extends Component {
    render() {
        window.$(document).ready(function() {
            window.$('.modal').modal();
        });

        let imagem = 'css/images/'+this.props.url;

        return (
            <div className="col s12 m4 l3">
                <div className="card height-l">
                    <div className="card-image">
                        <img src={imagem} alt={this.props.casa}></img>
                    </div>
                    <div className="card-content"> 
                        <p>{this.props.casa}</p>
                    </div>
                    <div className="card-action">
                        {/*<a className="activator" href="#" onClick={this._handleClick.bind(this)}>{textoBotao}</a>*/}
                        <a href="#modal1" onClick={this._abrirModal.bind(this)}>Descrição</a>
                        <a href="#" onClick={this._handleDelete.bind(this)}>Excluir</a>
                    </div>
                    <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">
                            {this.props.casa}<i className="material-icons right">close</i></span>
                        <p>{this.props.descricao}</p>
                    </div>
                </div>
            </div> 
        );
    }
    
    _handleDelete(event) {
        event.preventDefault();
        this.props.onDelete(this.props.id);
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

export default Estoria;