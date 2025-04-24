import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { tareaStore } from '../../../store/TareaStore';
import styles from './Modal.module.css';
import { ITarea } from '../../../types/ITareas';
import { useTareas } from '../../../hooks/useTareas';

type IModal = {
    HandleCloseModal: VoidFunction
}

const intialState: ITarea = {
    titulo:"",
    descripcion:"",
    fechaLimite:""
}


export const Modal :FC<IModal>=({HandleCloseModal}) => {
    const tareaActiva = tareaStore((state)=> state.tareaActiva)
    const setTareaActiva = tareaStore((state)=>state.setTareaActiva);

    const {crearTareas,putTareaEditar} = useTareas()

    const [formValues, setFormValues] = useState<ITarea>(intialState);

    useEffect(()=>{
        if(tareaActiva) setFormValues(tareaActiva)
    },[])

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) =>{
        const {name, value} = e.target;

        setFormValues((prev)=>({...prev,[`${name}`]: value}));
    }

    const handleSubmit = (e: FormEvent)=>{
        e.preventDefault();
        if(tareaActiva){
            putTareaEditar(formValues);
        }else{
            crearTareas({...formValues,id: new Date().toDateString()})
        }
        setTareaActiva(null);
        HandleCloseModal();
    }
    

    return (
    <div className={styles.containerPrincipalModal}>
            <div className={styles.contentPopUp}>
            <div>
                <h3>{tareaActiva ? "Editar Tarea": "Crear Tarea"}</h3>
            </div>
            <form onSubmit={handleSubmit} className={styles.formContent}>
                <div>
                <input placeholder="Ingrese un titulo" 
                type="text" 
                required 
                onChange={handleChange}
                value={formValues.titulo}
                autoComplete='off' 
                name='titulo' />
                <textarea 
                placeholder='Ingrese una descripcion'
                onChange={handleChange}
                value={formValues.descripcion}
                required 
                name='descripcion'/>
                <input 
                type="date"
                onChange={handleChange}
                value={formValues.fechaLimite}
                required 
                autoComplete='off' 
                name='fechaLimite' />
                </div>
                <div className={styles.buttonCard}>
                    <button onClick={HandleCloseModal}>Cancelar</button>
                    <button type='submit'>{tareaActiva ? "Editar Tarea": "Crear Tarea"}</button>
                </div>
            </form>
            </div>
    </div>
    )
}
