import React, { useState, Fragment,useEffect } from 'react'
import '../overview/overview.css'
import { useForm } from 'react-hook-form'



const App = (props) => {

    const {register, errors, handleSubmit} = useForm();
    const listStataTask=[{label:"Completado",value:1} ,{label:"No Completado",value:0}]
    const messages = {
        nameTask: "Este campo es obligatorio",
        stateTask: "Este campo es obligatorio"
       };

      
    const [datos, setDatos] = useState({
      customerID:'',
      dateBill:'',
      descriptionBill:'',
      valueBill:''
    });
    const imputChange=(event)=>{
        setDatos({
            ...datos,
            [event.target.name]:event.target.value
        })
    }

    const onSubmit =(datos)=>{
      //console.log(datos)
      props.saveTask(datos)

    }
    const handleChange = (value) => {
      console.log( value);
    };
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
        <label htmlFor="exampleInputEmail1" className="form-label">Cliente</label>
        <select className="form-select"  aria-label="Default select example" {...register('customerID', { required: {
                value: true, 
                message: ' es requerido'
                } })}>
                {props.customers.map((item) => {
              return (
                <option key={item.customerID} value={item.customerID}>
                  {item.nameCustomer +" "+item.lastNameCustomer}
                </option>
              );
            })}
        </select>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Fecha factura</label>
            <input 
            type="date" 
            name="dateBill" 
            className="form-control" 
            aria-describedby="emailHelp"
            {...register('dateBill', { required: {
                value: true, 
                message: ' es requerido'
                } })}
            onChange={imputChange}/>
      
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Descripción</label>
            <input 
            type="text" 
            name="descriptionBill" 
            className="form-control" 
            aria-describedby="emailHelp"
            {...register('descriptionBill', { required: {
                value: true, 
                message: ' es requerido'
                } })}
            onChange={imputChange}/>
      
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Valor</label>
            <input 
            type="number" 
            name="valueBill" 
            className="form-control" 
            aria-describedby="emailHelp"
            {...register('valueBill', { required: {
                value: true, 
                message: ' es requerido'
                } })}
            onChange={imputChange}/>
      
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