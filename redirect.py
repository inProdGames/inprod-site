# -*- coding: utf-8 -*-

import os
import re

import jinja2
import webapp2

from main import NotFoundPage

class DropIndexRedirect(webapp2.RequestHandler):
	def get(self, url):
		if url[-1] == '/':
			url = url[:-1]
		self.response.set_status(301)
		self.redirect(url)

class DropExtRedirect(webapp2.RequestHandler):
	def get(self, url):
		self.response.set_status(301)
		self.redirect(url)

class RSSRedirect(webapp2.RequestHandler):
	def get(self):
		self.response.set_status(301)
		self.redirect('/public/rss.xml')

site = webapp2.WSGIApplication([
	('/rss.xml', RSSRedirect),
	('(/.*)index.html', DropIndexRedirect),
	('(/[^/]*)\.html', DropExtRedirect),
	('/.*', NotFoundPage)
])
