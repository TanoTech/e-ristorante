import React from "react";
import { Row, Col, Container, Form, Button, Alert, FormGroup, FormLabel, FormSelect, FormCheck, FormControl } from "react-bootstrap";
import './FormPrenotazioni.css'

/* Quali campi usiamo per la prenotazione=
1 - name: string (obbligatorio)
2 - phone: string (obbligatorio)
3 - numberOfPeople: number (valore predefinito 1)
4 - smoking: boolean
5 - data e ora: string (obbligatorio)
6 - specialRequests: string */

class FormPrenotazioni extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prenotazione: {
                name: '',
                phone: '',
                numberOfPeople: 1,
                smoking: false,
                dateTime: '',
                specialRequests: '',
            },
            showAlert: false,
        }
    }

    handleInputChange = (proprietà, valore) => {
        this.setState({ prenotazione: { ...this.state.prenotazione, [proprietà]: valore } });
        /* Se vogliamo utilizzare una variabile o un parametro come name di una proprietà di un oggetto dobbiamo valutare il contenuto del parametro o della variabile con le quadre, in questo caso proprietà può essere qualasiasi chiave dell'oggetto. Utilizzando l'arrow function il bind è automatico e non bisogna specificarlo nel constructor */
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
                        name: '',
                        phone: '',
                        numberOfPeople: 1,
                        smoking: false,
                        dateTime: '',
                        specialRequests: '',
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
            <Container className="d-flex justify-content-center formBg" >
                <Row>
                    <Col md={12} className="formOpacity">
                        <h2>Modulo prenotazione</h2>
                        {/* this.state.showAlert === true && (
                            <Alert variant='info'>Prenotazione salvata!</Alert> (questo fa il rendering nell' html, se true spunta, se false non c'è */}
                        <Alert variant="info"
                            className={
                                this.state.showAlert ? 'd-block' : 'd-none' /* questo è uguale al metodo di prima ma con l'operatore ternario, se true da la classe 'd-block' se false da la classe d-none */}> Prenotazione salvata!
                        </Alert>

                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <FormLabel>Il tuo nome</FormLabel>
                                <FormControl
                                    type='text'
                                    placeholder='Nome e cognome'
                                    required
                                    value={this.state.prenotazione.name}
                                    onChange={e => {
                                        this.setState({
                                            prenotazione: {
                                                ...this.state.prenotazione,
                                                name: e.target.value
                                            }
                                        })
                                    }}>
                                </FormControl>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Recapito telefonico</FormLabel>
                                <FormControl
                                    type='tel'
                                    placeholder='xxxxxxxxxx'
                                    required
                                    value={this.state.prenotazione.phone}
                                    onChange={e => {
                                        this.handleInputChange(
                                            'phone', e.target.value /* Qui chiamiamo il metodo direttamente dato che ogni input fa la stessa cosa, nell'input precedente abbiamo semplicemente scritto il metodo completo per chiarezza */
                                        )
                                    }}>
                                </FormControl>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Numero coperti</FormLabel>
                                <FormSelect aria-label='Quantità persone' required value={this.state.prenotazione.numberOfPeople} onChange={e => {
                                    this.handleInputChange('numberOfPeople', e.target.value)
                                }}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                </FormSelect>
                            </FormGroup>
                            <FormGroup>
                                <FormCheck type="checkbox" label='tavolo fumatori' checked={this.state.prenotazione.smoking} onChange={e => {
                                    this.handleInputChange('smoking', e.target.checked)
                                }}>
                                </FormCheck>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Data prenotazione e ora</FormLabel>
                                <FormControl type='datetime-local' required value={this.state.prenotazione.dateTime} onChange={e => {
                                    this.handleInputChange('dateTime', e.target.value)
                                }}></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Richieste particolari &lpar;allergie, intolleranze...&rpar;</FormLabel>
                                <FormControl type="textarea" rows={3} placeholder="allegie, intolleranze..." value={this.state.prenotazione.specialRequests} onChange={e => {
                                    this.handleInputChange('specialRequests', e.target.value)
                                }}></FormControl>
                            </FormGroup>
                            <Button variant="primary" type='submit'>PRENOTA</Button>
                        </Form>
                    </Col>
                </Row>
            </Container >
        )
    }
}

export default FormPrenotazioni;