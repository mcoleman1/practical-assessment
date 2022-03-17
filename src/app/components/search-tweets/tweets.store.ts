import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Observable } from "rxjs";
import { Tweet } from "src/app/models/tweet.model";

export interface TweetsState {
  tweets: Array<Tweet>;
}

@Injectable()
export class TweetsStore extends ComponentStore<TweetsState> {
  constructor() {
    super({ tweets: [] });
  }

  public readonly tweets$: Observable<Array<Tweet>> = this.select(state => state.tweets);
}
