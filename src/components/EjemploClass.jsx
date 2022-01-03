import React from "react";

class EjemploClass extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isToogleOn: true
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    
    handleClick (){
        /*
        console.log(" Estoy en el metodo")
        this.setState({ isToogleOn: !this.state.isToogleOn });*/

        // La manera correcta de cambiar un estado, como es una sola linea de codigo
        // se evitan colocar el return

        this.setState(prevState => ({
            isToogleOn: !prevState.isToogleOn
        }));

    }

    
        
    render(){
        return(
            <div className="container">
                <h1>Hola Funcion de clase</h1>
                <hr/>
                <button onClick={this.handleClick}>
                    {this.state.isToogleOn ? "ON" : "OFF"}
                </button>

            </div>
        );

    }
}

export default EjemploClass;