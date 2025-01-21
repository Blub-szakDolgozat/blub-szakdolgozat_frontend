import React from "react";
import { Container, Row, Table } from "react-bootstrap";
import ViziLenyekTabla from "./ViziLenyekTabla";

export default function ViziLenyekTablazat(props) {

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
              </tr>
            </thead>
            <tbody>
              {props.kepekLista.map((element) => {
                return <ViziLenyekTabla adat={element} key={element.id} />;
              })}
            </tbody>
          </Table>
      </Container>
    </Row>
  );
}
