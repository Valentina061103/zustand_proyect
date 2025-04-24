import { useTareas } from '../../../hooks/useTareas';
import {ITarea} from '../../../types/ITareas';
import styles from './CardList.module.css';
import {FC} from "react";

type ICardList = {
    tarea: ITarea
    HandleOpenModalEdit: (tarea:ITarea)=>void
}

export const CardList: FC<ICardList> =  ({tarea,HandleOpenModalEdit}) => {
    
    const{eliminarTarea} = useTareas()
    const eliminarTareaById = ()=>{
        eliminarTarea(tarea.id!);
    }
    const editarTarea = ()=>{
        HandleOpenModalEdit(tarea);
    }


return (
    <div className={styles.containerCard}>
        <div>
        <h3>Titulo: {tarea.titulo}</h3>
        <p>Descripcion: {tarea.descripcion}</p>
        <p><b>Fecha limite: {tarea.fechaLimite}</b></p>
        </div>
        <div className={styles.actionCard}>
            <button onClick={eliminarTareaById}>Eliminar</button>
            <button onClick={editarTarea}>Editar</button>
        </div>
    </div>
);
};
