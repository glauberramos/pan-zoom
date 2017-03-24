$(function () {
  $('.slide').click(function() {
    $('img').addClass('is-active').addClass('is-visible');
  });

  $('.zoomable').click(function() {
    $(this).removeClass('is-visible').removeClass('is-active');
  });

  $('.zoomable').on('mousemove', function(event) {
    $(this).css({'transform': 'translate3D(' + (-event.pageX) +  'px,' + (-event.pageY) + 'px' + ', 0px)'});
  });

  $('.zoomable').on('touchmove', function(event) {
    $(this).css({'transform': 'translate3D(' + (-event.pageX) +  'px,' + (-event.pageY) + 'px' + ', 0px)'});
  });
});
