function stats_hide() {

}

function stats_show() {
  $('.section#stats .random_bubble').remove();

  for (let i = 0; i < 100; i++) {
    let size = Math.random();
    let top = Math.random() * $('.section#stats').height();
    let left = Math.random() * $('.section#stats').width();
    let opacity = Math.random();

    let el = $('<div class="random_bubble" style="opacity:' + opacity + ';transform: translate3d(' + left + 'px, ' + top + 'px, 0) scale(' + size + ')"></div>');
    $('.section#stats .background').append(el);

    TweenMax.fromTo(el, 1 + Math.random(), {
      scale: '0',
    }, {
      scale: size,
      ease: Bounce.easeOut
    }).delay(Math.random() * 3);
  }

  // background fade
  TweenMax.fromTo($('.section#stats #background_stats_blurred'), 3, {
    opacity: 0
  }, {
    opacity: 1,
    ease: Power1.easeIn
  });

  // scritta scompare
  TweenMax.fromTo($('.section#stats #stats_description_container'), 1, {
    y: '0%',
    scale: '1'
  }, {
    y: '40%',
		scale: '1.2',
    ease: Power1.ease
  }).delay(5.5);

  TweenMax.fromTo($('.section#stats #stats_description'), 1, {
    opacity: 1
  }, {
    opacity: 0.5,
    ease: Power1.ease
  }).delay(5.5);

  // scritta appare
  TweenMax.fromTo($('.section#stats #stats_description_container'), 1, {
    y: '-50%',
    scale: '0.75',
    opacity: 0
  }, {
    y: '0%',
    scale: '1',
    opacity: 1,
    ease: Power1.easeOut
  }).delay(.5);

  TweenMax.fromTo($('.section#stats #stats_description'), 1, {
    opacity: 0
  }, {
    opacity: 1,
    ease: Power1.easeOut
  }).delay(.5);

  // compaiono bolle servizi
  $('.section#stats .stats_bubble').each(function(index, el) {
    var shift = $(el).data("bar-shift");
    TweenMax.fromTo(el, 1, {
      scale: '0',
      y: '0%'
    }, {
      scale: '1',
      y: shift,
      ease: Bounce.easeOut
    }).delay(6 + index);
  });

  // compaiono fonti
  TweenMax.fromTo($('.section#stats #stats_source_container'), 1, {
    opacity: '0',
    y: '100%'
  }, {
    opacity: '1',
    y: '0%',
    ease: Power1.easeOut
  }).delay(6);

  // compaiono barre
  $('.section#stats .stats_bar_container_girl .stats_bar').each(function(index, el) {
    var realHeight = $(el).data("bar-height");
    TweenMax.fromTo(el, 1, {
      height: '0%',
      minHeight: '0%'
    }, {
      height: realHeight,
      minHeight: '30%',
      ease: Bounce.easeOut
    }).delay(7 + index);
  });
  $('.section#stats .stats_bar_container_boy .stats_bar').each(function(index, el) {
    var realHeight = $(el).data("bar-height");
    TweenMax.fromTo(el, 1, {
      height: '0%',
      minHeight: '0%'
    }, {
      height: realHeight,
      minHeight: '30%',
      ease: Bounce.easeOut
    }).delay(7 + index);
  });

  // compare testo su barre
  $('.section#stats .stats_bar_container_girl .stats_bar .stats_bar_text').each(function(index, el) {
    TweenMax.fromTo(el, 0.5, {
      opacity: 0
    }, {
      opacity: 1,
      ease: Power1.easeOut
    }).delay(7 + index);
  });
  $('.section#stats .stats_bar_container_boy .stats_bar .stats_bar_text').each(function(index, el) {
    TweenMax.fromTo(el, 0.5, {
      opacity: 0
    }, {
      opacity: 1,
      ease: Power1.easeOut
    }).delay(7 + index);
  });

  TweenMax.fromTo($('.section#stats .animation_spinner'), .5, {
    opacity: 1,
    y: '0%'
  }, {
    opacity: 0,
    y: '100%'
  }).delay(14);


}