import React from 'react'
import Esemeny from './Esemeny';
import './public.css';
import useAdminContext from '../../contexts/AdminContext';

export default function Esemenyek() {

    const { esemenyekLista } = useAdminContext();

    return (
        <div>
            <h2 className='cim'>Programok</h2>
            <p>Oldalunkon különböző környezetvédelmi események találhatók...</p>
            <div className="esemenyek-lista doboz">
                {esemenyekLista.length > 0 ? (
                    esemenyekLista.map((elem, index) => (
                        <Esemeny obj={elem} key={index} />
                    ))
                ) : (
                    <p>Nincsenek elérhető események.</p>
                )}
            </div>
        </div>
    )
}
