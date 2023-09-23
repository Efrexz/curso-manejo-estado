import React from "react";

const SECURITY_CODE = "paradigma";

class ClassState extends  React.Component {
    constructor(props){
        super(props);

        this.state = {
            codeValue : "",
            error : false,
            loading: false,
        };
    }


    componentDidUpdate() {
        if(!!this.state.loading){
            setTimeout(() => {

                if(this.state.codeValue !== SECURITY_CODE){
                    this.setState({error: true })
                }
                this.setState({ loading : false })
            }, 3000);
        }
    }

    render(){
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>

                <p>Por favor, escribe el codigo de seguridad para comprobar que quieres eliminar</p>

                {this.state.error && <p>Error: el codigo es incorrecto</p>}

                {this.state.loading && <p>Cargando...</p>}

                <form>
                    <input
                    type="text"
                    readOnly={this.state.loading}
                    value={ this.state.codeValue }
                    onChange={ (event) => { this.setState({ codeValue: event.target.value })}}
                    placeholder="Codigo de Seguridad" />
                    <button
                        type="button"
                        onClick={() => this.setState({ loading : true, error : false })}
                    >Comprobar</button>
                </form>
        </div>
        )
    }
}

export {ClassState};