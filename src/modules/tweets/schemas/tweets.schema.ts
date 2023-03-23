import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tweets {
	@Prop()
	id_str: string;
	@Prop()
	text: string;
	@Prop()
	truncated: boolean;
	@Prop()
	entities: [];
	@Prop()
	source: string;
	@Prop()
	in_reply_to_status_id_str: string;
	@Prop()
	in_reply_to_user_id_str: string;
	@Prop()
	in_reply_to_screen_name: string;
	@Prop()
	geo: string;
	@Prop()
	coordinates: string;
	@Prop()
	place: string;
	@Prop()
	contributors: string;
	@Prop()
	is_quote_status: boolean;
	@Prop()
	retweet_count: number;
	@Prop()
	favorite_count: number;
	@Prop()
	conversation_id_str: string;
	@Prop()
	favorited: string;
	@Prop()
	retweeted: string;
	@Prop()
	lang: string;
	@Prop()
	supplemental_language: string;
	@Prop()
	user: [];
	@Prop()
	created_at: string;
	@Prop()
	created: Date;
	@Prop()
	updated: Date;
}

export type TweetsDocument = Tweets & Document;
export const TweetsSchema = SchemaFactory.createForClass(Tweets);
