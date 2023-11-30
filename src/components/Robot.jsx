import styled from "styled-components"
import Button from "./Button"
import Input from "./Input"
import { useRef, useState } from "react"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useInterval } from "./hooks"

const Wrapper = styled.div``
const ChallengeNumber = styled.p`
  color: gray;
  margin-bottom: 5px;
`

export default function Robot({ setState }) {
  const [challenge, setChallenge] = useState(0)
  const [animateParent] = useAutoAnimate()

  return (
    <Wrapper ref={animateParent}>
      <h2 style={{ marginTop: 0 }}>Are you a robot?</h2>
      <ChallengeNumber>Challenge {challenge + 1}/3</ChallengeNumber>
      {challenge === 0 ? (
        <TheFlip done={() => setChallenge(1)} />
      ) : challenge === 1 ? (
        <TheDodge done={() => setChallenge(2)} />
      ) : (
        <TheArithmetic
          done={() =>
            setState((prev) => ({
              ...prev,
              verified: true,
            }))
          }
        />
      )}
    </Wrapper>
  )
}

const TheFlipWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  & > button {
    flex: 1;
  }
`

function TheFlip({ done }) {
  const [flipped, setFlipped] = useState(false)
  const timeout = useRef(null)
  const failures = useRef(0)

  const flip = () => {
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => setFlipped(!flipped), 75)
  }

  return (
    <TheFlipWrapper style={{ flexDirection: flipped ? "row-reverse" : "row" }}>
      <Button tabIndex={-1} onMouseOver={flip} onClick={done}>
        No
      </Button>
      <Button
        $secondary
        onClick={() =>
          ++failures.current === 5
            ? (alert("BLOCKED - Reason: bot detected"),
              (document.body.innerHTML = "user blocked."))
            : alert(
                `Failed ${failures.current} times (${Math.round(
                  100 * (failures.current / 5)
                )}% bot likelihood)`
              )
        }
      >
        Yes
      </Button>
    </TheFlipWrapper>
  )
}

function TheDodge({ done }) {
  const timeout = useRef(null)
  const [pos, setPos] = useState({})

  return (
    <Button
      style={{
        position: "fixed",
        top: pos.y,
        left: pos.x,
        transition: "200ms",
        width: 200,
      }}
      onClick={done}
      tabIndex={-1}
      onMouseOver={() => {
        clearTimeout(timeout.current)
        timeout.current = setTimeout(
          () =>
            setPos({
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }),
          100
        )
      }}
    >
      I am not a robot
    </Button>
  )
}

function TheArithmetic({ done }) {
  const inputRef = useRef(null)
  const failures = useRef(0)

  const [numbers, setNumbers] = useState([
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
  ])

  const submit = () => {
    const value = inputRef.current.value
    if (value == numbers[0] * numbers[1]) return done()
    if (++failures.current === 5) {
      alert("BLOCKED - Reason: bot detected")
      document.body.innerHTML = "user blocked."
    } else
      alert(
        `Failed ${failures.current} times (${Math.round(
          100 * (failures.current / 5)
        )}% bot likelihood)`
      )
  }

  useInterval(
    () =>
      setNumbers([
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
      ]),
    1500
  )

  return (
    <>
      <Input
        autoFocus
        ref={inputRef}
        label={`What is ${numbers[0]} &times; ${[numbers[1]]}?`}
        id="arithmetic"
        placeholder={`Maybe ${numbers[0] * numbers[1]}?`}
        onKeyUp={(e) => {
          if (e.key === "Enter") submit()
        }}
      />
      <Button style={{ float: "right", marginTop: 10 }} onClick={submit}>
        Check
      </Button>
    </>
  )
}
