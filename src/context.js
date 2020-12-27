import React, { createContext, useReducer, useContext } from "react"

const INITIAL_STATE = {
  videos: null,
  activeTab: "video",
  videoSettings: {
    codec: "default",
    frameRate: 30,
    format: "mp4",
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
    bitrate: {
      on: false,
      value: "100K",
    },
  },
  pass: 1,
  audioSettings: {
    on: true,
    codec: "default",
    speed: 1,
    bitrate: {
      on: false,
      value: "100K",
    },
  },
  compressedVideos: null,
  progress: null,
  log: null,
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
export const addCompressedVideo = video => {
  return {
    type: "COMPRESSED_VIDEO",
    payload: {
      video,
    },
  }
}
export const alterProgress = progress => {
  return {
    type: "ALTER_PROGRESS",
    payload: {
      progress,
    },
  }
}
export const addLog = log => {
  return {
    type: "ADD_LOG",
    payload: {
      log,
    },
  }
}
export const playPreview = preview => {
  return {
    type: "PLAY_PREVIEW",
    payload: {
      preview,
    },
  }
}
export const deleteImported = index => {
  return {
    type: "DELETE_IMPORTED",
    payload: {
      index,
    },
  }
}
export const deleteCompressed = index => {
  return {
    type: "DELETE_COMPRESSED",
    payload: {
      index,
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
      console.log({
        ...state.videoSettings,
        ...action.payload.settings,
      })
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
    case "COMPRESSED_VIDEO":
      return {
        ...state,
        compressedVideos: [
          ...(state.compressedVideos || []),
          action.payload.video,
        ],
      }
    case "ADD_LOG":
      return {
        ...state,
        log: action.payload.log,
      }
    case "ALTER_PROGRESS":
      return {
        ...state,
        progress: action.payload.progress,
      }
    case "PLAY_PREVIEW":
      return {
        ...state,
        preview: action.payload.preview,
      }
    case "DELETE_IMPORTED":
      console.log(state.videos.filter((_, i) => i !== action.payload.index))
      return {
        ...state,
        videos: state.videos
          ? state.videos.filter((_, i) => i !== action.payload.index)
          : [],
      }
    case "DELETE_COMPRESSED":
      return {
        ...state,
        compressedVideos: state.compressedVideos
          ? state.compressedVideos.filter((_, i) => i !== action.payload.index)
          : [],
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
