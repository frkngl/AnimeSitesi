const video_player = document.querySelector('#videoplayer'),
   mainVideo = video_player.querySelector('#main-video'),
   progressAreaTime = video_player.querySelector('.progressAreaTime'),
   controls = video_player.querySelector('.controls'),
   progress_area = video_player.querySelector('.progress_area'),
   progress_bar = video_player.querySelector('.progress_bar'),
   bufferedbar = video_player.querySelector('.buffered_progress_bar'),
   fast_rewind = video_player.querySelector('.fast-rewind'),
   play_pause = video_player.querySelector('.play_pause'),
   fast_forward = video_player.querySelector('.fast-forward'),
   volume = video_player.querySelector('.volume'),
   volume_range = video_player.querySelector('.volume_range'),
   current = video_player.querySelector('.current'),
   totalDuration = video_player.querySelector('.duration'),
   settingsBtn = video_player.querySelector('.settingsBtn'),
   picture_in_picture = video_player.querySelector('.picture_in_picture'),
   fullscreen = video_player.querySelector('.fullscreen'),
   settings = video_player.querySelector('#settings'),
   playback = video_player.querySelectorAll('.playback li');

mainVideo.addEventListener('loadeddata',()=>{
   setInterval(() => {
      let bufferedTime = mainVideo.buffered.end(0);
      let duration = mainVideo.duration;
      let width = (bufferedTime / duration) * 100;
      bufferedbar.style.width = `${width}%`;
   }, 500);
})



document.addEventListener("keydown", e => {
   const tagName = document.activeElement.tagName.toLowerCase()

   switch (e.key.toLowerCase()) {
      case " ":
         playpause()
         break
      case "arrowleft":
         fastrewind()
         break
      case "arrowright":
         fastforward()
         break
      case "m":
         muteVolume()
         break
      case "p":
         pictureinpicture()
         break
      case "f":
         full_screen()
         breakf
   }
})



//VIDEO PLAY FUNCTION
function playVideo() {
   play_pause.innerHTML = "pause_circle";
   play_pause.title = "pause";
   video_player.classList.add('paused');
   mainVideo.play();
}
//VIDEO PAUSE FUNCTION
function pauseVideo() {
   play_pause.innerHTML = "play_circle";
   play_pause.title = "play";
   video_player.classList.remove('paused');
   mainVideo.pause();
}
play_pause.addEventListener('click', playpause);
function playpause() {
   const isVideoPaused = video_player.classList.contains('paused');

   isVideoPaused ? pauseVideo() : playVideo();
}

mainVideo.addEventListener('click', () => {
   const isVideoPaused = video_player.classList.contains('paused');

   isVideoPaused ? pauseVideo() : playVideo();
})

mainVideo.addEventListener('play', () => {
   playVideo();
})

mainVideo.addEventListener('pause', () => {
   pauseVideo();
})



//FAST REWIND PAUSE FUNCTION
fast_rewind.addEventListener('click', fastrewind);
function fastrewind() {
   mainVideo.currentTime -= 10;
}

//FAST FORWARD PAUSE FUNCTION
fast_forward.addEventListener('click', fastforward);
function fastforward(){
   mainVideo.currentTime += 10;
}



//LOAD VIDEO DURATION

mainVideo.addEventListener('loadeddata', (e) => {
   let videoDuration = e.target.duration;
   let totalMin = Math.floor(videoDuration / 60);
   let totalSec = Math.floor(videoDuration % 60);

   //if seconds are less then 10 then add 0 at the begning
   totalSec < 10 ? totalSec = "0" + totalSec : totalSec;
   totalDuration.innerHTML = `${totalMin} : ${totalSec}`;
})



//Current video duration
mainVideo.addEventListener('timeupdate', (e) => {
   let currentVideoTime = e.target.currentTime;
   let currentMin = Math.floor(currentVideoTime / 60);
   let currentSec = Math.floor(currentVideoTime % 60);

   //if seconds are less then 10 then add 0 at the begning
   currentSec < 10 ? currentSec = "0" + currentSec : currentSec;
   current.innerHTML = `${currentMin} : ${currentSec}`;


   let videoDuration = e.target.duration;
   //progressBar width change
   let progressWidth = (currentVideoTime / videoDuration) * 100;
   progress_bar.style.width = `${progressWidth}%`;
})

//let's update playing video current time on according to the progress bar width

progress_area.addEventListener('click', (e) => {
   let videoDuration = mainVideo.duration;
   let progressWidthval = progress_area.clientWidth;
   let ClickOffsetX = e.offsetX;

   mainVideo.currentTime = (ClickOffsetX / progressWidthval) * videoDuration;
})

//CHANGE VOLUME
function changeVolume() {
   mainVideo.volume = volume_range.value / 100;
   if (volume_range.value == 0) {
      volume.innerHTML = "volume_off";
   } else if (volume_range.value < 40) {
      volume.innerHTML = "volume_down";
   }
   else {
      volume.innerHTML = "volume_up";
   }
}
function muteVolume() {
   if (volume_range.value == 0) {
      volume_range.value = 50;
      mainVideo.volume = 0.5;
      volume.innerHTML = "volume_up";
   }
   else {
      volume_range.value = 0;
      mainVideo.volume = 0;
      volume.innerHTML = "volume_off";
   }
}
volume_range.addEventListener('change', () => {
   changeVolume();
})

volume.addEventListener('click', () => {
   muteVolume();
})

//Update progress area time and display bock on mouse move

progress_area.addEventListener('mousemove', (e) => {
   let progressWidthval = progress_area.clientWidth;
   let x = e.offsetX;
   progressAreaTime.style.setProperty('--x', `${x}px`);
   progressAreaTime.style.display = "block";
   let videoDuration = mainVideo.duration;
   let progressTime = Math.floor((x / progressWidthval) * videoDuration);
   let currentMin = Math.floor(progressTime / 60);
   let currentSec = Math.floor(progressTime % 60);

   //if seconds are less then 10 then add 0 at the begning
   currentSec < 10 ? currentSec = "0" + currentSec : currentSec;
   progressAreaTime.innerHTML = `${currentMin} : ${currentSec}`;
})

progress_area.addEventListener('mouseleave', () => {
   progressAreaTime.style.display = "none";
})

//Picture In Picture
picture_in_picture.addEventListener('click', pictureinpicture);

function pictureinpicture() {
   mainVideo.requestPictureInPicture();
}

//FullScreen

fullscreen.addEventListener('click', full_screen);

function full_screen() {
   if (!video_player.classList.contains('openFullScreen')) {
      video_player.classList.add('openFullScreen');
      fullscreen.innerHTML = "close_fullscreen";
      video_player.requestFullscreen();
   }
   else {
      video_player.classList.remove('openFullScreen');
      fullscreen.innerHTML = "open_in_full";
      document.exitFullscreen();
   }
}
//Open Setting
settingsBtn.addEventListener('click', () => {
   settings.classList.toggle('active');
   settingsBtn.classList.toggle('active');
})

//Playback Rate 
playback.forEach((e) => {
   e.addEventListener('click', () => {
      removeAciveClasses();
      e.classList.add('active');
      let speed = e.getAttribute('data-speed');
      mainVideo.playbackRate = speed;
   })
})
function removeAciveClasses() {
   playback.forEach(e => {
      e.classList.remove('active')
   });
}

//Store video duration and video path in local storage

window.addEventListener('unload', () => {
   let setDuration = localStorage.setItem('duration', `${mainVideo.currentTime}`);
   let letSrc = localStorage.setItem('src', `${mainVideo.getAttribute('src')}`);
})

window.addEventListener('load', () => {
   let getDuration = localStorage.getItem('duration');
   let getSrc = localStorage.getItem('src');
   if (getSrc) {
      mainVideo.src = getSrc;
      mainVideo.currentTime = getDuration;
   }
})

mainVideo.addEventListener('contextmenu', (e) => {
   e.preventDefault();
})

//Mouse Move Controller
video_player.addEventListener('mouseover', () => {
   controls.classList.add('active');
})

video_player.addEventListener('mouseleave', () => {
   if (video_player.classList.contains('paused')) {
      if (settingsBtn.classList.contains('active')) {
         controls.classList.add('active');
      }
      else {
         controls.classList.remove('active');
      }
   }
   else {
      controls.classList.add('active');
   }
})

//Mobile tocuh controls
video_player.addEventListener('touchstart', () => {
   controls.classList.add('active');
   setTimeout(()=>{
      controls
      .classList.remove('active')
   }, 5000);
})

video_player.addEventListener('touchmove', () => {
   if (video_player.classList.contains('paused')) {
      controls.classList.remove('active')
   }
   else {
      controls.classList.add('active');
   }
})

