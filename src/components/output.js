import React from "react"
import styles from "../styles/output.module.scss"
import { useStore, playPreview, deleteCompressed } from "../context"
import CompressedVideo from "../components/compressedVideo"

const Output = () => {
  const [state, dispatch] = useStore()
  const handlePlayPreview = preview => {
    dispatch(playPreview(preview))
  }
  const handleDelete = index => {
    dispatch(deleteCompressed(index))
  }
  return (
    <div className={styles.output}>
      <div className={styles.info}>
        <div className={styles.progressWrapper}>
          <div
            style={{ width: `${state.progress * 100}%` }}
            className={styles.bar}
          ></div>
          <span className={styles.progress}>
            {((state.progress > 0 && state.progress) || 0).toFixed(4) * 100}%
          </span>
        </div>
        {/* <div className={styles.logWrapper}>
          <div className={styles.log}>{state.log || ""}</div>
        </div> */}
      </div>
      {/* compressed videos */}
      <div className={styles.compressed}>
        <h2>Compressed Videos</h2>
        <div className={styles.videos}>
          {state.compressedVideos &&
            state.compressedVideos.map((video, i) => (
              <CompressedVideo
                key={i}
                name={video.name}
                blob={video.blob}
                handlePlayPreview={handlePlayPreview}
                handleDelete={() => handleDelete(i)}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Output
