import style from "./Activity.module.css";

const Activity = (props) => {
  return (
    <div className={style.activities_container}>
      <h2>Actividades: </h2>
      <div className={style.cards_container}>
        {props.activity && props.activity.length ? (
          props.activity.map((a) => (
            <div key={a.name} className={style.activity_card}>
              <p className={style.activity_name}>{a.name}</p>
              <div>
                <span className={style.separator}>~</span> Dificultad:
                <span className={style.result}> {a.difficulty}</span>
              </div>
              <div>
                <span className={style.separator}>~</span> Duración:
                <span>  {a.duration} hours</span>
              </div>
              <div>
                <span className={style.separator}>~</span> Estación del año:
                <span> {a.season}</span>
              </div>
            </div>
          ))
        ) : (
          <div className={style.noActivity}>
            No hay actividades creadas para este pais!
          </div>
        )}
      </div>
    </div>
  );
};

export default Activity;
