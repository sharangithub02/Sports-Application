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
import { useNavigate } from 'react-router-dom'

const Tables = () => {
    let nav = useNavigate()
    const [display, setDisplay] = useState([]);
    useEffect(() => {
        let token = JSON.parse(localStorage.getItem('token'))
        if (!token) {
            nav('/login')
        }
        else {
            async function UseEffects() {
                let token = await JSON.parse(localStorage.getItem('token'))
                console.log(token, 222333)

                Axios.get('http://localhost:7000/api/admin/view-user', { headers: { "auth-token": token } })
                    .then((res) => {
                        console.log(res)
                        setDisplay(res.data.user)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            UseEffects()
        }

    }, [])
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
                                        <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {display == 0 || display == null ? <>No Data</> :
                                        display?.map((item, index) => {
                                            return (
                                                <CTableRow key={index}>
                                                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                                                    <CTableDataCell>{item.name}</CTableDataCell>
                                                    <CTableDataCell>{item.phone}</CTableDataCell>
                                                    <CTableDataCell>{item.email}</CTableDataCell>
                                                    <CTableDataCell>{item.address}</CTableDataCell>

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
