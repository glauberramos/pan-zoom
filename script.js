$(function () {
  $('.slide').click(function(event) {
    $('.container').addClass('is-active', function() {
      $('img').addClass('is-visible');
    });

    if ('ontouchstart' in window) {
      //mobile
    } else {
      $('.zoomable').css({'transform': 'translate3D(' + (-event.pageX) +  'px,' + (-event.pageY) + 'px' + ', 0px)'});
    }

    $('body').addClass('no-scroll touch-events');
  });

  $('.zoomable').click(function() {
    $('.container').removeClass('is-active');
    $('.zoomable').removeClass('is-visible').removeClass('is-active');
  });

  $('.zoomable').on('mousemove', function(event) {
    $('.zoomable').css({'transform': 'translate3D(' + (-event.pageX) +  'px,' + (-event.pageY) + 'px' + ', 0px)'});
  });
});
