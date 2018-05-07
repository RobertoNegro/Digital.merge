
function readmore_hide() {
}

function readmore_show() {
	TweenMax.fromTo($('.section#readmore .readmore_title'), 1.5, {
   	y: '-200%',
   	opacity: 0
  }, {
    y: '0%',
    opacity: 1,
    ease: Power1.easeOut
  }).delay(1);


    $('.section#readmore .readmore_card').each(function(index, el) {
        $(el).css('height', '');
        $(el).css('padding-top', '');
        $(el).css('padding-bottom', '')
        let h = $(el).outerHeight();
        let p = $(el).css('padding-top');

        TweenMax.fromTo($(el), 1, {
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
        }).delay(4 + 0.5*index);
    });

    /*
      $('.section#readmore .readmore_text_container').css('height', '');
      $('.section#readmore .readmore_text_container').css('padding-top', '');
      $('.section#readmore .readmore_text_container').css('padding-bottom', '')
    let h = $('.section#readmore .readmore_text_container').outerHeight();
    let p = $('.section#readmore .readmore_text_container').css('padding-top');

    TweenMax.fromTo($('.section#readmore .readmore_text_container'), 1, {
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
  */

  // animation dots disappearing
  TweenMax.fromTo($('.section#readmore .animation_spinner'), .5, {
    opacity: 1,
    y: '0%'
  }, {
    opacity: 0,
    y: '100%'
  }).delay(7);
}