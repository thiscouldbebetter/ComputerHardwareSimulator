
class Globals
{
	// instance

	static Instance = new Globals();

	// methods

	initialize(viewSizeInPixels, universe)
	{
		this.universe = universe;
		this.universe.initialize();

		this.displayHelper = new DisplayHelper();
		this.displayHelper.initialize(viewSizeInPixels);

		this.inputHelper = new InputHelper();
		this.inputHelper.initialize();

		this.universe.update();
	}
}
