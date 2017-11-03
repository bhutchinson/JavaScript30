/* Get our elements */
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
const fullScreen = player.querySelector('.fullscreen')

/* Build our functions */
function togglePlay() {
  video.paused ? video.play() : video.pause()
}

function updateButton() {
  this.paused ? (toggle.textContent = '►') : (toggle.textContent = '❚ ❚')
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
  video[this.name] = this.value
}

function handleProgress() {
  const percent = video.currentTime / video.duration * 100
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
  const scrubTime = e.offsetX / progress.offsetWidth * video.duration
  video.currentTime = scrubTime
}

function toggleFullScreen() {
  if (fullscreen) {
    if (video.exitFullscreen) {
      video.exitFullscreen()
    } else if (video.mozExitFullScreen) {
      video.mozExitFullScreen()
    } else if (video.webkitExitFullScreen) {
      video.webkitExitFullScreen()
    } else if (video.msExitFullscreen) {
      video.msExitFullscreen()
    }
  } else {
    if (video.requestFullscreen) {
      video.requestFullscreen()
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen()
    } else if (video.webkitRequestFullScreen) {
      video.webkitRequestFullScreen()
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen()
    }
  }

  fullscreen = !fullscreen
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

toggle.addEventListener('click', togglePlay)

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip))

ranges.forEach(rangeSlider =>
  rangeSlider.addEventListener('change', handleRangeUpdate)
)

let mousedown = false
let fullscreen = false

progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', e => mousedown && scrub(e))
progress.addEventListener('mousedown', () => (mousedown = true))
progress.addEventListener('mouseup', () => (mousedown = false))

fullScreen.addEventListener('click', toggleFullScreen)
