$(document).ready(function() {
  console.log('loaded');

  $('textarea#tweet-text').on('keyup', function() {
    let length = 140 - this.value.length;

    if (length < 0){
      $('output.counter').addClass('negative');
    } else {
      $('output.counter').removeClass('negative');
    }

    $('output.counter').text(length);
  })
});