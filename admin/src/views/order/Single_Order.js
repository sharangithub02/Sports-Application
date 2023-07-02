import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableCaption,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button } from '@coreui/coreui'

const Tables = () => {
    const [display, setDisplay] = useState([]);
    let params = useParams()

    useEffect( () => {
        async function UseEffects(){
            let token = await JSON.parse(localStorage.getItem('token'))
        console.log(token, 222333)
        Axios.get(`http://localhost:7000/api/admin/view-order/${params.id}`, { headers: { "auth-token": token } })
            .then((res) => {
                if (res.data.success) {
                    setDisplay(res.data.order)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
        UseEffects()
    }, [])
    console.log(display,11111)
    let grand_total = 0;
    return (
        <CRow>

            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>User Table</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CCard> 
                            <h3><u>Delivery Details</u> :</h3>
                            <h4>Name : {display[0]?.shipping_id?.name}</h4>
                            <h4>Phone : {display[0]?.shipping_id?.phone}</h4>
                    
                            <h4>Address : {display[0]?.shipping_id?.address}</h4>
                            <h4>Pin Code : {display[0]?.shipping_id?.pin_code}</h4>

                            <h3><u>Product Details </u>:</h3>
                            {display.map((item,index)=>{
                                let sub_total = Number(item?.quantity)*Number(item?.price)
                                grand_total += sub_total;
                                return(
                                    <>
                                    <h4 key={index}>Product Name: {item?.product_id?.name}</h4>
                                    <h4 >Quantity: {item?.quantity}</h4>
                                    <h4>Price: {item?.price}</h4>
                                    <h4>Sub Total : {sub_total}</h4>
                                    <hr/>
                                    </>
                                )
                            })}
                            <h3>Grand Total : {grand_total}</h3>

                        
                            
                            
                            


                        </CCard>

                       

                    </CCardBody>
                </CCard>
            </CCol>

        </CRow>
    )
}

export default Tables
