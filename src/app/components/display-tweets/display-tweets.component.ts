import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tweet } from 'src/app/models/tweet.model';

@Component({
  selector: 'app-display-tweets',
  templateUrl: './display-tweets.component.html',
  styleUrls: ['./display-tweets.component.scss']
})
export class DisplayTweetsComponent implements OnInit {
  @Input() data$: Observable<Array<Tweet>>;

  public displayedColumns = ['number', 'text'];

  constructor() { }

  ngOnInit(): void {
  }

}
