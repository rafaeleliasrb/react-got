import React, { Component } from 'react';
import Casa from './Casa';
import EstoriaForm from './EstoriaForm';
import ModalBottom from './ModalBottom';
import jQuery from 'jquery';

class Taskboard extends Component {
    constructor() {
        super();
        this.state = {
            casasAtivas : [],
            casasInativas: [],
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
        this._buscarCasasAtivas();
        this._buscarCasasInativas();
    }

    _buscarCasasAtivas() {
        jQuery.ajax({
            method: 'GET',
            url: `http://localhost:3001/casas?ativo=true`,
            success: casas => this.setState({ 
                casasAtivas : casas
            })
        });        
    }

    _buscarCasasInativas() {
        jQuery.ajax({
            method: 'GET',
            url: `http://localhost:3001/casas?ativo=false`,
            success: casas => this.setState({ 
                casasInativas : casas
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
        return this.state.casasAtivas.map(casa => 
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
        return this.state.casasInativas.map(casa => 
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
        this._timer = setInterval(() => this._buscarCasasAtivas(), 5000);
        this._timer = setInterval(() => this._buscarCasasInativas(), 5000);
    }

    componentWillUnmount() {
        console.log("Limpando o interval...");
        clearInterval(this._timer);
    }

  _alterar(id) {
        let casasAtivas = this.state.casasAtivas;
        let casasInativas = this.state.casasInativas;        
        
        let indexAtivo = casasAtivas.findIndex(item => item.id === id);
        let indexInativo = casasInativas.findIndex(item => item.id === id);

        let casaAlterada;

        if (indexAtivo != -1) {
            casaAlterada = casasAtivas[indexAtivo];
            casaAlterada.ativo =  !casaAlterada.ativo;

            casasInativas.splice(indexAtivo, 0, casaAlterada);

            this.setState({
                casasAtivas: this.state.casasAtivas.filter(item => item.id !== id),
                casasInativas: casasInativas
            });
        } else if (indexInativo != -1) {
            casaAlterada = casasInativas[indexInativo];
            casaAlterada.ativo = !casaAlterada.ativo;

            casasAtivas.splice(indexInativo, 0, casaAlterada);

            this.setState({
                casasInativas: this.state.casasInativas.filter(item => item.id !== id),
                casasAtivas: casasAtivas
            });
        }

        jQuery.ajax({
            method: 'PUT',
            data: JSON.stringify(casaAlterada),
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