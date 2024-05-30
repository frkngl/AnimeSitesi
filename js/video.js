const video_player=document.querySelector('#videoplayer'),
mainVideo=video_player.querySelector('#main-video'),
progressAreaTime=video_player.querySelector('.progressAreaTime'),
controls=video_player.querySelector('.controls'),
progress_area=video_player.querySelector('.progress_area'),
progress_bar=video_player.querySelector('.progress_bar'),
fast_rewind=video_player.querySelector('.fast-rewind'),
play_pause=video_player.querySelector('.play_pause'),
fast_forward=video_player.querySelector('.fast-forward'),
volume=video_player.querySelector('.volume'),
volume_range=video_player.querySelector('.volume_range'),
current=video_player.querySelector('.current'),
totalDuration=video_player.querySelector('.duration'),
settingsBtn=video_player.querySelector('.settingsBtn'),
picture_in_picture=video_player.querySelector('.picture_in_picture'),
fullscreen=video_player.querySelector('.fullscreen'),
settings=video_player.querySelector('#settings'),
playback=video_player.querySelector('.playback');


//VIDEO PLAY FUNCTION
 function playVideo(){
    play_pause.innerHTML  = "pause";
    play_pause.title = "pause";
    video_player.classList.add('paused');
    mainVideo.play();
 }
 //VIDEO PAUSE FUNCTION
 function pauseVideo(){
    play_pause.innerHTML  = "play_arrow";
    play_pause.title = "play";
    video_player.classList.remove('paused');
    mainVideo.pause();
 }

 play_pause.addEventListener('click', ()=>{
    const isVideoPaused = video_player.classList.contains('paused');

    isVideoPaused ? pauseVideo() : playVideo();
 })


 mainVideo.addEventListener('play',()=>{
    playVideo();
 })

 mainVideo.addEventListener('pause',()=>{
    pauseVideo();
 })



 //FAST REWIND PAUSE FUNCTION
 fast_rewind.addEventListener('click',()=>{
    mainVideo.currentTime -= 10;
 })

  //FAST FORWARD PAUSE FUNCTION
  fast_forward.addEventListener('click',()=>{
    mainVideo.currentTime += 10;
 })



 //LOAD VIDEO DURATION

 mainVideo.addEventListener('loadeddata',(e)=>{
    let videoDuration = e.target.duration;
    let totalMin = Math.floor(videoDuration / 60);
    let totalSec = Math.floor(videoDuration % 60);

    //if seconds are less then 10 then add 0 at the begning
    totalSec < 10 ? totalSec = "0"+totalSec : totalSec;
    totalDuration.innerHTML =    `${totalMin} : ${totalSec}`;
 })



 //Current video duration
 mainVideo.addEventListener('timeupdate',(e)=>{
    let currentVideoTime = e.target.currentTime;
    let currentMin = Math.floor(currentVideoTime / 60);
    let currentSec = Math.floor(currentVideoTime % 60);

    //if seconds are less then 10 then add 0 at the begning
    currentSec < 10 ? currentSec = "0"+currentSec : currentSec;
    current.innerHTML = `${currentMin} : ${currentSec}`;


    let videoDuration =  e.target.duration;
    //progressBar width change
    let progressWidth = (currentVideoTime / videoDuration) * 100;
    progress_bar.style.width = `${progressWidth}%`;
 })

 //let's update playing video current time on according to the progress bar width

 progress_area.addEventListener('click',(e)=>{
    let videoDuration =  mainVideo.duration;
    let progressWidthval = progress_area.clientWidth;
    let ClickOffsetX = e.offsetX;

    mainVideo.currentTime = (ClickOffsetX / progressWidthval) * videoDuration;
 })

 //CHANGE VOLUME
 function changeVolume(){
    mainVideo.volume = volume_range.value / 100;
    if(volume_range.value == 0){
        volume.innerHTML = "volume_off";
    }else if(volume_range.value < 40){
        volume.innerHTML = "volume_down";
    }
    else{
        volume.innerHTML = "volume_up";
    }
 }

 function muteVolume(){
    if(volume_range.value == 0){
        volume_range.value = 50;
        mainVideo.volume = 0.5;
        volume.innerHTML = "volume_up";
    }
    else{
        volume_range.value = 0; 
        mainVideo.volume = 0;
        volume.innerHTML = "volume_off";
    }
 }
 volume_range.addEventListener('change',()=>{
    changeVolume();
 })

 volume.addEventListener('click',()=>{
    muteVolume();
 })