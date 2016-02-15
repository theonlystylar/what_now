angular.module("clientApp.logDetailModule")
	.controller(
		"logDetailController", [
			"$scope",
			"logDetailData",
			function($scope, logDetailData) {

				initialize();

				var _controlLogs;

				$scope.deleteLog = function (log) {
					if (confirm("Delete " + log.itemName)) {
						logDetailData.deleteLog(log.logId).then(function() {
							$scope.grid.dataSource.read();
						});
					}
				};

				$scope.deleteControlLog = function (controlLog) {
					if (confirm("Delete " + controlLog.controlName + " : " + controlLog.value)) {
						logDetailData.deleteControlLog(controlLog.controlLogId).then(function () {
							$scope.grid.dataSource.read();
						});
					}
				};

				$scope.getControlLogs = function(logId) {
					return _.filter(_controlLogs, function(controlLog) {
						return controlLog.logId === logId;
					});
				};

				$scope.gridOptions = {
					dataSource: {
						transport: {
							read: function(options) {
								return logDetailData
									.get()
									.then(function(result) {
										_.each(result.logs, function(log) {
											log.loggedLocalTime = moment.utc(log.logged).toDate();
										});
										_controlLogs = result.controlLogs;
										options.success(result.logs);
									});
							}
						},
						schema: {
							model: {
								fields: {
									loggedLocalTime: { type: "date" },
									itemName: { type: "string" }
								}
							}
						},
						pageSize: 15
					},
					sortable: true,
					pageable: true,
					filterable: true,
					columns: [
						{
							title: "Actions",
							template: "<button class=\"btn btn-sm btn-danger\" ng-click=\"deleteLog(dataItem)\">Delete</button>",
							width: "125px"
						},
						{
							field: "loggedLocalTime",
							title: "Logged",
							width: "170px",
							format: "{0:MM/dd/yyyy h:mm tt}"
						}, {
							field: "itemName",
							title: "Item"
						}
					]
				};

				$scope.detailGridOptions = function(log) {
					return {
						dataSource: {
							transport: {
								read: function(options) {
									var controlLogs = _.filter(_controlLogs, function(controlLog) {
										return controlLog.logId === log.logId;
									});
									options.success(controlLogs);
								}
							},
							pageSize: 15
						},
						columns: [
							{
								title: "Actions",
								template: "<button class=\"btn btn-sm btn-danger\" ng-click=\"deleteControlLog(dataItem)\">Delete</button>",
								width: "125px"
							},
							{
								field: "controlName",
								title: "Name",
								width: "170px"
							}, {
								field: "value",
								title: "Value"
							}
						]
					};
				};

				$scope.$on("kendoWidgetCreated", function(event, widget) {
					if (widget === $scope.grid) {
						widget.element.find(".c-delete-log").on("click", function(e) {
							e.preventDefault();
							alert("delete log");
							//var selected = $scope.myGrid.select();
							//if (selected.length == 0) {
							//	alert('No record selected')
							//} else {
							//	$scope.myGrid.editRow(selected);
							//}
						});
						widget.element.find(".c-delete-control-log").on("click", function(e) {
							e.preventDefault();
							alert("delete control log");
							//var selected = $scope.myGrid.select();
							//if (selected.length == 0) {
							//	alert('No record selected')
							//} else {
							//	$scope.myGrid.editRow(selected);
							//}
						});
					}
				});

				function initialize() {
					setLogDetails();
				}

				function setLogDetails() {
					logDetailData
						.get()
						.then(function(result) {
							_.each(result.logs, function(log) {
								log.loggedLocalTime = moment.utc(log.logged).toDate();
							});
							$scope.logs = result.logs;
							$scope.gridOptions.dataSource.data = result.logs;
							_controlLogs = result.controlLogs;
						});
				}
			}
		]);