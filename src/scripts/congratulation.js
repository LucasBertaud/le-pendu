import _ from "lodash";
import { gsap, Power1, Back } from "gsap";

export default class congratulation{
    start () {
        var numberOfStars = 200;
      
        for (var i = 0; i < numberOfStars; i++) {
          $(".congrats").append('<div class="blob fa fa-star ' + i + '"></div>');
        }
      
        this.animateText();
      
        this.animateBlobs();
      }
      
    reset() {
        $.each($(".blob"), function (i) {
          gsap.set($(this), { x: 0, y: 0, opacity: 1 });
        });
      
        gsap.set($("h1"), { scale: 1, opacity: 1, rotation: 0 });
      }
      
    animateText() {
        gsap.from($("h1"), 0.8, {
          scale: 0.4,
          opacity: 0,
          rotation: 15,
          ease: Back.easeOut.config(4)
        });
      }
      
     animateBlobs() {
        var xSeed = _.random(350, 380);
        var ySeed = _.random(120, 170);
      
        $.each($(".blob"), function (i) {
          var $blob = $(this);
          var speed = _.random(1, 5);
          var rotation = _.random(5, 100);
          var scale = _.random(0.8, 1.5);
          var x = _.random(-xSeed, xSeed);
          var y = _.random(-ySeed, ySeed);
      
          gsap.to($blob, speed, {
            x: x,
            y: y,
            ease: Power1.easeOut,
            opacity: 0,
            rotation: rotation,
            scale: scale,
            onStartParams: [$blob],
            onStart: function ($element) {
              $element.css("display", "block");
            },
            onCompleteParams: [$blob],
            onComplete: function ($element) {
              $element.css("display", "none");
            }
          });
        });
      }

}
