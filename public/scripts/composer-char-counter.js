$(document).ready(function() {
  $('textarea#tweet-text').on('keyup', function() {
    
    console.log('length ', this.value.length);
    if(this.value.length <= 140){

      $('#error').slideUp('fast');
    }
    
    const length = 140 - this.value.length;

    if (length < 0) {
      $('output.counter').addClass('negative');
    } else {
      $('output.counter').removeClass('negative');
    }

    $('output.counter').text(length);
  });
});