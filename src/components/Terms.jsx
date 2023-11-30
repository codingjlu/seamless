import { useEffect, useState } from "react"
import styled from "styled-components"
import Button from "./Button"
import A from "./A"
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"
import Spacer from "./Spacer"
import { useInterval } from "./hooks"

const Wrapper = styled.div``
const Btn = styled(Button)`
  transition: 200ms !important;
  &&:hover {
    transform: translateX(100%) !important;
  }
`

export default function Terms({ setState }) {
  const [read, setRead] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const listener = window.addEventListener("hashchange", () => {
      if (window.location.hash === "#tac") setOpen(true)
    })
    return () => window.removeEventListener("hashchange", listener)
  }, [])

  return (
    <Wrapper>
      <h2 style={{ marginTop: 0 }}>Terms & Conditions</h2>
      <p>
        By proceeding, you have read and agree to the{" "}
        <A href="#tac">Terms and Conditions</A>.
      </p>
      <Tippy disabled={read} content="Please read the Terms & Conditions first">
        <span>
          <Btn
            disabled={!read}
            onClick={() => setState((prev) => ({ ...prev, tac: true }))}
          >
            I agree
          </Btn>
        </span>
      </Tippy>
      {open && (
        <Popup
          close={() => {
            window.location.hash = ""
            setOpen(false)
            setRead(true)
          }}
        />
      )}
    </Wrapper>
  )
}

const PopupBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: not-allowed;
`
const PopupWrapper = styled.div`
  overflow: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-top: 4px solid hotpink;
  background-color: white;
  padding: 20px 50px;
  width: 50vw;
  max-height: 70vh;

  @media (max-width: 1200px) {
    width: 80vw;
  }
  @media (max-width: 800px) {
    width: 95vw;
    max-height: 95vh;
  }
`
const LastUpdated = styled.p`
  font-size: 0.8rem;
  color: #666;
`
const Text = styled.div`
  color: rgb(70, 70, 70);
`
const SectionTitle = styled.h3`
  margin-bottom: 0;
  & + * {
    margin-top: 10px;
  }
`
function Popup({ close }) {
  return (
    <>
      <PopupBackdrop />
      <PopupWrapper>
        <h2 style={{ marginBottom: 0 }}>
          Terms & Conditions{" "}
          <span style={{ fontSize: "1rem", color: "gray" }}>(abbreviated)</span>
        </h2>
        <LastUpdated style={{ marginTop: 0 }}>
          Last Updated: November 28, 2023
        </LastUpdated>
        <p>Note: scroll to bottom to close.</p>
        <Text>
          <SectionTitle>1. DEFINITIONS</SectionTitle>

          <ul>
            <li>
              <strong>User:</strong> A wonderful human or sentient being
              (aliens, we're looking at you) who accesses Seamless. If you're a
              cat trying to order sushi, please contact us for a special
              feline-friendly version.
            </li>
            <li>
              <strong>Services:</strong> The magic we perform behind the screen,
              including but not limited to food delivery, wish fulfillment, and
              occasionally predicting your next embarrassing moment.
            </li>
          </ul>

          <SectionTitle>2. ACCEPTANCE OF TERMS</SectionTitle>
          <p>
            By continuing to use Seamless, you agree that life is short, and
            laughter is the best medicine. If you can't handle our witty charm,
            please close the app immediately and consult a boring website.
          </p>

          <SectionTitle>3. USE OF SERVICES</SectionTitle>
          <ul>
            <li>
              <h4 style={{ margin: 0 }}>a. Food Delivery</h4>
              <p style={{ marginTop: 0 }}>
                We solemnly swear that our delivery drivers are faster than your
                neighbor's WiFi. We are not responsible for any side effects
                resulting from uncontrollable cravings or excessive food comas.
              </p>
            </li>
            <li>
              <h4 style={{ margin: 0 }}>b. Wish Fulfillment</h4>
              <p style={{ marginTop: 0 }}>
                If you wish for world peace, unlimited pizza, or a pet dragon,
                we'll do our best, but no promises. We reserve the right to
                substitute wishes with reality.
              </p>
            </li>
          </ul>

          <SectionTitle>4. USER OBLIGATIONS</SectionTitle>
          <ul>
            <li>
              <h4 style={{ margin: 0 }}>a. Behavior</h4>
              <p style={{ marginTop: 0 }}>
                Be kind, rewind, and remember that even our servers have
                feelings. Abusive behavior may result in banishment to a land of
                dial-up internet and soggy pizza.
              </p>
            </li>
            <li>
              <h4 style={{ margin: 0 }}>b. Passwords</h4>
              <p style={{ marginTop: 0 }}>
                Keep your passwords safer than grandma's secret cookie recipe.
                If your account gets hacked, we might send you a sympathy card,
                but we're not paying for your unusual pizza topping choices.
              </p>
            </li>
          </ul>

          <SectionTitle>5. INTELLECTUAL PROPERTY</SectionTitle>
          <p>
            We claim intellectual property over the concept of Seamless being
            ridiculously awesome. You're welcome to admire it, but don't try to
            steal our thunder. Thunder theft is a crime, and we have a superhero
            lawyer on speed dial.
          </p>

          <SectionTitle>6. LIMITATION OF LIABILITY</SectionTitle>
          <p>
            Seamless is not liable for any uncontrollable laughter, sudden
            cravings, or newfound appreciation for dad jokes that may result
            from using our services. We also accept no responsibility for any
            broken scales.
          </p>

          <SectionTitle>7. TERMINATION</SectionTitle>
          <p>
            We reserve the right to terminate your account if you refuse to
            laugh at our jokes or if you attempt to teach our AI to speak in
            Shakespearean prose. Thou shall not mess with Seamless.
          </p>

          <SectionTitle>8. GOVERNING LAW</SectionTitle>
          <p>
            These terms are governed by the laws of Funlandia, where the only
            crime is not enjoying yourself. In the event of a dispute, we'll
            settle it over a pizza, and the loser pays in marshmallows.
          </p>

          <SectionTitle>9. CONTACT INFORMATION</SectionTitle>
          <p>
            For customer support, love letters, or suggestions on how to make
            our jokes funnier, contact us at{" "}
            <A target="_blank" href="https://youtu.be/dQw4w9WgXcQ">
              laugh@seamless.com
            </A>
            . We promise not to respond with knock-knock jokes unless explicitly
            requested.
          </p>

          <p>
            By continuing to use Seamless, you agree that life is too short for
            boring Terms and Conditions. Go forth, order joyfully, and remember:
            If laughter is the best medicine, then Seamless is the ultimate cure
            for the mundane. Enjoy your journey through the land of Seamless,
            where the only thing we take seriously is having a seriously good
            time.
          </p>
        </Text>
        <Close close={close} />
        <Spacer height={10} />
      </PopupWrapper>
    </>
  )
}

const Remaining = styled.span`
  opacity: 0.9;
  font-size: 0.8rem;
`

function Close({ close }) {
  const [remaining, setRemaining] = useState(30)

  useInterval(
    () => setRemaining((remaining) => remaining - 1),
    remaining ? 1000 : null
  )

  return (
    <Button disabled={remaining} onClick={close}>
      Close{" "}
      {remaining ? (
        <Remaining>
          ({remaining} second{remaining === 1 ? "" : "s"})
        </Remaining>
      ) : (
        ""
      )}
    </Button>
  )
}
