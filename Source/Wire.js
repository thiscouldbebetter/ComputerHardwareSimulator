
class Wire
{
	constructor(name, pos, connections)
	{
		this.name = name;
		this.pos = pos;
		this.connections = connections;
		this.signalLevel = 0;

		// For eventual clocked logic support.
		this.signalLevelNext = null;
	}

	initialize()
	{
		for (var i = 0; i < this.connections.length; i++)
		{
			var connection = this.connections[i];
			connection.wireName = this.name;
		}
	}

	signalLevelSet(value)
	{
		// For eventual clocked logic support.
		this.signalLevelNext = value;
	}

	update()
	{
		if (this.signalLevelNext != null)
		{
			this.signalLevel = this.signalLevelNext;
		}
	}

	// Serialization.

	static setPrototypesOnObject(objectDeserialized)
	{
		Object.setPrototypeOf(objectDeserialized, Wire.prototype);
		Object.setPrototypeOf(objectDeserialized.pos, Coords.prototype);
		objectDeserialized.connections.forEach
		(
			x => Connection.setPrototypesOnObject(x)
		);
	}

	toObjectSerializable()
	{
		var thisAsObjectSerializable =
		{
			name: this.name,
			pos: this.pos,
			connections: this.connections
		};

		return thisAsObjectSerializable;
	}
}
