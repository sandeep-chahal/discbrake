import React from "react"
import styles from "../styles/settings.module.scss"
import Select from "./select"
import Slider from "react-slider"
import { useStore, audioSettings } from "../context"

const AudioSettings = () => {
  const [state, dispatch] = useStore()

  const handleCodecChange = codec => {
    dispatch(audioSettings({ codec }))
  }

  const handleSpeedChange = speed => {
    dispatch(
      audioSettings({
        speed,
      })
    )
  }
  const handleBitrateChange = bitrate => {
    dispatch(audioSettings({ bitrate }))
  }
  const handleOnOffChange = state => {
    dispatch(
      audioSettings({
        on: state === "on",
      })
    )
  }

  return (
    <div className={styles.settings}>
      <div className={styles.group}>
        <div className={styles.label}>Audio:</div>
        <Select
          selected={state.audioSettings.on ? "on" : "off"}
          onChange={handleOnOffChange}
          options={["on", "off"]}
        />
      </div>
      <div className={styles.group}>
        <div className={styles.label}>Codec:</div>
        <Select
          selected={state.audioSettings.codec}
          onChange={handleCodecChange}
          options={["default", "aac", "mp2", "mp3", "ac3", "eac3"]}
        />
      </div>

      <form className={styles.group}>
        <div className={styles.label}>Bitrate:</div>
        <div>
          <input
            id="bitrate_default"
            type="radio"
            name="bitrate"
            checked={!state.audioSettings.bitrate.on}
            onChange={e =>
              handleBitrateChange({
                ...state.audioSettings.bitrate,
                on: false,
              })
            }
          />
          <label className={styles.label} htmlFor="bitrate_default">
            default
          </label>
        </div>
        <div>
          <input
            id="custom_bitrate"
            type="radio"
            name="bitrate"
            checked={state.audioSettings.bitrate.on}
            onChange={e =>
              handleBitrateChange({
                ...state.audioSettings.bitrate,
                on: true,
              })
            }
          />
          <label className={styles.label} htmlFor="custom_bitrate">
            custom
          </label>
          <input
            type="text"
            placeholder="100K"
            value={state.audioSettings.bitrate.value}
            onChange={e =>
              handleBitrateChange({
                ...state.audioSettings.bitrate,
                value: e.target.value,
              })
            }
          />
        </div>
      </form>
    </div>
  )
}
export default AudioSettings
