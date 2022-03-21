import { Tweet } from "./tweet.model";

export interface TweetResponse {
  data: Array<Tweet>;
  meta: TweetMetadata;
}

interface TweetMetadata {
  newest_id: string;
  oldest_id: string;
  result_count: number;
}
