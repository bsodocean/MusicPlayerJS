const musicPlayer = document.getElementById('musicPlayer');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const currentSong = document.getElementById('audio');
const songProgress = document.getElementById('song-progress');
const progressBar = document.getElementById('song-length');
const songName = document.getElementById('song-name');
const cover = document.getElementById('cover');

// Song Titles

const songs = ['Tame Impala - The Less I know The Better', 'Jack Stauber - Buttercup','Mac De Marco - My Kind Of Woman'];

// Keep Song Track

let songIndex = 0;

// Initial load song info DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) { 
    songName.innerText = "Now Playing: " + song;
    currentSong.src = `Music/${song}.mp3`;
    cover.src = `Cover/${song}.jpg`;
}

function playSong () {
    musicPlayer.classList.add('play');
    playBtn.querySelector('i.fa-solid').classList.remove('fa-play');
    playBtn.querySelector('i.fa-solid').classList.add('fa-pause');

    audio.play()
}

function pauseSong () {
    musicPlayer.classList.remove('play');
    playBtn.querySelector('i.fa-solid').classList.add('fa-play');
    playBtn.querySelector('i.fa-solid').classList.remove('fa-pause');

    audio.pause()
}

function prevSong () {
    songIndex--

    if(songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])
    playSong()
}

function nextSong () {
    songIndex++

    if(songIndex > songs.length - 1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}

function updateProgress (e) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progressBar.style.width = `${progressPercent}%`;
}

function setProgress (e) {
    const width = this.clientWidth;
    const clickX = e.offsetX 
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}


// Event Listener

playBtn.addEventListener('click', () => {
    const isPlaying = musicPlayer.classList.contains('play');
    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

// Change Song event 
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', prevSong)

audio.addEventListener('timeupdate', updateProgress)


songProgress.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)