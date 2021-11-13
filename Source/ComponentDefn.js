
class ComponentDefn
{
	constructor(name, size, leadDefns, draw, update)
	{
		this.name = name;
		this.size = size;
		this.leadDefns = leadDefns;
		this.draw = draw;
		this.update = update;
	}

	// Helpers.

	sizeHalf()
	{
		if (this._sizeHalf == null)
		{
			this._sizeHalf = this.size.clone().divideScalar(2);
		}
		return this._sizeHalf;
	}

	leadDefnByName(leadDefnName)
	{
		return this.leadDefnsByName().get(leadDefnName);
	}

	leadDefnsByName()
	{
		if (this._leadDefnsByName == null)
		{
			this._leadDefnsByName =
				new Map(this.leadDefns.map(x => [x.name, x]));
		}
		return this._leadDefnsByName;
	}

	// instances

	static Instances()
	{
		if (ComponentDefn._instances == null)
		{
			ComponentDefn._instances = new ComponentDefn_Instances();
		}
		return ComponentDefn._instances;
	}

	static byName(componentDefnName)
	{
		return ComponentDefn.Instances().byName(componentDefnName);
	}

	// Serialization.

	static setPrototypesOnObject(objectDeserialized)
	{
		Object.setPrototypeOf(objectDeserialized, ComponentDefn.prototype);
		Object.setPrototypeOf(objectDeserialized.size, Coords.prototype);
		objectDeserialized.leadDefns.forEach
		(
			x => ComponentLeadDefn.setPrototypesOnObject(x)
		);
		if (objectDeserialized.draw != null)
		{
			objectDeserialized.draw = eval(objectDeserialized.draw);
		}
		objectDeserialized.update = eval(objectDeserialized.update);
	}

	toObjectSerializable()
	{
		var thisAsObjectSerializable =
		{
			name: this.name,
			size: this.size,
			leadDefns: this.leadDefns,
			draw: this.draw == null ? null : this.draw.toString(),
			update: this.update.toString()
		};

		return thisAsObjectSerializable;
	}
}

class ComponentDefn_Instances
{
	constructor()
	{
		this._All =
		[
			new ComponentDefn
			(
				"GateAnd", // name
				new Coords(30, 40), // size
				// leadDefns
				[
					new ComponentLeadDefn
					(
						"InA",
						new Coords(-20, 5)
					),
					new ComponentLeadDefn
					(
						"InB",
						new Coords(-20, 25)
					),
					new ComponentLeadDefn
					(
						"Out",
						new Coords(30, 15)
					),
				],
				null, // draw
				// update
				(layout, component) =>
				{
					var inA = component.lead("InA");
					var inB = component.lead("InB");
					var out = component.lead("Out");

					var signalLevelOut = 0;
					if (inA.signalLevel == 1 && inB.signalLevel == 1)
					{
						signalLevelOut = 1;
					}
					out.signalLevel = signalLevelOut;
				}
			),

			new ComponentDefn
			(
				"GateOr", // name
				new Coords(30, 40), // size
				// leadDefns
				[
					new ComponentLeadDefn
					(
						"InA",
						new Coords(-20, 5)
					),
					new ComponentLeadDefn
					(
						"InB",
						new Coords(-20, 25)
					),
					new ComponentLeadDefn
					(
						"Out",
						new Coords(30, 15)
					),
				],
				null, // draw
				// update
				(layout, component) =>
				{
					var inA = component.lead("InA");
					var inB = component.lead("InB");
					var out = component.lead("Out");

					var signalLevelOut = 0;
					if (inA.signalLevel == 1 || inB.signalLevel == 1)
					{
						signalLevelOut = 1;
					}
					out.signalLevel = signalLevelOut;
				}
			),

			new ComponentDefn
			(
				"SourceHigh", // name
				new Coords(30, 20), // size
				// leadDefns
				[
					new ComponentLeadDefn
					(
						"Out",
						new Coords(30, 5)
					),
				],
				null, // draw
				// update
				(layout, component) =>
				{
					component.lead("Out").signalLevel = 1;
				}
			),

			new ComponentDefn
			(
				"SourceLow", // name
				new Coords(30, 20), // size
				// leadDefns
				[
					new ComponentLeadDefn
					(
						"Out",
						new Coords(30, 5)
					),
				],
				null, // draw
				// update
				(layout, component) =>
				{
					component.lead("Out").signalLevel = 0;
				}
			),

			new ComponentDefn
			(
				"Probe", // name
				new Coords(30, 20), // size
				// leadDefns
				[
					new ComponentLeadDefn
					(
						"In",
						new Coords(-20, 5)
					),
				],
				// draw
				(displayHelper, component) =>
				{
					var drawPos = component.pos.clone().add
					(
						component.defn().sizeHalf()
					);
					var wire =
						component.connectionsByLeadName.get("In").wire();
					var signalLevel = wire.signalLevel;
					displayHelper.graphics.fillText
					(
						signalLevel,
						drawPos.x, drawPos.y
					);
				},
				// update
				(layout, component) =>
				{
					// do nothing
				}
			),

		];

		this._AllByName = new Map(this._All.map(x => [x.name, x]));
	}

	byName(componentDefnName)
	{
		return this._AllByName.get(componentDefnName);
	}
}
