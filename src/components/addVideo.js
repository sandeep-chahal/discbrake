import React from "react"
import styled from "styled-components"

const Wrapper = styled.div.attrs(() => ({ title: "Click to import videos" }))`
  width: 80px;
  height: 80px;
  background: ${({ theme }) => theme.colors.addVideo};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 5px;
  backface-visibility: hidden;
  cursor: pointer;
  text-align: center;
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-5px);
  }
  &:active {
    transform: translateY(5px);
  }
`
const Plus = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: ${({ theme }) => theme.colors.background2};
  position: absolute;
`

const AddVideo = () => {
  return (
    <Wrapper>
      <Plus width="80%" height="10px" />
      <Plus height="80%" width="10px" />
    </Wrapper>
  )
}

export default AddVideo
