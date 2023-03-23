from factory.database import Database
from factory.validation import Validator


class Users(object):
	def __init__(self):
		# self.validator = Validator()
		self.db = Database()

		self.collection_name = 'users'

		self.fields = {
			"uid_str": "string",
			"name": "string",
			"screen_name": "string",
			"location": "string",
			"description": "string",
			"entities": "object",
			"followers_count": "int",
			"fast_followers_count": "int",
			"normal_followers_count": "int",
			"friends_count": "int",
			"listed_count": "int",
			"favourites_count": "int",
			"utc_offset": "string",
			"time_zone": "string",
			"geo_enabled": "bool",
			"verified": "bool",
			"statuses_count": "int",
			"media_count": "int",
			"lang": "string",
			"is_translator": "bool",
			"is_translation_enabled": "bool",
			"profile_background_color": "string",
			"profile_background_image_url": "string",
			"profile_background_image_url_https": "string",
			"profile_background_tile": "bool",
			"profile_image_url": "string",
			"profile_image_url_https": "string",
			"profile_link_color": "string",
			"profile_sidebar_border_color": "string",
			"profile_sidebar_fill_color": "string",
			"profile_text_color": "string",
			"profile_use_background_image": "bool",
			"has_extended_profile": "bool",
			"default_profile": "bool",
			"default_profile_image": "bool",
			"pinned_tweet_ids_str": "list",
			"has_custom_timelines": "bool",
			"following": "string",
			"follow_request_sent": "string",
			"notifications": "string",
			"advertiser_account_type": "string",
			"advertiser_account_service_levels": "string",
			"business_profile_state": "string",
			"translator_type": "string",
			"withheld_in_countries": "string",
			"require_some_consent": "bool",
			"created_at": "string",
		}

		self.create_required_fields = [
			"uid_str",
			"name",
			"screen_name",
			"location",
			"description",
			"entities",
			"followers_count",
			"fast_followers_count",
			"normal_followers_count",
			"friends_count",
			"listed_count",
			"favourites_count",
			"utc_offset",
			"time_zone",
			"geo_enabled",
			"verified",
			"statuses_count",
			"media_count",
			"lang",
			"is_translator",
			"is_translation_enabled",
			"profile_background_color",
			"profile_background_image_url",
			"profile_background_image_url_https",
			"profile_background_tile",
			"profile_image_url",
			"profile_image_url_https",
			"profile_link_color",
			"profile_sidebar_border_color",
			"profile_sidebar_fill_color",
			"profile_text_color",
			"profile_use_background_image",
			"has_extended_profile",
			"default_profile",
			"default_profile_image",
			"pinned_tweet_ids_str",
			"has_custom_timelines",
			"following",
			"follow_request_sent",
			"notifications",
			"advertiser_account_type",
			"advertiser_account_service_levels",
			"business_profile_state",
			"translator_type",
			"withheld_in_countries",
			"require_some_consent",
			"created_at"
		]

		# Fields optional for CREATE
		self.create_optional_fields = [

		]

		# Fields required for UPDATE
		self.update_required_fields = [
		]

		# Fields optional for UPDATE
		self.update_optional_fields = [
			"uid_str",
			"name",
			"screen_name",
			"location",
			"description",
			"entities",
			"followers_count",
			"fast_followers_count",
			"normal_followers_count",
			"friends_count",
			"listed_count",
			"favourites_count",
			"utc_offset",
			"time_zone",
			"geo_enabled",
			"verified",
			"statuses_count",
			"media_count",
			"lang",
			"is_translator",
			"is_translation_enabled",
			"profile_background_color",
			"profile_background_image_url",
			"profile_background_image_url_https",
			"profile_background_tile",
			"profile_image_url",
			"profile_image_url_https",
			"profile_link_color",
			"profile_sidebar_border_color",
			"profile_sidebar_fill_color",
			"profile_text_color",
			"profile_use_background_image",
			"has_extended_profile",
			"default_profile",
			"default_profile_image",
			"pinned_tweet_ids_str",
			"has_custom_timelines",
			"following",
			"follow_request_sent",
			"notifications",
			"advertiser_account_type",
			"advertiser_account_service_levels",
			"business_profile_state",
			"translator_type",
			"withheld_in_countries",
			"require_some_consent",
			"created_at"
		]

	def create(self, user):
		# self.validator.validate(user, self.fields, self.create_required_fields, self.create_optional_fields)
		res = self.db.insert(user, self.collection_name)
		return "Inserted Id " + res

	def find(self, user):
		return self.db.find(user, self.collection_name)

	def find_by_id(self, id):
		return self.db.find_by_id(id, self.collection_name)

	def update(self, id, user):
		# self.validator.validate(user, self.fields, self.update_required_fields, self.update_optional_fields)
		return self.db.update(id, user, self.collection_name)

	def delete(self, id):
		return self.db.delete(id, self.collection_name)
