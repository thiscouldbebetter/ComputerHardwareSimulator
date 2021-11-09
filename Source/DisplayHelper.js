
class DisplayHelper
{
	// constants

	static ColorBack = "White";
	static ColorFore = "Gray";

	// methods

	clear()
	{
		this.graphics.fillStyle = DisplayHelper.ColorBack;
		this.graphics.fillRect
		(
			0, 0,
			this.viewSizeInPixels.x,
			this.viewSizeInPixels.y
		);

		this.graphics.strokeStyle = DisplayHelper.ColorFore;
		this.graphics.strokeRect
		(
			0, 0,
			this.viewSizeInPixels.x,
			this.viewSizeInPixels.y
		);

		this.graphics.fillStyle = DisplayHelper.ColorFore;
	}

	drawComponent(component)
	{
		var defn = component.defn();

		var pos = component.pos;

		var size = defn.size;

		this.graphics.strokeRect
		(
			pos.x, pos.y, size.x, size.y
		);

		var leadDefns = defn.leadDefns;
		for (var i = 0; i < leadDefns.length; i++)
		{
			var leadDefn = leadDefns[i];
			this.drawLead(leadDefn, pos);
		}

		var name = defn.name + ":" + component.name;

		this.graphics.fillText
		(
			name,
			pos.x, pos.y
		);

		if (defn.draw != null)
		{
			defn.draw(this, component);
		}
	}

	drawLead(leadDefn, componentPos)
	{
		var drawPos = componentPos.clone().add
		(
			leadDefn.posWithinComponent
		);

		var size = ComponentLeadDefn.SizeStandard();

		this.graphics.strokeRect
		(
			drawPos.x, drawPos.y,
			size.x, size.y
		);

		this.graphics.fillText
		(
			leadDefn.name,
			drawPos.x, drawPos.y + size.y
		);

	}

	drawLayout(layout)
	{
		this.clear();

		var components = layout.components;
		for (var i = 0; i < components.length; i++)
		{
			var component = components[i];
			this.drawComponent(component);
		}

		var wires = layout.wires;
		for (var i = 0; i < wires.length; i++)
		{
			var wire = wires[i];
			this.drawWire(wire);
		}
	}

	drawLine(startPos, endPos)
	{
		this.graphics.beginPath();
		this.graphics.moveTo(startPos.x, startPos.y);
		this.graphics.lineTo(endPos.x, endPos.y);
		this.graphics.stroke();
	}

	drawWire(wire)
	{
		var connections = wire.connections;
		var numberOfConnections = connections.length;
		var wirePos = wire.pos;

		for (var i = 0; i < numberOfConnections; i++)
		{
			var connection = connections[i];
			var connectionPos = connection.pos();
			this.drawLine(wirePos, connectionPos);
		}

		/*
		this.graphics.fillText
		(
			wire.name,
			wirePos.x,
			wirePos.y
		);
		*/
	}

	initialize(viewSizeInPixels)
	{
		this.viewSizeInPixels = viewSizeInPixels;

		var canvas = document.createElement("canvas");
		canvas.width = this.viewSizeInPixels.x;
		canvas.height = this.viewSizeInPixels.y;

		var divMain = document.getElementById("divMain");
		divMain.appendChild(canvas);

		this.graphics = canvas.getContext("2d");
	}
}
