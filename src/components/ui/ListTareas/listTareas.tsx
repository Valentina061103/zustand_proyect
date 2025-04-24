import { useEffect, useState } from "react";
import { tareaStore } from "../../../store/TareaStore";
import styles from './ListTareas.module.css'
import { CardList } from "../CardList/CardList";
import { Modal } from "../Modal/Modal";
import { ITarea } from "../../../types/ITareas";
import { useTareas } from "../../../hooks/useTareas";

export const ListTareas = () => {

    const setTareaActiva = tareaStore((state)=>state.setTareaActiva)

    const {getTareas,tareas} = useTareas()


    useEffect (()=>{
        getTareas();
    },[]);

    const [OpenModalTarea, setOpenModalTarea] = useState(false);

    const HandleOpenModalEdit = (tarea:ITarea)=>{
        setTareaActiva(tarea);
        setOpenModalTarea(true);
        

    }

    const HandleCloseModal = ()=>{
        setOpenModalTarea(false)
    }


    return (
        <>
        <div className={styles.containerPrincipalListaTareas}>
            <div className={styles.containerTitleAndButton}>
                <h2>Lista de tareas</h2>
                <button onClick={()=>{setOpenModalTarea(true)}}>Agregar Tarea</button>
            </div>
            <div className={styles.containerList}>
                {tareas.length > 0 ?(
                    tareas.map((el) => <CardList 
                    HandleOpenModalEdit = {HandleOpenModalEdit}
                    tarea={el}/>)
                ) : (
                    <div>
                        <h3>No hay Tareas</h3>
                    </div>
                )}
            </div>
        </div>
        {OpenModalTarea && <Modal HandleCloseModal ={HandleCloseModal}/>}
        </>
    );
};
