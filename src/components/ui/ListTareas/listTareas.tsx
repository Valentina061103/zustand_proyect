import { useEffect } from "react";
import { tareaStore } from "../../../store/TareaStore";
import styles from "./listTareas.module.css";
import { getAllTareas } from "../../../http/Tarea";
import { CardList } from "../CardList/CardList";

export const ListTareas = () => {
    const tareas = tareaStore((state)=> state.tareas);
    const setArrayTareas = tareaStore((state)=> state.setArrayTareas);

    const getTareas = async() => {
        const data = await getAllTareas()
        if(data) setArrayTareas(data);
    }

    useEffect (()=>{
        getTareas();
    },[])


    return (
        <div className={styles.containerPrincipalListaTareas}>
            <div className={styles.containerTitleAndButton}>
                <h2>Lista de tareas</h2>
                <button>Agregar Tarea</button>
            </div>
            <div className={styles.containerList}>
                {tareas.length > 0 ?(
                    tareas.map((el) => <CardList tarea={el}/>)
                ) : (
                    <div>
                        <h3>No hay Tareas</h3>
                    </div>
                )}
            </div>





        </div>
    )
}
