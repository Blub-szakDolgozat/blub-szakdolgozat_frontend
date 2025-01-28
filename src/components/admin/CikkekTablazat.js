import React from 'react'
import CikkekTablazatSor from './CikkekTablazatSor'

export default function CikkekTablazat(props) {
 
  return (
    <div>
      <div>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Cím</th>
            <th>Nyitókép</th>
            <th>Link</th>
            <th>Hossz</th>
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
