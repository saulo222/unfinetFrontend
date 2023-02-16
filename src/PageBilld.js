import React, { useState, useEffect } from 'react';
import './globals.css';
import Header from './header/header.js'
import {getBill,addBilld,deleteBilld} from './services/servicesBill'
import TableBilld from './table/tableBilld'
import ModalnewBilld from './modal/modalnewBilld'
import Swal from 'sweetalert2'
import { getCustomers } from './services/services'
import { Card, Col, Row } from 'antd';


function PageBilld() {
  const [darkMode, setDarkMode] = useState(false)
  const [checked, setChecked] = useState(false)
  const mainClass = 'is-light-mode'
  const [billd,setBilld]=useState([])
  const [search,setsearch]=useState("")
  const [customers,setCustomers]=useState([])

  function changeMedia(mq) {
    setDarkMode(mq.matches)
    setChecked(mq.matches)
  }

  useEffect(() =>  {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addListener(changeMedia)
    setDarkMode(mq.matches)
    setChecked(mq.matches)
    loadBuilld("00000000-0000-0000-0000-000000000000")
    loadCustomers()
    return () => {
      mq.removeListener(changeMedia)
    }
  }, [])

  async function loadBuilld(customerID){
    const response= await getBill(customerID)
    setBilld(response)
  }
  async function loadCustomers(){
    const response= await getCustomers()
    setCustomers(response)
  }
  async function saveTask(dataSave){
    let data={
      "billID":"00000000-0000-0000-0000-000000000000",
      "customerID":dataSave.customerID,
      "dateBill":dataSave.dateBill,
      "descriptionBill":dataSave.descriptionBill,
      "valueBill":dataSave.valueBill,
      "userCreated":localStorage.getItem('userId')
    }
    console.log(data)
    const response= await addBilld(data)
    if(response.result)
      alertMessage("Guardo exitosamente","success")

      loadBuilld("00000000-0000-0000-0000-000000000000")
  }

  async function removeBilld(billID){
     const response= await deleteBilld(billID)
     if(response)
     alertMessage("Eliminado exitosamente","success")
     loadBuilld("00000000-0000-0000-0000-000000000000")
  }
 function alertMessage(title,icon){
    Swal.fire({
      icon: `${icon}`,
      title: `${title}`,
    })
 }
  const searching=(e)=>{
    setsearch(e.target.value)
  }
  const onChangeVustomer= async (value) =>{
   await loadBuilld(value.target.value)
  }
  let results =null
  if(!search)
  results= billd
  else
  results=billd.filter((data)=>  data.noBilld.toString().toLowerCase().includes(search.toLowerCase()) 
  || data.customerName.toString().toLowerCase().includes(search.toLowerCase())
  || data.descriptionBill.toString().toLowerCase().includes(search.toLowerCase()))
 
  return (
    
    <main className={mainClass}>
      <ModalnewBilld 
      id='new'
      title='Nueva factura'
      saveTask={saveTask}
      customers={customers}
      />
      <Header/>
      
        <div className="wrapper" >
    <Row gutter={16}>
    <Col span={8}>
     
      <label htmlFor="exampleInputEmail1" className="form-label">No factura</label>
            <input 
            type="text" 
            name="nameTaskFilter" 
            className="form-control" 
            onChange={searching}/>
      
       
     
    </Col>
    <Col span={8}>
     
      <label htmlFor="exampleInputEmail1" className="form-label">Cliente</label> 
             <select className="form-select" onChange={onChangeVustomer}  aria-label="Default select example" >
             <option  value="00000000-0000-0000-0000-000000000000">
                  Seleccione cliente
                </option>
                {customers.map((item) => {
              return (
                <option key={item.customerID} value={item.customerID}>
                  {item.nameCustomer +" "+item.lastNameCustomer}
                </option>
              );
            })}
        </select>
    
    </Col>
    <Col span={8}>
      <Card bordered={false}>
      <button type="button" data-bs-toggle="modal" data-bs-target="#new" className="btn btn-outline-dark">Nueva factura</button>
      </Card>
    </Col>
  </Row>

        </div>
        <TableBilld
          data={results}
          removeBilld={removeBilld}
          />
    </main>
  )
}
export default PageBilld;
