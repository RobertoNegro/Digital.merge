function develop_hide() {

}

function develop_show() {
  TweenMax.fromTo($('.section#develop #develop_title'), 1, {
   	y: '-100%',
   	opacity: 0
  }, {
    y: '0%',
    opacity: 1,
    ease: Power1.easeOut
  }).delay(1);

  TweenMax.fromTo($('.section#develop #develop_inequality'), 1, {
   	x: '100%',
   	opacity: 0
  }, {
    x: '0%',
    opacity: 1,
    ease: Power1.easeOut
  }).delay(1);


  TweenMax.fromTo($('.section#develop #develop_desc_container'), 1, {
   	width: '0vw',
   	opacity: 0
  }, {
    width: '50vw',
    opacity: 1,
    ease: Power1.easeOut
  }).delay(2);

  TweenMax.fromTo($('.section#develop #develop_bar_female'), 2, {
   	x: '-100%'
  }, {
    x: '0%',
    ease: Power3.easeOut
  }).delay(2);

  TweenMax.fromTo($('.section#develop #develop_bar_male'), 2, {
   	x: '-100%'
  }, {
    x: '0%',
    ease: Power3.easeOut
  }).delay(2.5);

  TweenMax.fromTo($('.section#develop #develop_source_container'), 2, {
   	y: '-100%',
   	opacity: 0
  }, {
    y: '0%',
    opacity: 1,
    ease: Power3.easeOut
  }).delay(2.5);

  TweenMax.fromTo($('.section#develop #develop_bar_desc'), 1, {
   	y: '-100%',
   	opacity: 0
  }, {
    y: '0%',
    opacity: 1,
    ease: Power1.easeOut
  }).delay(3);

  TweenMax.fromTo($('.section#develop .animation_spinner'), .5, {
    opacity: 1,
    y: '0%'
  }, {
    opacity: 0,
    y: '100%'
  }).delay(4);
}