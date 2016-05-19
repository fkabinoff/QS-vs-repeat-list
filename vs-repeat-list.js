define( ["text!./template.html", "text!./styles.css"],
function ( template, css ) {
	$("<style>").html(css).appendTo("head");
	return {
		initialProperties : {
			qListObjectDef : {
				qShowAlternatives: true,
				qInitialDataFetch : [{
					qWidth : 1,
					qHeight : 10000
				}]
			}
		},
		definition : {
			type : "items",
			component : "accordion",
			items : {
				dimension: {
					type: "items",
					label: "Dimensions",
					ref: "qListObjectDef",
					min: 1,
					max: 1,
					items: {
						label: {
							type: "string",
							ref: "qListObjectDef.qDef.qFieldLabels.0",
							label: "Label",
							show: true
						},
						libraryId: {
							type: "string",
							component: "library-item",
							libraryItemType: "dimension",
							ref: "qListObjectDef.qLibraryId",
							label: "Dimension",
							show: function ( data ) {
								return data.qListObjectDef && data.qListObjectDef.qLibraryId;
							}
						},
						field: {
							type: "string",
							expression: "always",
							expressionType: "dimension",
							ref: "qListObjectDef.qDef.qFieldDefs.0",
							label: "Field",
							show: function ( data ) {
								return data.qListObjectDef && !data.qListObjectDef.qLibraryId;
							}
						},
						frequency: {
							type: "string",
							component: "dropdown",
							label: "Frequency mode",
							ref: "qListObjectDef.qFrequencyMode",
							options: [{
								value: "N",
								label: "No frequency"
							}, {
								value: "V",
								label: "Absolute value"
							}, {
								value: "P",
								label: "Percent"
							}, {
								value: "R",
								label: "Relative"
							}],
							defaultValue: "V"
						}
					}
				},
				sorting : {
					uses : "sorting"
				},
				settings : {
					uses : "settings",
				}
			}
		},
		template : template,
		controller:['$scope', function($scope){
			$scope.$watchCollection('layout.qListObject.qDataPages[0].qMatrix', function(data) {
				$scope.listRows = _.flatten(data);
			});
		}]
	};

} );

