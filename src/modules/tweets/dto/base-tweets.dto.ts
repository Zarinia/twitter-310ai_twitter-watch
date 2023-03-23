export class BaseTweetsDto {
	tid_str?: string;
	text?: string;
	truncated?: boolean;
	entities?: [];
	source?: string;
	in_reply_to_status_id_str?: string;
	in_reply_to_user_id_str?: string;
	in_reply_to_screen_name?: string;
	geo?: string;
	coordinates?: string;
	place?: string;
	contributors?: string;
	is_quote_status?: boolean;
	retweet_count?: number;
	favorite_count?: number;
	conversation_id_str?: string;
	favorited?: string;
	retweeted?: string;
	lang?: string;
	supplemental_language?: string;
	user?: [];
	created_at?: string;
}
