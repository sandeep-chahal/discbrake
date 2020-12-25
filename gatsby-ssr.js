import React from "react"
import { Provider } from "./src/context"

export const wrapRootElement = ({ element }) => {
  return <Provider>{element}</Provider>
}
