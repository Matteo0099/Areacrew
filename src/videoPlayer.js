let video = document.querySelector('.video-area .video')
videoPlayer = document.querySelector('.videoPlayer')
videoProgressBar = document.querySelector('.videoProgressBar')
videoProgressDuration = document.querySelector('.videoProgressDuration')

video.addEventListener('timeupdate', function (e) {
    let videoPosition = video.currentTime / video.duration;
    dot.style.left = (videoPosition * 100) + '%';
    videoProgressDuration.style.width = (videoPosition * 100) + '%';
});

const i = setInterval(function () {
    if (video.readyState > 0) {
        var minutes = parseInt(video.duration / 60, 10);
        var seconds = Math.round(video.duration % 60);
        totalVideoDuration.innerText = minutes + ":" + seconds;
        clearInterval(i);
    }
}, 10);

videoProgressBar.addEventListener('click', function (e) {
    let videoDuration = video.duration;
    let progressWidthValue = this.clientWidth;
    let clickOffestX = e.offsetX;
    video.currentTime = (clickOffestX / progressWidthValue) * videoDuration;
});

video.addEventListener('timeupdate', function (e) {
    let currentVideoTime = e.target.currentTime;
    let currentMin = Math.floor(currentVideoTime / 60);
    let currentSec = Math.floor(currentVideoTime % 60);

    currentMin < 10 ? currentMin = '0' + currentMin : currentMin;
    currentSec < 10 ? currentSec = '0' + currentSec : currentSec;
    currentVideoDuration.innerHTML = `${currentMin}:${currentSec}`
});
