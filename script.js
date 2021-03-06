function loadScroller() {
  // Intialize layout
  var container = document.getElementsByClassName("container")[0];
  var content = document.getElementsByClassName("zoomable")[0];
  var clientWidth = 0;
  var clientHeight = 0;

  // Initialize Scroller
  this.scroller = new Scroller(render, {
    zooming: true
  });

  var rect = container.getBoundingClientRect();
  scroller.setPosition(rect.left + container.clientLeft, rect.top + container.clientTop);

  // Reflow handling
  var reflow = function() {
    clientWidth = container.clientWidth;
    clientHeight = container.clientHeight;
    scroller.setDimensions(clientWidth, clientHeight, contentWidth, contentHeight);
  };

  window.addEventListener("resize", reflow, false);
  reflow();

  container.addEventListener("touchstart", function(e) {
    // Don't react if initial down happens on a form element
    if (e.touches[0] && e.touches[0].target && e.touches[0].target.tagName.match(/input|textarea|select/i)) {
      return;
    }

    scroller.doTouchStart(e.touches, e.timeStamp);
    e.preventDefault();
  }, false);

  document.addEventListener("touchmove", function(e) {
    scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
  }, false);

  document.addEventListener("touchend", function(e) {
    scroller.doTouchEnd(e.timeStamp);
  }, false);

  document.addEventListener("touchcancel", function(e) {
    scroller.doTouchEnd(e.timeStamp);
  }, false);
}

function scrollDesktop(event) {
  var viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var isImageWidthBiggerThanView = $('.zoomable').width() > viewPortWidth;
  var differenceWidth = $('.zoomable').width() - viewPortWidth;
  var translateX = isImageWidthBiggerThanView
    ? - (differenceWidth / viewPortWidth) * event.pageX
    : (viewPortWidth - $('.zoomable').width()) / 2

  var viewPortHeigth = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  var isImageHeightBiggerThanView = $('.zoomable').height() > viewPortHeigth;
  var differenceHeight = $('.zoomable').width() - viewPortWidth;
  var translateY = isImageHeightBiggerThanView
    ? - (($('.zoomable').height() - event.pageY) / viewPortHeigth) * event.pageY
    : (viewPortHeigth - $('.zoomable').height()) / 2

  $('.zoomable').css({'transform': 'translate3D(' + translateX +  'px,' + translateY + 'px' + ', 0px)'});
}

$(function () {
  var dragging = false;

  $('.slide').click(function(event) {
    $('.container').addClass('is-active', function() {
      $('.zoomable').addClass('is-visible');
    });

    if ('ontouchstart' in window) {
      //mobile
      loadScroller();
    } else {
      //desktop
      scrollDesktop(event);
    }
  });

  $('.zoomable').click(function() {
    $('.container').removeClass('is-active');
    $('.zoomable').removeClass('is-visible');
  });

  //desktop
  $('.zoomable').on('mousemove', function(event) {
    scrollDesktop(event);
  });

  $('.zoomable').on('touchstart', function(event) {
    dragging = false;
  });

  $('.zoomable').on('touchend', function(event) {
    if (dragging) return;

    $('.container').removeClass('is-active');
    $('.zoomable').removeClass('is-visible');
  });

  $('.zoomable').on('touchmove', function(event) {
    dragging = true;
  });
});
