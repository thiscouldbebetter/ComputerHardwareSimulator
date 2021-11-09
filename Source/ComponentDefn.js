
class ComponentDefn
{
	constructor(name, size, leadDefns, draw, update)
	{
		this.name = name;
		this.size = size;
		this.leadDefns = leadDefns;
		this.draw = draw;
		this.update = update;

		this.sizeHalf = this.size.clone().divideScalar(2);
		this.leadDefnsByName = new Map(this.leadDefns.map(x => [x.name, x]));
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
						component.defn().sizeHalf
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
