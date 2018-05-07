let statsDevelopRequestId;

function stats_develop_hide() {
	if(statsDevelopRequestId)
		cancelAnimationFrame(statsDevelopRequestId);
}

function stats_develop_show() {
	let backgroundContext;

	const bgColor = '#ccc';
	const selectedBgColor = '#bbb';
	const cursorColor = '#fff';
	const wordColors = ['#fff', '#fff', '#fff', '#ddd', '#ddd', '#ddd', '#aaa', '#aaa', '#aaa', '#66aad7', '#66aad7', '#de7d9f'];

	let lastRender = 0;

	let rows;
	let cursor;

	var typeWait = randomInt(300, 700);
	var typeProgress = 0;
	var cursorWait = 500;
	var cursorProgress = 0;

	let resizeCanvas = function() {
	  backgroundContext.canvas.width = window.innerWidth;
	  backgroundContext.canvas.height = window.innerHeight;
	}

	let setup = function() {
		rows = [];
		cursor = {
			row: -1,
			fromChar: -1,
			actChar: -1,
			typing: true,
			visible: true
		};

		backgroundContext = $('#stats_develop_canvas_bg').get(0).getContext('2d');

		let tabs = 0;

		let nRows = randomInt(10, 15);
		for(let r = 0; r < nRows; r++) {
			if(r > 0) {
				if(r === 1)
					tabs++;
				else {
					if(nRows - r <= tabs - 1)
						tabs--;
					else {
						let rnd = random();
						if(rnd <= 0.4 && tabs < 5 && nRows - r > tabs)
							tabs++;
						else if(rnd >=  0.6 && tabs > 1)
							tabs--;
					}
				}
			}

			rows[r] = {
				words: [],
				nChars: 0,
				tab: tabs
			};

			let nWords =randomInt(2, 4);

			for(let w = 0; w < nWords; w++) {
				let tmpChars = randomInt(2, 15);
				let tmpColor = randomInt(0, wordColors.length - 1);	

				rows[r].words.push({
					chars: tmpChars,
					color: tmpColor
				});

				rows[r].nChars += tmpChars;
				if(w < nWords - 1)
					rows[r].nChars++; // space
			}
		}

		cursor.row = randomInt(0, rows.length - 1);
		cursor.fromChar = randomInt(0, rows[cursor.row].nChars / 2);
		cursor.actChar = cursor.fromChar;

	  resizeCanvas();
	  $(window).on('resize', resizeCanvas);

	  statsDevelopRequestId = requestAnimationFrame(loop);
	}

	let loop = function(timestamp) {
	  var progress = timestamp - lastRender;

	  if(update(progress))
	  	draw();

	  lastRender = timestamp;
	  statsDevelopRequestId = requestAnimationFrame(loop);
	}

	let update = function(progress) {
		let updated = false;

		typeProgress += progress;
		cursorProgress += progress;

		if(cursorProgress >= cursorWait) {
			updated = true;
			cursorProgress = 0;
			cursor.visible = !cursor.visible;
		}

		if(typeProgress >= typeWait) {
			updated = true;
			typeProgress = 0;

			cursorProgress = 0;
			cursor.visible = true;

			
			if(cursor.typing) {
				if(cursor.actChar < rows[cursor.row].nChars - 1) {
					cursor.actChar++;
					typeWait = randomInt(300, 1000);				
				}
				else  {
					cursor.typing = false;				
					typeWait = 1000;				
				}
			} else {
				if(cursor.actChar > cursor.fromChar) {
					cursor.actChar--;
					typeWait = randomInt(100, 400);
				}
				else {
					cursor.typing = true;				
					typeWait = 1500;
				}
			}
		}

		return updated;
	}

	let draw = function() {
		let context = backgroundContext;
		let canvas = context.canvas;
		let width = canvas.width;
		let height = canvas.height;

		var tempCanvas = document.createElement('canvas');
		tempCanvas.width = width;
		tempCanvas.height = height;

		var tempCtx = tempCanvas.getContext('2d');

		tempCtx.fillStyle = bgColor;
		tempCtx.beginPath();
		tempCtx.rect(0, 0, width, height);
		tempCtx.fill();

		let nRows = rows.length;

		let rowHeight = height / (nRows + 4);
		let charWidth = rowHeight / 3;
		let tabWidth = charWidth * 4;

		let topSpacing = 2*rowHeight;
		for(let r = 0; r < rows.length; r++) {
			if(r === cursor.row) {
				tempCtx.fillStyle = selectedBgColor;
				tempCtx.beginPath();
				tempCtx.rect(0, 2 * rowHeight + rowHeight * cursor.row,  canvas.width, rowHeight);
				tempCtx.fill();
			}

			let leftSpacing = tabWidth + tabWidth * rows[r].tab;
			let remainingChars = (r === cursor.row) ? cursor.actChar : Number.MAX_SAFE_INTEGER;

			for(let w = 0; w < rows[r].words.length; w++) {
				tempCtx.fillStyle = wordColors[rows[r].words[w].color];
				tempCtx.beginPath();
				tempCtx.rect(leftSpacing, topSpacing + rowHeight * 1 / 6,  Math.min(rows[r].words[w].chars, remainingChars) * charWidth, rowHeight * 4 / 6);
				tempCtx.fill();

				remainingChars -= rows[r].words[w].chars;
				if(w < rows[r].words.length - 1)
					remainingChars--;

				if(remainingChars <= 0)
					break;

				leftSpacing += rows[r].words[w].chars * charWidth + charWidth;
			}		

			topSpacing += rowHeight;
		}

		if(cursor.visible) {
			tempCtx.fillStyle = cursorColor;
			tempCtx.beginPath();
			tempCtx.rect(tabWidth + tabWidth * rows[cursor.row].tab + charWidth * cursor.actChar - charWidth/4, 2 * rowHeight + rowHeight * cursor.row, charWidth / 2, rowHeight);
			tempCtx.fill();
		}

		context.clearRect(0, 0, width, height);
		context.drawImage(tempCanvas, 0, 0);
	}

	setup();

  TweenMax.fromTo($('.section#stats_develop #stats_develop_canvas_bg'), 1, {
    opacity: 0
  }, {
    opacity: 1
  }).delay(.5);

  TweenMax.fromTo($('.section#stats_develop .stats_develop_text_container'), 1, {
    width: '100%',
    backgroundColor: 'rgba(85,85,85, 0.7)'
  }, {
    width: '50%',
    backgroundColor: 'rgba(85,85,85, 0.2)',
    ease: Power1.easeOut
  }).delay(9);

  TweenMax.fromTo($('.section#stats_develop .stats_develop_text_container div'), 1, {
	  scale: '1',
	  y: '0%',
    opacity: '1'
  }, {
    scale: '1.25',
    y: '100%',
    opacity: '0.8',
    ease: Power1.easeOut
  }).delay(9);


  TweenMax.fromTo($('.section#stats_develop .stats_develop_text_container'), 2, {
    opacity: 0
  }, {
    opacity: 1,
    ease: Power1.easeOut
  }).delay(3);

  $('.section#stats_develop .luggage_box_container').each(function(index, el) {
    TweenMax.fromTo(el, .5, {
      opacity: 0,
      x: '100%'
    }, {
      opacity: 1,
      x: '0%',
      ease: Power1.easeOut
    }).delay(10.5 + index);
  });

  $('.section#stats_develop .luggage_box_border_boy').each(function(index, el) {
    var w = $(el).data("bar-width");
    TweenMax.fromTo(el, 1, {
      width: '0%'
    }, {
      width: w,
      ease: Power1.easeOut
    }).delay(11 + index);
  });

  $('.section#stats_develop .luggage_boy').each(function(index, el) {
    var w = $(el).data("bar-width");
    TweenMax.fromTo(el, 1, {
      width: '0%'
    }, {
      width: w,
      ease: Power1.easeOut
    }).delay(12 + index);
  });

  $('.section#stats_develop .luggage_box_border_boy .luggage_box_border_perc').each(function(index, el) {
    var w = $(el).data("bar-width");
    TweenMax.fromTo(el, .5, {
      opacity: 0,
      y: '100%'
    }, {
      opacity: 1,
      y: '0%',
      ease: Power1.easeOut
    }).delay(12 + index);
  });

  $('.section#stats_develop .luggage_box_border_girl .luggage_box_border_perc').each(function(index, el) {
    var w = $(el).data("bar-width");
    TweenMax.fromTo(el, .5, {
      opacity: 0,
      y: '100%'
    }, {
      opacity: 1,
      y: '0%',
      ease: Power1.easeOut
    }).delay(12 + index);
  });

  TweenMax.fromTo($('.section#stats_develop #stats_develop_source_container'), 1, {
    opacity: 0,
    y: '100%'
  }, {
    opacity: 1,
    y: '0%',
    ease: Power1.easeOut
  }).delay(10.5);

  TweenMax.fromTo($('.section#stats_develop .animation_spinner'), .5, {
    opacity: 1,
    y: '0%'
  }, {
    opacity: 0,
    y: '100%'
  }).delay(16);
}