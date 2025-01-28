import React from 'react'

export default function CikkekTablazatSor(props) {
  return (
    <tr>
      <td>{props.obj.cim}</td>
      <td>{props.obj.kepek}$</td>
      <td>{props.obj.leiras}</td>
      <td>{props.obj.publikalva}$</td>
    </tr>
  )
}
