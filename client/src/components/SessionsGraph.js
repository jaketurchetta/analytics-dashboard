var eventSelect = $('#eventSelect').MPEventSelect();
var propSelect = $('#propSelect').MPPropertySelect();
var dateSelect = $('#dateSelect').MPDatepicker();
var eventGraph = $('#graph').MPChart({ chartType: 'line' });
var eventTable = $('#table').MPTable({
  showPercentages: true,
  firstColHeader: 'Event'
});
var runQuery = function () {
  var eventName = eventSelect.MPEventSelect('value'),
    propName = propSelect.MPPropertySelect('value'),
    dateRange = dateSelect.MPDatepicker('value');

  if (eventName) {
    MP.api.segment(eventName, propName, dateRange).done(function (results) {
      eventGraph.MPChart('setData', results);
      eventTable.MPTable('setData', results);
    });
  }
};
eventSelect.on('change', function (e, eventName) {
  propSelect.MPPropertySelect('setEvent', eventName);
  $("#by").show();
  runQuery();
})
propSelect.on('change', runQuery);
dateSelect.on('change', runQuery);
