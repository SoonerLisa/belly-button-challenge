# belly-button-challenge
Module 14 Challenge
All files mentioned below are within the belly-button-challenge repo. 
https://github.com/SoonerLisa/belly-button-challenge.git


I have an error in my code preventing the html to open properly. Once this is resolved I only have the bubble chart to complete this assignment.
I will also need to update this readme to show results rather than error.
Starting with the files with error used for the bar chart attempts are:
bar_chart_bellybutton.html which only will display text like an index.

myHTML.html reads "D3.js Bar Chart Example" and a drop-down going to nowhere.

Untitled-3.html might work better by fixing the error when opened. This is what shows at the top of the site...
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"; d3.json(url).then(function(data) { console.log(data); // This will log the data to the console }).catch(function(error) { console.error('Error fetching the data:', error); });
OTU Bar Chart

myHTML_2.html gives me this:
//-------------- const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"; d3.json(url).then(function(data) { const samples = data.samples; const names = data.names; console.log(data); }) .catch(function(error) { console.error('Error fetching the data', error); }); // Populate dropdown menu const dropdown = d3.select("#dropdown"); names.forEach(name => { dropdown.append("option").text(name).property("value", name) }); // Function to update the chart function updateChart(selectedName) { // Find the selected sample const sample = samples.find(s => s.id === selectedName); const sampleValues = sample.sample_values; const otuIds = sample.otu_ids; const otuLabels = sample.otu_labels; } // Get the top 10 OTUs const top10Indices = sampleValues .map((value, index) => ({ value, index })) .sort((a, b) => b.value - a.value) .slice(0, 10) .map(item = item.index); const top10Values = top10Indices.map(i => sampleValues[i]); const top10OtuIds = top10Indices.map(i => otuIds[i]); const top10OtuLabels = top10Indices.map(i => otuLabels[i]); // Create the horizontal bar chart const svg = d3.select("#bar-chart"); svg.selectAll("*").remove(); // Clear previous chart const xScale = d3.scaleLinear() .domain([0, d3.max(top10Values)]) .range([0, 600]); const yScale = d3.scaleBand() .domain(top10OtuIds) .range([0, 400]) .padding(0.1); svg.selectAll(".bar") .data(top10Values) .enter() .append("rect") .attr("class", "bar") .attr("x", 0) .attr("y", (d, i) = yScale(top10OtuIds[i])) .attr("width", d = xScale(d)) .attr("height", yScale.bandwidth()) .on("mouseover", function(event, d) { const index = top10Values.indexOf(d); const label = top10OtuLabels[index]; d3.select(this).append("title").text(label); }); // Add y-axis svg.append("g") .call(d3.axisLeft(yScale)); try { // Initial chart updateChart(names[0]); // Display the first individual's data } catch (error) { console.error("Error initializing chart:", error); } // Update chart on dropdown change dropdown.on("change", function() { const selectedName = d3.select(this).property("value"); updateChart(selectedName); });

Normal clause: No sources used except those within this course were used for this challenge.