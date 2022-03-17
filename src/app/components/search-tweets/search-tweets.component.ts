import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Tweet } from 'src/app/models/tweet.model';
import { SearchTweetsService } from 'src/app/services/search-tweets.service';
import { TweetsStore } from './tweets.store';

@Component({
  selector: 'app-search-tweets',
  templateUrl: './search-tweets.component.html',
  styleUrls: ['./search-tweets.component.scss'],
  providers: [ ComponentStore ]
})
export class SearchTweetsComponent implements OnInit {

  public formGroup: FormGroup;
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

  ngOnDestroy() {
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

        this.tweetsStore.setState({ tweets });
      },
      error: (err: any) => console.log(err)
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
      if (!maxResults || isNaN(maxResults)) {
        return;
      }

      if (this.formGroup.valid) {
        this.searchTweets(this.formGroup.get('searchTerm')?.value, maxResults);
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
  public subscribeToSearchTerm() {
    this.formGroup.get('searchTerm').valueChanges.pipe(
      takeUntil(this.destroyed$),
      debounceTime(300)
    )
    .subscribe((input: string) => {
      if (!input) {
        return;
      }

      if (this.formGroup.valid) {
        this.searchTweets(input, this.formGroup.get('maxResults')?.value);
      }
    });
  }

}
