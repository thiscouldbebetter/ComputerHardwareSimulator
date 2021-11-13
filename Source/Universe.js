
class Universe
{
	constructor(name, componentDefns, layout)
	{
		this.name = name;
		this.componentDefns = componentDefns;
		this.layout = layout;
	}

	// instance methods

	initialize()
	{
		this.layout.initialize();
	}

	update()
	{
		this.layout.update();
		Globals.Instance.displayHelper.drawLayout(this.layout);
	}

	// Lookups.

	componentDefnByName(componentDefnName)
	{
		return this.componentDefnsByName().get(componentDefnName);
	}

	componentDefnsByName()
	{
		if (this._componentDefnsByName == null)
		{
			this._componentDefnsByName =
				new Map(this.componentDefns.map(x => [x.name, x]));
		}
		return this._componentDefnsByName;
	}

	// Serialization.

	static setPrototypesOnObject(objectDeserialized)
	{
		Object.setPrototypeOf(objectDeserialized, Universe.prototype);

		objectDeserialized.componentDefns.forEach
		(
			x => ComponentDefn.setPrototypesOnObject(x)
		);

		Layout.setPrototypesOnObject(objectDeserialized.layout);

		return objectDeserialized;
	}

	toObjectSerializable()
	{
		var thisAsObject =
		{
			name: this.name,
			componentDefns: this.componentDefns.map(x => x.toObjectSerializable()),
			layout: this.layout.toObjectSerializable()
		};

		return thisAsObject;
	}
}
