import React from "react"
import styles from "../styles/videoSettings.module.scss"
import Select from "./select"
import Slider from "react-slider"
import { useStore, videoSettings } from "../context"

const VideoSettings = () => {
  const [state, dispatch] = useStore()

  const handleCodecChange = codec => {
    dispatch(videoSettings({ codec }))
  }
  const handleFrameRateChange = fr => {
    dispatch(videoSettings({ frameRate: fr }))
  }
  const handleFormatChange = f => {
    dispatch(videoSettings({ format: f }))
  }
  const handlePresetChange = p => {
    dispatch(videoSettings({ preset: p }))
  }
  const handleCRFChange = crf => {
    dispatch(videoSettings({ crf }))
  }
  const handleTuneChange = tune => {
    dispatch(videoSettings({ tune }))
  }
  const handleResOnOff = on => {
    dispatch(
      videoSettings({ resolution: { ...state.videoSettings.resolution, on } })
    )
  }

  const handleResChange = res => {
    dispatch(
      videoSettings({
        resolution: { ...state.videoSettings.resolution, ...res },
      })
    )
  }
  const handleAROnOff = on => {
    dispatch(videoSettings({ ar: { ...state.videoSettings.ar, on } }))
  }

  const handleARChange = v => {
    dispatch(
      videoSettings({
        ar: { ...state.videoSettings.ar, ...v },
      })
    )
  }

  const handleSpeedChange = speed => {
    dispatch(
      videoSettings({
        speed,
      })
    )
  }

  return (
    <div className={styles.videoSettings}>
      <div className={styles.group}>
        <div className={styles.label}>Codec:</div>
        <Select
          selected={state.videoSettings.codec}
          onChange={handleCodecChange}
          options={["default", "libx264", "libvpx", "vp9", "vp8"]}
        />
      </div>
      <div className={styles.group}>
        <label className={styles.label}>Frame Rate:</label>

        <Slider
          defaultValue={state.videoSettings.frameRate}
          min={0}
          max={120}
          onAfterChange={handleFrameRateChange}
          className={styles.slider}
          thumbClassName={styles.thumb}
          trackClassName={styles.track}
          renderThumb={(props, state) => (
            <div
              className={styles.thumb}
              {...props}
              title={state.valueNow || "Same As Source"}
            >
              {state.valueNow || "SAS"}
            </div>
          )}
        />
      </div>
      <div className={styles.group}>
        <div className={styles.label}>Format:</div>
        <Select
          selected={state.videoSettings.format}
          onChange={handleFormatChange}
          options={["mp4", "avi", "mkv", "webm"]}
        />
      </div>
      <div className={styles.group}>
        <div className={styles.label}>Preset:</div>
        <Select
          selected={state.videoSettings.preset}
          onChange={handlePresetChange}
          options={[
            "ultrafast",
            "superfast",
            "veryfast",
            "faster",
            "fast",
            "medium",
            "slow",
            "slower",
            "veryslow",
            "placebo",
          ]}
        />
      </div>
      <div className={styles.group}>
        <label className={styles.label}>CRF:</label>

        <Slider
          defaultValue={state.videoSettings.crf}
          min={0}
          max={50}
          onAfterChange={handleCRFChange}
          className={styles.slider}
          thumbClassName={styles.thumb}
          trackClassName={styles.track}
          renderThumb={(props, state) => (
            <div className={styles.thumb} {...props}>
              {state.valueNow}
            </div>
          )}
        />
      </div>
      {/* resolution */}
      <form className={styles.res}>
        <div className={styles.label}>Resolution:</div>
        <div>
          <input
            checked={!state.videoSettings.resolution.on}
            id="original"
            type="radio"
            name="res"
            onChange={() => handleResOnOff(false)}
          />
          <label htmlFor="original">Original</label>
        </div>
        <div className={styles.custom}>
          <input
            checked={state.videoSettings.resolution.on}
            onChange={() => handleResOnOff(true)}
            type="radio"
            name="res"
            value="wxh"
            id="custom1"
          />
          <label htmlFor="custom1">Custom</label>
          <div>
            <input
              type="text"
              name="res"
              placeholder="Width"
              value={state.videoSettings.resolution.width}
              onChange={e => handleResChange({ width: e.target.value })}
            />

            <input
              type="text"
              name="res"
              placeholder="Height"
              value={state.videoSettings.resolution.height}
              onChange={e => handleResChange({ height: e.target.value })}
            />
          </div>
        </div>
      </form>

      {/* aspect ratio */}
      <form className={styles.res}>
        <div className={styles.label}>Aspect Ratio:</div>
        <div>
          <input
            checked={!state.videoSettings.ar.on}
            id="original1"
            type="radio"
            name="ar"
            onChange={() => handleAROnOff(false)}
          />
          <label htmlFor="original1">Original</label>
        </div>
        <div className={styles.custom}>
          <input
            checked={state.videoSettings.ar.on}
            onChange={() => handleAROnOff(true)}
            type="radio"
            name="ar"
            id="custom2"
          />
          <label htmlFor="custom2">Custom</label>
          <div>
            <input
              type="text"
              name="ar"
              placeholder="W"
              value={state.videoSettings.ar.w}
              onChange={e => handleARChange({ w: e.target.value })}
            />

            <input
              id="wxh"
              type="text"
              name="ar"
              placeholder="HeHight"
              value={state.videoSettings.ar.h}
              onChange={e => handleARChange({ h: e.target.value })}
            />
          </div>
        </div>
      </form>
      <div className={styles.group}>
        <label className={styles.label}>Speed:</label>

        <Slider
          defaultValue={state.videoSettings.speed}
          min={0.1}
          max={2}
          onAfterChange={handleSpeedChange}
          className={styles.slider}
          thumbClassName={styles.thumb}
          trackClassName={styles.track}
          step={0.1}
          renderThumb={(props, state) => (
            <div className={styles.thumb} {...props}>
              {state.valueNow}
            </div>
          )}
        />
      </div>
    </div>
  )
}
export default VideoSettings
