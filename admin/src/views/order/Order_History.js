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
import { Link } from 'react-router-dom'

const Tables = () => {
    const [display, setDisplay] = useState([]);
    useEffect(() => {
        async function UseEffects() {
            let token = await JSON.parse(localStorage.getItem('token'))
            console.log(token, 222333)
            Axios.get('http://localhost:7000/api/admin/view-order', { headers: { "auth-token": token } })
                .then((res) => {
                    if (res.data.success) {
                        const uniqueData = (res.data.order).filter((item, index, array) => {
                            return index === (res.data.order).findIndex(obj => obj.order_no === item.order_no);
                        });
                        setDisplay(uniqueData)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        UseEffects()
    }, [])

    const handleProceed = () => {

    }

    return (
        <CRow>

            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>User Table</strong>
                    </CCardHeader>
                    <CCardBody>

                        <DocsExample href="components/table#hoverable-rows">
                            <CTable hover>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                                        {/* <CTableHeaderCell scope="col">Grocery Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Quantity</CTableHeaderCell> */}
                                        <CTableHeaderCell scope="col">Delv. Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Delv. Address</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Delv. Phone</CTableHeaderCell>

                                        <CTableHeaderCell scope="col">View</CTableHeaderCell>

                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {display == 0 || null ? <>No data</> :
                                        display?.map((item, index) => {
                                            if (item.status == "completed") {
                                                return (
                                                    <CTableRow key={index}>
                                                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                                        <CTableDataCell>{item?.user_id?.name}</CTableDataCell>
                                                        <CTableDataCell>{item?.user_id?.phone}</CTableDataCell>

                                                        <CTableDataCell>{item?.shipping_id?.name}</CTableDataCell>
                                                        <CTableDataCell>{item?.shipping_id?.address}</CTableDataCell>
                                                        <CTableDataCell>{item?.shipping_id?.phone}</CTableDataCell>

                                                        <CTableDataCell><Link className='btn btn-primary' to={`/single-order/${item?.order_no}`}>View</Link></CTableDataCell>



                                                    </CTableRow>
                                                )
                                            }
                                            else{
                                                <>No Data</>
                                            }
                                        })}


                                </CTableBody>
                            </CTable>
                        </DocsExample>

                    </CCardBody>
                </CCard>
            </CCol>

        </CRow >
    )
}

export default Tables
