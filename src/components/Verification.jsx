import { useState, useEffect } from "react"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import styled from "styled-components"
import Button from "./Button"
import BeatLoader from "react-spinners/BeatLoader"

const Wrapper = styled.div``

function useVerification(user) {
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    console.clear()

    const block = "background-color: white; color: black; border-radius: 3px;"
    const reset = "background-color: initial; color: initial;"

    console.log(
      "%c USER VERIFICATION ",
      "font-size: 1.5rem; color: white; background-color: hotpink; border-radius: 5px;"
    )
    console.log(
      "All you need to do is type %cverify%cbelow, then press enter.",
      block,
      reset
    )

    if (!("verify" in window))
      Object.defineProperty(window, "verify", {
        get() {
          console.log(`Verifying user %c${user.username}%c...`, block, reset)
          setTimeout(() => {
            console.log(
              "Done! You may now close this pane and confirm your account."
            )
            setComplete(true)
          }, 1000)
        },
      })
  }, [])

  return complete
}

export default function Verification({ state, setState }) {
  const [submitting, setSubmitting] = useState(false)
  const [animateParent] = useAutoAnimate()
  const complete = useVerification(state)

  const submit = () => {
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setState((prev) => ({ ...prev, verified: true }))
    }, (1000 + Math.random() * 1000) | 0)
  }

  return (
    <Wrapper ref={animateParent}>
      <h2 style={{ margin: 0 }}>User verification</h2>
      <p style={{ marginTop: 0, color: "gray" }}>
        Almost there! Please follow the verification steps in the browser
        console.
      </p>
      {complete && (
        <Button onClick={submit} disabled={submitting}>
          {submitting ? (
            <BeatLoader size={10} color={"gray"} />
          ) : (
            "Confirm account"
          )}
        </Button>
      )}
    </Wrapper>
  )
}
