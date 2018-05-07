<!DOCTYPE html>
<html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta charset="utf-8" />
  <title>Digital.merge()</title>
  <link rel="stylesheet" type="text/css" href="styles/loader.css" />
</head>

<?php $pages = array(
	'main',
	'stats',
	'usage',
	'stats_develop',
	'develop',
	'starttest',
	'test1',
	'test2',
	'test3',
	'endingtext',
	'readmore',
	'about'
); ?>

<body>
  <div id="loader">
    <div class="sk-circle">
      <div class="sk-circle1 sk-child"></div>
      <div class="sk-circle2 sk-child"></div>
      <div class="sk-circle3 sk-child"></div>
      <div class="sk-circle4 sk-child"></div>
      <div class="sk-circle5 sk-child"></div>
      <div class="sk-circle6 sk-child"></div>
      <div class="sk-circle7 sk-child"></div>
      <div class="sk-circle8 sk-child"></div>
      <div class="sk-circle9 sk-child"></div>
      <div class="sk-circle10 sk-child"></div>
      <div class="sk-circle11 sk-child"></div>
      <div class="sk-circle12 sk-child"></div>
    </div>
    <div id="loader_enable_js">
      If you can't get through this screen, please
      <br/>
      <a href="https://www.enable-javascript.com/" target="_blank">enable JavaScript</a> on your browser.
    </div>
  </div>
  <div id="small_screen_overlay">
  	<img src="images/small_screen.svg" alt="Open this window fullscreen or change monitor"/>
  	<div>
  		We're sorry, but this window is too small for this webpage. 😢<br/>
  		If you're on a smartphone, please rotate it and use it in landscape mode.
  		Requires a minimal resolution of 1024x768px<br/>
  	</div>
  </div>

  <div id="body_wrapper">
    <div id="section_selectors">
    	<?php for($i = 0; $i < count($pages); $i++) { ?>
				<div class="selector" onClick="goToPage(<?php echo $i; ?>)">
	        <div class="bullet"></div>
	      </div>
  		<?php } ?>
    </div>
    <div id="body_container">
    	<?php for($i = 0; $i < count($pages); $i++) {
    		include 'sections/'.$pages[$i].'/fragment.php';
    	} ?>
    </div>
  </div>

<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,400i,500,700,900">
<link rel="stylesheet" type="text/css" href="styles/bootstrap-reboot.min.css" />

<script type="application/ecmascript" src="scripts/jquery/jquery-3.3.1.min.js"></script>
<script type="application/ecmascript" src="scripts/scrollify/jquery.scrollify.js"></script>
<script type="application/ecmascript" src="scripts/gsap/TweenMax.min.js"></script>

<script type="application/ecmascript">
	let prevIndex = -1;

	function updatePage(index) {
	  if(loaderRemoved) {
	    if (!index)
	      index = $.scrollify.current().index();

	    if(prevIndex >= 0){
		    <?php for($i = 0; $i < count($pages); $i++) { ?>
		    	if(prevIndex === <?php echo $i; ?>)
		    		<?php echo $pages[$i]; ?>_hide();
	    	<?php } ?>
			}

	    TweenMax.killChildTweensOf($('#body_container'));

	    <?php for($i = 0; $i < count($pages); $i++) { ?>
	    	if(index === <?php echo $i; ?>)
	    		<?php echo $pages[$i]; ?>_show();
    	<?php } ?>
    	prevIndex = index;
	  }
	}
</script>

<link rel="stylesheet" type="text/css" href="styles/style.css" />
<script type="application/ecmascript" src="scripts/script.js"></script>

<?php for($i = 0; $i < count($pages); $i++) { ?>
	<link rel="stylesheet" type="text/css" href="sections/<?php echo $pages[$i]; ?>/style.css" />
	<script type="application/ecmascript" src="sections/<?php echo $pages[$i]; ?>/script.js"></script>
<?php } ?>

</body>
</html>