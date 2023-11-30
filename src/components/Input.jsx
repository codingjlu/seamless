import { forwardRef } from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
const Label = styled.label`
  font-weight: bold;
`
const Inp = styled.input`
  padding: 10px 15px;
  border: 1px solid lightgray;
  border-radius: 5px;
  outline: none;
  font-weight: normal;
  box-sizing: border-box;
  transition: border 200ms;

  &:focus {
    border: 1px solid gray;
  }
`

export default forwardRef(function Input({ label = false, id, ...props }, ref) {
  return (
    <Wrapper>
      {label ? (
        <Label htmlFor={id} dangerouslySetInnerHTML={{ __html: label }} />
      ) : null}
      <Inp id={id} ref={ref} {...props} />
    </Wrapper>
  )
})
