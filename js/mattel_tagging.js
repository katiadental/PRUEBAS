/*
 *  File Name: mattel_tagging.js
 *  Purpose: Tealium Tracking for Mattel Brands
 */

(function(window,$){
	$(document).on('click','[data-tracking-id]', function (e) {
		triggerTagging(this);
	});
})(this,jQuery);

//for legacy tracking via data-tracking-id attribute
function triggerTagging(ele) {
	var dataVal = jQuery(ele).data('trackingId');
	sendTag(dataVal);
}

//for onclick attribute to fix issues with external links not being fired
function sendTag(trackingData){
  console.log("Tagging Fire", trackingData);
  var dataVal = trackingData;
  if(!dataVal || typeof utag=="undefined") return;
  var valArr = dataVal.split('|');
  utag.link({
    "eve_cat": valArr[0] || '', // Category Name
    "eve_act": valArr[1] || '', // Action Name
    "eve_lab": valArr[2] || '', // Label Name
    "eve_des": valArr[3] || '', // Description
    "eve_pos": valArr[4] || ''  // Position
  });
}
