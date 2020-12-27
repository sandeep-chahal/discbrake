export const convertVideoSettings = settings => {
  const cmd = []

  if ("codec" in settings && settings.codec != "default") {
    cmd.push("-vcodec")
    cmd.push(settings["codec"])
  }
  if ("frameRate" in settings && settings.frameRate) {
    cmd.push("-r")
    cmd.push(settings["frameRate"])
  }
  if ("preset" in settings) {
    cmd.push("-preset")
    cmd.push(settings["preset"])
  }
  if ("crf" in settings) {
    cmd.push("-crf")
    cmd.push(settings["crf"])
  }
  if ("bitrate" in settings && settings.bitrate.on) {
    cmd.push("-b:v")
    cmd.push(settings["bitrate"].value)
  }
  if ("resolution" in settings && settings.resolution.on) {
    cmd.push("-vf")
    cmd.push(
      `scale=${settings["resolution"].width}:${settings["resolution"].height}`
    )
  }
  if ("ar" in settings && settings.ar.on) {
    cmd.push("-aspect")
    cmd.push(`${settings["ar"].w}:${settings["ar"].h}`)
  }

  return cmd.map(c => String(c))
}
export const convertAudioSettings = settings => {
  const cmd = []

  if (!settings.on) {
    cmd.push("-an")
  } else {
    if ("codec" in settings && settings.codec != "default") {
      cmd.push("-acodec")
      cmd.push(settings["codec"])
    }

    if ("bitrate" in settings && settings.bitrate.on) {
      cmd.push("-b:a")
      cmd.push(settings["bitrate"].value)
    }
  }

  return cmd.map(c => String(c))
}

export const handleDownload = async (name, blob) => {
  try {
    const file = await window.showSaveFilePicker({
      types: [
        {
          description: "Video Files",
          accept: {
            "video/*": [],
          },
        },
      ],
    })
    const writable = await file.createWritable()
    await writable.write(blob)
    await writable.close()
  } catch (err) {
    alert(err.message)
    console.log(err)
  }
}
