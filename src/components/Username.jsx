import { useRef, useState } from "react"
import styled from "styled-components"
import Input from "./Input"
import Button from "./Button"
import BounceLoader from "react-spinners/BounceLoader"
import BeatLoader from "react-spinners/BeatLoader"

const Wrapper = styled.div``
const Stats = styled.p`
  font-size: 14px;
  color: gray;
  margin-top: 5px;
  display: inline-block;
  vertical-align: bottom;
`
const Current = styled.span`
  font-weight: bold;
`
const Proposed = styled.span`
  cursor: pointer;
  text-decoration: underline;
`

const propose = (name) => {
  name = name.toLowerCase()
  const proposed = [
    `fat_${name}_2971`,
    `0shutup0${name}0`,
    `${name.split("").join("_")}_s_u_c_k_s`,
    name
      .split("")
      .map((u, i) => i + 1 + u)
      .join(""),
    `${name}_the_dumb_potato`,
    `stupid_${name}_1127`,
    `im_${name}_and_im_dumb`,
  ]
  return proposed[(Math.random() * proposed.length) | 0]
}

function Status({ proposed, username, setUsername, loading, usernameRef }) {
  return (
    <Stats>
      {loading ? (
        <>
          Checking... &nbsp;
          <BounceLoader color="gray" size={10} loading={loading} />
        </>
      ) : username ? (
        username === proposed ? (
          <span>
            <Current>{username}</Current> is available!
          </span>
        ) : (
          <span>
            <Current>{username}</Current> is taken. How about{" "}
            <Proposed
              onClick={() => (
                (usernameRef.current.value = proposed),
                usernameRef.current.focus(),
                setUsername(proposed)
              )}
            >
              {proposed}
            </Proposed>
            ?
          </span>
        )
      ) : (
        <span>Enter a username</span>
      )}
    </Stats>
  )
}

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  float: right;
  &:hover {
    flex-direction: row-reverse;
  }
`

export default function Username({ setState, state, back }) {
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState()
  const [proposed, setProposed] = useState(propose(state.name))
  const [submitting, setSubmitting] = useState(false)
  const usernameRef = useRef()

  const search = ((timeout) => (e) => {
    clearTimeout(timeout)
    timeout = setTimeout(
      () => (
        setLoading(true),
        (timeout = setTimeout(() => {
          setUsername(e.target.value)
          setLoading(false)
          setProposed(propose(state.name))
        }, (1000 + Math.random() * 1000) | 0))
      ),
      300
    )
  })(null)

  const submit = () => {
    setSubmitting(true)
    setTimeout(
      () =>
        setState((prev) => ({ ...prev, username: usernameRef.current.value })),
      (1000 + Math.random() * 1000) | 0
    )
  }

  return (
    <Wrapper>
      <h2 style={{ marginTop: 0 }}>Pick a username...</h2>
      <Input
        ref={usernameRef}
        autoFocus
        placeholder="E.g. seamless1122"
        onChange={search}
      />
      <Status
        proposed={proposed}
        username={username}
        setUsername={setUsername}
        loading={loading}
        usernameRef={usernameRef}
      />
      <div>
        <ButtonGroup>
          <Button $secondary onClick={back}>
            &laquo; Back
          </Button>
          <Button
            disabled={submitting || username !== proposed}
            onClick={submit}
          >
            {submitting ? (
              <BeatLoader size={10} color={"gray"} />
            ) : (
              "Confirm username"
            )}
          </Button>
        </ButtonGroup>
      </div>
    </Wrapper>
  )
}
