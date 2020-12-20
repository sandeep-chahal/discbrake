import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
    *,
    *::after,
    *::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        margin: 0;
        font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow-x: hidden;
        padding: 10px 40px;
        background:${({ theme }) => theme.colors.background1};
        color:${({ theme }) => theme.colors.text};
    }
`
export default GlobalStyles
