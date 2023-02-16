import React,{ useState, useEffect } from 'react'
import '../overview/overview.css'
import ModalTaskEdit from '../modal/modalTaskEdit'
import Swal from 'sweetalert2'
import { Table,Typography } from 'antd';
import { Button, Tooltip, Space } from 'antd';
import {

  DeleteOutlined
} from '@ant-design/icons';

const { Text } = Typography;
 const App = (props) => { 

const [editing,setEditing]=useState({
   idtask:0, nameTask:'',state:''
})
const columns = [
  {
    title: 'No. factura',
    dataIndex: 'noBilld',
    key: 'noBilld',
  },
  {
    title: 'Cliente',
    dataIndex: 'customerName',
    key: 'customerName',
  },
  {
    title: 'Fecha factura',
    dataIndex: 'dateBill',
    key: 'dateBill',
    render: (data) => {
      return new Date(data).toLocaleDateString('en-US');
    },
  },
  {
    title: 'Descripción',
    dataIndex: 'descriptionBill',
    key: 'descriptionBill',
   
  },
  {
    title: 'Valor',
    dataIndex: 'valueBill',
    key: 'valueBill',
    render: (data) => {
     return formatValue(data)
    },
  },
  {
    title: "",
    dataIndex: "billID",
    key: "billID",
    render: (billID) => {
      return (
          <>
           <Tooltip title="Eliminar">
          <Button onClick={() => deleteRow(billID)} danger>
          <DeleteOutlined />
          </Button>
          </Tooltip>
        </>
      );
    },
  },
];

const deleteRow=(billID)=>{
    Swal.fire({
        title: 'Atención',
        text: "Esta seguro de eliminar el registro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
        props.removeBilld(billID)
         
        }
      })
}
const formatValue=(data)=>{
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        minimumFractionDigits: 2,
        currency: "USD"
      }) 
      return formatter.format(data)
}
  return (
    
    <section className="overview">
      <div className="wrapper">

<Table 
dataSource={props.data}
 columns={columns}
 rowKey={(record) => record.billID}     
 summary={pageData => {
  let totalValue = 0;
  pageData.forEach(({ valueBill }) => {
    totalValue += valueBill;
  });
  return (
    <>
      <Table.Summary.Row>
        <Table.Summary.Cell style="font-weight: bold;"> Total</Table.Summary.Cell>
        <Table.Summary.Cell></Table.Summary.Cell>
        <Table.Summary.Cell></Table.Summary.Cell>
        <Table.Summary.Cell></Table.Summary.Cell>
        <Table.Summary.Cell>
          <Text>{ formatValue(totalValue) }</Text>
        </Table.Summary.Cell>
      </Table.Summary.Row>
    </>
  );
}}
/>
</div>
</section>
  )
}

export default App