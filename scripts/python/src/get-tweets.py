import json

import sys
import datetime
from models import tweets, users

inputArgs = sys.argv
tweets = tweets.Tweets()
users = users.Users()

try:
	from pytterrator import Client

	client = Client()
	options = []
	jsonInputArgs = json.loads(inputArgs[1])

	tweets_list = client.tweets_user(
		str(jsonInputArgs['username']),
		since_id=jsonInputArgs.get('sinceId', None),
		max_id=jsonInputArgs.get('maxId', None),
		count=jsonInputArgs.get('count', 1),
		exclude_replies=jsonInputArgs.get('excludeReplies', False),
		include_rts=jsonInputArgs.get('includeRts', True),
	)
	# tweets_list = client.tweets_user(
	# 	'cathiedwood',
	# 	since_id=None,
	# 	max_id=None,
	# 	count=1,
	# )
	if len(tweets_list) > 1:
		tweets_list.sort(key=lambda x: x['id'], reverse=True)
	if 'errors' not in tweets_list:
		for i, tweet in enumerate(tweets_list):
			tweet_db = tweets.find({"tid_str": tweet['id_str']})
			user_db = users.find({"uid_str": tweet['user']['id_str']})
			tweet_details = {
				"tid_str": tweet['id_str'],
				"uid_str": tweet['user']['id_str'],
				"text": tweet['text'],
				"truncated": tweet['truncated'],
				"entities": tweet['entities'],
				"source": tweet['source'],
				"in_reply_to_status_id_str": tweet['in_reply_to_status_id_str'],
				"in_reply_to_user_id_str": tweet['in_reply_to_user_id_str'],
				"in_reply_to_screen_name": tweet['in_reply_to_screen_name'],
				"geo": tweet['geo'],
				"coordinates": tweet['coordinates'],
				"place": tweet['place'],
				"contributors": tweet['contributors'],
				"is_quote_status": tweet['is_quote_status'],
				"retweet_count": tweet['retweet_count'],
				"favorite_count": tweet['favorite_count'],
				"conversation_id_str": tweet['conversation_id_str'],
				"favorited": tweet['favorited'],
				"retweeted": tweet['retweeted'],
				"lang": tweet['lang'],
				"supplemental_language": tweet['supplemental_language'],
				"created_at": tweet['created_at'],
				"user": tweet['user'],
			}
			user_details = {
				"uid_str": tweet['user']['id_str'],
				"name": tweet['user']['name'],
				"screen_name": tweet['user']['screen_name'],
				"location": tweet['user']['location'],
				"description": tweet['user']['description'],
				"entities": tweet['user']['entities'],
				"protected": tweet['user']['protected'],
				"followers_count": tweet['user']['followers_count'],
				"fast_followers_count": tweet['user']['fast_followers_count'],
				"normal_followers_count": tweet['user']['normal_followers_count'],
				"friends_count": tweet['user']['friends_count'],
				"listed_count": tweet['user']['listed_count'],
				"favourites_count": tweet['user']['favourites_count'],
				"utc_offset": tweet['user']['utc_offset'],
				"time_zone": tweet['user']['time_zone'],
				"geo_enabled": tweet['user']['geo_enabled'],
				"verified": tweet['user']['verified'],
				"statuses_count": tweet['user']['statuses_count'],
				"media_count": tweet['user']['media_count'],
				"lang": tweet['user']['lang'],
				"url": tweet['user']['url'],
				"contributors_enabled": tweet['user']['contributors_enabled'],
				"is_translator": tweet['user']['is_translator'],
				"is_translation_enabled": tweet['user']['is_translation_enabled'],
				"profile_background_color": tweet['user']['profile_background_color'],
				"profile_background_image_url": tweet['user']['profile_background_image_url'],
				"profile_background_image_url_https": tweet['user']['profile_background_image_url_https'],
				"profile_background_tile": tweet['user']['profile_background_tile'],
				"profile_image_url": tweet['user']['profile_image_url'],
				"profile_image_url_https": tweet['user']['profile_image_url_https'],
				"profile_banner_url": tweet['user']['profile_banner_url'],
				"profile_link_color": tweet['user']['profile_link_color'],
				"profile_sidebar_border_color": tweet['user']['profile_sidebar_border_color'],
				"profile_sidebar_fill_color": tweet['user']['profile_sidebar_fill_color'],
				"profile_text_color": tweet['user']['profile_text_color'],
				"profile_use_background_image": tweet['user']['profile_use_background_image'],
				"has_extended_profile": tweet['user']['has_extended_profile'],
				"default_profile": tweet['user']['default_profile'],
				"default_profile_image": tweet['user']['default_profile_image'],
				"pinned_tweet_ids_str": tweet['user']['pinned_tweet_ids_str'],
				"has_custom_timelines": tweet['user']['has_custom_timelines'],
				"following": tweet['user']['following'],
				"follow_request_sent": tweet['user']['follow_request_sent'],
				"notifications": tweet['user']['notifications'],
				"advertiser_account_type": tweet['user']['advertiser_account_type'],
				"advertiser_account_service_levels": tweet['user']['advertiser_account_service_levels'],
				"business_profile_state": tweet['user']['business_profile_state'],
				"translator_type": tweet['user']['translator_type'],
				"withheld_in_countries": tweet['user']['withheld_in_countries'],
				"require_some_consent": tweet['user']['require_some_consent'],
				"created_at": tweet['user']['created_at'],
			}
			if tweet_db:
				tweets.update(tweet_db[0]['_id'], tweet_details)
			else:
				tweets.create(tweet_details)
			if user_db:
				users.update(user_db[0]['_id'], user_details)
			else:
				users.create(user_details)
		print(json.dumps(tweets_list))
except:
	print(json.dumps({'errors': [{'code': 503, 'message': 'Twitter service is unavailable'}]}))
