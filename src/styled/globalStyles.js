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
        overflow: hidden;
        padding: 10px 40px;
        background:${({ theme }) => theme.colors.background1};
        color:${({ theme }) => theme.colors.text};
    }
    .settings{
        height: 62vh;
        overflow-y: auto;
    }

    .settings::-webkit-scrollbar {
        width: 10px;
    }
    
    .settings::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
    
    .settings::-webkit-scrollbar-thumb {
        background-color: #ccc;
    }
`
export default GlobalStyles
