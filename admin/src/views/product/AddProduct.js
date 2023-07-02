import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormCheck,
    CFormInput,
    CFormFeedback,
    CFormLabel,
    CFormSelect,
    CFormTextarea,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CustomStyles = () => {
    let nav = useNavigate()
    let formData = new FormData();
    const [product, setProduct] = useState({name:"",quantity:"",price:"",description:"",image:""})

    const [validated, setValidated] = useState(false)
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true)
        // formData.append("name",product.name)
        // formData.append("quantity",(product.quantity))
        // formData.append("price",(product.price))
        // formData.append("description",(product.description))
        // formData.append("product_image",(product.product_image))
        // console.log(formData)

        let token = await JSON.parse(localStorage.getItem('token'))
        Axios.post('http://localhost:7000/api/admin/insert-product',product, { headers: { "auth-token": token } })
        .then((res)=>{
            if(res.data.success){
                alert("product Inserted Successfully");
                nav('/viewproduct')
            }
            else{
                alert("unsuccessfull")
                console.log(res)
            }
        })
        .catch((err)=>{
            alert(err)
            console.log(err)
        })

    }
    const handleChange = (e) => {
        setProduct({...product, [e.target.name]:e.target.value})
        console.log(product)
    }
    return (
        <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            encType='multipart/form-data'
        >
            <CCol md={4}>
                <CFormLabel htmlFor="validationCustom01">Name</CFormLabel>
                <CFormInput onChange={handleChange} name="name" type="text" id="validationCustom01" required />
                <CFormFeedback invalid>Please provide Name.</CFormFeedback>
            </CCol>
            <CCol md={8}>
                <CFormLabel htmlFor="validationCustom02">Description</CFormLabel>
                <CFormInput onChange={handleChange} name="description" type="text" id="validationCustom02" required />
                <CFormFeedback invalid>Please provide Descripition.</CFormFeedback>
            </CCol>
            <CCol md={4}>
                <CFormLabel htmlFor="validationCustom022">Image URL</CFormLabel>
                <CFormInput onChange={handleChange} name="image" type="text" id="validationCustom022" required />
                <CFormFeedback invalid>Please provide Image.</CFormFeedback>
            </CCol>
            {/* <CCol md={4}>
                <CFormLabel htmlFor="validationCustomUsername">Image Url</CFormLabel>
                <CInputGroup className="has-validation">

                    <CFormInput
                        onChange={(e)=>{setProduct({...product,[e.target.name]:e.target.files[0]})}}
                        name="product_image"
                        type="file"
                        id="validationCustomUsername"
                        defaultValue=""
                        aria-describedby="inputGroupPrepend"
                        required
                    />
                    <CFormFeedback invalid>Please choose a Image.</CFormFeedback>
                </CInputGroup>
            </CCol> */}
            <CCol md={4}>
                <CFormLabel htmlFor="validationCustom03">Price</CFormLabel>
                <CFormInput onChange={handleChange} name="price" type="text" id="validationCustom03" required />
                <CFormFeedback invalid>Please provide a Price.</CFormFeedback>
            </CCol>
            <CCol md={4}>
                <CFormLabel htmlFor="validationCustom04">Quantity</CFormLabel>
                <CFormInput onChange={handleChange} name="quantity" type="number" min='1' id="validationCustom04" required />

                <CFormFeedback invalid>Please provide a Quantity.</CFormFeedback>
            </CCol>

            {/* <CCol xs={12}>
        <CFormCheck
          type="checkbox"
          id="invalidCheck"
          label="Agree to terms and conditions"
          required
        />
        <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
      </CCol> */}
            <CCol xs={12}>
                <CButton color="primary" type="submit">
                    Add product
                </CButton>
            </CCol>
        </CForm>
    )
}

const Validation = () => {
    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Add product</strong>
                    </CCardHeader>
                    <CCardBody>
                        {/* <p className="text-medium-emphasis small">
              For custom CoreUI form validation messages, you&#39;ll need to add the{' '}
              <code>noValidate</code> boolean property to your <code>&lt;CForm&gt;</code>. This
              disables the browser default feedback tooltips, but still provides access to the form
              validation APIs in JavaScript. Try to submit the form below; our JavaScript will
              intercept the submit button and relay feedback to you. When attempting to submit,
              you&#39;ll see the <code>:invalid</code> and <code>:valid</code> styles applied to
              your form controls.
            </p>
            <p className="text-medium-emphasis small">
              Custom feedback styles apply custom colors, borders, focus styles, and background
              icons to better communicate feedback.{' '}
            </p> */}
                        <DocsExample href="forms/validation">{CustomStyles()}</DocsExample>
                    </CCardBody>
                </CCard>
            </CCol>


        </CRow>
    )
}

export default Validation
