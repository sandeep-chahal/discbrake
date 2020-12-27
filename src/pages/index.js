import React, { useState, useEffect } from "react"
import { ThemeProvider } from "styled-components"
import GlobalStyles from "../styled/globalStyles"
import theme from "../styled/theme"
import { VideosWrapper, SettingsWrapper } from "../styled"
import AddVideo from "../components/addVideo"
import Tabs from "../components/tabs"
import VideoBox from "../components/videoBox"
import VideoSettings from "../components/videoSettings"
import AudioSettings from "../components/audioSettings"
import {
  useStore,
  changeTab,
  addCompressedVideo,
  addLog,
  alterProgress,
} from "../context"
import { convertAudioSettings, convertVideoSettings } from "../utils"
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"
import Output from "../components/output"
import Preview from "../components/preview"

const ffmpeg = createFFmpeg({
  log: true,
})

export default function Home() {
  const [state, dispatch] = useStore()

  const handleCompress = async () => {
    try {
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load()
        ffmpeg.setProgress(prog => {
          dispatch(alterProgress(prog.ratio))
        })
        ffmpeg.setLogger(log => {
          dispatch(addLog(log.message))
        })
      }

      if (!ffmpeg.isLoaded()) return alert("ffmpeg not loaded yet")
      dispatch(changeTab("output"))
      const format = state.videoSettings.format
      const cmds1 = convertVideoSettings(state.videoSettings)
      const cmds2 = convertAudioSettings(state.audioSettings)
      const cmd = [...cmds1, ...cmds2]
      console.log(cmd)
      for (let i = 0; i < state.videos.length; i++) {
        const video = state.videos[i]
        ffmpeg.FS("writeFile", video.name, await fetchFile(video))
        await ffmpeg.run("-i", video.name, ...cmd, `output.${format}`)
        const data = ffmpeg.FS("readFile", `output.${format}`)
        const blob = new Blob([data.buffer], { type: `video/${format}` })
        ffmpeg.FS("unlink", `output.${format}`)
        if (blob.size)
          dispatch(
            addCompressedVideo({
              name: video.name.split(".").slice(0, -1).join(".") + "." + format,
              blob,
            })
          )
      }
    } catch (err) {
      alert(err.message)
      console.log(err)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <h1>DiscBrake</h1>
      <VideosWrapper>
        {state.videos &&
          state.videos.map((video, i) => <VideoBox key={i} video={video} />)}
        <AddVideo />
      </VideosWrapper>
      <SettingsWrapper>
        <Tabs
          tabs={["Video", "Audio", "Output"]}
          active={state.activeTab}
          onTabChange={tab => dispatch(changeTab(tab))}
          primaryButton="Compress"
          onButtonClick={handleCompress}
        />
        <div className="settings">
          {state.activeTab === "video" && <VideoSettings />}
          {state.activeTab === "audio" && <AudioSettings />}
          {state.activeTab === "output" && <Output />}
        </div>
      </SettingsWrapper>
      {state.preview ? <Preview /> : null}
    </ThemeProvider>
  )
}
