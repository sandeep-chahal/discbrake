import React from "react"
import styles from "../styles/output.module.css"
import { useStore } from "../context"
import CompressedVideo from "../components/compressedVideo"

const Output = () => {
  const [state, dispatch] = useStore()
  return (
    <div className={styles.output}>
      <div className={styles.compressed}>
        <h2>Compressed Videos</h2>
        <div className={styles.videos}>
          {state.compressedVideos &&
            state.compressedVideos.map(video => (
              <CompressedVideo name={video.name} blob={video.blob} />
            ))}
        </div>
      </div>
      <div className={styles.progressWrapper}>
        <div
          style={{ width: `${state.progress * 100}%` }}
          className={styles.progress}
        ></div>
      </div>
      <div className={styles.logWrapper}>
        <div className={styles.log}>{state.log || ""}</div>
      </div>
    </div>
  )
}

export default Output
