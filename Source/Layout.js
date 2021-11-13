
class Layout
{
	constructor(name, components, wires)
	{
		this.name = name;
		this.components = components;
		this.wires = wires;
	}

	initialize()
	{
		for (var i = 0; i < this.wires.length; i++)
		{
			var wire = this.wires[i];
			wire.initialize();

			var connections = wire.connections;
			for (var c = 0; c < connections.length; c++)
			{
				var connection = connections[c];
				var connectionComponent = connection.component();
				connectionComponent.connections.push(connection);
			}
		}

		for (var i = 0; i < this.components.length; i++)
		{
			var component = this.components[i];
			var connections = component.connections;
			component.connectionsByLeadName =
				new Map(connections.map(x => [x.leadName, x]));
		}
	}

	update()
	{
		for (var i = 0; i < this.components.length; i++)
		{
			var component = this.components[i];
			component.update(this);
		}

		for (var i = 0; i < this.wires.length; i++)
		{
			var wire = this.wires[i];
			wire.update();
		}
	}

	// Lookups.

	componentByName(componentName)
	{
		return this.componentsByName().get(componentName);
	}

	componentsByName()
	{
		if (this._componentsByName == null)
		{
			this._componentsByName =
				new Map(this.components.map(x => [x.name, x]));
		}
		return this._componentsByName;
	}

	wireByName(wireName)
	{
		return this.wiresByName().get(wireName);
	}

	wiresByName()
	{
		if (this._wiresByName == null)
		{
			this._wiresByName =
				new Map(this.wires.map(x => [x.name, x]));
		}
		return this._wiresByName;
	}

	// Serialization.

	static setPrototypesOnObject(objectDeserialized)
	{
		Object.setPrototypeOf(objectDeserialized, Layout.prototype);

		objectDeserialized.components.forEach
		(
			x => Component.setPrototypesOnObject(x)
		);

		objectDeserialized.wires.forEach
		(
			x => Wire.setPrototypesOnObject(x)
		);
	}

	toObjectSerializable()
	{
		var thisAsObjectSerializable =
		{
			name: this.name,
			components: this.components.map(x => x.toObjectSerializable()),
			wires: this.wires.map(x => x.toObjectSerializable())
		};

		return thisAsObjectSerializable;
	}
}
