const YOUTUBE_VIDEO_ID = 'vEmBUhnBtFI'

const gifStages = [
  "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif",
  "https://media1.tenor.com/m/uDugCXK4vI4AAAAd/chiikawa-hachiware.gif",
  "https://media.tenor.com/f_rkpJbH1s8AAAAj/somsom1012.gif",
  "https://media.tenor.com/OGY9zdREsVAAAAAj/somsom1012.gif",
  "https://media1.tenor.com/m/WGfra-Y_Ke0AAAAd/chiikawa-sad.gif",
  "https://media.tenor.com/CivArbX7NzQAAAAj/somsom1012.gif",
  "https://media.tenor.com/5_tv1HquZlcAAAAj/chiikawa.gif",
  "https://media1.tenor.com/m/uDugCXK4vI4AAAAC/chiikawa-hachiware.gif"
]

const noMessages = [
  "No",
  "Are you *sure* sure? 🤔",
  "Babe please... my heart is fragile 🥺",
  "If you say no I'll write sad poetry about you...",
  "I'm gonna need a minute... and maybe ice cream 😢",
  "Please??? My ego can't take it 💔",
  "Don't do me like this...",
  "Last chance! I'm too cute to refuse 😭",
  "You can't catch me anyway 😜"
]

const yesTeasePokes = [
  "Pssst... try No first. I promise it's funny 😏",
  "Go on, hit No... just for the plot 👀",
  "You're missing the runaway button. Just saying 😈",
  "Click No. I dare you. (Yes is still the right answer) 😏"
]

let yesTeasedCount = 0
let noClickCount = 0
let runawayEnabled = false
let musicPlaying = true
let ytPlayer = null

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const musicToggle = document.getElementById('music-toggle')

// YouTube IFrame API
function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player('youtube-player-wrap', {
    height: '1',
    width: '1',
    videoId: YOUTUBE_VIDEO_ID,
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      loop: 1,
      playlist: YOUTUBE_VIDEO_ID,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      showinfo: 0
    },
    events: {
      onReady: onPlayerReady
    }
  })
}

function onPlayerReady(event) {
  // Start muted; unmute on first user click (browser policy)
  event.target.mute()
  event.target.playVideo()
  document.addEventListener('click', unmuteOnFirstClick, { once: true })
}

function unmuteOnFirstClick() {
  if (ytPlayer && ytPlayer.unMute) {
    ytPlayer.unMute()
    musicPlaying = true
    if (musicToggle) musicToggle.textContent = '🔊'
  }
}

function toggleMusic() {
  if (!ytPlayer || !ytPlayer.getPlayerState) return
  const state = ytPlayer.getPlayerState()
  if (musicPlaying) {
    ytPlayer.pauseVideo()
    musicPlaying = false
    musicToggle.textContent = '🔇'
  } else {
    ytPlayer.unMute()
    ytPlayer.playVideo()
    musicPlaying = true
    musicToggle.textContent = '🔊'
  }
}

// Spawn extra floating hearts
function spawnHearts() {
  const wrap = document.getElementById('hearts-float')
  if (!wrap) return
  const hearts = ['💕', '💗', '💖', '💝', '💓', '❤️', '💘']
  for (let i = 0; i < 12; i++) {
    const el = document.createElement('span')
    el.className = 'heart-bubble'
    el.textContent = hearts[i % hearts.length]
    el.style.left = Math.random() * 100 + '%'
    el.style.animationDelay = Math.random() * 8 + 's'
    el.style.animationDuration = (10 + Math.random() * 6) + 's'
    wrap.appendChild(el)
  }
}

function handleYesClick() {
  if (!runawayEnabled) {
    const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)]
    yesTeasedCount++
    showTeaseMessage(msg)
    return
  }
  window.location.href = 'yes.html'
}

function showTeaseMessage(msg) {
  const toast = document.getElementById('tease-toast')
  toast.textContent = msg
  toast.classList.add('show')
  clearTimeout(toast._timer)
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2500)
}

function handleNoClick() {
  noClickCount++

  const msgIndex = Math.min(noClickCount, noMessages.length - 1)
  noBtn.textContent = noMessages[msgIndex]

  const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
  yesBtn.style.fontSize = `${currentSize * 1.35}px`
  const padY = Math.min(18 + noClickCount * 5, 60)
  const padX = Math.min(45 + noClickCount * 10, 120)
  yesBtn.style.padding = `${padY}px ${padX}px`

  if (noClickCount >= 2) {
    const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
    noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
  }

  const gifIndex = Math.min(noClickCount, gifStages.length - 1)
  swapGif(gifStages[gifIndex])

  if (noClickCount >= 5 && !runawayEnabled) {
    enableRunaway()
    runawayEnabled = true
  }
}

function swapGif(src) {
  catGif.style.opacity = '0'
  setTimeout(() => {
    catGif.src = src
    catGif.style.opacity = '1'
  }, 200)
}

function enableRunaway() {
  noBtn.addEventListener('mouseover', runAway)
  noBtn.addEventListener('touchstart', runAway, { passive: true })
}

function runAway() {
  const margin = 20
  const btnW = noBtn.offsetWidth
  const btnH = noBtn.offsetHeight
  const maxX = window.innerWidth - btnW - margin
  const maxY = window.innerHeight - btnH - margin

  const randomX = Math.random() * maxX + margin / 2
  const randomY = Math.random() * maxY + margin / 2

  noBtn.style.position = 'fixed'
  noBtn.style.left = `${randomX}px`
  noBtn.style.top = `${randomY}px`
  noBtn.style.zIndex = '50'
}

spawnHearts()
