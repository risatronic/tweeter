/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const generateTimeStamp = function (time) {
    const date = new Date(time);
    const currentDate = new Date();

    let timeStamp = '';

    const difference = Math.abs(currentDate - date) / 1000;
    const days = Math.floor(difference / 86400);

    if (days > 365) {
      timeStamp = Math.floor(difference / (86400 * 365)) + ' years ago';
    } else if (days > 0) {
      timeStamp = Math.floor(difference / 86400) + ' days ago';
    } else {
      const hours = Math.floor(difference / 3600) % 24;
      const minutes = Math.floor(difference / 60) % 60;

      if (hours > 0) {
        timeStamp = `${hours} hours`;
      }
      if (minutes >= 0) {
        if (hours > 0 && minutes !== 0) {
          timeStamp += ` and ${minutes} minutes`;
        } else {
          timeStamp = `${minutes} minutes`;
        }
      }
      timeStamp += ` ago`;
    }

    return timeStamp;
  };

  const createTweetElement = function (tweet) {
    const username = tweet.user.name;
    const avatar = tweet.user.avatars;
    const handle = tweet.user.handle;

    const text = tweet.content.text;

    const timeStamp = generateTimeStamp(tweet.created_at);

    const $tweet = $(
      `<article class="tweet">
        <header id="tweet">
          <div>
            <img src=${avatar}> ${username}
          </div> 
          <a name="handle">${handle}</a>
        </header>
        <p>${text}</p>
        <footer>
          ${timeStamp} 
          <a>
            <i class="fa fa-flag"></i>
            <i class="fa fa-retweet"></i>
            <i class="fa fa-heart"></i>
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
      console.log(data);
      renderTweets(data);
    })
  };

  loadTweets();

  $('#submit-tweet').on('submit', function (event) {
    event.preventDefault();

    const data = $(this).serialize();
    const text = jQuery('textarea#tweet-text').val();
    // console.log();
    if (!text) {
      alert('Tweet cannot be empty');
    } else if (text.length > 140) {
      alert('Tweet must be 140 characters or less');
    } else {
      $.post('/tweets', data);
      // $('textarea#tweet-text').value = "";
      // $('#tweets-container').empty();

    }
  });

});