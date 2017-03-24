$(function () {
  $('.slide').click(function(event) {
    $('img').addClass('is-active').addClass('is-visible');
    $('.zoomable').css({'transform': 'translate3D(' + (-event.pageX) +  'px,' + (-event.pageY) + 'px' + ', 0px)'});
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
