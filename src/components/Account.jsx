import { useRef } from "react"
import styled from "styled-components"
import Input from "./Input"
import Spacer from "./Spacer"
import Button from "./Button"
import toast from "react-hot-toast"

const Wrapper = styled.div``

export default function Email({ setState, back, state }) {
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const submit = () => {
    const email = emailRef.current.value.trim()
    const password = passwordRef.current.value

    if (!email) {
      passwordRef.current.value = ""
      confirmPasswordRef.current.value = ""
      return toast.error("Please enter an email")
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      passwordRef.current.value = ""
      confirmPasswordRef.current.value = ""
      return toast.error("Please enter a valid email")
    }
    if (!password) {
      passwordRef.current.value = ""
      confirmPasswordRef.current.value = ""
      return toast.error("Please enter a password")
    }
    if (password.length < 8) {
      passwordRef.current.value = ""
      confirmPasswordRef.current.value = ""
      return toast.error("Password must be at least 8 characters")
    }
    if (password.length > 60) {
      passwordRef.current.value = ""
      confirmPasswordRef.current.value = ""
      return toast.error("Password must be less than 60 characters")
    }
    if (!/\d/.test(password)) {
      passwordRef.current.value = ""
      confirmPasswordRef.current.value = ""
      return toast.error("Password must contain at least one number")
    }
    if (!/[a-z]/.test(password)) {
      passwordRef.current.value = ""
      confirmPasswordRef.current.value = ""
      return toast.error("Password must contain at least one lowercase letter")
    }
    if (!/[A-Z]/.test(password)) {
      passwordRef.current.value = ""
      confirmPasswordRef.current.value = ""
      return toast.error("Password must contain at least one uppercase letter")
    }
    if (!/\W/.test(password)) {
      passwordRef.current.value = ""
      confirmPasswordRef.current.value = ""
      return toast.error("Password must contain at least one special character")
    }
    if (password !== confirmPasswordRef.current.value) {
      passwordRef.current.value = ""
      confirmPasswordRef.current.value = ""
      return toast.error("Passwords do not match")
    }

    setState((prev) => ({ ...prev, email, password }))
  }

  return (
    <Wrapper>
      <h2 style={{ marginTop: 0 }}>Welcome, {state.name}!</h2>
      <Input
        label="Your email"
        placeholder="johndoe@example.com"
        type="email"
        id="email"
        autoFocus
        ref={emailRef}
        onKeyUp={(e) => {
          if (e.key === "Enter") submit()
        }}
        defaultValue={state.email}
      />
      <Spacer height={10} />
      <Input label="Password" type="password" id="password" ref={passwordRef} />
      <Spacer height={5} />
      <Input
        label="Confirm password"
        type="password"
        id="confirmPassword"
        ref={confirmPasswordRef}
      />
      <Spacer height={10} />
      <div>
        <Button style={{ float: "right", marginLeft: 10 }} onClick={back}>
          Back &raquo;
        </Button>
        <Button $secondary style={{ float: "right" }} onClick={submit}>
          &laquo; Next
        </Button>
      </div>
    </Wrapper>
  )
}
