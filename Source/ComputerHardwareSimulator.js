
class ComputerHardwareSimulator
{
	run()
	{
		var universe = DemoData.universe();

		Globals.Instance.initialize
		(
			new Coords(400, 200), // viewSizeInPixels
			universe
		);
	}
}
