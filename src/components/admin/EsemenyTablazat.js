import React from 'react'
import { Container, Row, Table } from 'react-bootstrap';
import EsemenyTablaSor from './EsemenyTablaSor';

export default function EsemenyTablazat(props) {
    return (
        <Row>
          <Container className="mt-4 table-responsive">
            <Table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Esemény Neve</th>
                  <th>Leírás</th>
                  <th>Dátum</th>
                  <th>Helyszín</th>
                  <th>Létszám</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {props.esemenyekLista.map((element, index) => (
              <EsemenyTablaSor adat={element} key={element.esemeny_id || index} />
    ))}
    
              </tbody>
            </Table>
          </Container>
        </Row>
      );
}
