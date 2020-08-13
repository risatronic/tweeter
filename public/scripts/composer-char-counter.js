$(document).ready(function() {
  $('textarea#tweet-text').on('keyup', function() {
    const length = 140 - this.value.length;

    if (length < 0) {
      $('output.counter').addClass('negative');
    } else {
      $('output.counter').removeClass('negative');
      $('#error').slideUp('fast');
    }

    $('output.counter').text(length);
  });
});