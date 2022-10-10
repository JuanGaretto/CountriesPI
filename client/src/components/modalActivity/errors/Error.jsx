import { useEffect } from "react";
import { useState } from "react";
import style from './Error.module.css'

const Error = (props) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if(!props.timedError) {
      return setVisible(false)
    }

    setVisible(true)
    const timer = setTimeout(() => {
      setVisible(false)
    }, 5000);
    return () => clearTimeout(timer);
  }, [props.timedError]);

  if(props.timedError) {
    if(!visible) return null;

    return (
      <span className={style.error}>{props.timedError}</span>
    )
  }

  return (
    <span className={style.error}>{props.error}</span>
  )
}

export default Error;