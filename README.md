# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

This repository is the starter code for the project: Students will fork and clone this repository, then build upon it to practice their HTML, CSS, JS, jQuery and AJAX front-end skills, and their Node, Express and MongoDB back-end skills.

## Final Product

!["Page is wide and tweet is too long"](https://github.com/risatronic/tweeter/blob/master/docs/1-too-long.png)
!["Timestamps account for hours/minutes, days, or years; tweets change on hover"](https://github.com/risatronic/tweeter/blob/master/docs/2-timestamp-hover.png)
!["Cannot submit an empty tweet"](https://github.com/risatronic/tweeter/blob/master/docs/3-empty-tweet.png)
!["Page changes as you shrink width or scroll down"](https://github.com/risatronic/tweeter/blob/master/docs/4-responsive.png)
!["Update of how page actually looks when scrolled down"](https://github.com/risatronic/tweeter/blob/master/docs/5-oops.png)

## Known Issues

* Had accidentally deleted class before screenshotting other functionality, final screenshot reflects current state

* Counter watcher to hide error message after trying to submit a tweet that is too long does not work after triggering the error message that occurs when a user tries to submit an empty tweet, it disappears on first key-stroke but is re-triggered if trying to submit a too-long tweet again, not part of core functionality so put on the backburner

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above
