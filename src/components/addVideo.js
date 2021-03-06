import React, { useRef } from "react"
import styled from "styled-components"
import { useStore, importVideos } from "../context"
import { uuidv4 } from "../utils"

const Wrapper = styled.div.attrs(() => ({ title: "Click to import videos" }))`
  width: 80px;
  height: 80px;
  margin: 10px;
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
  const [state, dispatch] = useStore()
  const input = useRef(null)

  const filterFiles = files => {
    const videos = Array.from(files)
      .filter(file => file.type.includes("video/"))
      .map(video => {
        video.key = uuidv4()
        return video
      })
    console.log(videos)
    return videos
  }

  const handleFileOpen = () => {
    if ("showOpenFilePicker" in window) {
      window
        .showOpenFilePicker({
          multiple: true,
          types: [
            {
              description: "Videos",
              accept: {
                "video/*": [
                  ".mp4",
                  ".avi",
                  ".mov",
                  ".mkv",
                  ".webm",
                  ".flv",
                  ".3gp",
                  ".wmv",
                  ".flv",
                ],
              },
            },
          ],
        })
        .then(async res => {
          const proms = res.map(file => file.getFile())
          let files = await Promise.all(proms)
          files = filterFiles(files)
          dispatch(importVideos(files))
          console.log(files)
        })
        .catch(err => {
          console.warn(err)
        })
    } else {
      input.current.click()
    }
  }
  const handleFileChoose = e => {
    dispatch(importVideos(filterFiles(e.target.files)))
  }
  return (
    <Wrapper onClick={handleFileOpen}>
      <Plus width="80%" height="10px" />
      <Plus height="80%" width="10px" />
      <input
        type="file"
        hidden
        accept="video/*"
        multiple
        ref={input}
        onChange={handleFileChoose}
      />
    </Wrapper>
  )
}

export default AddVideo
