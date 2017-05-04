# -*- coding: utf-8 -*-

import games

import os

from google.appengine.api import users

import jinja2
import webapp2

JINJA_ENVIRONMENT = jinja2.Environment(
	loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates/')),
	extensions=['jinja2.ext.autoescape'],
	autoescape=True)

class ReloadGameData(webapp2.RequestHandler):
	def get(self):
		user = users.get_current_user()
		if user:
			if users.is_current_user_admin():
				gameData = [
					{
						'id':'fastgame',
						'title':'The Fast Game',
						'description':'A fast-paced tile game.',
						'embedCode':'<embed src=\"/public/game_files/fastgame/fastgame.swf\" height=\"440\" width=\"440\" />',
						'releaseDate':'TBD',
						'version':'1.0',
						'status':'Work-in-progress',
						'credits':'Created and programmed by <a href=\"/people#jfranzen\">Jack Franzen</a><br />Graphics by <a href=\"/people#jfranzen\">Jack Franzen</a> (with a few sprites from <a href=\"/people#deliasen\">Derek Eliasen</a>)'
					},
					{
						'id':'icr',
						'title':'Inverse Cube Runner',
						'description':'The idea for <i>Inverse Cube Runner</i> came from playing <i>Cube Runner</i> and wondering how it would work as a competitive multiplayer game.  Now you can control the ship or the cubes.',
						'embedCode':'<applet code=\"/public/game_files/icr/Game.class\" width=\"600\" height=\"550\">You must have the latest version of Java installed to play this game.</applet>',
						'releaseDate':'February 15<sup>th</sup>, 2010',
						'version':'5.1',
						'status':'&ldquo;Complete&rdquo;',
						'credits':'Created and programmed by <a href=\"/people#zyaro\">Zachary Yaro</a>',
						'changelog':'''
							<ul>
								<li>
									(5.1) Made the line for placing cubes in inverted/2 player mode more fair to the flyer
								</li>
								<li>
									(5.1) Fixed flyer being drawn off-center
								</li>
								<li>
									(5.1) Fixed hitboxes not resizing when the game is not displayed in 800&times;600
								</li>
								<li>
									(5.0) Made debug mode option available in the public version of the game
								</li>
								<li>
									(5.0) Made improvements to scaling so it can be displayed on screens with lower resolution (or for people with too many toolbars :P).
								</li>
								<li>
									Inverse Cube Runner released!
								</li>
								<li>
									(Dev) Fixed minor debug mode display glitch.
								</li>
								<li>
									(Dev) Added more music ("Star Fox: Space Armada") and edited the in-game versions of the background music so they loop better and have smaller file sizes.  Also changed the way the game accesses the sound files.
								</li>
								<li>
									(Dev) Added more debug information.
								</li>
								<li>
									Fixed collision detection glitches with variable cube size.
								</li>
								<li>
									Modified program to work with different applet heights without much change in difficulty.
								</li>
								<li>
									Fixed two-player cube movement glitch.
								</li>
								<li>
									Changed movement so cubes move, not the player.
								</li>
								<li>
									Added shadow under flyer.
								</li>
								<li>
									(Dev) Changed "In-Game Speed Change" to "Debug Mode" and added debug mode features to make life easier for me.
								</li>
								<li>
									Added the "God Mode" option (and on/off buttons).
								</li>
								<li>
									Removed Inverted Productions logo from the title screen because of problems with the animation.
								</li>
								<li>
									Added the Inverted Productions logo to the title screen.
								</li>
								<li>
									(Dev) Added the "1-Player, Inverted" game mode button.  Game mode does not exist and button does not do anything.
								</li>
								<li>
									(Dev) Added "In-Game Speed Control" on/off buttons to title screen.
								</li>
								<li>
									Randomizing of cube placement improved.
								</li>
								<li>
									Added buttons to title screen to control speed of cubes and game type (number of players, for now)
								</li>
								<li>
									(Dev) Added buttons to title screen to control music.
								</li>
								<li>
									(Dev) Added background music.
								</li>
								<li>
									Added support for ASDW.
								</li>
								<li>
									Fixed death graphic.
								</li>
							</ul>
						'''
					},
					{
						'id':'icrplus',
						'title':'Inverse Cube Runner Plus',
						'description':'',
						'embedCode':'<iframe src=\"/public/game_files/icrplus/icr.html\" style=\"width:640px;height:480px;\">Please switch to a browser that supports iframes.</iframe>',
						'releaseDate':'Not yet',
						'version':'0.6 beta',
						'status':'Work-in-progress',
						'credits':'Created and programmed by <a href=\"/people#zyaro\">Zachary Yaro</a>'
					},
					{
						'id':'imd',
						'title':'Inverse Missile Defense',
						'description':'<i>Inverse Missile Defense</i> is like classic missile defense games, but now you must destroy the cities you used to defend.',
						'embedCode':'<embed src=\"/public/game_files/imd/inv_missile_def.swf\" height=\"540\" width=\"960\" wmode=\"tranparent\" />',
						'releaseDate':'January 31<sup>th</sup>, 2011',
						'version':'1.1 beta',
						'status':'Work-in-progress',
						'credits':'Created by Josh Nyden<br />Programmed by <a href=\"/people#zyaro\">Zachary Yaro</a><br />Graphics by Josh Nyden and <a href=\"/people#zyaro\">Zachary Yaro</a>',
						'changelog':'''
							1.1
							- more realistic missile physics
							- instructions built into game
							- tweaked missile accelerations and initial velocities
							- fixed missile spawn positions
							- fixed infinite star glitch
							
							1.0
							- first release
						'''
					},
					{
						'id':'lagrange',
						'title':'Lagrange',
						'description':'',
						'embedCode':'<applet code=\"/public/game_files/lagrange/Lagrange.class\" width=\"550\" height=\"500\">You must have the latest version of Java installed to play this game.</applet>',
						'releaseDate':'TBD',
						'version':'1.2 alpha',
						'status':'Work-in-progress',
						'credits':'Created and programmed by <a href=\"/people#jfoxcanning\">Jamie Fox-Canning</a><br />Graphics by <a href=\"/people#jfoxcanning\">Jamie Fox-Canning</a>',
					},
					{
						'id':'ltd',
						'title':'Legitimate Tower Defense',
						'description':'Our only &ldquo;complete&rdquo; game, Legitimate Tower Defense, a monument to everything but legitimate code, stands as a sellout game with outrageous amounts of advertising, lag, and fun!',
						'embedCode':'<embed src=\"/public/game_files/ltd/ltd.swf\" height=\"660px\" width=\"480px\" wmode=\"tranparent\" />',
						'releaseDate':'April 16<sup>th</sup>, 2009',
						'version':'2.3',
						'status':'&ldquo;Complete&rdquo;',
						'credits':'Created by <a href=\"/people#jfranzen\">Jack Franzen</a><br />Programmed by James Bradbury and <a href=\"/people#jfranzen\">Jack Franzen</a><br />Graphics by <a href=\"/people#jfranzen\">Jack Franzen</a> and <a href=\"/people#zyaro\">Zachary Yaro</a> (with a few sprites from <a href=\"/people#deliasen\">Derek Eliasen</a> and <a href=\"/people#jrenner\">John Renner</a>)'
					},
					{
						'id':'smtr',
						'title':'StickMan: The Reckoning',
						'description':'<i>StickMan: The Reckining</i> is a nice little game that is similar to <i>Stick Arena</i> and <i>Stick RPG</i>.  Eventually there will be online battles and a story mode.  For now, just have fun shooting!',
						'embedCode':'<embed src=\"/public/game_files/smtr/smtr.swf\" height=\"600px\" width=\"600px\" />',
						'releaseDate':'TBD',
						'version':'Pre-alpha',
						'status':'Shelved',
						'credits':'Created by <a href=\"/people#jfranzen\">Jack Franzen</a><br />Programmed by James Bradbury and <a href=\"/people#jfranzen\">Jack Franzen</a><br />Graphics by <a href=\"/people#deliasen\">Derek Eliasen</a>, <a href=\"/people#jfranzen\">Jack Franzen</a>, and <a href=\"/people#zyaro\">Zachary Yaro</a>',
					},
					{
						'id':'tpg',
						'title':'The Two-Player Game',
						'description':'<i>The Two-Player Game</i> is a set of minigames designed for two players.  You can choose from categories like survival, player-vs.-player, and point games.  You and another player then compete in several games until a winner is decided.  Games will be added/updated over time.',
						'embedCode':'<embed src=\"/public/game_files/tpg/tpg.swf\" width=\"550px\" height=\"400px\" />',
						'releaseDate':'TBD',
						'version':'Low effort demo',
						'status':'Shelved',
						'credits':'Created by <a href=\"/people#jfranzen\">Jack Franzen</a><br />Minigame design by <!--<a href=\"/people#deliasen\">Derek Eliasen</a>, --><a href=\"/people#jfranzen\">Jack Franzen</a><!--, John Renner, and Zachary Yaro -->',
					}
				]
				
				for game in gameData:
					gameEntry = games.Game.gql('WHERE id = :1', game['id']).get()
					if not gameEntry:
						gameEntry = games.Game()
						gameEntry.id = game['id']
					for var in game:
						setattr(gameEntry, var, game[var])
					gameEntry.put()
				
				template = JINJA_ENVIRONMENT.get_template('head.html')
				self.response.write(template.render({'title':'Admin'}))
				self.response.write('</head><body><div id=\"main\">Game data re-loaded.</div></body></html>')
				#template = JINJA_ENVIRONMENT.get_template('footer.html')
				#self.response.write(template.render(path, {}))
			else:
				self.redirect('/')
		else:
			self.redirect(users.create_login_url(self.request.uri))

class NotFoundPage(webapp2.RequestHandler):
	def get(self):
		templateVars = {'title':'Not Found'}
		
		template = JINJA_ENVIRONMENT.get_template('head.html')
		self.response.write(template.render(templateVars))
		template = JINJA_ENVIRONMENT.get_template('404.html')
		self.response.write(template.render({}))
		template = JINJA_ENVIRONMENT.get_template('footer.html')
		self.response.write(template.render({}))
		
		self.response.set_status(404)

site = webapp2.WSGIApplication([
	('/admin/reloadgamedata', ReloadGameData),
	('/admin/.*', NotFoundPage)
])
