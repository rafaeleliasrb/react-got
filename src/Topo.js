import React, { Component } from 'react';

class Topo extends Component {
    render() {
        return (
            <nav className="grey darken-4" role="navigation">
                <div className="nav-wrapper container">
                    <a href="#">
                        <img className="logo-left" src="css/images/stark-2.png" alt=""/>
                    </a>

                    <a id="logo-container" href="#" className="brand-logo center">Game of Thrones</a>
                </div>
            </nav>
        );
    }
}

export default Topo;