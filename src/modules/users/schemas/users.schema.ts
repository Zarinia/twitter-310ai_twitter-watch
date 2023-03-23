import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Users {
	@Prop()
	uid_str: string;
	@Prop()
	name: string;
	@Prop()
	screen_name: string;
	@Prop()
	location: string;
	@Prop()
	description: string;
	@Prop()
	url: string;
	@Prop()
	entities: [];
	@Prop()
	protected?: boolean;
	@Prop()
	friends_count: number;
	@Prop()
	followers_count: number;
	@Prop()
	fast_followers_count: number;
	@Prop()
	normal_followers_count: number;
	@Prop()
	listed_countfriends_count: number;
	@Prop()
	listed_count: number;
	@Prop()
	favourites_count: number;
	@Prop()
	utc_offset: string;
	@Prop()
	time_zone: string;
	@Prop()
	geo_enabled: boolean;
	@Prop()
	verified: boolean;
	@Prop()
	statuses_count: number;
	@Prop()
	media_count: number;
	@Prop()
	lang: string;
	@Prop()
	contributors_enabled?:boolean;
	@Prop()
	is_translator: boolean;
	@Prop()
	is_translation_enabled: boolean;
	@Prop()
	profile_background_color: string;
	@Prop()
	profile_background_image_url: string;
	@Prop()
	profile_background_image_url_https: string;
	@Prop()
	profile_banner_url: string;
	@Prop()
	profile_background_tile: boolean;
	@Prop()
	profile_image_url: string;
	@Prop()
	profile_image_url_https: string;
	@Prop()
	profile_link_color: string;
	@Prop()
	profile_sidebar_border_color: string;
	@Prop()
	profile_sidebar_fill_color: string;
	@Prop()
	profile_text_color: string;
	@Prop()
	profile_use_background_image: boolean;
	@Prop()
	has_extended_profile: boolean;
	@Prop()
	default_profile: boolean;
	@Prop()
	default_profile_image: boolean;
	@Prop()
	pinned_tweet_ids_str: [];
	@Prop()
	has_custom_timelines: boolean;
	@Prop()
	following: string;
	@Prop()
	follow_request_sent: string;
	@Prop()
	notifications: string;
	@Prop()
	advertiser_account_type: string;
	@Prop()
	advertiser_account_service_levels: string;
	@Prop()
	business_profile_state: string;
	@Prop()
	translator_type: string;
	@Prop()
	withheld_in_countries: string;
	@Prop()
	require_some_consent: boolean;
	@Prop()
	created_at: string;
	@Prop()
	created: Date;
	@Prop()
	updated: Date;
}

export type UsersDocument = Users & Document;
export const UsersSchema = SchemaFactory.createForClass(Users);
