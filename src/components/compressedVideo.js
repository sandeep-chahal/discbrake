import React from "react"
import { handleDownload } from "../utils"
import styles from "../styles/compressedVideo.module.scss"

const VideoBox = ({ blob, name, handlePlayPreview, handleDelete }) => {
  return (
    <div className={styles.compressedVideo} title={name}>
      <h3>{name}</h3>
      <div className={styles.controls}>
        <img
          onClick={() => handlePlayPreview({ name, blob })}
          src="/icons/icons8-play.svg"
          width="25px"
          height="25px"
        />
        <a href={URL.createObjectURL(blob)} download={name}>
          <img
            title="download"
            src="/icons/icons8-download.svg"
            width="20px"
            height="20px"
          />
        </a>
        <img
          onClick={() => handleDownload(name, blob)}
          title="Save as"
          src="/icons/icons8-save.svg"
          width="20px"
          height="20px"
        />
        <img
          onClick={handleDelete}
          title="Delete"
          src="/icons/icons8-delete-bin.svg"
          width="20px"
          height="20px"
        />
      </div>
    </div>
  )
}

export default VideoBox

// return (
//   <div className={styles.compressedVideo} title={name}>
//     <div className={styles.videoWrapper}>
//       <video controls={false} width="80px" height="80px">
//         <source src={url} />
//       </video>
//     </div>
//     <p>{name.slice(0, 20)}...</p>
//     <div>
//       <a download={name} href={url}>
//         Save
//       </a>
//       <span onClick={() => handleDownload(name, blob)}>Save as</span>
//     </div>
//   </div>
// )
