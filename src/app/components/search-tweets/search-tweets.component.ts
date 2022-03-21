import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Tweet } from 'src/app/models/tweet.model';
import { SearchTweetsService } from 'src/app/services/search-tweets.service';
import { TweetsStore } from './tweets.store';

@Component({
  selector: 'app-search-tweets',
  templateUrl: './search-tweets.component.html',
  styleUrls: ['./search-tweets.component.scss'],
  providers: [ TweetsStore ]
})
export class SearchTweetsComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup;
  public mostPopularSource: string = '';
  public mostPopularSource$: Observable<string> = this.tweetsStore.mostPopularSource$;
  public tweets$: Observable<Array<Tweet>> = this.tweetsStore.tweets$;

  private destroyed$ = new Subject<void>();

  constructor(private tweetsService: SearchTweetsService, private fb: FormBuilder, private readonly tweetsStore: TweetsStore) {
    this.formGroup = this.fb.group({
      searchTerm: '',
      maxResults: [20, [Validators.min(10), Validators.max(50)]]
    });
   }

  ngOnInit(): void {
    this.subscribeToMaxResults();
    this.subscribeToSearchTerm();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * @function searchTweets
   *
   * Utilizes the Tweets Service to search recent tweets.
   *
   * @param searchTerm (string) - the user-supplied search term value
   * @param maxResults (number) - the user-supplied maximum results value
   *
   * @returns void
   */
  public searchTweets(searchTerm: string, maxResults?: number): void {
    const observer = {
      next: (tweets: Array<Tweet>) => {
        if (!tweets || !tweets.length) {
          return;
        }

        const mostPopularSource = this.calculateMostPopularSource(tweets);

        this.tweetsStore.setState({ tweets, mostPopularSource });
      },
      error: (err: any) => console.error(err)
    };

    this.tweetsService.searchTweets(searchTerm, maxResults).subscribe(observer);
  }


  /**
   * @function subscribeToMaxResults
   *
   * Watches for changes to the Max Results form control in the template and makes a request to the server if all data is valid.
   *
   * @returns void
   */
  public subscribeToMaxResults(): void {
    this.formGroup.get('maxResults').valueChanges.pipe(
      takeUntil(this.destroyed$),
      debounceTime(300)
      )
      .subscribe((maxResults: number) => {
        const searchTerm: string = this.formGroup.get('searchTerm')?.value;

        if (!maxResults || isNaN(maxResults) || !searchTerm) {
          return;
        }

        if (this.formGroup.valid) {
          this.searchTweets(searchTerm, maxResults);
        }
      });
  }


  /**
   * @function subscribeToSearchTerm
   *
   * Watches for changes to the Search Term form control in the template and makes a request to the server if all data is valid.
   *
   * @returns void
   */
  public subscribeToSearchTerm(): void {
    this.formGroup.get('searchTerm').valueChanges.pipe(
      takeUntil(this.destroyed$),
      debounceTime(300)
    )
    .subscribe((input: string) => {
      const maxResults: number = Number(this.formGroup.get('maxResults')?.value);
      if (!input || !maxResults || isNaN(maxResults)) {
        return;
      }

      if (this.formGroup.valid) {
        this.searchTweets(input, maxResults);
      }
    });
  }


  /**
   * @function calculateMostPopularSource
   *
   * Determines which Tweet source has the most occurrences in a given list.
   *
   * @param tweets (Array<Tweet>) - the array of tweets to check source occurrence against
   *
   * @returns (string) - the source that had the highest number of occurrences
   */
  private calculateMostPopularSource(tweets: Array<Tweet>): string {
    let sourceFrequency = {};

    tweets.forEach(tweet => {
        sourceFrequency[tweet.source] = (sourceFrequency[tweet.source] || 0) + 1;
    });

    let count = 0;
    let output = '';

    for (let [key, value] of Object.entries(sourceFrequency)) {
      if (count < Number(value)) {
        count = Number(value);
        output = `${key} (${value})`;
      }
    }

    return output;
  }

}
