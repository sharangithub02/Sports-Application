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
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        async function UseEffects() {
            let token = await JSON.parse(localStorage.getItem('token'))
            console.log(token, 222333)
            Axios.get('http://localhost:7000/api/admin/view-product', { headers: { "auth-token": token } })
                .then((res) => {
                    console.log(res)
                    setDisplay(res.data.product)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        UseEffects()
    }, [loader])

    const handleDelete = (id) => {
        setLoader(true)
        let token = JSON.parse(localStorage.getItem('token'))
        Axios.delete(`http://localhost:7000/api/admin/delete-product/${id}`, { headers: { "auth-token": token } })
            .then((res) => {
                console.log(res)
                alert("deleted successfully")
                setLoader(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <>
            <CRow>

                <CCol xs={12}>
                    <CCard classNameName="mb-4">
                        <CCardHeader>
                            <strong>User Table</strong>
                        </CCardHeader>
                        <CCardBody>
                            {/* <p classNameName="text-medium-emphasis small">
              Use <code>hover</code> property to enable a hover state on table rows within a{' '}
              <code>&lt;CTableBody&gt;</code>.
            </p> */}
                            <DocsExample href="components/table#hoverable-rows">
                                <CTable hover>
                                    <CTableHead>
                                        <CTableRow>
                                            <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {display == 0 || display == null ? <>No Data</> :
                                            display.map((item, index) => {
                                                return (
                                                    <CTableRow key={index}>
                                                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                                        <CTableDataCell>{item.name}</CTableDataCell>
                                                        <CTableDataCell>{item.description}</CTableDataCell>
                                                        <CTableDataCell>{item.quantity}</CTableDataCell>
                                                        <CTableDataCell>{item.price}</CTableDataCell>
                                                        <CTableDataCell><img src={item.image} alt="no image" height={150} width={150} /></CTableDataCell>
                                                        <CTableDataCell> <Link className='btn btn-success' to={`product-update/${item._id}`}>Edit</Link></CTableDataCell>
                                                        <CTableDataCell><button className='btn btn-danger' onClick={() => handleDelete(item._id)}>Delete</button></CTableDataCell>

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


        </>
    )
}

export default Tables
