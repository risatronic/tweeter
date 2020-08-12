/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {

  const createTweetElement = function (tweet) {

    const username = tweet.user.name;
    const avatar = tweet.user.avatars;
    const handle = tweet.user.handle;

    const text = tweet.content.text;

    const date = new Date(tweet.created_at);
    const currentDate = new Date();

    let timeStamp = '';

    const difference = Math.abs(currentDate - date) / 1000;
    const days = Math.floor(difference / 86400);

    if (days > 0) {
      timeStamp = Math.floor(difference / 86400) + ' days ago';
    } else {
      let hours = Math.floor(difference / 3600) % 24;
      let minutes = Math.floor(difference / 60) % 60;

      if (hours > 0) {
        timeStamp = `${hours} hours`;
      }
      if (minutes > 0) {
        if (hours > 0) {
          timeStamp += ` and ${minutes} minutes`;
        } else {
          timeStamp = `${minutes} minutes`;
        }
      }
      timeStamp += ` ago`;
    }

    const $tweet = $(`<article class="tweet">
                        <header id="tweet">
                          <div>
                            <img src=${avatar}> ${username}
                          </div> 
                          <a name="handle"> ${handle} </a>
                        </header>
                        <p> ${text} </p>
                        <footer>
                          ${timeStamp} <a> [icons] </a>
                        </footer>
                      </article>`);

    return $tweet;
  };

  const renderTweets = function(tweets) {
    for(let tweet of tweets){
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet); 
    }
  };

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  renderTweets(data);

});