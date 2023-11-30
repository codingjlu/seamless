import styled from "styled-components"

export default styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  border: 2px solid hotpink;
  ${({ $secondary }) =>
    $secondary
      ? `
    background-color: transparent;
    color: hotpink;
  `
      : `
    background-color: hotpink;
    color: white;
  `}
  cursor: pointer;
  transition: background-color 200ms, border 200ms;
  box-sizing: border-box;

  &:hover {
    ${({ $secondary }) =>
      $secondary
        ? `background-color: rgba(0, 0, 0, 0.05);`
        : `background-color: #dd4b94; border: 2px solid #dd4b94;`}
  }
  &:active {
    ${({ $secondary }) =>
      $secondary
        ? `background-color: rgba(0, 0, 0, 0.08);`
        : `background-color: #c13980; border: 2px solid #c13980;`}
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.8;
    background-color: lightgray;
    border: 2px solid lightgray;
    ${({ $secondary }) => $secondary && `color: gray;`}
  }
`
