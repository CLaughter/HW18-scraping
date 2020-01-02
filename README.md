# All the News That's Fit to Scrape

### This is a webscraper app built from scratch. It will store the scraped data using MongoDB. The backend is written in Javascript running on NodeJS. Several libraries are used on the backend including Express, Axios, and Cheerio. Bootstrap is used for styling the front-end and JQuery sends requests to the backend. Finally, the app is deployed on Heroku with mLab (remote MongoDB database that Heroku supports natively).

### Whenever a user visits your site, the app will scrape news articles from a news outlet and displays the following information for each article:

    * Headline - the title of the article

    * Summary - a short summary of the article

    * URL - the url to the original article

### Users can also leave comments on the articles displayed and revisit them later. The comments are saved to the database as well.. Users can delete comments left on articles. All stored comments are visible to every user.
