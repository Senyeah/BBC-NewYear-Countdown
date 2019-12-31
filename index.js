import { timer, fromEvent } from 'rxjs';
import { skipWhile, take, switchMap, tap } from 'rxjs/operators';
import moment from 'moment';

class VideoPlayScheduler {
  constructor(finishTime) {
    this.video = document.querySelector('video');
    this.playTime = moment(finishTime).subtract(
      moment.duration(64020)
    );
  }

  schedule() {
    return timer(0, 10).pipe(
      skipWhile(() => this.playTime > moment()),
      take(1),
      tap(() => this.video.play())
    );
  }
}

const finishTime = `${new Date().getFullYear() + 1}-01-01T00:00:00`;

fromEvent(window, 'DOMContentLoaded').pipe(
  switchMap(() => new VideoPlayScheduler(finishTime).schedule())
).subscribe(
  () => console.log('Happy new year!')
);
