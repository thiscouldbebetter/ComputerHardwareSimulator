
class ComponentLeadDefn
{
	constructor(name, posWithinComponent)
	{
		this.name = name;
		this.posWithinComponent = posWithinComponent;
	}

	static SizeStandard() { return new Coords(20, 10); }
	static SizeStandardHalf() { return new Coords(10, 5); }

	// Serialization.

	static setPrototypesOnObject(objectDeserialized)
	{
		Object.setPrototypeOf(objectDeserialized, ComponentLeadDefn.prototype);
		Object.setPrototypeOf(objectDeserialized.posWithinComponent, Coords.prototype);
	}
}
