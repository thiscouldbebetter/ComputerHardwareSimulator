
class Component
{
	constructor(name, defnName, pos)
	{
		this.name = name;
		this.defnName = defnName;
		this.pos = pos;

		this.connections = [];
	}

	lead(leadName)
	{
		var returnValue;

		var connection =
			this.connectionsByLeadName.get(leadName);
		if (connection != null)
		{
			returnValue = connection.wire();
		}
		else
		{
			returnValue = new Wire();
		}

		return returnValue;
	}

	defn()
	{
		return Globals.Instance.universe.componentDefnByName(this.defnName);
	}

	update(layout)
	{
		this.defn().update(layout, this);
	}

	// Serializable.

	static setPrototypesOnObject(objectDeserialized)
	{
		Object.setPrototypeOf(objectDeserialized, Component.prototype);
		Object.setPrototypeOf(objectDeserialized.pos, Coords.prototype);
		objectDeserialized.connections = [];
	}

	toObjectSerializable()
	{
		var thisAsObjectSerializable =
		{
			name: this.name,
			defnName: this.defnName,
			pos: this.pos
		};

		return thisAsObjectSerializable;
	}
}
