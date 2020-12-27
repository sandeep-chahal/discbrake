import React from "react"
import styles from "../styles/videoBox.module.scss"

const VideoBox = ({ video, handlePlay, handleDelete }) => {
  return (
    <div className={styles.videoBox} title={video.name}>
      <video
        controls={false}
        width="80px"
        height="80px"
        style={{ objectFit: "cover" }}
      >
        <source src={URL.createObjectURL(video)} />
      </video>
      <div className={styles.bg}>
        <img
          src="/icons/icons8-play.svg"
          width="32px"
          width="32px"
          height="32px"
          title="Play"
          onClick={handlePlay}
        />
        <img
          src="/icons/icons8-delete-bin.svg"
          width="32px"
          width="32px"
          height="32px"
          title="Delete"
          onClick={handleDelete}
        />
      </div>
    </div>
  )
}

export default VideoBox
