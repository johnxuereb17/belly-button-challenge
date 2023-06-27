d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {

  // Bar chart
  function createBarChart(sample) {
    let sampleData = data.samples.filter(function(obj) {
      return obj.id == sample;
    })[0];

    var barTrace = {
      x: sampleData.sample_values.slice(0, 10).reverse(),
      y: sampleData.otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse(),
      text: sampleData.otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    };

    var barData = [barTrace];

    Plotly.newPlot("bar", barData);
  }

  // Bubble chart
  function createBubbleChart(sample) {
    var sampleData = data.samples.filter(function(obj) {
      return obj.id == sample;
    })[0];

    var bubbleTrace = {
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
      text: sampleData.otu_labels,
      mode: "markers",
      marker: {
        size: sampleData.sample_values,
        color: sampleData.otu_ids,
        colorscale: "Viridis"
      }
    };

    var bubbleData = [bubbleTrace];

    var bubbleLayout = {
      title: "OTU IDs vs Sample Values",
      xaxis: { title: "OTU IDs" },
      yaxis: { title: "Sample Values" }
    };

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  }

  // Give dropdown menu sample names
  function populateDropdown() {
    var dropdown = d3.select("#selDataset");

    data.names.forEach(function(sample) {
      dropdown.append("option").text(sample).property("value", sample);
    });
  }

  // Handle dropdown selection change
  function changeOption(sample) {
    displayMetadata(sample);
    createBarChart(sample);
    createBubbleChart(sample);
  }

  // Initialize the dashboard
  populateDropdown();
  var initialSample = data.names[0];
  displayMetadata(initialSample);
  createBarChart(initialSample);
  createBubbleChart(initialSample);

  // Listen for dropdown selection change
  d3.select("#selDataset").on("change", function() {
    let selectedSample = d3.select("#selDataset").property("value");
    changeOption(selectedSample);
  });
  
  // Display the sample metadata
 function displayMetadata(sample) {
  var metadata = data.metadata.filter(function(obj) {
    return obj.id == sample;
  })[0];

  var metadataPanel = d3.select("#sample-metadata");
  metadataPanel.html("");

  Object.entries(metadata).forEach(function([key, value]) {
    metadataPanel.append("p").text(`${key}: ${value}`);
 });
}})