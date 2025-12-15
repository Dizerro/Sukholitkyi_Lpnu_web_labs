import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import FormError from "../components/FormError";
import { clearCart } from "../redux/actions";

const CheckoutSchema = Yup.object({
  firstName: Yup.string()
    .matches(/^[A-Za-z]+$/, "First name must contain only letters")
    .max(20, "First name is too long")
    .required("First name is a required field"),

  lastName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Last name must contain only letters")
    .required("Last name is a required field"),

  email: Yup.string()
    .matches(
      /^[^\s@]+@[^\s@]{2,}\.[^\s@]+$/,
      "Email domain must contain at least 2 characters"
    )
    .required("Email is a required field"),

  phone: Yup.number()
    .typeError("Phone number must contain only numbers")
    .required("Phone number is a required field"),

  address: Yup.string()
    .min(5, "Address is too short")
    .required("Address is a required field"),
});

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <section className="checkout-page">
        <h1>Checkout</h1>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
          }}
          validationSchema={CheckoutSchema}
          onSubmit={(values) => {
            console.log("Order:", values);
            dispatch(clearCart());
            navigate("/success");
          }}
        >
          {({ errors, touched }) => (
            <Form className="checkout-form">
              <div className="form-group">
                <Field name="firstName" placeholder="First name" />
                <FormError error={errors.firstName} touched={touched.firstName} />
              </div>

              <div className="form-group">
                <Field name="lastName" placeholder="Last name" />
                <FormError error={errors.lastName} touched={touched.lastName} />
              </div>

              <div className="form-group">
                <Field name="email" placeholder="Email" />
                <FormError error={errors.email} touched={touched.email} />
              </div>

              <div className="form-group">
                <Field name="phone" placeholder="Phone number" />
                <FormError error={errors.phone} touched={touched.phone} />
              </div>

              <div className="form-group">
                <Field name="address" placeholder="Address" />
                <FormError error={errors.address} touched={touched.address} />
              </div>

              <button type="submit" className="checkout-submit">
                Place order
              </button>
            </Form>
          )}
        </Formik>
      </section>

      <Footer />
    </>
  );
}

export default Checkout;
