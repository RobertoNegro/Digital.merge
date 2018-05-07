
function about_hide() {
}

function about_show() {
    TweenMax.fromTo($('.section#about #background_me'), 3, {
        x: '5%',
        y: '2%',
        opacity: 0
    }, {
        x: '0%',
        y: '0%',
        opacity: 1,
        ease: Power1.easeOut
    }).delay(0.5);

	TweenMax.fromTo($('.section#about .about_title'), 1.5, {
   	x: '-50%',
   	opacity: 0
  }, {
    x: '0%',
    opacity: 1,
    ease: Power1.easeOut
  }).delay(1);

	$('.section#about .about_text_container').css('height', '');
	$('.section#about .about_text_container').css('padding-top', '');
	$('.section#about .about_text_container').css('padding-bottom', '')
  let h = $('.section#about .about_text_container').outerHeight();
  let p = $('.section#about .about_text_container').css('padding-top');
  TweenMax.fromTo($('.section#about .about_text_container'), 1, {
   	height: '0',
   	opacity: 0,
    paddingTop: 0,
    paddingBottom: 0,
  }, {
    height: h,
    opacity: 1,
    paddingTop: p,
    paddingBottom: p,
    ease: Power1.easeOut
  }).delay(4);

  // animation dots disappearing
  TweenMax.fromTo($('.section#about .animation_spinner'), .5, {
    opacity: 1,
    y: '0%'
  }, {
    opacity: 0,
    y: '100%'
  }).delay(4.33);
}