import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tweet } from '../models/tweet.model';

@Injectable({
  providedIn: 'root'
})
export class SearchTweetsService {

  constructor(private http: HttpClient) { }

  /**
   * @function SearchTweets
   *
   * Makes a request to the server for recent tweets based on the provided search term and maximum results.
   *
   * @param searchTerm (string) - the search term to look for in Tweets
   * @param maxResults (number) - the maximum number of results we want back from the server
   *
   * @returns (Observable<Array<Tweet>>) - the response from the server wrapped in an Observable
   */
  public searchTweets(searchTerm: string, maxResults: number = 20): Observable<Array<Tweet>> {
    return this.http.post<Array<Tweet>>(`http://localhost:3000/api/tweets`, {
      query: searchTerm,
      maxResults: maxResults
    });
  }
}
