import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 80px;
  height: 80px;
  margin-right: 20px;
  outline: 2px solid ${({ theme }) => theme.colors.text};
`
const VideoBox = ({ video }) => {
  return (
    <Wrapper title={video.name}>
      <video
        controls={false}
        width="80px"
        height="80px"
        style={{ objectFit: "cover" }}
      >
        <source src={URL.createObjectURL(video)} />
      </video>
    </Wrapper>
  )
}

export default VideoBox
