import {ITarea} from '../../../types/ITareas';
import styles from "./CardList.module.css";
import {FC} from "react";

type ICardList = {
    tarea: ITarea
}

export const CardList: FC<ICardList> =  ({tarea}) => {
    const eliminarTarea = ()=>{
        console.log("eliminar",tarea)
    }
    const editarTarea = ()=>{
        console.log("editar", tarea)
    }


return (
    <div className={styles.containerCard}>
        <div>
        <h3>Titulo: {tarea.titulo}</h3>
        <p>Descripcion: {tarea.descripcion}</p>
        <p><b>Fecha limite: {tarea.fechaLimite}</b></p>
        </div>
        <div className={styles.actionCard}>
            <button onClick={eliminarTarea}>Eliminar</button>
            <button onClick={editarTarea}>Editar</button>
        </div>
    </div>
);
};
