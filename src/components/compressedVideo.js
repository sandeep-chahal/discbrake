import React from "react"
import styled from "styled-components"
import { handleDownload } from "../utils"

const Wrapper = styled.div`
  width: 80px;
  height: 80px;
  margin-right: 20px;
  outline: 2px solid ${({ theme }) => theme.colors.text};
  cursor: pointer;
`
const VideoBox = ({ blob, name }) => {
  const url = URL.createObjectURL(blob)
  return (
    <Wrapper>
      <div className="video-wrapper">
        <video
          title="Click to download"
          controls={false}
          width="80px"
          height="80px"
          style={{ objectFit: "cover" }}
        >
          <source src={url} />
        </video>
      </div>
      <p>{name.slice(0, 20)}...</p>
      <div className={styles.download}>
        <a download={name} href={url}>
          Save
        </a>
        <span onClick={() => handleDownload(name, blob)}>Save as</span>
      </div>
    </Wrapper>
  )
}

export default VideoBox
