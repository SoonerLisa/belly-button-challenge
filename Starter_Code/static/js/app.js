<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Build Metadata Panel</title>
    <script src="https://d3js.org/d3.v7.min.js"></script>
</head>
<body>
<div>
        <select id="selDataset"></select>
    </div>
    <div id="bar"></div>

    <script>
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
   function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log(data);

    // get the metadata field
    const metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    const sampleMetadata = metadata.find(meta => meta.id === sample);

    // Use d3 to select the panel with id of `#sample-metadata`
    const panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    if (sampleMetadata) {
      Object.entries(sampleMetadata).forEach(([key, value]) => {
        panel.append("h6").text(`${key}: ${value}`);
      });
    } else {
      panel.append("h6").text("Sample not found.");
    }
  }).catch((error) => {
    console.error("Error fetching the JSON data: ", error);
  })}


// Call the function with a sample number
buildMetadata(940); // Replace 940 with the desired sample number
  </script>

  </body>
  </html>

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    const samples = data.samples;

    // Filter the samples for the object with the desired sample number
    const filteredSample = samples.filter(sampleObj => sampleObj.id === sample)[0];

    // Get the otu_ids, otu_labels, and sample_values
    const otu_ids = filteredSample.otu_ids;
    const otu_labels = filteredSample.otu_labels;
    const sample_values = filteredSample.sample_values;

    // Build a Bubble Chart
    const bubbleTrace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: 'Earth'
      }
    };

    const bubbleData = [bubbleTrace];

    // Render the Bubble Chart
const bubbleLayout = {
      title: 'Bubble Chart',
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Sample Values' },
      showlegend: false
    };

    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
const barData = sample_values
      .map((value, index) => {
        return {
          otu_id: otu_ids[index],
          otu_label: otu_labels[index],
          sample_value: value
        };
      })
      .sort((a, b) => b.sample_value - a.sample_value)
      .slice(0, 10)
      .reverse();

    const barYTicks = barData.map(data => `OTU ${data.otu_id}`);
    const barValues = barData.map(data => data.sample_value);
    const barLabels = barData.map(data => data.otu_label);

    // Build a Bar Chart
    const barTrace = {
      x: barValues,
      y: barYTicks,
      text: barLabels,
      type: 'bar',
      orientation: 'h'
    };

    // Don't forget to slice and reverse the input data appropriately
    const barChartData = [barTrace];


    // Render the Bar Chart
    const barLayout = {
      title: 'Top 10 OTUs',
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };

    Plotly.newPlot('bar', barChartData, barLayout);
  })
}


// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log("Data loaded:", data); // Log the entire data object

    // Get the names field
    const sampleNames = data.names;
    console.log("Sample Names:", sampleNames); // Log the sample names

    // Use d3 to select the dropdown with id of `#selDataset`
    const dropdown = d3.select("#selDataset");
    sampleNames.forEach((sample) => {
      dropdown.append("option")
      .text(sample)
      .property("value", sample);
    })

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    sampleNames.forEach((sample) => {
      dropdown.append("option")
        .text(sample)
        .property("value", sample);
    });

    // Get the first sample from the list
    const firstSample = sampleNames[0];
    console.log("First Sample:", firstSample); //Log the first sample

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  })
  

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample); // Call the function to build the charts for the new sample
  buildMetadata(newSample); // Call the function to build the metadata for the new sample}
}
// Initialize the dashboard
init();
}
