const video_players = document.querySelectorAll('.videoplayer');
video_players.forEach(video_player => {
   const video_player_html = `
<div class="spinner"></div>

<div class="prev10"></div>
<div class="next10"></div>
${video_player.innerHTML}
            <div class="thumbnail"></div>
            <div class="progressAreaTime"></div>
            <div class="controls active">
                <div class="progress_area">
                    <canvas class="bufferedBar"></canvas>
                    <div class="progress_bar">
                        <span></span>
                    </div>
                    <div class="buffered_progress_bar"></div>
                </div>
                <div class="control-list">
                    <div class="control-left">
                        <span class="icon">
                            <i class="material-symbols-outlined fast-rewind">replay_10</i>
                        </span>
                        <span class="icon">
                            <i class="material-symbols-outlined play_pause">play_circle</i>
                        </span>
                        <span class="icon">
                            <i class="material-symbols-outlined fast-forward">forward_10</i>
                        </span>
                        <span class="icon">
                            <i class="material-symbols-outlined volume">volume_up</i>
                            <input type="range" min="0" max="100" class="volume_range">
                        </span>
                        <div class="timer">
                            <span class="current">0:00</span> / <span class="duration">0:00</span>
                        </div>
                    </div>
                    <div class="control-right">
                        <span class="icon">
                            <i class="material-symbols-outlined settingsBtn">settings</i>
                        </span>
                        <span class="icon">
                            <i class="material-symbols-outlined picture_in_picture">picture_in_picture_alt</i>
                        </span>
                        <span class="icon">
                            <i style="font-size: 24px;" class="material-symbols-outlined fullscreen">open_in_full</i>
                        </span>
                    </div>
                </div>
                <div class="settings">
                    <div data-label="settingHome">
                        <ul>
                            <li style="display: flex; align-items: center;" data-label="speed">
                                <span class="material-symbols-outlined">
                                    timer
                                </span>
                                <span>Hız</span>
                            </li>
                            <li style="display: flex; align-items: center;" data-label="quality">
                                <span class="material-symbols-outlined">
                                    hd
                                </span>
                                <span>Kalite</span>
                            </li>

                        </ul>
                    </div>
                    <div class="playback" data-label="speed" hidden>
                        <span>
                            <i style="font-size: 16px; padding: 5px 10px; cursor: pointer;" class="material-symbols-outlined back_arrow" data-label="settingHome">
                                arrow_back
                            </i>
                            <span>Video Hızı</span>
                        </span>
                        <ul>
                            <li data-speed="0.25">0.25</li>
                            <li data-speed="0.50">0.5</li>
                            <li data-speed="0.75">0.75</li>
                            <li data-speed="1" class="active">Normal</li>
                            <li data-speed="1.25">1.25</li>
                            <li data-speed="1.5">1.5</li>
                            <li data-speed="1.75">1.75</li>
                            <li data-speed="2">2</li>
                        </ul>
                    </div>
                    <div data-label="quality" hidden>
                        <span>
                            <i style="font-size: 16px; padding: 5px 10px; cursor: pointer;" class="material-symbols-outlined back_arrow" data-label="settingHome">
                                arrow_back
                            </i>
                            <span>Video Kalite</span>
                        </span>
                        <ul>
                            <li data-quality="auto" class="active">Auto</li>
                        </ul>
                    </div>
                </div>
            </div>`;
   video_player.innerHTML = video_player_html;
   const mainVideo = video_player.querySelector('.main-video'),
      progressAreaTime = video_player.querySelector('.progressAreaTime'),
      controls = video_player.querySelector('.controls'),
      progress_area = video_player.querySelector('.progress_area'),
      progress_bar = video_player.querySelector('.progress_bar'),
      bufffered_bar = video_player.querySelector('.bufferedBar'),
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
      settings = video_player.querySelector('.settings'),
      settingsHome = video_player.querySelectorAll(".settings [data-label='settingHome'] > ul > li"),
      playback = video_player.querySelectorAll('.playback li'),
      thumbnail = video_player.querySelector('.thumbnail'),
      spinner = video_player.querySelector('.spinner');
   const settingDivs = video_player.querySelectorAll('.settings > div');
   const settingBack = video_player.querySelectorAll('.settings > div .back_arrow');
   const quality_ul = video_player.querySelector(".settings > [data-label='quality'] ul");
   const poster = document.querySelector('.postervideo');
   const prev10 = document.querySelector('.prev10');
   const next10 = document.querySelector('.next10');
   const qualities = video_player.querySelectorAll("source[size]");
   qualities.forEach(event => {
      let quality_html = `<li data-quality="${event.getAttribute('size')}">${event.getAttribute('size')}p</li>`;
      quality_ul.insertAdjacentHTML('afterbegin', quality_html);
   })
   const quality_li = video_player.querySelectorAll(".settings > [data-label='quality'] ul > li");
   quality_li.forEach((event) => {
      event.addEventListener('click', (e) => {
         let quality = event.getAttribute('data-quality');
         removeActiveClasses(quality_li);
         event.classList.add('active');
         qualities.forEach(event => {
            if (event.getAttribute('size') == quality) {
               let video_current_duration = mainVideo.currentTime;
               let video_source = event.getAttribute('src');
               mainVideo.src = video_source;
               mainVideo.currentTime = video_current_duration;
               playVideo();
            }
         })
      })
   })
   settingBack.forEach((e) => {
      e.addEventListener('click', (e) => {
         let setting_label = e.target.getAttribute('data-label');
         for (let i = 0; i < settingDivs.length; i++) {
            if (settingDivs[i].getAttribute('data-label') == setting_label) {
               settingDivs[i].removeAttribute('hidden');
            }
            else {
               settingDivs[i].setAttribute('hidden', "");
            }
         }
      })
   })
   settingsHome.forEach((e) => {
      e.addEventListener('click', (e) => {
         let setting_label = e.target.getAttribute('data-label');
         for (let i = 0; i < settingDivs.length; i++) {
            if (settingDivs[i].getAttribute('data-label') == setting_label) {
               settingDivs[i].removeAttribute('hidden');
            }
            else {
               settingDivs[i].setAttribute('hidden', "");
            }
         }
      })
   })
   function removeActiveClasses(e) {
      e.forEach((e) => {
         e.classList.remove("active");
      });
   }




   //------------------------------BufferedBar FUNCTION-------------------------------------
   mainVideo.addEventListener('loadeddata', () => {
      setInterval(() => {
         let bufferedTime = mainVideo.buffered.end(0);
         let duration = mainVideo.duration;
         let width = (bufferedTime / duration) * 100;
         bufferedbar.style.width = `${width}%`;
      }, 500);
   });





   //------------------------------VIDEO PLAY FUNCTION-----------------------------------------
   function playVideo() {
      play_pause.innerHTML = "pause_circle";
      play_pause.title = "pause";
      video_player.classList.add('paused');
      mainVideo.play();
   }



   poster.addEventListener('click', () => {
      poster.style.display = "none";
      playVideo();
   });




   //------------------------------VIDEO PAUSE FUNCTION-------------------------------------------
   function pauseVideo() {
      play_pause.innerHTML = "play_circle";
      play_pause.title = "play";
      video_player.classList.remove('paused');
      mainVideo.pause();
   }


   //------------------------------PLAY PAUSE FUNCTION-------------------------------------------
   play_pause.addEventListener('click', playpause);
   function playpause() {
      const isVideoPaused = video_player.classList.contains('paused');
      isVideoPaused ? pauseVideo() : playVideo();
   }






   //-------------------------------FAST REWIND FUNCTION---------------------------------------
   fast_rewind.addEventListener('click', fastrewind);
   function fastrewind() {
      mainVideo.currentTime -= 10;
   }


   prev10.addEventListener('touchstart', handleTouchStartPrev);
   prev10.addEventListener('touchend', handleTouchEndPrev);

   let touchStartTimePrev = 0;
   let touchCountPrev = 0;
   let isTouchedPrev = false;
   let timerPrev = null;

   function handleTouchStartPrev() {
      touchStartTimePrev = new Date().getTime();
      isTouchedPrev = true;
      if (timerPrev) {
         clearTimeout(timerPrev);
      }
   }

   function handleTouchEndPrev() {
      if (isTouchedPrev) {
         const touchEndTimePrev = new Date().getTime();
         const touchTimePrev = touchEndTimePrev - touchStartTimePrev;
         if (touchTimePrev < 300) { // 300ms içinde ikinci kez dokunulursa rewind10 fonksiyonu çalışır
            touchCountPrev++;
            if (touchCountPrev === 2) {
               rewind10();
               touchCountPrev = 0;
            }
            timerPrev = setTimeout(function () {
               touchCountPrev = 0;
            }, 300);
         } else {
            touchCountPrev = 0; // 300ms'den büyük olduğunda sıfırla
         }
         isTouchedPrev = false;
      }
   }

   function rewind10() {
      mainVideo.currentTime -= 10;
      prev10.style.backgroundColor = "#f8f8ff";
      prev10.style.opacity = "0.6";
      prev10.style.borderRadius = "0% 50% 50% 0%"
      prev10.style.transition = "all 200ms";
      prev10.innerHTML = '<i style="font-size:5rem;" class="material-symbols-outlined fast-rewind">fast_rewind</i>';
      setTimeout(function () {
         prev10.style.backgroundColor = ""; // arka plan rengini sıfırla
         prev10.innerHTML = '';
      }, 200); // 200ms sonra arka plan rengini sıfırla
   }






   //---------------------------------FAST FORWARD FUNCTION--------------------------------------
   fast_forward.addEventListener('click', fastforward);
   function fastforward() {
      mainVideo.currentTime += 10;
   }



   next10.addEventListener('touchstart', handleTouchStartNext);
   next10.addEventListener('touchend', handleTouchEndNext);

   let touchStartTimeNext = 0;
   let touchCountNext = 0;
   let isTouchedNext = false;
   let timerNext = null;

   function handleTouchStartNext() {
      touchStartTimeNext = new Date().getTime();
      isTouchedNext = true;
      if (timerNext) {
         clearTimeout(timerNext);
      }
   }

   function handleTouchEndNext() {
      if (isTouchedNext) {
         const touchEndTimeNext = new Date().getTime();
         const touchTimeNext = touchEndTimeNext - touchStartTimeNext;
         if (touchTimeNext < 300) { // 300ms içinde ikinci kez dokunulursa forward10 fonksiyonu çalışır
            touchCountNext++;
            if (touchCountNext === 2) {
               forward10();
               touchCountNext = 0;
            }
            timerNext = setTimeout(function () {
               touchCountNext = 0;
            }, 300);
         } else {
            touchCountNext = 0; // 300ms'den büyük olduğunda sıfırla
         }
         isTouchedNext = false;
      }
   }

   function forward10() {
      mainVideo.currentTime += 10;
      next10.style.backgroundColor = "#f8f8ff";
      next10.style.borderRadius = "50% 0 0 50%";
      next10.style.opacity = "0.6";
      next10.style.transition = "all 200ms";
      next10.innerHTML = '<i style="font-size:5rem;" class="material-symbols-outlined fast-forward">fast_forward</i>';
      setTimeout(function () {
         next10.style.backgroundColor = ""; // arka plan rengini sıfırla
         next10.innerHTML = '';
      }, 200); // 200ms sonra arka plan rengini sıfırla
   }







   //--------------------------------LOAD VIDEO DURATION---------------------------------------------
   mainVideo.addEventListener('loadeddata', (e) => {
      let videoDuration = e.target.duration;
      let totalMin = Math.floor(videoDuration / 60);
      let totalSec = Math.floor(videoDuration % 60);

      //if seconds are less then 10 then add 0 at the begning
      totalSec < 10 ? totalSec = "0" + totalSec : totalSec;
      totalDuration.innerHTML = `${totalMin} : ${totalSec}`;
   })





   //-----------------------------------Current video duration-------------------------------------------
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





   //------------------let's update playing video current time on according to the progress bar width------------------------
   progress_area.addEventListener("pointerdown", (e) => {
      progress_area.setPointerCapture(e.pointerId);
      setTimelinePosition(e);
      progress_area.addEventListener("pointermove", setTimelinePosition);
      progress_area.addEventListener("pointerup", () => {
         progress_area.removeEventListener("pointermove", setTimelinePosition);
      })
   });
   function setTimelinePosition(e) {
      let videoDuration = mainVideo.duration;
      let progressWidthval = progress_area.clientWidth + 2;
      let ClickOffsetX = e.offsetX;
      mainVideo.currentTime = (ClickOffsetX / progressWidthval) * videoDuration;
      let progressWidth = (mainVideo.currentTime / videoDuration) * 100 + 0.5;
      progress_bar.style.width = `${progressWidth}%`;
      let currentVideoTime = mainVideo.currentTime;
      let currentMin = Math.floor(currentVideoTime / 60);
      let currentSec = Math.floor(currentVideoTime % 60);
      //if seconds are less then 10 then add 0 at the begning
      currentSec < 10 ? currentSec = "0" + currentSec : currentSec;
      current.innerHTML = `${currentMin} : ${currentSec}`;
   }
   function drawProgress(canvas, buffered, duration) {
      let context = canvas.getContext('2d', { antialias: false });
      context.fillStyle = '#f0f0f07c';

      let height = canvas.height;
      let width = canvas.width;
      if (!height || !width) throw "Canva's width or height or not set.";
      context.clearRect(0, 0, width, height);
      for (let i = 0; i < buffered.length; i++) {
         let leadingEdge = buffered.start(i) / duration * width;
         let trailingEdge = buffered.end(i) / duration * width;
         context.fillRect(leadingEdge, 0, trailingEdge - leadingEdge, height);
      }
   }
   mainVideo.addEventListener('progress', () => {
      drawProgress(bufffered_bar, mainVideo.buffered, mainVideo.duration);
   })
   mainVideo.addEventListener("waiting", () => {
      spinner.style.display = "block";
   })
   mainVideo.addEventListener("canplay", () => {
      spinner.style.display = "none";
   })







   //-------------------------------------CHANGE VOLUME------------------------------------
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










   //-----------------------Update progress area time and display block on mouse move---------------------------------------
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




   progress_area.addEventListener('touchmove', (e) => {
      e.preventDefault();
      let progressWidthval = progress_area.clientWidth + 2;
      let x = e.touches[0].clientX;
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
         x = e.touches[0].clientX;
      }
      //if seconds are less then 10 then add 0 at the begning
      currentSec < 10 ? currentSec = "0" + currentSec : currentSec;
      progressAreaTime.innerHTML = `${currentMin} : ${currentSec}`;
      thumbnail.style.setProperty('--x', `${x}px`);
      thumbnail.style.display = "block";
      progress_area.style.setProperty('--x', `${x}px`); // İlerleme çubuğunun pozisyonunu güncelle
      for (var item of thumbnails) {
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

   progress_area.addEventListener('touchend', () => {
      thumbnail.style.display = "none";
      progressAreaTime.style.display = "none";
   })









   //------------------------------------Picture In Picture--------------------------------------
   picture_in_picture.addEventListener('click', pictureinpicture);
   function pictureinpicture() {
      mainVideo.requestPictureInPicture();
   }






   //-------------------------------------FullScreen---------------------------------------------
   fullscreen.addEventListener('click', full_screen);
   function full_screen() {
      if (fullscreen.innerHTML == "open_in_full") {

         if (video_player.requestFullscreen) {
            video_player.requestFullscreen();
         }

         else if (video_player.msRequestFullscreen) {
            video_player.msRequestFullscreen();
         }

         else if (video_player.mozRequestFullscreen) {
            video_player.mozRequestFullscreen();
         }

         else if (video_player.webkitRequestFullscreen) {
            video_player.webkitRequestFullscreen();
         }
         fullscreen.innerHTML = "close_fullscreen";
      }
      else {

         if (document.exitFullscreen) {
            document.exitFullscreen();
         }

         else if (document.msexitFullscreen) {
            document.msexitFullscreen();
         }

         else if (document.mozexitFullscreen) {
            document.mozexitFullscreen();
         }

         else if (document.webkitexitFullscreen) {
            document.webkitexitFullscreen();
         }
         fullscreen.innerHTML = "open_in_full";
      }
   }


   const isIphone = /iPhone/i.test(navigator.userAgent);

   if (isIphone) {
     mainVideo.removeAttribute('playsinline');
     fullscreen.style.display = 'none'; // Hide the fullscreen button
   }









   //----------------------------------------------------Open Setting--------------------------------------
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







   //------------------------------------------Mouse Move Controller------------------------------
   let timer;
   const hideControls = () => {
      if (mainVideo.paused) return;
      timer = setTimeout(() => {
         if (settingsBtn.classList.contains("active")) {
            controls.classList.add("active");
         } else {
            controls.classList.remove("active");
         }
      }, 5000);
   }
   hideControls();
   video_player.addEventListener("mousemove", () => {
      controls.classList.add("active");
      clearTimeout(timer);
      hideControls();
   });




   //--------------------------Mobile tocuh controls------------------------------
   let timeoutId = null;
   video_player.addEventListener('pointerdown', () => {
      controls.classList.add('active');
      clearTimeout(timeoutId); // Clear the previous timeout
      timeoutId = setTimeout(() => {
         controls.classList.remove('active');
      }, 5000);
   });

   video_player.addEventListener('ontouchend', debounce(() => {
      if (video_player.classList.contains('paused')) {
         controls.classList.remove('active');
      } else {
         controls.classList.add('active');
         clearTimeout(timeoutId); // Clear the timeout again
      }
   }, 100));

   function debounce(fn, delay) {
      let timeoutId = null;
      return function () {
         clearTimeout(timeoutId);
         timeoutId = setTimeout(fn, delay);
      };
   }




   //----------------------------Video Preview---------------------------------------
   var thumbnails = [];
   var thumbnailWidth = 150;
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
      preview_video.pause();
      var count = 1;
      var id = 1;
      var x = 0, y = 0;
      var array = [];
      var duration = parseInt(preview_video.duration);
      for (var i = 1; i <= duration; i++) {
         array.push(i);
      }
      var canvas;
      var i, j;
      for (i = 0, j = array.length; i < j; i += horizontalItemCount) {
         for (var startIndex of array.slice(i, i + horizontalItemCount)) {
            var backgroundPositionX = x * thumbnailWidth;
            var backgroundPositionY = y * thumbnailHeight;
            var item = thumbnails.find(x => x.id === id);
            if (!item) {
               canvas = document.createElement('canvas');
               canvas.width = thumbnailWidth * horizontalItemCount;
               canvas.height = thumbnailHeight * verticalItemCount;
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
               canvas = item.canvas;
               item.sec.push({
                  index: startIndex,
                  backgroundPositionX: -backgroundPositionX,
                  backgroundPositionY: -backgroundPositionY
               });
            }
            var context = canvas.getContext('2d');
            preview_video.currentTime = startIndex;
            await new Promise(function (resolve) {
               var event = function () {
                  context.drawImage(
                     preview_video,
                     backgroundPositionX,
                     backgroundPositionY,
                     thumbnailWidth,
                     thumbnailHeight
                  );
                  x++;
                  // removing duplicate events
                  preview_video.removeEventListener('canplay', event);
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
            count = 1;
            x = 0;
            y = 0;
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
      console.log('Thumbnail Hazır...');
   });







   //-----------------------------FAST KEYBOARD-----------------------------
   video_player.addEventListener("keydown", e => {
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
   });




   //-----------------------------------Mouse Place-----------------------------------------
   let timeoutIdd = null;
   video_player.addEventListener('play', () => {
      timeoutIdd = setTimeout(() => {
         video_player.classList.add('hide-cursor');
      }, 5000);
   });

   video_player.addEventListener('pause', () => {
      video_player.classList.remove('hide-cursor');
      clearTimeout(timeoutIdd);
   });

   video_player.addEventListener('mousemove', () => {
      video_player.classList.remove('hide-cursor');
      clearTimeout(timeoutIdd);
      timeoutIdd = setTimeout(() => {
         video_player.classList.add('hide-cursor');
      }, 5000);
   });




   // Storage video duration and video path in local storage
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
});
