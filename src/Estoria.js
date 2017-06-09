import React, { Component } from 'react';

class Estoria extends Component {
    constructor() {
        super();
        this.state = {
            exibirEstoria : false
        }
    }

    _handleClick(event) {
        event.preventDefault();
        this.setState({
            exibirEstoria: !this.state.exibirEstoria
        });
    }
    
    render() {
        let textoBotao = "Exibir descrição";

        if(this.state.exibirEstoria) {
            textoBotao = "Ocultar descrição";
        }

        let imagem = 'css/images/'+this.props.url;

        return (
            <div className="col s12 m4 l3">
                <div className="card">
                    <div className="card-image">
                        <img src={imagem} alt={this.props.casa}></img>
                    </div>
                    <div className="card-content"> 
                        <p>{this.props.lema}</p>
                        <p>{this.props.id}</p>
                    </div>
                    <div className="card-action">
                        <a className="activator" href="#" onClick={this._handleClick.bind(this)}>{textoBotao}</a>
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
}

export default Estoria;