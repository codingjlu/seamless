import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
*, *::before, *::after {
  box-sizing: border-box;
}
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
input, button, textarea, select {
  font: inherit;
}
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
html, body {
  height: 100%;
}
body {
  font-family: Figtree, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0;
  overflow-x: hidden;
}
@media (max-width: 800px) {
  body {
    align-items: initial;
    padding-top: 50px;
  }
}
`
