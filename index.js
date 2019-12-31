import { timer } from 'rxjs';
import { skipWhile, take } from 'rxjs/operators';
import moment from 'moment';

setTimeout(function() {
  const video = document.querySelector('video');
  const newYear = moment(`${new Date().getFullYear() + 1}-01-01T00:00:00`);
  const startDate = moment(newYear).subtract(
    moment.duration(64020)
  );

  timer(0, 10).pipe(
    skipWhile(() => startDate > moment()),
    take(1)
  ).subscribe(() => {
    video.play();
  });
}, 100);
