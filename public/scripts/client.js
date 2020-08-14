/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  loadTweets();
  $('#error').hide();

  $('#submit-tweet').on('submit', function (event) {
    event.preventDefault();

    const data = $(this).serialize();
    const text = $('textarea#tweet-text').val(); //$text??

    if (text.length === 0) {
      $('#error')
        .html('Tweet cannot be empty!')
        .hide()
        .slideDown('fast');
      $('textarea#tweet-text').on('keyup', function () {
        $('#error').slideUp('fast');
      });
    } else if (text.length > 140) {
      $('#error')
        .html('Tweet must be 140 characters or less!')
        .hide()
        .slideDown('fast');
    } else {
      $.post('/tweets', data, () => {
        $('#error')
          .slideUp('fast')
          .html('');
        loadTweets();
        $('output.counter').text(140);
        this.reset();

      });
    }
    $('textarea#tweet-text').focus();
  });

  let clicked = false;

  $('#compose-tweet').on('click', function () {
    if (!clicked) {
      $('section.new-tweet').slideUp('slow');
      clicked = true;
    } else if (clicked) {
      $('section.new-tweet').slideDown('slow');
      $('textarea#tweet-text').focus();
      clicked = false;
    }
  });

  $('#scroll-btn').on('click', function () {
    $('section.new-tweet').hide('0');
    setTimeout(() => {
      $('section.new-tweet').slideDown('slow');
      $('#scroll-btn').hide();
    }, 600);
    setTimeout(() => {
      $('textarea#tweet-text').focus();
    }, 605)
  });

  $(window).scroll(function () {
    const scrollTop = $(window).scrollTop();

    if (scrollTop >= 120) {
      $('#nav').addClass('scrolled');
      $('#compose-tweet').hide();
      $('#scroll-btn').show();
    } else {
      $('#nav').removeClass('scrolled');
      $('#compose-tweet').show();
      $('#scroll-btn').hide();
    }
  });
});

const generateTimeStamp = function (time) {
  const date = new Date(time);
  const currentDate = new Date();

  let timeStamp = '';

  const difference = Math.abs(currentDate - date) / 1000;
  const days = Math.floor(difference / 86400);

  if (days >= 365) {
    const years = Math.floor(difference / (86400 * 365));
    console.log('years ', years);
    timeStamp = `${years} year`;
    if (years >= 2) {
      timeStamp += 's';
    }
  } else if (days > 0) {
    timeStamp = Math.floor(difference / 86400) + ' day';
    if (days !== 1) {
      timeStamp += 's';
    }
  } else {
    const hours = Math.floor(difference / 3600) % 24;
    const minutes = Math.floor(difference / 60) % 60;

    if (hours + minutes === 0) {
      return 'Just now!';
    }

    if (hours > 0) {
      timeStamp = `${hours} hour`;
      if (hours > 1) {
        timeStamp += 's';
      }
    }
    if (minutes > 0) {
      if (hours > 0) {
        timeStamp += ` and `;
      }
      timeStamp = `${minutes} minute`;
      if (minutes !== 1) {
        timeStamp += 's';
      }
    }
  }
  timeStamp += ` ago`;

  return timeStamp;
};

const createTweetElement = function (tweet) {
  const username = tweet.user.name;
  const avatar = tweet.user.avatars;
  const handle = tweet.user.handle;

  const text = escape(tweet.content.text);

  const timeStamp = generateTimeStamp(tweet.created_at);

  const $tweet = $(
    `<article class="tweet">
      <header id="tweet">
        <div>
          <img src=${avatar}> ${username}
        </div> 
        <a name="handle">${handle}</a>
      </header>
      <p class="tweet">${text}</p>
      <footer>
        ${timeStamp} 
        <a>
          <i class="fa fa-flag" id="report"></i>
          <i class="fa fa-retweet" id="retweet"></i>
          <i class="fa fa-heart" id="love"></i>
        </a>
      </footer>
    </article>`
  );

  return $tweet;
};

const renderTweets = function (tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
};

const loadTweets = function () {
  $.getJSON('/tweets', function (data) {
    $('#tweets-container').empty();
    renderTweets(data);
  });
};

const escape = function (string) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(string));
  return div.innerHTML;
};