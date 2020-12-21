import React from "react"
import { ThemeProvider } from "styled-components"
import GlobalStyles from "../styled/globalStyles"
import theme from "../styled/theme"
import { VideosWrapper, SettingsWrapper } from "../styled"
import AddVideo from "../components/addVideo"
import Tabs from "../components/tabs"
import VideoBox from "../components/videoBox"
import VideoSettings from "../components/videoSettings"
import { useStore, changeTab } from "../context"

export default function Home() {
  const [state, dispatch] = useStore()
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <h1>DiscBrake</h1>
      <VideosWrapper>
        {state.videos && state.videos.map(video => <VideoBox video={video} />)}
        <AddVideo />
      </VideosWrapper>
      <SettingsWrapper>
        <Tabs
          tabs={["Video", "Audio", "Output"]}
          active={state.activeTab}
          onTabChange={tab => dispatch(changeTab(tab))}
          primaryButton="Compress"
          onButtonClick={() => {}}
        />
        {state.activeTab === "video" && <VideoSettings />}
      </SettingsWrapper>
    </ThemeProvider>
  )
}
