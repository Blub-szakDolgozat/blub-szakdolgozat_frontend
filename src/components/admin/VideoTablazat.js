import React from 'react'
import VideoTablaSor from './VideoTablaSor';
import { Container, Row, Table } from 'react-bootstrap';

export default function VideoTablazat(props) {
    return (
        <Row>
          <Container className="mt-4 table-responsive">
            <Table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Nyitókép</th>
                  <th>Videó címe</th>
                  <th>Link</th>
                  <th>Hossz (mp)</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {props.videokLista.map((element, index) => (
      <VideoTablaSor adat={element} key={element.video_id || index} />
    ))}
    
              </tbody>
            </Table>
          </Container>
        </Row>
      );
}
