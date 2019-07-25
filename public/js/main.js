// initialize the big variables
var main = d3.select("main");

var scrolly0 = main.select("#scrolly_bubbles"),
	figure_bubbles = scrolly0.select("figure"),
	steps_bubbles = scrolly0.select("article")
							.selectAll(".step");

var scrolly1 = main.select("#scrolly_wins"),
	figure_wins = scrolly1.select("figure"),
	steps_wins = scrolly1.select("article")
						.selectAll(".step");

var scrolly2 = main.select("#scrolly_podiums"),
	figure_podiums = scrolly2.select("figure"),
	steps_podiums = scrolly2.select("article")
							.selectAll(".step");

var scrolly3 = main.select("#scrolly_averages"),
	figure_averages = scrolly3.select("figure"),
	steps_averages = scrolly3.select("article")
							.selectAll(".step");

var scroller_drivers = scrollama(),
	scroller_wins = scrollama(),
	scroller_podiums = scrollama(),
	scroller_averages = scrollama();


function handleResize() {
	// this should handle window size changing
	var h = Math.floor(window.innerHeight * 0.75);
	steps_bubbles.style('height', h + 'px');
	steps_wins.style("height", h + "px");
	steps_podiums.style("height", h + "px");
	steps_averages.style("height", h + "px");

	var figureWidth= window.innerWidth;
	var figureMarginTop = 0;

	figure_bubbles
		.style('width', figureWidth + 'px')
		.style('top', figureMarginTop + 'px');
	
	figure_wins
		.style('width', figureWidth + 'px')
		.style('top', figureMarginTop + 'px');

	figure_podiums
		.style('width', figureWidth + 'px')
		.style('top', figureMarginTop + 'px');
	
	figure_averages
		.style('width', figureWidth + 'px')
		.style('top', figureMarginTop + 'px');

	scroller_drivers.resize();
	scroller_wins.resize();
	scroller_podiums.resize();
	scroller_averages.resize();
}

function setupStickyfill() {
	// add stickyfill to all the figures
	d3.selectAll('.sticky').each(() => Stickyfill.add(this));
}

function init() {
	// do all the loading and stuff here

	// run this before anything
	setupStickyfill();

	// force a resize to make sure things are most up to date
	handleResize();

	// work with bubble chart
	scroller_drivers.setup({
		step: '#scrolly_bubbles article .step',
		offset: 0.5,
		debug: false
	})
		.onStepEnter(stepEnter_bubble)
		.onStepExit(stepExit_bubble);
	
	
	// load wins stuff
	d3.csv("public/data/overall_analysis_v2.csv", row_converter, (dataset) => {
		var win_analysis = new sucker_chart({
			plot_data: dataset,
			element: "#win_plot",
			x: "wins",
			y: "run_id",
			filter: 10,
			ascending: true
		})

		var podium_analysis = new sucker_chart({
			plot_data: dataset,
			element: "#podium_plot",
			x: "podiums",
			y: "run_id",
			filter: 10,
			ascending: false
		})

		var averages_analysis = new sucker_chart({
			plot_data: dataset,
			element: "#averages_plot",
			x: "p_average",
			y: "run_id",
			filter: 10,
			ascending: true
		})

		// win_analysis.sort("wins");
		// podium_analysis.sort("podiums");
		// averages_analysis.sort("p_average");

		scroller_wins.setup({
			step:"#scrolly_wins article .step",
			offset: 0.5,
			debug: false
		})
			.onStepEnter(stepEnter_bubble)
			.onStepExit(stepExit_bubble);

		scroller_podiums.setup({
			step:"#scrolly_podiums article .step",
			offset: 0.5,
			debug: false
		})
			.onStepEnter(stepEnter_bubble)
			.onStepExit(stepExit_bubble);
		
		scroller_averages.setup({
				step:"#scrolly_averages article .step",
				offset: 0.5,
				debug: false
			})
				.onStepEnter(stepEnter_bubble)
				.onStepExit(stepExit_bubble);

	})



	// resize things
	window.addEventListener('resize', handleResize);
}

// set things in motion
init();