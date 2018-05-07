let test2RequestId;

function test2_hide() {
  if (test2RequestId)
    cancelAnimationFrame(test2RequestId);
}

function test2_show() {
  const speed = 15.0;
  const opacitySeconds = 2.0;
  const junctionRange = 100.0;
  const maxRadius = 3.0;
  const minRadius = 1.0;

  const palette = [ '#f02f72', '#340c6f', '#0089e1', '#888888', '#aaaaaa', '#999999'];

  let backgroundContext;
  let lastRender = 0;

  let points = [];
  let junctions = [];

  let hexToRgb = function(hex) {
		let patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
		let matches = patt.exec(hex);
		return parseInt(matches[1], 16)+", "+parseInt(matches[2], 16)+", "+parseInt(matches[3], 16);
  }

  let resizeCanvas = function() {
    backgroundContext.canvas.width = window.innerWidth;
    backgroundContext.canvas.height = window.innerHeight;
  }

  let setup = function() {
    backgroundContext = $('#test2_canvas_bg').get(0).getContext('2d');

    resizeCanvas();
    $(window).on('resize', resizeCanvas);

    let width = backgroundContext.canvas.width;
    let height = backgroundContext.canvas.height;

    let nPoints = randomInt(100, 250);
    for (let i = 0; i < nPoints; i++) {
      points.push({
        x: randomInt(0, width),
        y: randomInt(0, height),
        direction: random() * 2 * Math.PI,
        speed: (0.5 + random() / 2.0) * speed,
        radius: randomInt(minRadius, maxRadius),
        opacity: 0.0,
        maxOpacity: 0.25 + random() * 3.0 / 4.0,
        color: hexToRgb(palette[randomInt(0, palette.length - 1)])
      });

      updateJunctions();
    }

    test2RequestId = requestAnimationFrame(loop);
  }

  let loop = function(timestamp) {
    var progress = timestamp - lastRender;

    if (update(progress))
      draw();

    lastRender = timestamp;
    test2RequestId = requestAnimationFrame(loop);
  }

  let updateJunctions = function() {
    junctions = [];

    let map = function(value, low1, high1, low2, high2) {
      return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }

    let dist = function(p1, p2) {
      return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
    }

    let nPoints = points.length;
    for (let i = 0; i < nPoints; i++) {
      for (let j = 0; j < nPoints; j++) {
        if (j !== i) {
          let calcDist = dist(points[i], points[j]);

          if (calcDist < junctionRange) {
            junctions.push({
              x1: points[i].x,
              y1: points[i].y,
              x2: points[j].x,
              y2: points[j].y,
              opacity: map(calcDist, 0, junctionRange, Math.min(points[i].opacity, points[j].opacity) / 2.0, 0.0),
              color1: points[i].color,
              color2: points[j].color
            });
          }
        }
      }
    }
  }

  let update = function(progress) {
    let updated = false;

    let nPoints = points.length;
    let width = backgroundContext.canvas.width;
    let height = backgroundContext.canvas.height;

    for (let i = 0; i < nPoints; i++) {
      points[i].x += Math.cos(points[i].direction) * points[i].speed * progress / 1000.0;
      points[i].y += Math.sin(points[i].direction) * points[i].speed * progress / 1000.0;
      if (points[i].opacity < points[i].maxOpacity)
        points[i].opacity += progress / (1000.0 * opacitySeconds);
      else 
      	points[i].opacity = points[i].maxOpacity;

      if (points[i].x < -points[i].radius || points[i].x > width + points[i].radius || points[i].y < -points[i].radius || points[i].y > height + points[i].radius) {
        points.splice(i--, 1);

        points.push({
          x: randomInt(0, width),
          y: randomInt(0, height),
          direction: random() * 2 * Math.PI,
          speed: (0.5 + random() / 2.0) * speed,
          radius: randomInt(minRadius, maxRadius),
          opacity: 0.0,
          maxOpacity: 0.25 + random() * 3.0 / 4.0,
        	color: hexToRgb(palette[randomInt(0, palette.length - 1)])
        });
      } 
    }

    updateJunctions();

    updated = true;
    return updated;
  };

  let draw = function() {
    let nPoints = points.length;
    let nJunctions = junctions.length;
    let width = backgroundContext.canvas.width;
    let height = backgroundContext.canvas.height;

    backgroundContext.clearRect(0, 0, width, height);

    for (let i = 0; i < nPoints; i++) {
      backgroundContext.fillStyle = 'rgba('+points[i].color+', ' + points[i].opacity + ')';
      backgroundContext.beginPath();
      backgroundContext.arc(points[i].x, points[i].y, points[i].radius, 0, Math.PI * 2.0);
      backgroundContext.fill();
    }

    for (let i = 0; i < nJunctions; i++) {
    	var grad= backgroundContext.createLinearGradient(junctions[i].x1, junctions[i].y1, junctions[i].x2, junctions[i].y2);
			grad.addColorStop(0, 'rgba(' + junctions[i].color1 + ', ' + junctions[i].opacity + ')');
			grad.addColorStop(1, 'rgba(' + junctions[i].color2 + ', ' + junctions[i].opacity + ')');
      backgroundContext.strokeStyle = grad;
      backgroundContext.beginPath();
      backgroundContext.moveTo(junctions[i].x1, junctions[i].y1);
      backgroundContext.lineTo(junctions[i].x2, junctions[i].y2);
      backgroundContext.stroke();
    }
  }

  setup();

 	$(':radio[name="test2_question1"]').change(function() {
 		$(':radio[name="test2_question1"]').each(function(index) {
 			$(this).parent().parent().find('.test_answer_desc').toggleClass('show', false);
 		});

 		$(this).parent().parent().find('.test_answer_desc').toggleClass('show', true);
	});
	
	TweenMax.fromTo($('.section#test2 .test_question'), 1.5, {
   	x: '-50%',
   	opacity: 0
  }, {
    x: '0%',
    opacity: 1,
    ease: Power1.easeOut
  }).delay(1);

	$('.section#test2 .test_answers_container').css('height', '');
	$('.section#test2 .test_answers_container').css('padding', '');
  let h = $('.section#test2 .test_answers_container').outerHeight();
  let p = $('.section#test2 .test_answers_container').css('padding-top');
  TweenMax.fromTo($('.section#test2 .test_answers_container'), 1, {
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
  TweenMax.fromTo($('.section#test2 .animation_spinner'), .5, {
    opacity: 1,
    y: '0%'
  }, {
    opacity: 0,
    y: '100%'
  }).delay(4.33);
}