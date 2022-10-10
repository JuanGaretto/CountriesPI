import { pagination } from "../../../redux";
import { useDispatch } from "react-redux";
import style from './Pagination.module.css'


const Pagination = (props) => {
  const { page, total } = props
  const dispatch = useDispatch();

  const numberPages = Math.ceil((total/15));

  const paginatorArr = [...Array(numberPages).keys()];

  const setPage = (e) => {
    dispatch(pagination(e.target.value));
  }

  return (
    <div className={style.container_navigation}>
    <div className={style.paginator_container}>
      <button className={style.pag_button} value={0} onClick={setPage}>{'|<'}</button>
      <button disabled={page === 0}  className={style.pag_button} value={page-1} onClick={setPage}>{'<'}</button>
      {paginatorArr.map( i => (
        <button className={page === i ? `${style.pag_button} ${style.active}` : style.pag_button}
        value={i} key={i} onClick={setPage}>{i+1}</button>
      ))}
      <button disabled={page === 16 || paginatorArr.length <= 1}  className={style.pag_button} value={page+1} onClick={setPage}>{'>'}</button>
      <button className={style.pag_button} value={numberPages-1} onClick={setPage}>{'>|'}</button>
    </div>
    </div>
  )
}

export default Pagination;