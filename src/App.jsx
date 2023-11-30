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
    toast(
      "Welcome to Seamless, you'll never find a more seamless interaction. Have fun!"
    )
    toast("Please note that using a touchscreen will ruin the experience.")
  }, [])

  return (
    <Wrapper ref={animateParent}>
      {dead ? (
        (enable(false), (<Dead state={state} />))
      ) : created ? (
        <Signin state={state} die={() => setDead(true)} />
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
