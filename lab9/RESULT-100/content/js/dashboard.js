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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9105357142857143, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.935, 500, 1500, "/bitrix/templates/landing24/assets/vendor/bootstrap/bootstrap.css-29"], "isController": false}, {"data": [0.81, 500, 1500, "/bitrix/templates/landing24/theme.css-30"], "isController": false}, {"data": [0.995, 500, 1500, "/bitrix/js/main/core/core_fx.js-50"], "isController": false}, {"data": [0.995, 500, 1500, "/bitrix/js/main/sidepanel/css/sidepanel.css-48"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/js/landing/css/landing_public.css-39"], "isController": false}, {"data": [0.98, 500, 1500, "/bitrix/js/ui/design-tokens/dist/ui.design-tokens.css-45"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/templates/landing24/assets/css/custom-grid.css-31"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/templates/landing24/template_styles.css-44"], "isController": false}, {"data": [0.315, 500, 1500, "/bitrix/templates/landing24/assets/vendor/icon/far/font.woff2-49"], "isController": false}, {"data": [0.98, 500, 1500, "/bitrix/js/ui/design-tokens/dist/ui.design-tokens.css-27"], "isController": false}, {"data": [0.97, 500, 1500, "/bitrix/js/main/popup/dist/main.popup.bundle.css-47"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/js/ui/fonts/opensans/ui.font.opensans.css-46"], "isController": false}, {"data": [0.96, 500, 1500, "/bitrix/templates/landing24/assets/vendor/icon/icon-finance/font.woff-36"], "isController": false}, {"data": [0.81, 500, 1500, "/bitrix/templates/landing24/assets/vendor/icon/icon-food/font.woff-24"], "isController": false}, {"data": [0.97, 500, 1500, "/lp/job/-38"], "isController": false}, {"data": [0.82, 500, 1500, "/bitrix/templates/landing24/theme.css-42"], "isController": false}, {"data": [0.975, 500, 1500, "/bitrix/components/bitrix/landing.pub/templates/.default/style.css-28"], "isController": false}, {"data": [0.985, 500, 1500, "/bitrix/components/bitrix/landing.pub/templates/.default/style.css-41"], "isController": false}, {"data": [0.995, 500, 1500, "/bitrix/js/landing/css/landing_public.css-26"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/templates/landing24/template_styles.css-32"], "isController": false}, {"data": [0.99, 500, 1500, "/bitrix/js/main/sidepanel/css/sidepanel.css-35"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/templates/landing24/assets/css/custom-grid.css-43"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/js/main/pageobject/pageobject.js-25"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/js/ui/fonts/opensans/ui.font.opensans.css-33"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/js/main/popup/dist/main.popup.bundle.css-34"], "isController": false}, {"data": [0.325, 500, 1500, "/bitrix/templates/landing24/assets/vendor/icon/far/font.woff-51"], "isController": false}, {"data": [0.715, 500, 1500, "/lp/bonus/-23"], "isController": false}, {"data": [0.97, 500, 1500, "/bitrix/templates/landing24/assets/vendor/bootstrap/bootstrap.css-40"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2800, 0, 0.0, 277.1542857142857, 49, 3781, 103.0, 733.9000000000001, 1131.6499999999987, 2053.899999999998, 210.82749792937278, 9102.78031704126, 128.81860129131843], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/bitrix/templates/landing24/assets/vendor/bootstrap/bootstrap.css-29", 100, 0, 0.0, 278.27, 107, 1143, 197.0, 570.9, 821.4999999999999, 1142.4999999999998, 18.198362147406733, 627.5058291628753, 11.267345313921746], "isController": false}, {"data": ["/bitrix/templates/landing24/theme.css-30", 100, 0, 0.0, 426.67, 116, 1289, 299.5, 837.8000000000001, 1027.499999999999, 1288.5699999999997, 13.8811771238201, 1318.1560374444753, 8.214837243198224], "isController": false}, {"data": ["/bitrix/js/main/core/core_fx.js-50", 100, 0, 0.0, 111.75000000000003, 61, 567, 99.0, 112.0, 208.5999999999999, 566.1599999999996, 11.575413821044101, 62.613493315198525, 6.590299079754602], "isController": false}, {"data": ["/bitrix/js/main/sidepanel/css/sidepanel.css-48", 100, 0, 0.0, 109.27999999999999, 64, 573, 99.0, 114.9, 132.79999999999995, 572.1299999999995, 11.499540018399264, 40.38315029898804, 6.827851885924563], "isController": false}, {"data": ["/bitrix/js/landing/css/landing_public.css-39", 100, 0, 0.0, 96.31999999999992, 54, 384, 97.0, 109.80000000000001, 112.89999999999998, 381.39999999999867, 12.428535918468803, 7.7799721911508835, 7.343031475267214], "isController": false}, {"data": ["/bitrix/js/ui/design-tokens/dist/ui.design-tokens.css-45", 100, 0, 0.0, 125.55000000000001, 71, 897, 98.0, 122.9, 218.34999999999894, 896.92, 11.488970588235295, 55.96385282628676, 6.9449929630055145], "isController": false}, {"data": ["/bitrix/templates/landing24/assets/css/custom-grid.css-31", 100, 0, 0.0, 86.08000000000004, 50, 122, 93.0, 104.0, 108.0, 121.97999999999999, 15.728216420257942, 7.971625314564329, 9.507583949355144], "isController": false}, {"data": ["/bitrix/templates/landing24/template_styles.css-44", 100, 0, 0.0, 103.24999999999997, 61, 406, 97.0, 112.9, 118.94999999999999, 405.88999999999993, 12.416190712689348, 11.543177303203377, 7.420613980630742], "isController": false}, {"data": ["/bitrix/templates/landing24/assets/vendor/icon/far/font.woff2-49", 100, 0, 0.0, 1475.71, 474, 3528, 1349.0, 2334.6000000000004, 2589.0499999999997, 3526.309999999999, 10.580890911014707, 3619.0470089144005, 6.427064596339012], "isController": false}, {"data": ["/bitrix/js/ui/design-tokens/dist/ui.design-tokens.css-27", 100, 0, 0.0, 115.78000000000002, 50, 638, 89.5, 209.4000000000001, 493.79999999999995, 637.3099999999996, 19.025875190258752, 92.67682172754947, 11.538152825342465], "isController": false}, {"data": ["/bitrix/js/main/popup/dist/main.popup.bundle.css-47", 100, 0, 0.0, 136.55999999999992, 74, 1659, 98.5, 116.80000000000001, 493.04999999999706, 1648.4399999999946, 11.485012059262662, 84.60102144826001, 6.886520902721947], "isController": false}, {"data": ["/bitrix/js/ui/fonts/opensans/ui.font.opensans.css-46", 100, 0, 0.0, 100.36999999999996, 68, 411, 97.0, 115.20000000000005, 123.84999999999997, 408.1799999999986, 11.469205184080744, 8.66910626218603, 6.877042952173415], "isController": false}, {"data": ["/bitrix/templates/landing24/assets/vendor/icon/icon-finance/font.woff-36", 100, 0, 0.0, 259.16999999999996, 61, 884, 205.5, 481.7000000000005, 701.7999999999988, 884.0, 12.599218848431397, 703.5138040191508, 7.776080383016253], "isController": false}, {"data": ["/bitrix/templates/landing24/assets/vendor/icon/icon-food/font.woff-24", 100, 0, 0.0, 447.0199999999999, 115, 2065, 216.5, 977.0000000000002, 1261.799999999999, 2062.5599999999986, 15.79778830963665, 1384.697743878357, 9.703914889415481], "isController": false}, {"data": ["/lp/job/-38", 100, 0, 0.0, 274.87000000000006, 157, 942, 210.0, 436.30000000000007, 644.1499999999994, 939.5799999999988, 12.272950417280313, 170.37336136935446, 8.965006750122729], "isController": false}, {"data": ["/bitrix/templates/landing24/theme.css-42", 100, 0, 0.0, 451.5499999999999, 140, 1404, 418.5, 756.0000000000002, 910.4499999999996, 1400.9599999999984, 11.314777098891152, 1074.4507913272234, 6.673950554424079], "isController": false}, {"data": ["/bitrix/components/bitrix/landing.pub/templates/.default/style.css-28", 100, 0, 0.0, 166.80000000000004, 54, 1256, 97.5, 331.2000000000001, 539.0499999999984, 1251.3999999999976, 17.93400286944046, 334.8614598278336, 11.103669745337161], "isController": false}, {"data": ["/bitrix/components/bitrix/landing.pub/templates/.default/style.css-41", 100, 0, 0.0, 149.1, 61, 910, 104.0, 213.10000000000005, 314.8999999999995, 908.2199999999991, 12.24739742804654, 228.68187385180653, 7.558940600122475], "isController": false}, {"data": ["/bitrix/js/landing/css/landing_public.css-26", 100, 0, 0.0, 91.29000000000003, 49, 772, 87.0, 108.0, 120.79999999999995, 767.8899999999978, 19.175455417066157, 12.003385666347077, 11.366700623202302], "isController": false}, {"data": ["/bitrix/templates/landing24/template_styles.css-32", 100, 0, 0.0, 90.57, 52, 383, 93.0, 108.9, 111.94999999999999, 380.4399999999987, 15.84534938995405, 14.731223260972905, 9.501020044366978], "isController": false}, {"data": ["/bitrix/js/main/sidepanel/css/sidepanel.css-35", 100, 0, 0.0, 101.15000000000003, 58, 645, 96.0, 107.9, 118.59999999999991, 643.6499999999993, 13.912075681691707, 48.855297022815805, 8.287466958820255], "isController": false}, {"data": ["/bitrix/templates/landing24/assets/css/custom-grid.css-43", 100, 0, 0.0, 97.34, 56, 395, 98.0, 110.0, 119.74999999999994, 392.35999999999865, 12.394645513138325, 6.282051778631631, 7.4682580875061975], "isController": false}, {"data": ["/bitrix/js/main/pageobject/pageobject.js-25", 100, 0, 0.0, 86.31, 49, 429, 86.0, 114.50000000000003, 120.89999999999998, 426.0499999999985, 19.346101760495262, 14.018366705358872, 11.184465080286323], "isController": false}, {"data": ["/bitrix/js/ui/fonts/opensans/ui.font.opensans.css-33", 100, 0, 0.0, 95.64999999999999, 51, 407, 94.5, 113.0, 119.89999999999998, 406.72999999999985, 15.725743041358704, 11.886450306651989, 9.460017298317345], "isController": false}, {"data": ["/bitrix/js/main/popup/dist/main.popup.bundle.css-34", 100, 0, 0.0, 96.79999999999998, 60, 246, 95.0, 107.9, 129.5499999999999, 245.57999999999979, 13.962580284836637, 102.85131160988551, 8.39936470259704], "isController": false}, {"data": ["/bitrix/templates/landing24/assets/vendor/icon/far/font.woff-51", 100, 0, 0.0, 1354.1999999999998, 575, 3781, 1139.5, 2283.1000000000004, 2521.749999999999, 3774.4499999999966, 10.432968179447053, 3767.075834637454, 6.327024647887323], "isController": false}, {"data": ["/lp/bonus/-23", 100, 0, 0.0, 619.4299999999996, 309, 1659, 510.0, 1052.0, 1416.1999999999975, 1657.7899999999993, 16.764459346186086, 150.26832957879296, 12.409629086336967], "isController": false}, {"data": ["/bitrix/templates/landing24/assets/vendor/bootstrap/bootstrap.css-40", 100, 0, 0.0, 213.48000000000002, 66, 741, 197.5, 315.5, 658.6999999999981, 740.7699999999999, 11.970313622216903, 412.75371453794594, 7.387927938711995], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2800, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
