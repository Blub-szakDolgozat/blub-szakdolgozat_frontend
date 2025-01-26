import React from 'react'
import './Videok.css';
import Video from './Video';
import useAdminContext from '../../contexts/AdminContext';

export default function Videok() {

    const { videokLista } = useAdminContext();

    return (
        <div>
            <h1>Videók</h1>
            <p>Oldalunkon sok különböző környezetvédelmi oktatóvideó található. A videók számos témát dolgoznak fel, köztük jelentősen felhívják a figyelmet a műanyag szemetelésének következményeire és veszélyeire.</p>
            <p className='uzenet'>Csatlakozz a zöldebb jövőhöz!</p>
            
            <div className='row row-cols-1 row-cols-md-3 g-4'>
                {videokLista.map((elem, index) => {
                return <Video obj={elem} key={index}/>;
                })}
            </div>
            
        </div>
  )
}