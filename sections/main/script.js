function play_message_sound() {
	/*
  let audioElement = document.createElement('audio');
  audioElement.volume= 0.05;
  audioElement.setAttribute('src', 'audio/notification.ogg');
  audioElement.play();
  */
}

function main_hide() {

}

function main_show() {
  let delaying = 0.0;

  // animation spinner appears
  TweenMax.fromTo($('.section#main .animation_spinner'), .5, {
    opacity: 0,
    y: '-100%'
  }, {
    opacity:1,
    y: '0%'
  });

  // boy logo from left
  TweenMax.fromTo($('.section#main #background_mars'), 1, {
    left: '-50%',
    scale: '0.4'
  }, {
    left: '0%',
    scale: '0.7',
    onComplete: function() {
      TweenMax.set($('.section#main #background_mars'), { clearProps: "all" });
    }
  });

  // girl logo from right
  TweenMax.fromTo($('.section#main #background_venus'), 1, {
    right: '-50%',
    scale: '0.4'
  }, {
    right: '0%',
    scale: '0.7',
    onComplete: function() {
      TweenMax.set($('.section#main #background_venus'), { clearProps: "all" });
    }
  });

  delaying += .75;

  // title appears
  TweenMax.fromTo($('.section#main .bigtitle'), .75, {
    y: '-100%',
    opacity: 0
  }, {
    y: '0%',
    opacity: 1,
    ease: Back.easeOut.config(3)
  }).delay(delaying);

  delaying += 2;

  // boy tip appear from bottom
  TweenMax.fromTo($('.section#main #message_tip_boy'), .5, {
    opacity: 0,
    y: '200%'
  }, {
    opacity: 1,
    y: '0%',
    onStart: play_message_sound
  }).delay(2.75);

  delaying += 3;

  // girl tip appear from bottom
  TweenMax.fromTo($('.section#main #message_tip_girl'), .5, {
    opacity: 0,
    y: '200%'
  }, {
    opacity: 1,
    y: '0%',
    onStart: play_message_sound
  }).delay(delaying);

	delaying += .5;

	// remove animation dots
  TweenMax.fromTo($('.section#main .animation_spinner'), .5, {
    opacity: 1,
    y: '0%'
  }, {
    opacity: 0,
    y: '100%'    
  }).delay(delaying);
}