import styled from "styled-components"
import { useState, useEffect } from "react"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import Spacer from "./components/Spacer"
import Progress from "./components/Progress"
import toast from "react-hot-toast"

import Name from "./components/Name"
import Account from "./components/Account"
import Username from "./components/Username"
import Terms from "./components/Terms"
import Robot from "./components/Robot"
import Verification from "./components/Verification"

import Signin from "./components/Signin"
import Dead from "./components/Dead"

const track = (() => {
  const called = new Set()
  return (code) => !called.has(code) && window.umami?.track?.(code)
})()

const Wrapper = styled.div`
  position: relative;
  width: 30vw;
  @media (max-width: 1200px) {
    width: 50vw;
  }
  @media (max-width: 800px) {
    width: 90vw;
  }
`

const Steps = [Name, Account, Username, Terms, Robot, Verification]

function App() {
  const [animateParent, enable] = useAutoAnimate()
  const [step, setStep] = useState(0)
  const [steps, setSteps] = useState(3)
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    tac: false,
    real: false,
    verified: false,
  })
  const [created, setCreated] = useState(false)
  const [dead, setDead] = useState(false)

  const Step = Steps[step]
  const done = () => {
    toast.error("Account created successfully")
    setCreated(true)
  }

  useEffect(() => {
    const isTouchscreen =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    if (isTouchscreen)
      alert(
        "Thanks for visiting, but using Seamless with a touchscreen will ruin the experience. Please switch to another device."
      )
  }, [])

  useEffect(() => {
    track(`Step ${step}`)
  }, [step])

  return (
    <Wrapper ref={animateParent}>
      {dead ? (
        (enable(false), track("Death"), (<Dead state={state} />))
      ) : created ? (
        (track("Created account"),
        (<Signin state={state} die={() => setDead(true)} />))
      ) : (
        <>
          <Progress steps={steps} step={step} />
          <Spacer />
          <Step
            setState={(...args) => (
              setState(...args),
              step < Steps.length - 1
                ? (setStep(step + 1), step + 1 === 3 && setSteps(6))
                : done()
            )}
            back={() => setStep(step - 1)}
            state={state}
          />
        </>
      )}
    </Wrapper>
  )
}

export default App
