const ActivityList = (props) => {

  const unique = [];
  props.act.filter( a => {
    const isDuplicate = unique.includes(a.name)
    if(!isDuplicate) unique.push(a.name)
  })

  return (
    <>
      { unique && !unique.length ?
        <option value="" hidden>No hay actividades</option>
        : <option value="" hidden>Selecciona la actividad</option>
      }
        <option value="">Resetear</option>
      { unique && unique.map( (a,i) => {
        return (
          <option key={i} name="activity" value={a}>{a}</option>
        )
      })
      }
    </>
    )
}

export default ActivityList;