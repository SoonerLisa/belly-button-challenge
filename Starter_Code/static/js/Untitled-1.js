<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTU Bar Chart</title>
    <script src="https://d3js.org/d3.v7.min.js"></script>
</head>
<body>
    <div>
        <select id="selDataset"></select>
    </div>
    <div id="bar"></div>

    <script>
        // Fetch the JSON data
        d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
            // Populate the dropdown menu
            const sampleNames = data.names;
            const dropdown = d3.select("#selDataset");
            sampleNames.forEach(sample => {
                dropdown.append("option").text(sample).property("value", sample);
            });

            // Create the initial bar chart with the first sample
            buildBarChart(sampleNames[0], data);

            // Event listener for dropdown change
            dropdown.on("change", function() {
                const selectedSample = d3.select(this).property("value");
                buildBarChart(selectedSample, data);
            });

            function buildBarChart(sample, data) {
                // Filter the data for the selected sample
                const sampleData = data.samples.find(s => s.id === sample);
                const otuIds = sampleData.otu_ids.slice(0, 10).map(id => `OTU ${id}`);
                const sampleValues = sampleData.sample_values.slice(0, 10);
                const otuLabels = sampleData.otu_labels.slice(0, 10);

                // Create the trace for the bar chart
                const trace = {
                    x: sampleValues.reverse(),
                    y: otuIds.reverse(),
                    text: otuLabels.reverse(),
                    type: 'bar',
                    orientation: 'h'
                };

                const dataBar = [trace];

                // Define the layout
                const layout = {
                    title: `Top 10 OTUs for Sample ${sample}`,
                    xaxis: { title: 'Sample Values' },
                    yaxis: { title: 'OTU IDs' }
                };

                // Render the plot
                Plotly.newPlot('bar', dataBar, layout);
            }
        }).catch((error) => {
            console.error("Error fetching the JSON data: ", error);
        });
    </script>
</body>
</html>