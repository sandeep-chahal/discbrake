import React from "react"
import styles from "../styles/preview.module.scss"
import { useStore, playPreview } from "../context"

const Preview = () => {
  const [state, dispatch] = useStore()
  const closePreview = () => {
    dispatch(playPreview(null))
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.preview}>
          <div className={styles.close} onClick={closePreview}>
            Close
        </div>
        <video controls>
          <source src={URL.createObjectURL(state.preview.blob)}></source>
        </video>
      </div>
    </div>
  )
}

export default Preview
