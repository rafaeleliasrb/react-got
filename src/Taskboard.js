import React, { Component } from 'react';
import Estoria from './Estoria';
import EstoriaForm from './EstoriaForm';
import jQuery from 'jquery';

class Taskboard extends Component {
    constructor() {
        super();
        this.state = {
            estorias : []
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
        const titulo = this._getTitulo(estorias.length);
        return (
            <div className="section no-pad-bot" id="index-banner">
                <div className="container">
                    <EstoriaForm adicionarEstoria={this._adicionarEstoria.bind(this)}/>
                    
                    <h1 className="header center orange-text">Estórias</h1>
                    <h3>{titulo}</h3>
                    <div className="row">
                        <div className="col s12 cards-container">
                            {estorias}
                        </div>
                    </div>
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
                onDelete={this._excluirEstoria.bind(this)}/>);
    }

    _getTitulo(totalDeEstorias) {
        let titulo;
        if(totalDeEstorias === 0) {
            titulo = "Backlog vazio";
        }
        else if(totalDeEstorias === 1) {
            titulo = "1 estória";
        }
        else {
            titulo = `${totalDeEstorias} estórias`;
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
}

export default Taskboard;