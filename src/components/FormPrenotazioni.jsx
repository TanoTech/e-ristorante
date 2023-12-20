import React from "react";
import { Row, Col, Container, Form, Button, Alert } from "react-bootstrap";

/* Quali campi usiamo per la prenotazione=
1 - nome: string (obbligatorio)
2 - telefono: string (obbligatorio)
3 - persone: number (valore predefinito 1)
4 - fumatori: boolean
5 - data e ora: string (obbligatorio)
6 - note: string */

class FormPrenotazioni extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prenotazione: {
                nome: '',
                telefono: '',
                persone: 1,
                fumatori: false,
                dataOra: '',
                note: '',
            },
            showAlert: false,
        }
    }

    handleInputChange = (proprietà, valore) => {
        this.setState({ prenotazione: { ...this.state.prenotazione, [proprietà]: valore } });
        /* Se vogliamo utilizzare una variabile o un parametro come nome di una proprietà di un oggetto dobbiamo valutare il contenuto del parametro o della variabile con le quadre, in questo caso proprietà può essere qualasiasi chiave dell'oggetto. Utilizzando l'arrow function il bind è automatico e non bisogna specificarlo nel constructor */
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Invio prenotazione')
        try {
            const res = await fetch('https://striveschool-api.herokuapp.com/api/reservation', {
                method: 'POST',
                body: JSON.stringify(this.state.prenotazione),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (res.ok) {
                this.setState({
                    prenotazione: {
                        nome: '',
                        telefono: '',
                        persone: 1,
                        fumatori: false,
                        dataOra: '',
                        note: '',
                    },
                    showAlert: true,
                })
            } else {
                throw new Error('Errore salvataggio prenotazione')
            }
        } catch (error) {
            console.log('Errore: ', error)
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={6}>
                        <h2>Modulo prenotazione</h2>
                        {/* this.state.showAlert === true && (
                            <Alert variant='info'>Prenotazione salvata!</Alert> (questo fa il rendering nell' html, se true spunta, se false non c'è */}
                        <Alert variant="info" 
                            className={
                            this.state.showAlert ? 'd-block' : 'd-none' /* questo è uguale al metodo di prima ma con l'operatore ternario, se true da la classe 'd-block' se false da la classe d-none */}> Prenotazione salvata! 
                        </Alert> 
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default FormPrenotazioni;