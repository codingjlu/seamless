import { useRef } from "react"
import styled from "styled-components"
import toast from "react-hot-toast"
import Input from "./Input"
import Button from "./Button"
import Spacer from "./Spacer"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
const Seamless = styled.span`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: hotpink;
  display: inline-block;
`

export default function Name({ setState, state }) {
  const inputRef = useRef()
  const submit = () =>
    inputRef.current.value.trim().length
      ? setState((prev) => ({ ...prev, name: inputRef.current.value }))
      : toast.error("Please enter your name")

  return (
    <Wrapper>
      <div>
        <h1 style={{ margin: 0 }}>
          Sign up for Seamless <Seamless />
        </h1>
        <p style={{ marginTop: 0 }}>It only takes a minute.</p>
      </div>
      <Input
        label="Your name"
        id="name"
        placeholder="What should we call you?"
        ref={inputRef}
        onKeyUp={(e) => {
          if (e.key === "Enter") submit()
        }}
        autoFocus
        defaultValue={state.name}
      />
      <Spacer height={5} />
      <div>
        <Button style={{ float: "right" }} onClick={submit}>
          Next &raquo;
        </Button>
      </div>
    </Wrapper>
  )
}
