
class Layout
{
	constructor(name, components, wires)
	{
		this.name = name;
		this.components = components;
		this.wires = wires;

		this.componentsByName = new Map(this.components.map(x => [x.name, x]));
		this.wiresByName = new Map(this.wires.map(x => [x.name, x]));
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
}
