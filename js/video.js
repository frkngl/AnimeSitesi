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
   thumbnail = video_player.querySelector('.thumbnail');



mainVideo.addEventListener('loadeddata', () => {
   setInterval(() => {
      let bufferedTime = mainVideo.buffered.end(0);
      let duration = mainVideo.duration;
      let width = (bufferedTime / duration) * 100;
      bufferedbar.style.width = `${width}%`;
   }, 500);
});

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




//FAST REWIND PAUSE FUNCTION
fast_rewind.addEventListener('click', fastrewind);
function fastrewind() {
   mainVideo.currentTime -= 10;
}

//FAST FORWARD PAUSE FUNCTION
fast_forward.addEventListener('click', fastforward);
function fastforward() {
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

//Update progress area time and display block on mouse move

progress_area.addEventListener('mousemove', (e) => {
   let progressWidthval = progress_area.clientWidth + 2;
   let x = e.offsetX;
   let videoDuration = mainVideo.duration;
   let progressTime = Math.floor((x / progressWidthval) * videoDuration);
   let currentMin = Math.floor(progressTime / 60);
   let currentSec = Math.floor(progressTime % 60);
   progressAreaTime.style.setProperty('--x', `${x}px`);
   progressAreaTime.style.display = "block";

   if (x >= progressWidthval - 80) {
      x = progressWidthval - 80;
   } else if (x <= 75) {
      x = 75;
   } else {
      x = e.offsetX;
   }

   //if seconds are less then 10 then add 0 at the begning
   currentSec < 10 ? currentSec = "0" + currentSec : currentSec;
   progressAreaTime.innerHTML = `${currentMin} : ${currentSec}`;

   thumbnail.style.setProperty('--x', `${x}px`);
   thumbnail.style.display = "block";

  
   for (var item of thumbnails) {
      //
      var data = item.sec.find(x1 => x1.index === Math.floor(progressTime));

      // thumbnail found
      if (data) {
         if (item.data != undefined) {
            thumbnail.setAttribute("style", `
            background-image: url(${item.data});
            background-position-x: ${data.backgroundPositionX}px;
            background-position-y:${data.backgroundPositionY}px;
            --x: ${x}px;display: block;
            `)
            // exit
            return;
         }
      }
   }
})

progress_area.addEventListener('mouseleave', () => {
   thumbnail.style.display = "none";
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
   setTimeout(() => {
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


//Video Preview

var thumbnails = [];

var thumbnailWidth = 158;
var thumbnailHeight = 90;
var horizontalItemCount = 5;
var verticalItemCount = 5;

let preview_video = document.createElement('video')
preview_video.preload = "metadata";
preview_video.width = "500";
preview_video.height = "300";
preview_video.controls = true;
preview_video.src = mainVideo.querySelector("source").src;

preview_video.addEventListener('loadeddata', async function () {
   //
   preview_video.pause();

   //
   var count = 1;

   //
   var id = 1;

   //
   var x = 0, y = 0;

   //
   var array = [];

   //
   var duration = parseInt(preview_video.duration);

   //
   for (var i = 1; i <= duration; i++) {
      array.push(i);
   }

   //
   var canvas;

   //
   var i, j;

   for (i = 0, j = array.length; i < j; i += horizontalItemCount) {
      //
      for (var startIndex of array.slice(i, i + horizontalItemCount)) {
         //
         var backgroundPositionX = x * thumbnailWidth;

         //
         var backgroundPositionY = y * thumbnailHeight;

         //
         var item = thumbnails.find(x => x.id === id);

         if (!item) {
            // 

            //
            canvas = document.createElement('canvas');

            //
            canvas.width = thumbnailWidth * horizontalItemCount;
            canvas.height = thumbnailHeight * verticalItemCount;

            //
            thumbnails.push({
               id: id,
               canvas: canvas,
               sec: [{
                  index: startIndex,
                  backgroundPositionX: -backgroundPositionX,
                  backgroundPositionY: -backgroundPositionY
               }]
            });
         } else {
            //

            //
            canvas = item.canvas;

            //
            item.sec.push({
               index: startIndex,
               backgroundPositionX: -backgroundPositionX,
               backgroundPositionY: -backgroundPositionY
            });
         }

         //
         var context = canvas.getContext('2d');

         //
         preview_video.currentTime = startIndex;

         //
         await new Promise(function (resolve) {
            var event = function () {
               //
               context.drawImage(
                  preview_video, 
                  backgroundPositionX, 
                  backgroundPositionY,
                  thumbnailWidth, 
                  thumbnailHeight
               );

               //
               x++;

               // removing duplicate events
               preview_video.removeEventListener('canplay', event);

               // 
               resolve();
            };

            // 
            preview_video.addEventListener('canplay', event);
         });


         // 1 thumbnail is generated completely
         count++;
      }

      // reset x coordinate
      x = 0;

      // increase y coordinate
      y++;

      // checking for overflow
      if (count > horizontalItemCount * verticalItemCount) {
         //
         count = 1;

         //
         x = 0;

         //
         y = 0;

         //
         id++;
      }

   }
   // looping through thumbnail list to update thumbnail
   thumbnails.forEach(function (item) {
      // converting canvas to blob to get short url
      item.canvas.toBlob(blob => item.data = URL.createObjectURL(blob), 'image/jpeg');

      // deleting unused property
      delete item.canvas;
   });



   console.log('done...');
});


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
         break
   }
})

//Storage video duration and video path in local storage

// window.addEventListener('unload', () => {
//    let setDuration = localStorage.setItem('duration', `${mainVideo.currentTime}`);
//    let letSrc = localStorage.setItem('src', `${mainVideo.getAttribute('src')}`);
// })
// window.addEventListener('load', () => {
//    let getDuration = localStorage.getItem('duration');
//    let getSrc = localStorage.getItem('src');
//    if (getSrc) {
//       mainVideo.src = getSrc;
//       mainVideo.currentTime = getDuration;
//    }
// })