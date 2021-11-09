
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
		return Globals.Instance.universe.componentDefnsByName.get(this.defnName);
	}

	update(layout)
	{
		this.defn().update(layout, this);
	}
}
