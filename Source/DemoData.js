
class DemoData
{
	universe()
	{
		var componentDefns = ComponentDefn.Instances();

		var layout = new Layout
		(
			"LayoutDemo",
			// components
			[
				new Component
				(
					"Src0",
					componentDefns.byName("SourceLow").name,
					new Coords(20, 50)
				),

				new Component
				(
					"Src1",
					componentDefns.byName("SourceHigh").name,
					new Coords(20, 100)
				),

				new Component
				(
					"And0",
					componentDefns.byName("GateAnd").name,
					new Coords(200, 30)
				),

				new Component
				(
					"Or0",
					componentDefns.byName("GateOr").name,
					new Coords(200, 120)
				),

				new Component
				(
					"Probe0",
					componentDefns.byName("Probe").name,
					new Coords(320, 50)
				),

				new Component
				(
					"Probe1",
					componentDefns.byName("Probe").name,
					new Coords(320, 120)
				),
			],
			// wires
			[
				new Wire
				(
					"W0",
					new Coords(120, 60),
					[
						new Connection("Src0", "Out"),
						new Connection("And0", "InA"),
						new Connection("Or0", "InA"),
					]
				),
				new Wire
				(
					"W1",
					new Coords(120, 110),
					[
						new Connection("Src1", "Out"),
						new Connection("And0", "InB"),
						new Connection("Or0", "InB"),
					]
				),
				new Wire
				(
					"W2",
					new Coords(275, 50),
					[
						new Connection("And0", "Out"),
						new Connection("Probe0", "In"),
					]
				),
				new Wire
				(
					"W3",
					new Coords(275, 140),
					[
						new Connection("Or0", "Out"),
						new Connection("Probe1", "In"),
					]
				)
			]
		);

		var returnValue = new Universe
		(
			"UniverseDemo",
			componentDefns._All,
			layout
		);

		return returnValue;
	}
}
