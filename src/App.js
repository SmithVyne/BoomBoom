import { createContext, useState } from "react";
import Nav from "./components/Nav";
import Main from "./components/Main";
import styled, { ThemeProvider } from "styled-components";

export const themeContext = createContext();
const whichTheme = (darkTheme) => {
  if(darkTheme) {
    return {
      background: "#010101",
      textColor: "#ffffff",
    }
  } else {
    return {
      background: "#F8F8F8",
      textColor: "#121212",
    }
  }
};

const Wrapper = styled.div`
  max-width: 100%;
  min-height:100vh;
  height: fit-content;
  background: ${props => props.theme.background};
  padding: 48px 80px;
`;

export default function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <themeContext.Provider value={{darkTheme, setDarkTheme}}>
      <ThemeProvider theme={whichTheme(darkTheme)}>
        <Wrapper>
          <Nav />
          <Main />
        </Wrapper>
      </ThemeProvider>
    </themeContext.Provider>
  )
}
