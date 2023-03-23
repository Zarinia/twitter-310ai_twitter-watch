import json
import sys
import datetime
from models import tweets, users

inputArgs = sys.argv
tweets = tweets.Tweets()
users = users.Users()

try:
	from pytterrator import Client

	options = []
	# jsonInputArgs = json.loads(inputArgs[1])
	# createUser = jsonInputArgs.get('create', None)
	createUser = True
	client = Client()
	# tweets_list = client.tweets_user(
	# 	str(jsonInputArgs['username']),
	# 	since_id=jsonInputArgs.get('sinceId', None),
	# 	max_id=jsonInputArgs.get('maxId', None),
	# 	count=1,
	# 	exclude_replies=jsonInputArgs.get('excludeReplies', False),
	# 	include_rts=jsonInputArgs.get('includeRts', True),
	# )
	tweets_list = client.tweets_user(
		'elonmusk',
		since_id=None,
		max_id=None,
		count=1,
	)
	if 'errors' not in tweets_list:
		for i, tweet in enumerate(tweets_list):
			user_db = users.find({"uid_str": tweet['user']['id_str']})
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
			if user_db:
				users.update(user_db[0]['_id'], user_details)
			else:
				if createUser:
					users.create(user_details)
		# else:
		# 	print(json.dumps({'errors': [{'code': 87, 'message': 'Client is not permitted to perform this action'}]}))
		print(json.dumps({'message': 'insert successfully'}))
	else:
		print(json.dumps({'errors': [{'code': 50, 'message': 'User not found'}]}))
except:
	print(json.dumps({'errors': [{'code': 503, 'message': 'Twitter service is unavailable'}]}))
