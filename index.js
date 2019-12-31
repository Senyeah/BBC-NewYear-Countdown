import { timer, fromEvent } from 'rxjs';
import { skipWhile, take, switchMap, tap } from 'rxjs/operators';
import moment from 'moment';

class VideoPlayScheduler {
  constructor({finishTime, countdownDurationMs}) {
    this.video = document.querySelector('video');
    this.duration = countdownDurationMs;
    this.playTime = moment(finishTime).subtract(
      moment.duration(this.duration)
    );
  }

  schedule() {
    return timer(0, 10).pipe(
      skipWhile(() => this.playTime > moment()),
      take(1),
      tap(() => this.video.play()),
      switchMap(() => timer(this.duration))
    );
  }
}

// When the countdown should end (i.e. become 00:00)
const FINISH_TIME = `${new Date().getFullYear() + 1}-01-01T00:00:00`;

// How many milliseconds the countdown video is until the timer hits 00:00
const VIDEO_DURATION_MS = 64020;

fromEvent(window, 'DOMContentLoaded').pipe(
  switchMap(() => new VideoPlayScheduler({
    finishTime: FINISH_TIME,
    countdownDurationMs: VIDEO_DURATION_MS
  }).schedule())
).subscribe(
  () => console.log('Happy new year!')
);
