import React from "react"
import styled from "styled-components"

const TabWrapper = styled.div`
  width: 100%;
  height: 60px;
  background: ${({ theme }) => theme.colors.background3};
  border-radius: 10px 10px 0 0;
  display: flex;
  align-items: center;
  padding: 0 40px;
`
const Tab = styled.div`
  transition: opacity 0.1s ease;
  opacity: ${({ active }) => !active && 0.7};
  margin: 0 20px;
  cursor: pointer;
`
const Button = styled.button`
  cursor: pointer;
  font-weight: bold;
  padding: 10px 15px;
  color: ${({ theme }) => theme.colors.background2};
  background: ${({ theme }) => theme.colors.text};
  box-shadow: 0 10px 10px ${({ theme }) => theme.colors.shadow};
  margin-left: auto;
  border: none;
  outline: none;

  &::focus {
    outline: 1px solid ${({ theme }) => theme.colors.text};
  }

  transition: transform 0.2s ease;
  &:active {
    transform: translateY(5px);
  }
`

const Tabs = ({
  tabs = [],
  active,
  primaryButton,
  onButtonClick,
  onTabChange,
  disable = false,
}) => {
  return (
    <TabWrapper>
      {tabs.map((tab, i) => (
        <Tab
          key={i}
          onClick={() => !disable && onTabChange(tab.toLowerCase())}
          active={active === tab.toLowerCase()}
        >
          {tab}
        </Tab>
      ))}
      {primaryButton && <Button disabled={disable}>{primaryButton}</Button>}
    </TabWrapper>
  )
}

export default Tabs
