import css from './Loader.module.css'
export const Loader = ()=>{
    return (
        <div className={css.wrapper}><span className={css.loader}></span></div>
        
    )
}