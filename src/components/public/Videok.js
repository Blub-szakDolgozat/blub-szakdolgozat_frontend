import React, { useState } from 'react';
import './Videok.css';
import Video from './Video';
import useAdminContext from '../../contexts/AdminContext';
import { Col, Row } from 'react-bootstrap';
import { FaYoutube } from 'react-icons/fa';

export default function Videok() {
    const { videokLista } = useAdminContext();
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
    };

    return (
        <Row className="video-container" >
            <div className='szovegdoboz'>
            <h1>Videók</h1>
            <p>Oldalunkon sok különböző környezetvédelmi oktatóvideó található. A videók számos témát dolgoznak fel, köztük jelentősen felhívják a figyelmet a műanyag szemetelésének következményeire és veszélyeire.</p>
            <p className='uzenet'>Csatlakozz a zöldebb jövőhöz!</p>
            </div>

            {/* Kiválasztott videó (bal oldalon) */}
            {selectedVideo && (
                <Col className='selected-video' style={{ backgroundImage: `url(http://localhost:8000/${selectedVideo.nyitokep})` }} >
                    <div className='video-info' >
                        <h2 className='felirat'>{selectedVideo.cim}</h2>
                        <a className='ikon' href={selectedVideo.link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
    <FaYoutube size={50} color="red" />
    <span className='szoveg' style={{ marginLeft: '8px' }}>Video megtekintése</span>
                        </a>

                    </div>
                </Col>
            )}
            
            {/* Jobb oldali videók lista görgetéssel */}
            <Col className='video-list'>
                <div className='video-scroll'>
                    {videokLista.map((elem, index) => (
                        <Video obj={elem} key={index} onSelect={handleVideoClick} />
                    ))}
                </div>
            </Col>
        </Row>
    );
}
