import React, { Component } from 'react';

class ModalBottom extends Component {
    render() {
        const imagem = 'css/images/'+this.props.url;

        return(
            <div id="modal1" className="modal bottom-sheet ">
                <div className="modal-content">
                    <div className="row">
                        <div className="col s12 m3">
                            <img className="responsive-img" 
                                src={imagem} alt={this.props.casa}/>
                        </div>
                        <div className="col s12 m9">
                            <h4 className="left">{this.props.casa}</h4>
                            <a href="#!" className="right modal-action modal-close waves-effect waves-green btn-flat">Fechar</a>
                            <div className="clearfix">
                                <p>{this.props.descricao}</p>
                            </div>
                            <h5>Lema</h5>
                            <p>{this.props.lema}</p>
                            <h5>Base</h5>
                            <p>{this.props.base}</p>
                            <h5>Região</h5>
                            <p>{this.props.regiao}</p>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
export default ModalBottom;