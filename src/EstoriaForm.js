import React, { Component } from 'react';

class EstoriaFrom extends Component {
    render() {
        return(
            <div className="row">
                <form className="col s12" onSubmit={this._handleSubmit.bind(this)}>
                    <h5>+1 Casa</h5>
                    <div className="input-field col s12">
                        <input placeholder="Casa" 
                            ref={ input => this._casa = input }/><br/>
                        <input placeholder="Lema" 
                            ref={ input => this._lema = input }/><br/>
                        <input placeholder="Brasao" 
                            ref={ input => this._brasao = input }/><br/>
                        <textarea placeholder="Membros" className="materialize-textarea" 
                            ref={ textarea => this._membros = textarea }></textarea><br/>
                        <textarea placeholder="Descrição" className="materialize-textarea" 
                            ref={ textarea => this._descricao = textarea }></textarea><br/>
                        <input placeholder="Url" 
                            ref={ input => this._url = input }/><br/>
                        <button className="btn waves-effect waves-light" type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        );
    }

    _handleSubmit(event) {
        event.preventDefault();
        let casa = this._casa.value;
        let lema = this._lema.value;
        let brasao = this._brasao.value;
        let membros = this._membros.value;
        let descricao = this._descricao.value;
        let url = this._url.value;
        this.props.adicionarEstoria(casa, lema, brasao, membros, descricao, url);
    }
}

export default EstoriaFrom;