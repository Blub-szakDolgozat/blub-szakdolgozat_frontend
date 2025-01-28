import React from 'react'
import { Container, Row, Table } from 'react-bootstrap';

export default function EsemenyTablazat(props) {
    return (
        <Row>
          <Container className="mt-4">
            <Table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Képe</th>
                  <th>Vízilény Neve</th>
                  <th>Vízilény Fajtája</th>
                  <th>Ritkasági szinte</th>
                  <th>Leírása</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {props.esemenyLista.map((element, index) => (
              < adat={element} key={element.esemeny_id || index} />
    ))}
    
              </tbody>
            </Table>
          </Container>
        </Row>
      );
}
