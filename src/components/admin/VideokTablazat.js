import React, { useContext } from 'react'
import VideokTablazatSor from './VideokTablazatSor'

export default function VideokTablazat() {

    
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
            return <VideokTablazatSor obj={elem} key={index}/>
          })}
        </tbody>
      </table>
    </div>
    </div>
  )
}
