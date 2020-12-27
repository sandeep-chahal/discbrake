import React from "react"
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
  playPreview,
  deleteImported,
} from "../context"
import { convertAudioSettings, convertVideoSettings, uuidv4 } from "../utils"
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"
import Output from "../components/output"
import Preview from "../components/preview"
import { Helmet } from "react-helmet"

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
              key: uuidv4(),
            })
          )
      }
    } catch (err) {
      alert(err.message)
      console.log(err)
    }
  }

  const handlePlay = (name, blob) => {
    dispatch(playPreview({ name, blob }))
  }
  const handleDelete = index => {
    console.log("deleting:", index)
    dispatch(deleteImported(index))
  }

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>DiscBrake</title>
        <meta
          name="description"
          content="Video encoding right in the browser."
        />
        <meta
          name="tags"
          content="compress video, encode video, discbrake, ffmpeg, ffmpeg in browser"
        />
        <link rel="canonical" href="http://discbrake.vercel.app/" />
        <meta property="og:title" content="DiscBrake" />
        <meta property="og:site_name" content="DiscBrake" />
        <meta property="og:url" content="http://discbrake.vercel.app/" />
        <meta
          property="og:description"
          content="Video encoding right in the browser."
        />
      </Helmet>
      <GlobalStyles />
      <h1>DiscBrake</h1>
      <VideosWrapper>
        {state.videos &&
          state.videos.map((video, i) => (
            <VideoBox
              key={video.key}
              video={video}
              handlePlay={() => handlePlay(video.name, video)}
              handleDelete={() => handleDelete(i)}
            />
          ))}
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
