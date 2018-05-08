let starttestDevelopRequestId;
let starttestHasToStop;

function starttest_hide() {
  starttestHasToStop = true;

  if (starttestDevelopRequestId) {
      cancelAnimationFrame(starttestDevelopRequestId);
      starttestDevelopRequestId = null;
  }
}

function starttest_show() {
  starttestHasToStop = false;

  const speed = 15.0;
  const opacitySeconds = 2.0;
  const junctionRange = 100.0;
  const maxRadius = 3.0;
  const minRadius = 1.0;

  let backgroundContext;
  let lastRender = 0;

  let points = [];
  let junctions = [];

  let resizeCanvas = function() {
    backgroundContext.canvas.width = window.innerWidth;
    backgroundContext.canvas.height = window.innerHeight;
  }

  let setup = function() {
    backgroundContext = $('#starttest_canvas_bg').get(0).getContext('2d');

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
        maxOpacity: 0.25 + random() * 3.0 / 4.0
      });

      updateJunctions();
    }

    starttestDevelopRequestId = requestAnimationFrame(loop);
  }

  let loop = function(timestamp) {
    var progress = timestamp - lastRender;

    if (update(progress))
      draw();

    lastRender = timestamp;
    if(!starttestHasToStop)
      starttestDevelopRequestId = requestAnimationFrame(loop);
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
              opacity: map(calcDist, 0, junctionRange, Math.min(points[i].opacity, points[j].opacity) / 2.0, 0.0)
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
          maxOpacity: 0.25 + random() * 3.0 / 4.0
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
      backgroundContext.fillStyle = 'rgba(255, 255, 255, ' + points[i].opacity + ')';
      backgroundContext.beginPath();
      backgroundContext.arc(points[i].x, points[i].y, points[i].radius, 0, Math.PI * 2.0);
      backgroundContext.fill();
    }

    for (let i = 0; i < nJunctions; i++) {
      backgroundContext.strokeStyle = 'rgba(255, 255, 255, ' + junctions[i].opacity + ')';
      backgroundContext.beginPath();
      backgroundContext.moveTo(junctions[i].x1, junctions[i].y1);
      backgroundContext.lineTo(junctions[i].x2, junctions[i].y2);
      backgroundContext.stroke();
    }
  }

  setup();

  // background fade
  TweenMax.fromTo($('.section#starttest #background_starttest_blurred'), 2, {
    opacity: 0
  }, {
    opacity: 1,
    ease: Power1.easeIn
  });

  TweenMax.fromTo($('.section#starttest #starttest_canvas_bg'), 3, {
    opacity: 0
  }, {
    opacity: 1,
    ease: Power1.easeIn
  }).delay(.5);

  // scritta appare
  $('.section#starttest #starttest_title').css('height', '');
  $('.section#starttest #starttest_title').css('padding', '');
  let h = $('.section#starttest #starttest_title').outerHeight();
  let pT = $('.section#starttest #starttest_title').css('padding-top');
  let pB = $('.section#starttest #starttest_title').css('padding-bottom');
  TweenMax.fromTo($('.section#starttest #starttest_title'), 1.5, {  	
    height: '0px',
    opacity: '.5',
    paddingTop: 0,
    paddingBottom: 0
  }, {
    height: h,
    opacity: '1',
    paddingTop: pT,
    paddingBottom: pB,
    ease: Power1.easeOut
  }).delay(1);

  // scritta appare
  TweenMax.fromTo($('.section#starttest .starttest_message_container'), 1, {
    y: '100%'
  }, {
    y: '0%',
    ease: Power1.easeOut
  }).delay(3);

  // animation dots disappearing
  TweenMax.fromTo($('.section#starttest .animation_spinner'), .5, {
    opacity: 1,
    y: '0%'
  }, {
    opacity: 0,
    y: '100%'
  }).delay(4);
}