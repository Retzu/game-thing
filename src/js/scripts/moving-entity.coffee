define ['entity'], (Entity) ->
	class MovingEntity extends Entity
		constructor: (@sprite, startX) ->
			super @sprite
			# start out of sight and with a given (random) x coord
			@position.y = -100
			@position.x = startX

		update: (dt) =>
			super dt

			@position.y += OPTIONS.entitySpeed * @speedFactor