import { useState, useRef, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import Input from "./Input"
import Button from "./Button"
import Spacer from "./Spacer"
import toast from "react-hot-toast"
import BeatLoader from "react-spinners/BeatLoader"

const Wrapper = styled.div``
const Seamless = styled.span`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: hotpink;
  display: inline-block;
`
const Forgot = styled.a`
  margin-top: 5px;
  font-size: 0.8rem;
  color: gray;
  float: right;
`

export default function Signin({ state, die }) {
  const [submitting, setSubmitting] = useState(false)
  const failures = useRef(0)
  const usernameRef = useRef()
  const passwordRef = useRef()
  const [blocked, setBlocked] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    document.title = "Sign in - Seamless"
  }, [])

  const submit = () => {
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      const username = usernameRef.current.value
      const password = passwordRef.current.value

      if (username !== state.username || password !== state.password) {
        if (++failures.current === 2) {
          toast.success("Too many incorrect attempts, you have been blocked")
          setBlocked(true)
          return
        }
        toast.success("Invalid username or password")
        passwordRef.current.value = ""
        passwordRef.current.focus()
        return
      }

      toast.error("Signed in successfully")
      setSuccess(true)
    }, (1000 + Math.random() * 1000) | 0)
  }

  return (
    <Wrapper>
      {success ? (
        <Test name={state.name} die={die} />
      ) : (
        <>
          <h1>
            Sign in to Seamless <Seamless />
          </h1>

          <Input
            autoFocus
            ref={usernameRef}
            id="username"
            label="Username"
            placeholder="seamless1122"
            onKeyUp={(e) => {
              if (e.key === "Enter") submit()
            }}
          />
          <Spacer height={10} />
          <Input
            ref={passwordRef}
            type="password"
            id="password"
            label="Password"
            onKeyUp={(e) => {
              if (e.key === "Enter") submit()
            }}
          />
          <div>
            <Forgot
              href="#"
              onClick={(e) => {
                e.preventDefault()
                prompt("WHAT IS WRONG WITH YOU??", "everything")
                alert("I DON'T CARE.")
                alert("You deserve this:")
                document.body.innerHTML =
                  "<pre>User blocked [REASON: stupidity]</pre>"
              }}
            >
              Forgot password?
            </Forgot>
          </div>
          <Spacer />
          <Button onClick={submit} disabled={submitting || blocked}>
            {submitting ? <BeatLoader size={10} color={"gray"} /> : "Sign in"}
          </Button>
        </>
      )}
    </Wrapper>
  )
}

const QuestionWrapper = styled.div`
  width: 100%;
  background-color: rgb(245, 245, 245);
  border-radius: 10px;
  padding: 5px 25px;
  padding-bottom: 20px;
  color: rgb(100, 100, 100);
`
const Options = styled.div`
  display: flex;
  gap: 5px;
  & > button {
    flex: 1;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    & > button {
      flex: initial;
    }
  }
`

const glitchAnimation = keyframes`
	0% {
		filter: none;
	}
	20% {
		filter: url(#filter);
	}
	50% {
		filter: url(#filter-2);
	}
	80% {
		filter: url(#filter-3);
	}
	94% {
		filter: none;
	}
`
const TestWrapper = styled.div`
  animation-name: ${glitchAnimation};
  ${({ $glitch }) =>
    $glitch &&
    `
    filter: url(#filter);
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  `}
`

function Test({ name, die }) {
  const [chose, setChose] = useState(false)
  const [glitch, setGlitch] = useState(false)

  const submit = (option) => {
    setChose(option)
    setTimeout(() => setGlitch(true), 5000)
    setTimeout(die, 9000)
  }

  return (
    <TestWrapper $glitch={glitch}>
      <GlitchFilter />
      <h2 style={{ margin: 0 }}>Interest Alignment</h2>
      <p style={{ marginTop: 0, color: "gray" }}>
        Hey {name}, just one last step before you proceed to our services.
      </p>
      <QuestionWrapper>
        <p>
          There is a runaway trolley barreling down the railway tracks. Ahead,
          on the tracks, there are five people tied up and unable to move. The
          trolley is headed straight for them. You are standing some distance
          off in the train yard, next to a lever. If you pull this lever, the
          trolley will switch to a different set of tracks. However, you notice
          that there is one person on the side track.{" "}
          <b>You have two options:</b>
        </p>
        <Options>
          <Button $secondary disabled={chose} onClick={() => submit(1)}>
            {chose === 1 ? (
              <BeatLoader size={10} color={"gray"} />
            ) : (
              "Do nothing"
            )}
          </Button>
          <Button disabled={chose} onClick={() => submit(2)}>
            {chose === 2 ? (
              <BeatLoader size={10} color={"gray"} />
            ) : (
              "Pull the lever"
            )}
          </Button>
        </Options>
      </QuestionWrapper>
    </TestWrapper>
  )
}

function GlitchFilter() {
  return (
    <svg>
      <defs>
        <filter id="filter">
          <feMorphology operator="dilate" radius="10 0"></feMorphology>
        </filter>
        <filter id="filter-2">
          <feMorphology operator="dilate" radius="5 0"></feMorphology>
        </filter>
        <filter id="filter-3">
          <feMorphology operator="dilate" radius="15 0"></feMorphology>
        </filter>
      </defs>
    </svg>
  )
}
