import React from "react";
import { Table, Button } from "react-bootstrap";

class TabellaPrenotazioni extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prenotazioni: [],
        };
    }

    componentDidMount() {
        this.fetchPrenotazioni();
    }

    fetchPrenotazioni = async () => {
        try {
            const res = await fetch('https://striveschool-api.herokuapp.com/api/reservation'); 
            if (!res.ok) {
                throw new Error('Errore nel recupero delle prenotazioni');
            }
            const data = await res.json();
            this.setState({ prenotazioni: data });
        } catch (error) {
            console.error('Errore: ', error);
        }
    };

    handleDelete = async (idPrenotazione) => {
        if (!window.confirm("Sei sicuro di voler cancellare questa prenotazione?")) {
            return
        }
        try {
            const res = await fetch(`https://striveschool-api.herokuapp.com/api/reservation/${idPrenotazione}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                throw new Error('Errore nella cancellazione della prenotazione');
            }
            this.fetchPrenotazioni(); 
        } catch (error) {
            console.error('Errore: ', error);
        }
    };

    render() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Telefono</th>
                        <th>Numero di Persone</th>
                        <th>Tavolo Fumatori</th>
                        <th>Data e Ora</th>
                        <th>Richieste Speciali</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.prenotazioni.map((prenotazione, index) => (
                        <tr key={index}>
                            <td>{prenotazione.name}</td>
                            <td>{prenotazione.phone}</td>
                            <td>{prenotazione.numberOfPeople}</td>
                            <td>{prenotazione.smoking ? 'Sì' : 'No'}</td>
                            <td>{prenotazione.dateTime}</td>
                            <td>{prenotazione.specialRequests}</td>
                            <td>
                                <Button variant="danger" onClick={() => this.handleDelete(prenotazione._id)}>
                                    Cancella
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}

export default TabellaPrenotazioni;
