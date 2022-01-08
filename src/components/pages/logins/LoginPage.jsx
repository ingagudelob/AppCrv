import Form from 'react-bootstrap/Form'
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import Card from 'react-bootstrap/Card'
import { Button } from 'primereact/button';
import { useEffect, useContext } from 'react';
import UserContext from '../../../contexts/users/UserContext';

const LoginPage = () => {

    const loginIn = useContext(UserContext);

    console.log(loginIn)
    
    const [texto, setTexto] = useState("")
    const [visible, setVisible] = useState(true);
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [inUser, setInUser] = useState(false)
    const [inLogin, setinLogin] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const onHide = null;

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    // con destructuring 
    const handlePassChange = ({target: {value}}) => setPass(value)

    const handleForSubmit = (e) =>{

        if(email==="inge@gmail.com" && pass === "12345" ){
            console.log("submit")
            e.preventDefault();
            setInUser(true);
            setinLogin(true)
            setTexto("");
            setIsLoading(true)
            time3Seg();
            

            
        }else{
            setTexto("¡Error de contraseña o usuario!")
            e.preventDefault();
        }
                
    }

    const time3Seg = () =>{
        setTimeout(()=> {
            setIsLoading(false);
            setVisible(false);
         },1500)
    }

useEffect(()=> {
    removeElement()
},[])


    const removeElement=()=>{
        const element = document.getElementsByClassName('p-dialog-header');
        console.log(element)
        //element.parentNode.removeChild(element);
    }

    return (
        <div>
               <Dialog className="class-dialog" visible={visible} onHide={onHide} breakpoints={{'660px': '65vw', '440px': '90vw'}} 
                    style={  {width: '30vw'}}>
   
                        <Card style={{ width: '100%', marginBottom: '1em' }}>
                            <Card.Img className='img-logo' variant="top" src="CRV-300X300.PNG" width="30%" alt="" />
                            <Card.Title className='text-center'>Ingreso a la plataforma</Card.Title>
                            <Card.Body>
                            <Form onSubmit={handleForSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label style={{ padding: "0px"}} >Usuario (*)</Form.Label>
                                    <Form.Control required type="email" placeholder="ejemplo@midominio.com" value={email} onChange={handleEmailChange}/>
                                    <Form.Text className="text-muted">

                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Contraseña (*)</Form.Label>
                                    <Form.Control required type="password" placeholder="Ingrese contraseña" value={pass} onChange={handlePassChange}/>
                                    {(inUser && inLogin) ? (isLoading && <p>Loading...</p>) :<p>{texto}</p>}
                                </Form.Group>

                                <Button type='submit' style={{padding: "5px"}}>Aceptar</Button>
                            </Form>
                            </Card.Body>
                        </Card>
                </Dialog>
                {(isLoading &&
                        <div id="container_loading">
                            <div id="loading"></div>
                        </div>
                )
                }
        </div>
    )
}

export default LoginPage
