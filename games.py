# -*- coding: utf-8 -*-

import os
import urllib

from google.appengine.ext import db

import jinja2
import webapp2

JINJA_ENVIRONMENT = jinja2.Environment(
	loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates/')),
	extensions=['jinja2.ext.autoescape'],
	autoescape=True)

class Game(db.Model):
	id = db.StringProperty()
	title = db.StringProperty()
	description = db.TextProperty()
	embedCode = db.TextProperty()
	releaseDate = db.StringProperty()
	version = db.StringProperty()
	status = db.StringProperty()
	credits = db.TextProperty()
	changelog = db.TextProperty()

class GamePage(webapp2.RequestHandler):
	def get(self, id):
		if id[-11:] == '/index.html':
			id = id[:-11]
		
		gameInfo = Game.gql('WHERE id = :1', id).get()
		
		templateVars = {'id':id}
		for var in ['title','description','embedCode','releaseDate','version','status','credits','changelog']:
			if getattr(gameInfo, var, None) != None:
				templateVars[var] = getattr(gameInfo, var, None)
		
		template = JINJA_ENVIRONMENT.get_template('head.html')
		self.response.write(template.render(templateVars))
		if gameInfo != None:
			template = JINJA_ENVIRONMENT.get_template('game.html')
			self.response.write(template.render(templateVars))
		else:
			template = JINJA_ENVIRONMENT.get_template('404.html')
			self.response.write(template.render(templateVars))
		template = JINJA_ENVIRONMENT.get_template('footer.html')
		self.response.write(template.render({}))

class GamesList(webapp2.RequestHandler):
	def get(self):
		templateVars = {'title':'Productions','description':'Games and other productions by Inverted Productions'}
		
		template = JINJA_ENVIRONMENT.get_template('head.html')
		self.response.write(template.render(templateVars))
		template = JINJA_ENVIRONMENT.get_template('productions.html')
		self.response.write(template.render({}))
		template = JINJA_ENVIRONMENT.get_template('footer.html')
		self.response.write(template.render({}))

site = webapp2.WSGIApplication([
	('/games/(..*)', GamePage),
	('/games/?', GamesList)
])
