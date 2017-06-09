import React, { Component } from 'react';

class Descricao extends Component {

    render() {
        window.$(document).ready(function() {
            window.$('.modal').modal();
        });

        return(
            <div>
                {/*<a className="waves-effect waves-light btn" href="#modal1">Descrição</a>*/}
                <a href="#modal1">Descrição</a>
                <div id="modal1" className="modal bottom-sheet ">
                    <div className="modal-content">
                        <h4>{this.props.casa}</h4>
                        <h5>{this.props.lema}</h5>
                        <p>{this.props.descricao}</p>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Descricao;