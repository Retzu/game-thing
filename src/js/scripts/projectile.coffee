define ['entity'], (Entity) ->
	class Projectile extends Entity
		constructor: (sprite, @speed, startX, startY) ->
			super sprite

			@position.x = startX
			@position.y = startY

		update: (dt) =>
			super dt

			@position.y -= @speed