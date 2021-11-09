
class Connection
{
	constructor(componentName, leadName)
	{
		this.componentName = componentName;
		this.leadName = leadName;
	}

	component()
	{
		return Globals.Instance.universe.layout.componentsByName.get(this.componentName);
	}

	pos()
	{
		var component = this.component();
		var componentDefn = component.defn();
		var leadDefn = componentDefn.leadDefnsByName.get(this.leadName);
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
		return Globals.Instance.universe.layout.wiresByName.get(this.wireName);
	}
}
