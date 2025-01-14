<urlscript scr ="https://d3js.org/d3.v7.min.js"></urlscript>


const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

d3.json(url).then(function(data) {
    const samples = data.samples;
    const names = data.names;
    console.log(data);
})
    .catch(function(error) {
        console.error('Error fetching the data', error);
    });

    // Populate dropdown menu
    const dropdown = d3.select("#dropdown");
    names.forEach(name => {
        dropdown.append("option").text(name).property("value", name)
    });

    // Function to update the chart
    function updateChart(selectedName) {
        // Find the selected sample
        const sample = samples.find(s => s.id === selectedName);
        const sampleValues = sample.sample_values;
        const otuIds = sample.otu_ids;
        const otuLabels = sample.otu_labels;
    }
        // Get the top 10 OTUs
        const top10Indices = sampleValues
            .map((value, index) => ({ value, index }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 10)
            .map(item = item.index);

        const top10Values = top10Indices.map(i => sampleValues[i]);
        const top10OtuIds = top10Indices.map(i => otuIds[i]);
        const top10OtuLabels = top10Indices.map(i => otuLabels[i]);

        // Create the horizontal bar chart
        const svg = d3.select("#bar-chart");
        svg.selectAll("*").remove(); // Clear previous chart

        const xScale = d3.scaleLinear()
            .domain([0, d3.max(top10Values)])
            .range([0, 600]);

        const yScale = d3.scaleBand()
            .domain(top10OtuIds)
            .range([0, 400])
            .padding(0.1);

        svg.selectAll(".bar")
            .data(top10Values)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", 0)
            .attr("y", (d, i) = yScale(top10OtuIds[i]))
            .attr("width", d = xScale(d))
            .attr("height", yScale.bandwidth())
            .on("mouseover", function(event, d) {
                const index = top10Values.indexOf(d);
                const label = top10OtuLabels[index];
                d3.select(this).append("title").text(label);
            });
        
        // Add y-axis
        svg.append("g")
            .call(d3.axisLeft(yScale));
    
try {
    // Initial chart
    updateChart(names[0]); // Display the first individual's data
    } catch (error) {
        console.error("Error initializing chart:", error);
    }
    
    // Update chart on dropdown change
    dropdown.on("change", function() {
        const selectedName = d3.select(this).property("value");
        updateChart(selectedName);
    }); 