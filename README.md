# Analytics Dashboard

This dashboard represents various data for virtual events hosted by Silicon Angle & the CUBE. The event data was collected by Mixpanel and users may input a date range to view dunamic real-time event and user data. This application was built using NodeJS, React, Express, and D3.js.

## Application Outline

Users are able to select the event and date range of their choosing to visualize various slices of their traffic data.

![alt text](/client/dist/Filters.png)

### Views Line Chart

Users can view Event and Session Views trends over their selected date range. This chart was built using D3.js.

![alt text](/client/dist/LineChart.png)

### Key Metrics

Users can view specific key metrics associated with their event and date range.

![alt text](/client/dist/Metrics.png)

### Donut Charts

This app includes 2 donut charts built in D3.js and each includes a hover feature to display the data associated with each arc.

#### Top Content

![alt text](/client/dist/TopContentDonut.png)

#### Top Geographies

![alt text](/client/dist/TopGeographiesDonut.png)

### Top Content Table

Finally, users can see their top content in chart form as well. This table was built using react-table and includes sorting capabilities.

![alt text](/client/dist/Table.png)

## Getting Started

*Please follow these instructions to start and use the analytics dashboard.*

1. Download dependencies by running the following in the root directory:

```
npm install
```

2. Run webpack build in the root directory:

```
npm run webpack
```

3. Start the server:

```
npm start
```