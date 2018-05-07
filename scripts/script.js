let loaderRemoved = false;

// random [0, 1)
function random() {
  return Math.random();
}

// min AND max inclusive
function randomInt(min, max) {
  return Math.floor(random() * (1 + max - min)) + min;
}

function goToPage(index) {
  if (index === undefined || index === null)
    index = $.scrollify.current().index();
  
  $.scrollify.move(index);
}

function nextPage() {
  $.scrollify.next();
}

function updateSelector(index) {
  if (!index)
    index = $.scrollify.current().index();

  $('#section_selectors .selector').toggleClass('selected', false);
  $('#section_selectors .selector').eq(index).toggleClass('selected', true);
}

function removeLoader() {
	if(!loaderRemoved) {
		TweenMax.fromTo($('#loader'), 1, {
	    opacity: 1
	  }, {
	    opacity: 0,
	    ease: 'easeOut',
	    onStart: function() {      
	      loaderRemoved = true;
	      updateSelector();
	      updatePage();     
	    },
	    onComplete: function() {
	      $('#loader').remove();
	    }
	  });
	}
}

$(window).on('load', function(e) {
  removeLoader();
})

$(document).ready(function() {
  $.scrollify({
    section: ".section",
    sectionName: "section-name",
    interstitialSection: ".section.nonfull",
    easing: "easeOutExpo",
    scrollSpeed: 1100,
    offset: 0,
    scrollbars: false,
    standardScrollElements: ".section.scrollable",
    setHeights: false,
    overflowScroll: true,
    updateHash: true,
    touchScroll: true,
    before: function(index, sections) {
      updateSelector(index);
      updatePage(index);
    },
    afterResize: function() {
      $.scrollify.update();
      goToPage();
      updatePage();
    }
  });
});