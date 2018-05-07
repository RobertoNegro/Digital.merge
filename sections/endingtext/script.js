
function endingtext_hide() {
}

function endingtext_show() {
	TweenMax.fromTo($('.section#endingtext .endingtext_title'), 1.5, {
   	x: '-50%',
   	opacity: 0
  }, {
    x: '0%',
    opacity: 1,
    ease: Power1.easeOut
  }).delay(1);

	$('.section#endingtext .endingtext_text_container').css('height', '');
	$('.section#endingtext .endingtext_text_container').css('padding', '');
  let h = $('.section#endingtext .endingtext_text_container').outerHeight();
  let p = $('.section#endingtext .endingtext_text_container').css('padding-top');
  TweenMax.fromTo($('.section#endingtext .endingtext_text_container'), 1, {
   	height: '0',
   	opacity: 0,
   	padding: 0
  }, {
    height: h,
    opacity: 1,
    padding: p,
    ease: Power1.easeOut
  }).delay(4);

  // animation dots disappearing
  TweenMax.fromTo($('.section#endingtext .animation_spinner'), .5, {
    opacity: 1,
    y: '0%'
  }, {
    opacity: 0,
    y: '100%'
  }).delay(4.33);
}