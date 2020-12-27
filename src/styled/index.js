import styled from "styled-components"

export const VideosWrapper = styled.div`
  height: auto;
  width: 100%;
  padding: 5px;
  background: ${({ theme }) => theme.colors.background2};
  margin-top: 20px;
  box-shadow: 0px 2px 20px ${({ theme }) => theme.colors.shadow};
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`
export const SettingsWrapper = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.background2};
  margin-top: 20px;
  box-shadow: 0px 2px 20px ${({ theme }) => theme.colors.shadow};
  border-radius: 10px;
`
