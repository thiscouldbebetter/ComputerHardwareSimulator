
class Connection
{
	constructor(componentName, leadName)
	{
		this.componentName = componentName;
		this.leadName = leadName;
	}

	component()
	{
		return Globals.Instance.universe.layout.componentByName(this.componentName);
	}

	pos()
	{
		var component = this.component();
		var componentDefn = component.defn();
		var leadDefn = componentDefn.leadDefnByName(this.leadName);
		var leadOffset = leadDefn.posWithinComponent;
		var leadSizeHalf = ComponentLeadDefn.SizeStandardHalf();
		var returnValue = component.pos.clone().add
		(
			leadOffset
		).add
		(
			leadSizeHalf
		);
		return returnValue;
	}

	wire()
	{
		return Globals.Instance.universe.layout.wireByName(this.wireName);
	}

	// Serialization.

	static setPrototypesOnObject(objectDeserialized)
	{
		Object.setPrototypeOf(objectDeserialized, Connection.prototype);
	}
}
