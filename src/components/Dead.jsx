import { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import message from "./message"
import { useInterval } from "./hooks"

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #121212;
  white-space: pre-line;
  color: white;
  font-family: "Source Code Pro", monospace;
`

const Line = styled.p`
  margin: 0;
  display: inline-block;
`

export default function Dead() {
  useEffect(() => {
    document.title = "ded"
    document.querySelector('link[rel="icon"]').href =
      "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💀</text></svg>"
  }, [])

  return (
    <Wrapper>
      <Type
        text={message}
        done={() => {
          setTimeout(() => {
            window.location.href = "https://youtu.be/dQw4w9WgXcQ"
          }, 5000)
          return null
        }}
      />
    </Wrapper>
  )
}

const flash = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
const Cursor = styled.span`
  height: 10px;
  width: 5px;
  background-color: white;
  display: inline-block;
  animation: ${flash} 300ms linear infinite alternate;
`

function Type({ text, done }) {
  const [t, setT] = useState("")
  useInterval(
    () => {
      setT(t + text[t.length])
    },
    t.length === text.length ? done() : text[t.length] === "\n" ? 1000 : 30
  )
  return (
    <Line key={text}>
      {t}
      <Cursor />
    </Line>
  )
}
