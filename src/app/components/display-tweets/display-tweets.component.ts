import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tweet } from 'src/app/models/tweet.model';
import { TweetsStore } from '../search-tweets/tweets.store';

@Component({
  selector: 'app-display-tweets',
  templateUrl: './display-tweets.component.html',
  styleUrls: ['./display-tweets.component.scss']
})
export class DisplayTweetsComponent implements OnInit {
  public displayedColumns = ['number', 'status', 'created_at', 'source', 'text'];
  public tweets$: Observable<Array<Tweet>> = of([]);

  constructor(public tweetsStore: TweetsStore) { }

  ngOnInit(): void {
    this.tweets$ = this.tweetsStore.tweets$;
  }

}
