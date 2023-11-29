function matchMediaQuery(breakPoints, setBreakPoint) {
	for (var key of Object.keys(breakPoints)) {
		if (window.matchMedia(`${breakPoints[key]}`).matches) {
			setBreakPoint(key);
		}
	}
}

export default function breakPointOberver(breakPoints, setBreakPoint) {
	matchMediaQuery(breakPoints, setBreakPoint);
	window.addEventListener('resize', () => {
		matchMediaQuery(breakPoints, setBreakPoint);
	});
}
