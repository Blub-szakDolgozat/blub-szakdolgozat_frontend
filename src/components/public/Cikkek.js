import React from 'react'
import Cikk from './Cikk';
import './Cikk.css';
import useAdminContext from '../../contexts/AdminContext';

export default function Cikkek() {

    const { cikkLista } = useAdminContext();

    return (
        <div>
            <h1>Cikkek</h1>
            <p>Oldalunkon sok különböző környezetvédelmi cikk található. A cikkek számos témát dolgoznak fel, köztük jelentősen felhívják a figyelmet a műanyag szemetelésének következményeire és veszélyeire.</p>
            <p className='uzenet'>Csatlakozz a zöldebb jövőhöz!</p>
            
            <div className='row row-cols-1 row-cols-md-3 g-4'>
                {cikkLista.map((elem, index) => {
                return <Cikk obj={elem} key={index}/>;
                })}
            </div>
            
        </div>
  )
}