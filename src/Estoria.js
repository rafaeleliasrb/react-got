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
            <div className="col s12 m3">
                <div className="card">
                    <div className="card-image">
                        <img src={imagem} alt=""></img>
                    </div>
                    <div className="card-content"> 
                        <p>{this.props.lema}</p>
                    </div>
                    <div className="card-action">
                        <a href="#" onClick={this._handleClick.bind(this)}>{textoBotao}</a>
                        <a href="#" onClick={this._handleDelete.bind(this)}>Excluir</a>
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