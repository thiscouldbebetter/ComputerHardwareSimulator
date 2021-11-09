
class Universe
{
	constructor(name, componentDefns, layout)
	{
		this.name = name;
		this.componentDefns = componentDefns;
		this.layout = layout;

		this.componentDefnsByName =
			new Map(this.componentDefns.map(x => [x.name, x]));
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
}
