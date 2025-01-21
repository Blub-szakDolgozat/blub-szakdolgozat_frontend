import React from 'react'

export default function VideokTablazatSor(props) {
  return (
    <tr>
      <td>{props.obj.cim}</td>
      <td>{props.obj.nyitokep}$</td>
      <td>{props.obj.link}</td>
      <td>{props.obj.hossz}$</td>
    </tr>
  )
}
