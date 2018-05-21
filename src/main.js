const $ = require('jquery')
const PopperJS = require('popper.js')

require("bootstrap/js/src/index");
require("bootstrap/js/src/modal");
//require("bootstrap/js/src/carousel");
//require("bootstrap/js/src/collapse");

$(function() {
  $(".c-video__player").click(function () {
    var theModal = $(this).data("target"),
    videoSRC = $(this).attr("data-video"),
    videoSRCauto = videoSRC + "?modestbranding=1&rel=0&controls=0&showinfo=0&html5=1&autoplay=1";
    $(theModal + ' iframe').attr('src', videoSRCauto);
    $(theModal + ' button.close').click(function () {
      $(theModal + ' iframe').attr('src', videoSRC);
    });
  });
});
