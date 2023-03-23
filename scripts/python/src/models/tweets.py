from factory.database import Database
from factory.validation import Validator


class Tweets(object):
	def __init__(self):
		# self.validator = Validator()
		self.db = Database()

		self.collection_name = 'tweets'

		self.fields = {
			"id_str": "string",
			"uid_str": "string",
			"text": "string",
			"truncated": " bool",
			"entities": "object",
			"source": "string",
			"in_reply_to_status_id_str": "string",
			"in_reply_to_user_id_str": "string",
			"in_reply_to_screen_name": "string",
			"geo": "string",
			"coordinates": "string",
			"place": "string",
			"contributors": "string",
			"is_quote_status": "bool",
			"retweet_count": "int",
			"favorite_count": "int",
			"conversation_id_str": "string",
			"favorited": "string",
			"retweeted": "string",
			"lang": "string",
			"supplemental_language": "string",
			"user": "object",
			"created_at": "string",
			"created": "datetime",
			"updated": "datetime"
		}

		self.create_required_fields = [
			"id_str",
			"uid_str",
			"text",
			"truncated",
			"entities",
			"source",
			"in_reply_to_status_id_str",
			"in_reply_to_user_id_str",
			"in_reply_to_screen_name",
			"geo",
			"coordinates",
			"place",
			"contributors",
			"is_quote_status",
			"retweet_count",
			"favorite_count",
			"conversation_id_str",
			"favorited",
			"retweeted",
			"lang",
			"supplemental_language",
			"user",
			"created_at"
		]

		# Fields optional for CREATE
		self.create_optional_fields = []

		# Fields required for UPDATE
		self.update_required_fields = [
		]

		# Fields optional for UPDATE
		self.update_optional_fields = [
			"id_str",
			"uid_str",
			"text",
			"truncated",
			"entities",
			"source",
			"in_reply_to_status_id_str",
			"in_reply_to_user_id_str",
			"in_reply_to_screen_name",
			"geo",
			"coordinates",
			"place",
			"contributors",
			"is_quote_status",
			"retweet_count",
			"favorite_count",
			"conversation_id_str",
			"favorited",
			"retweeted",
			"lang",
			"supplemental_language",
			"user",
			"created_at"
		]

	def create(self, tweet):
		# self.validator.validate(tweet, self.fields, self.create_required_fields, self.create_optional_fields)
		res = self.db.insert(tweet, self.collection_name)
		return "Inserted Id " + res

	def find(self, tweet):
		return self.db.find(tweet, self.collection_name)

	def find_by_id(self, id):
		return self.db.find_by_id(id, self.collection_name)

	def update(self, id, tweet):
		# self.validator.validate(tweet, self.fields, self.update_required_fields, self.update_optional_fields)
		return self.db.update(id, tweet, self.collection_name)

	def delete(self, id):
		return self.db.delete(id, self.collection_name)
