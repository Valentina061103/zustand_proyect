import { useShallow } from "zustand/shallow"
import { tareaStore } from "../store/TareaStore"
import {editarTarea, eliminarTareaPorID, getAllTareas, postNuevaTarea}  from "../http/Tarea"
import { ITarea } from "../types/ITareas";
import Swal from "sweetalert2";

export const useTareas = () => {

    const {tareas,setArrayTareas, agregarNuevaTareas, eliminarUnaTarea, editarUnaTarea} = tareaStore(
        useShallow((state)=>({
        tareas: state.tareas,
        setArrayTareas: state.setArrayTareas,
        agregarNuevaTareas: state.agregarNuevaTarea,
        eliminarUnaTarea: state.eliminarUnaTarea,
        editarUnaTarea: state.editarUnaTarea

    }))
);


    const getTareas = async() => {
            const data = await getAllTareas();
            if(data) setArrayTareas(data);
        };

    const crearTareas = async(nuevaTareas: ITarea)=>{
        agregarNuevaTareas(nuevaTareas)
        try{
            await postNuevaTarea(nuevaTareas);
            Swal.fire("Exito", "Tarea creada correctamente", "success");
        }catch(error){
            eliminarUnaTarea(nuevaTareas.id!)
            console.log("algo salio aml al crear la tarea");
        }
    };

    const putTareaEditar = async(TareaEditada: ITarea)=>{

        const EstadoPrevio = tareas.find((el)=> el.id == TareaEditada.id)

        editarUnaTarea(TareaEditada)
        try{
            await editarTarea(TareaEditada);
            Swal.fire("Exito", "Tarea actualizada correctamente", "success");
        } catch(error){
            if(EstadoPrevio) editarUnaTarea(EstadoPrevio);
            console.log("algo salio mal al editar");
        }
    };

    const eliminarTarea = async(idTarea:string)=>{
        const EstadoPrevio = tareas.find((el)=> el.id == idTarea);
        const confirm = await Swal.fire({
            title: "¿Estas seguro?",
            text: "Esta accion no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si,eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!confirm.isConfirmed)return;
        eliminarUnaTarea(idTarea)
        try {
            await eliminarTareaPorID(idTarea);
            Swal.fire("Eliminado", "La tarea se elimino correctamente", "success");
        } catch (error) {
            if(EstadoPrevio) agregarNuevaTareas(EstadoPrevio);
            console.log("algo salio mal al editar");
            
        }
    };

    return {
        getTareas,
        crearTareas,
        putTareaEditar,
        eliminarTarea,
        tareas,
    };
;}
