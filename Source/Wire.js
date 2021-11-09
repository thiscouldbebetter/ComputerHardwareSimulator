
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
}
