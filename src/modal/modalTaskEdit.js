import React, { useState, Fragment,useEffect } from 'react'
import { useForm } from 'react-hook-form';
import '../overview/overview.css'

    const App = (props) => {

    const {register, errors, handleSubmit,setValue} = useForm({
      defaultValues:props.editing
    });
    const listStataTask=[{label:"Completado",value:1} ,{label:"No Completado",value:0}]

    const [datos, setDatos] = useState({
        idtask:0,
        nameTask:'',
        stateTask:''
    });
    
    setValue('idtask', props.editing.idtask)
    setValue('nameTask', props.editing.nameTask)
    setValue('stateTask',(props.editing.state)?1:0 )

    const imputChange=(event)=>{
        setDatos({
            ...datos,
            [event.target.name]:event.target.value
        })
    }

    const onSubmit=(datos,event)=>{
      //  event.preventDefault();
        props.updateTask(datos)
    }

return (

<div className="modal fade " id={props.id}  data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">{props.title}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="modal-body">
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Nombre tarea</label>
            <input 
            type="text" 
            name="nameTask" 
            className="form-control" 
            onChange={imputChange}
            {...register('nameTask', { required: {
              value: true, 
              message: ' es requerido'
              } })}/>
        </div>
        <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Estado</label>
        <select className="form-select" onChange={imputChange} name="stateTask" {...register('stateTask', { required: {
                value: true, 
                message: ' es requerido'
                } })} aria-label="Default select example">
                <option defaultValue>Seleccione el estado</option>
                {listStataTask.map((item) => {
              return (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              );
            })}
        </select>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button  type="submit" className="btn btn-primary" data-bs-dismiss="modal">Guardar</button>
      </div>
      </form>
    </Fragment>
    </div>
  </div>
</div>
  )
}
export default App