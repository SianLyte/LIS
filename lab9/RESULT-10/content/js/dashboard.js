/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9982142857142857, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "/bitrix/templates/landing24/assets/vendor/bootstrap/bootstrap.css-29"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/templates/landing24/theme.css-30"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/js/main/core/core_fx.js-50"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/js/main/sidepanel/css/sidepanel.css-48"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/js/landing/css/landing_public.css-39"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/js/ui/design-tokens/dist/ui.design-tokens.css-45"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/templates/landing24/assets/css/custom-grid.css-31"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/templates/landing24/template_styles.css-44"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/templates/landing24/assets/vendor/icon/far/font.woff2-49"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/js/ui/design-tokens/dist/ui.design-tokens.css-27"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/js/main/popup/dist/main.popup.bundle.css-47"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/js/ui/fonts/opensans/ui.font.opensans.css-46"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/templates/landing24/assets/vendor/icon/icon-finance/font.woff-36"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/templates/landing24/assets/vendor/icon/icon-food/font.woff-24"], "isController": false}, {"data": [1.0, 500, 1500, "/lp/job/-38"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/templates/landing24/theme.css-42"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/components/bitrix/landing.pub/templates/.default/style.css-28"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/components/bitrix/landing.pub/templates/.default/style.css-41"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/js/landing/css/landing_public.css-26"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/templates/landing24/template_styles.css-32"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/js/main/sidepanel/css/sidepanel.css-35"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/templates/landing24/assets/css/custom-grid.css-43"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/js/main/pageobject/pageobject.js-25"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/js/ui/fonts/opensans/ui.font.opensans.css-33"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/js/main/popup/dist/main.popup.bundle.css-34"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/templates/landing24/assets/vendor/icon/far/font.woff-51"], "isController": false}, {"data": [0.95, 500, 1500, "/lp/bonus/-23"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/templates/landing24/assets/vendor/bootstrap/bootstrap.css-40"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 280, 0, 0.0, 91.81428571428569, 51, 573, 58.0, 220.70000000000002, 261.1999999999998, 334.0, 40.59147579008408, 1752.6061958629314, 24.80196932081763], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/bitrix/templates/landing24/assets/vendor/bootstrap/bootstrap.css-29", 10, 0, 0.0, 115.60000000000001, 105, 155, 112.5, 151.10000000000002, 155.0, 155.0, 2.411381721726549, 83.1479269652761, 1.4929843863033518], "isController": false}, {"data": ["/bitrix/templates/landing24/theme.css-30", 10, 0, 0.0, 113.89999999999999, 107, 125, 114.5, 124.4, 125.0, 125.0, 2.4061597690086622, 228.4888376744466, 1.4239578320500483], "isController": false}, {"data": ["/bitrix/js/main/core/core_fx.js-50", 10, 0, 0.0, 54.6, 52, 58, 54.5, 57.9, 58.0, 58.0, 2.467308166790032, 13.346113218603504, 1.4047272082408093], "isController": false}, {"data": ["/bitrix/js/main/sidepanel/css/sidepanel.css-48", 10, 0, 0.0, 55.3, 52, 62, 55.0, 61.5, 62.0, 62.0, 2.467308166790032, 8.664492351344682, 1.4649642240315817], "isController": false}, {"data": ["/bitrix/js/landing/css/landing_public.css-39", 10, 0, 0.0, 56.1, 52, 64, 56.0, 63.400000000000006, 64.0, 64.0, 2.4485798237022527, 1.5327535810479922, 1.44667069662096], "isController": false}, {"data": ["/bitrix/js/ui/design-tokens/dist/ui.design-tokens.css-45", 10, 0, 0.0, 56.599999999999994, 52, 68, 55.0, 67.3, 68.0, 68.0, 2.465483234714004, 12.009599975345168, 1.4903653537968442], "isController": false}, {"data": ["/bitrix/templates/landing24/assets/css/custom-grid.css-31", 10, 0, 0.0, 54.2, 51, 59, 54.0, 58.8, 59.0, 59.0, 2.4390243902439024, 1.2361852134146343, 1.4743711890243905], "isController": false}, {"data": ["/bitrix/templates/landing24/template_styles.css-44", 10, 0, 0.0, 56.10000000000001, 51, 65, 55.0, 64.7, 65.0, 65.0, 2.449179524859172, 2.2769715895175113, 1.4637674504041145], "isController": false}, {"data": ["/bitrix/templates/landing24/assets/vendor/icon/far/font.woff2-49", 10, 0, 0.0, 241.20000000000002, 221, 275, 236.5, 274.2, 275.0, 275.0, 2.3391812865497075, 800.0845211988303, 1.4208698830409356], "isController": false}, {"data": ["/bitrix/js/ui/design-tokens/dist/ui.design-tokens.css-27", 10, 0, 0.0, 57.199999999999996, 54, 64, 55.5, 63.7, 64.0, 64.0, 2.469745616201531, 12.030362435169176, 1.4977656520128426], "isController": false}, {"data": ["/bitrix/js/main/popup/dist/main.popup.bundle.css-47", 10, 0, 0.0, 55.7, 53, 60, 55.5, 59.8, 60.0, 60.0, 2.46669955599408, 18.170229248889985, 1.4790561790823877], "isController": false}, {"data": ["/bitrix/js/ui/fonts/opensans/ui.font.opensans.css-46", 10, 0, 0.0, 56.300000000000004, 53, 61, 56.0, 60.7, 61.0, 61.0, 2.465483234714004, 1.8635586168639053, 1.4783268614398422], "isController": false}, {"data": ["/bitrix/templates/landing24/assets/vendor/icon/icon-finance/font.woff-36", 10, 0, 0.0, 61.7, 56, 64, 62.5, 64.0, 64.0, 64.0, 2.442002442002442, 136.35626526251528, 1.5071733821733824], "isController": false}, {"data": ["/bitrix/templates/landing24/assets/vendor/icon/icon-food/font.woff-24", 10, 0, 0.0, 118.89999999999999, 108, 133, 117.5, 132.8, 133.0, 133.0, 2.3998080153587713, 210.34645353371732, 1.4741008219342453], "isController": false}, {"data": ["/lp/job/-38", 10, 0, 0.0, 150.99999999999997, 144, 180, 148.5, 177.20000000000002, 180.0, 180.0, 2.3923444976076556, 33.223684210526315, 1.7475328947368423], "isController": false}, {"data": ["/bitrix/templates/landing24/theme.css-42", 10, 0, 0.0, 118.7, 106, 143, 113.5, 142.2, 143.0, 143.0, 2.4189646831156266, 229.70479181785194, 1.4268111998064827], "isController": false}, {"data": ["/bitrix/components/bitrix/landing.pub/templates/.default/style.css-28", 10, 0, 0.0, 58.4, 54, 67, 56.5, 66.5, 67.0, 67.0, 2.444987775061125, 45.65250611246944, 1.5137912591687042], "isController": false}, {"data": ["/bitrix/components/bitrix/landing.pub/templates/.default/style.css-41", 10, 0, 0.0, 59.89999999999999, 55, 66, 58.5, 66.0, 66.0, 66.0, 2.4473813020068524, 45.6971977484092, 1.5104931473323542], "isController": false}, {"data": ["/bitrix/js/landing/css/landing_public.css-26", 10, 0, 0.0, 57.3, 53, 61, 57.5, 61.0, 61.0, 61.0, 2.469745616201531, 1.5460028710792786, 1.4639995986663372], "isController": false}, {"data": ["/bitrix/templates/landing24/template_styles.css-32", 10, 0, 0.0, 54.30000000000001, 51, 60, 54.5, 59.7, 60.0, 60.0, 2.4360535931790497, 2.264768574908648, 1.4606805724725942], "isController": false}, {"data": ["/bitrix/js/main/sidepanel/css/sidepanel.css-35", 10, 0, 0.0, 55.8, 52, 62, 55.5, 61.7, 62.0, 62.0, 2.443195699975568, 8.579816149523577, 1.4554193134620084], "isController": false}, {"data": ["/bitrix/templates/landing24/assets/css/custom-grid.css-43", 10, 0, 0.0, 54.4, 51, 59, 54.0, 58.7, 59.0, 59.0, 2.450980392156863, 1.2422449448529411, 1.4768114276960784], "isController": false}, {"data": ["/bitrix/js/main/pageobject/pageobject.js-25", 10, 0, 0.0, 54.2, 51, 59, 54.0, 58.8, 59.0, 59.0, 2.4685262898049865, 1.78871729202666, 1.4271167612935076], "isController": false}, {"data": ["/bitrix/js/ui/fonts/opensans/ui.font.opensans.css-33", 10, 0, 0.0, 55.199999999999996, 51, 63, 55.0, 62.6, 63.0, 63.0, 2.44140625, 1.8453598022460938, 1.468658447265625], "isController": false}, {"data": ["/bitrix/js/main/popup/dist/main.popup.bundle.css-34", 10, 0, 0.0, 56.3, 52, 64, 56.5, 63.5, 64.0, 64.0, 2.442002442002442, 17.988305097680097, 1.4690170940170941], "isController": false}, {"data": ["/bitrix/templates/landing24/assets/vendor/icon/far/font.woff-51", 10, 0, 0.0, 237.0, 218, 278, 230.0, 276.4, 278.0, 278.0, 2.321262766945218, 838.148140088208, 1.4077189240947077], "isController": false}, {"data": ["/lp/bonus/-23", 10, 0, 0.0, 342.5, 297, 573, 319.0, 549.1000000000001, 573.0, 573.0, 2.1853146853146854, 19.59249856588724, 1.617645050262238], "isController": false}, {"data": ["/bitrix/templates/landing24/assets/vendor/bootstrap/bootstrap.css-40", 10, 0, 0.0, 62.400000000000006, 56, 70, 62.0, 69.9, 70.0, 70.0, 2.4473813020068524, 84.38924452398433, 1.5104931473323542], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 280, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
