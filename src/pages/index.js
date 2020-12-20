import React, { useState } from "react"
import styled, { ThemeProvider } from "styled-components"
import GlobalStyles from "../styled/globalStyles"
import theme from "../styled/theme"
import { VideosWrapper, SettingsWrapper } from "../styled"
import AddVideo from "../components/addVideo"
import Tabs from "../components/tabs"

export default function Home() {
  const [activeTab, setActiveTab] = useState("video")
  const [videos, addVideos] = useState(null)

  const handleImportVideos = files => {
    addVideos(prev => [...(prev || []), ...files])
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <h1>DiscBrake</h1>
      <VideosWrapper>
        <AddVideo handleImportVideos={handleImportVideos} />
      </VideosWrapper>
      <SettingsWrapper>
        <Tabs
          tabs={["Video", "Audio", "Output"]}
          active={activeTab}
          onTabChange={setActiveTab}
          primaryButton="Compress"
          onButtonClick={() => {}}
        />
      </SettingsWrapper>
    </ThemeProvider>
  )
}
