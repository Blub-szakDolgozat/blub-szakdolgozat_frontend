import React from 'react'
import Esemeny from './Esemeny';
import './Esemeny.css';
import useAdminContext from '../../contexts/AdminContext';

export default function Esemenyek() {

    const { cikkLista } = useAdminContext();

    return (
        <div>
            <h1>Események</h1>
            <p>Oldalunkon sok különböző környezetvédelmi esemény található. A cikkek számos témát dolgoznak fel, köztük jelentősen felhívják a figyelmet a műanyag szemetelésének következményeire és veszélyeire.</p>
            <p className='uzenet'>Csatlakozz a zöldebb jövőhöz!</p>
            
            <div className='row row-cols-1 row-cols-md-3 g-4'>
                {cikkLista.map((elem, index) => {
                return <Esemeny obj={elem} key={index}/>;
                })}
            </div>
            
        </div>
  )
}