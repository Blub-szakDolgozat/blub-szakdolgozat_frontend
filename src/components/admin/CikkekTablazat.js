import React from 'react'
import CikkekTablazatSor from './CikkekTablazatSor'

export default function CikkekTablazat(props) {
 
  return (
    <div>
      <div className="table-responsive">
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Képek</th>
            <th>Cím</th>
            <th>Leírás</th>
            <th>Publikálva</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {props.cikkLista.map((element, index) => (
              <CikkekTablazatSor adat={element} key={element.cikk_id || index} />
    ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}
