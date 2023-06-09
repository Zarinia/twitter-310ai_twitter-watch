# Twitter Watch
(Nest + python + mongo) with Docker compose

## Description
Track the tweets of users and extract them to MongoDB database.

## Getting started
### Prerequisites
- Docker
- Docker Compose
- pip
- python
- Nodejs
- Nestjs
- MongoDB

#### Tip!
Everything is configured in the docker-compose file.
Docker file for build nodejs and compose for pull mongodb database and run backend.

## How to install:
1. Clone project from GitHub
2. Run docker compose up -d

For manually install:
1. Clone project from GitHub
2. Run yarn install
3. From scripts/python run pip3 install -r requirements.txt
4. Run npm build OR npm run start

## How it works:
The app works in multiply phases:
1. Add user to database.
2. Fetch user data from twitter server and save to DB.
3. Fetch user tweets and save to DB.
4. Display as REST api and Web View.
5. Display Retweet, Favorites, Reply, ...
6. Display the device used to send the tweet.
7. Display User Following and Followers, Status, Media, List, Request & etc.

**API Endpoints:**
- Make a REST API with the following endpoints:
  - users endpoints:
    - /users [GET] return all users list
    - /users/name/:username [GET] return data for specific user with username
    - /users/fetch/:username [GET] get all user data from twitter server
    - /users/:username [POST] fetch user from twitter and insert user into database
    - /users/:username [PATCH] Update user
    - /users/:username [DELETE] Delete user
  - tweets endpoints:
    - /tweets [GET] return all tweets saved in database.
    - /tweets/user/:username [GET] return all tweets by username
    - /tweets/fetch/ [GET] Fetch tweets by username from tweeter
    - /tweets/:tweet [PATCH] Update tweet (feature)
    - /tweets/:tweet [DELETE] Delete tweet (feature)
  - web endpoints:
    - /web [GET] return web view for users and tweets. 
**Postman File:**

From postman directory you can import postman exported file into your app.

When run /users/fetch/:username endpoint, system get all data from twitter server by run python file from scripts directory and scrape data, then save data into database if option create is set. 

Screenshot from web view of users:
  - all users:
  ![alt text](https://github.com/Zarinia/twitter-310ai/blob/main/screenshot/allusers.png)
  - elonmusk:
    ![alt text](https://github.com/Zarinia/twitter-310ai/blob/main/screenshot/elonmusk.png)
  - BarackObama
    ![alt text](https://github.com/Zarinia/twitter-310ai/blob/main/screenshot/BarackObama.png)
  - cathiedwood
    ![alt text](https://github.com/Zarinia/twitter-310ai/blob/main/screenshot/cathiedwood.png)


**User Data from twitter server contains:**
  - id_str
  - name
  - screen_name
  - location
  - description
  - entities;
  - followers_count
  - protected
  - fast_followers_count
  - normal_followers_count
  - friends_count
  - listed_count
  - favourites_count
  - utc_offset
  - time_zone
  - geo_enabled
  - verified
  - statuses_count
  - media_count
  - lang
  - url
  - contributors_enabled
  - is_translator
  - is_translation_enabled
  - profile_background_color
  - profile_background_image_url
  - profile_background_image_url_https
  - profile_banner_url
  - profile_background_tile
  - profile_image_url
  - profile_image_url_https
  - profile_link_color
  - profile_sidebar_border_color
  - profile_sidebar_fill_color
  - profile_text_color
  - profile_use_background_image
  - has_extended_profile
  - default_profile
  - default_profile_image
  - pinned_tweet_ids_str;
  - has_custom_timelines
  - following
  - follow_request_sent
  - notifications
  - advertiser_account_type
  - advertiser_account_service_levels
  - business_profile_state
  - translator_type
  - withheld_in_countries
  - require_some_consent
  - created_at

**Tweets Data from Twitter server contains:**
  - id_str
  - text
  - truncated
  - entities;
  - source
  - in_reply_to_status_id_str
  - in_reply_to_user_id_str
  - in_reply_to_screen_name
  - geo
  - coordinates
  - place
  - contributors
  - is_quote_status
  - retweet_count
  - favorite_count
  - conversation_id_str
  - favorited
  - retweeted
  - lang
  - supplemental_language
  - user
  - created_at
