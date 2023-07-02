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

const Tables = () => {
    const [loader, setLoader] = useState(false)
    const [display, setDisplay] = useState([]);
    
    useEffect(() => {
        setLoader(true)
        const handleUseEffect = async () => {
            let token = await JSON.parse(localStorage.getItem('token'))
            console.log(token, 222333)
            Axios.get('http://localhost:7000/api/admin/view-payment', { headers: { "auth-token": token } })
                .then((res) => {
                    console.log(res)
                    setDisplay(res.data.payment)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        handleUseEffect()
    }, [])
    return (
        <CRow>

            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Payment Table</strong>
                    </CCardHeader>
                    <CCardBody>
                        {/* <p className="text-medium-emphasis small">
              Use <code>hover</code> property to enable a hover state on table rows within a{' '}
              <code>&lt;CTableBody&gt;</code>.
            </p> */}
                        <DocsExample href="components/table#hoverable-rows">
                            <CTable hover>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Order No.</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Payment Type</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Total Amount</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                      
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {display==0 || display==null?<>No Data</>:
                                    display.map((item, index) => {
                                        return (
                                            <CTableRow key={index}>
                                                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                                <CTableDataCell>{item?.user_id?.name}</CTableDataCell>
                                                <CTableDataCell>{item?.user_id?.phone}</CTableDataCell>
                                                <CTableDataCell>{item?.order_no}</CTableDataCell>
                                                <CTableDataCell>{item?.payment_type}</CTableDataCell>
                                                <CTableDataCell>{item?.total}</CTableDataCell>
                                                <CTableDataCell>{item?.status}</CTableDataCell>
                                                <CTableDataCell>{item?.date}</CTableDataCell>
                                                
                                                

                                            </CTableRow>
                                        )
                                    })}


                                </CTableBody>
                            </CTable>
                        </DocsExample>

                    </CCardBody>
                </CCard>
            </CCol>

        </CRow>
    )
}

export default Tables
