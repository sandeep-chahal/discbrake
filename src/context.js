import React, { createContext, useReducer, useContext } from "react"

const INITIAL_STATE = {
  videos: null,
  activeTab: "video",
  videoSettings: {
    codec: "H.264",
    frameRate: 30,
    format: "MP4",
    preset: "medium",
    crf: 23,
    tune: "none",
    speed: 1,
    resolution: {
      on: false,
      width: 1920,
      height: 1080,
    },
    ar: {
      on: false,
      w: 16,
      h: 9,
    },
  },
  audioSettings: {},
}

export const importVideos = videos => {
  return {
    type: "IMPORT_VIDEOS",
    payload: {
      videos,
    },
  }
}
export const changeTab = tab => {
  return {
    type: "CHANGE_TAB",
    payload: {
      tab,
    },
  }
}
export const videoSettings = settings => {
  return {
    type: "VIDEO_SETTINGS",
    payload: {
      settings,
    },
  }
}
export const audioSettings = settings => {
  return {
    type: "AUDIO_SETTINGS",
    payload: {
      settings,
    },
  }
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "IMPORT_VIDEOS":
      return {
        ...state,
        videos: [...(state.videos || []), ...action.payload.videos],
      }
    case "CHANGE_TAB":
      return {
        ...state,
        activeTab: action.payload.tab,
      }
    case "VIDEO_SETTINGS":
      return {
        ...state,
        videoSettings: {
          ...state.videoSettings,
          ...action.payload.settings,
        },
      }
    case "AUDIO_SETTINGS":
      return {
        ...state,
        audioSettings: {
          ...state.audioSettings,
          ...action.payload.settings,
        },
      }
    default:
      return state
  }
}

const Context = createContext()

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  )
}
export const useStore = () => useContext(Context)
