import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Observable } from "rxjs";
import { Tweet } from "src/app/models/tweet.model";

export interface TweetsState {
  mostPopularSource: string;
  tweets: Array<Tweet>;
}

@Injectable()
export class TweetsStore extends ComponentStore<TweetsState> {
  constructor() {
    super({ mostPopularSource: '', tweets: [] });
  }

  public readonly mostPopularSource$: Observable<string> = this.select(state => state.mostPopularSource);
  public readonly tweets$: Observable<Array<Tweet>> = this.select(state => state.tweets);
}
