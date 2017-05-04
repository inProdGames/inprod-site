# -*- coding: utf-8 -*-

import os

import jinja2
import webapp2

from random import shuffle

from games import Game

JINJA_ENVIRONMENT = jinja2.Environment(
	loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates/')),
	extensions=['jinja2.ext.autoescape'],
	autoescape=True)

class HomePage(webapp2.RequestHandler):
	def get(self):
		templateVars = {'description':'The homepage of Inverted Productions, featuring video games that offer a completely new gaming experience or a new perspective on existing games or game styles.'}
		
		template = JINJA_ENVIRONMENT.get_template('head.html')
		self.response.write(template.render(templateVars))
		template = JINJA_ENVIRONMENT.get_template('home.html')
		self.response.write(template.render({}))
		template = JINJA_ENVIRONMENT.get_template('footer.html')
		self.response.write(template.render({}))

class NewsPage(webapp2.RequestHandler):
	def get(self):
		templateVars = {'title':'News','description':'The latest news at Inverted Productions'}
		
		template = JINJA_ENVIRONMENT.get_template('head.html')
		self.response.write(template.render(templateVars))
		template = JINJA_ENVIRONMENT.get_template('news.html')
		self.response.write(template.render({}))
		template = JINJA_ENVIRONMENT.get_template('footer.html')
		self.response.write(template.render({}))

class PeoplePage(webapp2.RequestHandler):
	def get(self):
		templateVars = {'title':'People','description':'The people who work on our inverted productions'}
		
		template = JINJA_ENVIRONMENT.get_template('head.html')
		self.response.write(template.render(templateVars))
		template = JINJA_ENVIRONMENT.get_template('people.html')
		self.response.write(template.render({}))
		template = JINJA_ENVIRONMENT.get_template('footer.html')
		self.response.write(template.render({}))

class NotFoundPage(webapp2.RequestHandler):
	def get(self):
		templateVars = {'title':'Error 404'}
		
		games = Game.gql('').fetch(8)
		shuffle(games)
		
		template = JINJA_ENVIRONMENT.get_template('head.html')
		self.response.write(template.render(templateVars))
		template = JINJA_ENVIRONMENT.get_template('404.html')
		self.response.write(template.render({'game':games[0]}))
		template = JINJA_ENVIRONMENT.get_template('footer.html')
		self.response.write(template.render({}))
		
		self.response.set_status(404)

site = webapp2.WSGIApplication([
	('/', HomePage),
	('/news', NewsPage),
	('/people', PeoplePage),
	('/.*', NotFoundPage)
])
