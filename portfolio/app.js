const video1 = document.getElementById("projectVideo1");
const video2 = document.getElementById("projectVideo2");

const videoList = [video1, video2];

const hoverSign = document.querySelector(".hover-sign");

videoList.forEach(function (video) {
  video.addEventListener("mouseover", function () {
    video.play();
    hoverSign.classList.add("active");
  });
  video.addEventListener("mouseout", function () {
    video.pause();
    hoverSign.classList.remove("active");
  });
});
