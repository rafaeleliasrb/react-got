import React, { Component } from 'react';

class Rodape extends Component {
    render() {
        return (
            <footer className="page-footer grey white-text">
                <div className="container">
                    <div className="row">
                        <div className="col l6 s12">
                        Aplicações ricas para WEB - React
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        Feito com <a className="orange-text text-lighten-3" href="http://materializecss.com">Materialize</a>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Rodape;