
class InputHelper
{
	initialize()
	{
		document.onkeydown = this.handleEventKeyDown.bind(this);
	}

	// events

	handleEventKeyDown(event)
	{
		// For eventual clocked logic support.
		Globals.Instance.universe.update();
	}
}
