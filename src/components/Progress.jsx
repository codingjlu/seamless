import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 5px;
  gap: 5px;
`
const Bar = styled.span.withConfig({ shouldForwardProp: false })`
  height: 100%;
  flex-grow: 1;
  border-radius: 10px;
  background-color: ${({ $active }) => ($active ? "hotpink" : "lightgray")};
  transition: background-color 200ms;
`

export default function Progress({ steps, step }) {
  return (
    <Wrapper>
      {Array(steps)
        .fill()
        .map((_, i) => (
          <Bar key={i} $active={i <= step} />
        ))}
    </Wrapper>
  )
}
