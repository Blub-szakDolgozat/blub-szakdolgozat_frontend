import React from 'react'
import CikkekTablazatSor from './CikkekTablazatSor'

export default function CikkekTablazat() {
 
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
          {lista.map((elem, index)=>{
            return <CikkekTablazatSor obj={elem} key={index}/>
          })}
        </tbody>
      </table>
    </div>
    </div>
  )
}
