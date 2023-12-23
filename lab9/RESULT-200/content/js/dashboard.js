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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7914285714285715, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.905, 500, 1500, "/bitrix/templates/landing24/assets/vendor/bootstrap/bootstrap.css-29"], "isController": false}, {"data": [0.4125, 500, 1500, "/bitrix/templates/landing24/theme.css-30"], "isController": false}, {"data": [0.9575, 500, 1500, "/bitrix/js/main/core/core_fx.js-50"], "isController": false}, {"data": [0.9675, 500, 1500, "/bitrix/js/main/sidepanel/css/sidepanel.css-48"], "isController": false}, {"data": [0.9925, 500, 1500, "/bitrix/js/landing/css/landing_public.css-39"], "isController": false}, {"data": [0.9575, 500, 1500, "/bitrix/js/ui/design-tokens/dist/ui.design-tokens.css-45"], "isController": false}, {"data": [0.9925, 500, 1500, "/bitrix/templates/landing24/assets/css/custom-grid.css-31"], "isController": false}, {"data": [0.99, 500, 1500, "/bitrix/templates/landing24/template_styles.css-44"], "isController": false}, {"data": [0.0, 500, 1500, "/bitrix/templates/landing24/assets/vendor/icon/far/font.woff2-49"], "isController": false}, {"data": [0.9875, 500, 1500, "/bitrix/js/ui/design-tokens/dist/ui.design-tokens.css-27"], "isController": false}, {"data": [0.9575, 500, 1500, "/bitrix/js/main/popup/dist/main.popup.bundle.css-47"], "isController": false}, {"data": [0.975, 500, 1500, "/bitrix/js/ui/fonts/opensans/ui.font.opensans.css-46"], "isController": false}, {"data": [0.54, 500, 1500, "/bitrix/templates/landing24/assets/vendor/icon/icon-finance/font.woff-36"], "isController": false}, {"data": [0.5425, 500, 1500, "/bitrix/templates/landing24/assets/vendor/icon/icon-food/font.woff-24"], "isController": false}, {"data": [0.8775, 500, 1500, "/lp/job/-38"], "isController": false}, {"data": [0.2475, 500, 1500, "/bitrix/templates/landing24/theme.css-42"], "isController": false}, {"data": [0.945, 500, 1500, "/bitrix/components/bitrix/landing.pub/templates/.default/style.css-28"], "isController": false}, {"data": [0.86, 500, 1500, "/bitrix/components/bitrix/landing.pub/templates/.default/style.css-41"], "isController": false}, {"data": [0.995, 500, 1500, "/bitrix/js/landing/css/landing_public.css-26"], "isController": false}, {"data": [0.9975, 500, 1500, "/bitrix/templates/landing24/template_styles.css-32"], "isController": false}, {"data": [0.9825, 500, 1500, "/bitrix/js/main/sidepanel/css/sidepanel.css-35"], "isController": false}, {"data": [0.99, 500, 1500, "/bitrix/templates/landing24/assets/css/custom-grid.css-43"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/js/main/pageobject/pageobject.js-25"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/js/ui/fonts/opensans/ui.font.opensans.css-33"], "isController": false}, {"data": [0.955, 500, 1500, "/bitrix/js/main/popup/dist/main.popup.bundle.css-34"], "isController": false}, {"data": [0.0125, 500, 1500, "/bitrix/templates/landing24/assets/vendor/icon/far/font.woff-51"], "isController": false}, {"data": [0.475, 500, 1500, "/lp/bonus/-23"], "isController": false}, {"data": [0.645, 500, 1500, "/bitrix/templates/landing24/assets/vendor/bootstrap/bootstrap.css-40"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 5600, 0, 0.0, 814.0232142857146, 48, 14718, 174.0, 1691.4000000000033, 4770.649999999999, 8998.849999999997, 187.57327080890974, 8098.805064321303, 114.60993761513984], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/bitrix/templates/landing24/assets/vendor/bootstrap/bootstrap.css-29", 200, 0, 0.0, 373.49499999999983, 155, 1548, 319.0, 730.9, 898.7499999999998, 1309.8700000000001, 34.52442603141723, 1190.4521081477644, 21.375474710857933], "isController": false}, {"data": ["/bitrix/templates/landing24/theme.css-30", 200, 0, 0.0, 1238.0999999999995, 436, 8075, 1019.5, 2159.800000000001, 2817.0499999999965, 4769.540000000001, 13.643495463537759, 1295.5857962685038, 8.074177979398321], "isController": false}, {"data": ["/bitrix/js/main/core/core_fx.js-50", 200, 0, 0.0, 215.53999999999996, 77, 1627, 132.0, 389.2000000000001, 816.6999999999997, 1493.590000000003, 10.055809744079642, 54.393681809040174, 5.725133867967219], "isController": false}, {"data": ["/bitrix/js/main/sidepanel/css/sidepanel.css-48", 200, 0, 0.0, 187.085, 79, 1097, 134.0, 267.8, 619.5999999999997, 945.6100000000013, 10.115314586283633, 35.52213989480073, 6.005968035605908], "isController": false}, {"data": ["/bitrix/js/landing/css/landing_public.css-39", 200, 0, 0.0, 147.375, 75, 557, 112.0, 241.9, 414.84999999999997, 552.7700000000002, 12.302392815402595, 7.701009565110414, 7.268503567693916], "isController": false}, {"data": ["/bitrix/js/ui/design-tokens/dist/ui.design-tokens.css-45", 200, 0, 0.0, 206.6650000000001, 82, 1288, 138.5, 342.3000000000002, 791.6499999999999, 1102.3300000000006, 10.184336490477644, 49.608857826662586, 6.156351843364904], "isController": false}, {"data": ["/bitrix/templates/landing24/assets/css/custom-grid.css-31", 200, 0, 0.0, 124.68499999999997, 53, 2588, 106.0, 122.9, 171.44999999999987, 720.4800000000023, 19.580967299784607, 9.924337918543175, 11.836541756412766], "isController": false}, {"data": ["/bitrix/templates/landing24/template_styles.css-44", 200, 0, 0.0, 138.05999999999995, 88, 778, 111.0, 177.0, 247.84999999999997, 630.97, 12.25940909648155, 11.39741939438519, 7.326912467819051], "isController": false}, {"data": ["/bitrix/templates/landing24/assets/vendor/icon/far/font.woff2-49", 200, 0, 0.0, 7130.145000000001, 2404, 14718, 6800.0, 10397.8, 11716.699999999999, 14481.54000000001, 8.734387282732117, 2987.476048672373, 5.305457900253297], "isController": false}, {"data": ["/bitrix/js/ui/design-tokens/dist/ui.design-tokens.css-27", 200, 0, 0.0, 116.31999999999998, 50, 590, 106.0, 194.7000000000003, 256.5999999999999, 588.7700000000002, 38.306837770542046, 186.59619804635128, 23.23100220264317], "isController": false}, {"data": ["/bitrix/js/main/popup/dist/main.popup.bundle.css-47", 200, 0, 0.0, 244.26999999999998, 77, 1476, 168.0, 424.4000000000001, 712.1499999999992, 1469.88, 10.148678134672958, 74.75730387679505, 6.085242553407419], "isController": false}, {"data": ["/bitrix/js/ui/fonts/opensans/ui.font.opensans.css-46", 200, 0, 0.0, 172.51999999999995, 77, 1476, 125.0, 256.10000000000014, 519.7999999999997, 905.3600000000015, 10.219724067450178, 7.72467424629535, 6.12784236075626], "isController": false}, {"data": ["/bitrix/templates/landing24/assets/vendor/icon/icon-finance/font.woff-36", 200, 0, 0.0, 931.2199999999999, 240, 7608, 755.0, 1524.5000000000002, 2019.3499999999979, 6737.1900000000305, 12.377769525931427, 691.1485409704171, 7.639404629285802], "isController": false}, {"data": ["/bitrix/templates/landing24/assets/vendor/icon/icon-food/font.woff-24", 200, 0, 0.0, 874.2950000000002, 304, 3132, 761.5, 1521.4, 1984.0499999999984, 3025.6400000000003, 19.447685725398678, 1704.6162424640218, 11.945892891870866], "isController": false}, {"data": ["/lp/job/-38", 200, 0, 0.0, 450.18500000000006, 200, 1686, 408.0, 727.9, 869.7499999999998, 1316.4300000000014, 12.169891687963977, 169.00776638751975, 8.889725568942437], "isController": false}, {"data": ["/bitrix/templates/landing24/theme.css-42", 200, 0, 0.0, 1875.66, 541, 6235, 1503.0, 3255.0, 4184.199999999998, 5688.260000000006, 9.939863823865613, 943.8890804383481, 5.862966552358233], "isController": false}, {"data": ["/bitrix/components/bitrix/landing.pub/templates/.default/style.css-28", 200, 0, 0.0, 252.56999999999994, 53, 1792, 202.5, 514.1000000000001, 731.0999999999991, 1683.0900000000026, 27.70466823659787, 517.2981022302258, 17.15308560742485], "isController": false}, {"data": ["/bitrix/components/bitrix/landing.pub/templates/.default/style.css-41", 200, 0, 0.0, 442.95000000000005, 99, 2926, 321.5, 881.6, 1073.6999999999998, 2832.8100000000113, 11.946717639328595, 223.0676184218386, 7.373364793023117], "isController": false}, {"data": ["/bitrix/js/landing/css/landing_public.css-26", 200, 0, 0.0, 108.58000000000001, 48, 752, 103.0, 118.0, 183.64999999999992, 731.2700000000025, 38.74467260751647, 24.25325697404107, 22.966812766369625], "isController": false}, {"data": ["/bitrix/templates/landing24/template_styles.css-32", 200, 0, 0.0, 111.16499999999996, 54, 741, 107.0, 121.0, 136.95, 435.9100000000001, 19.782393669634025, 18.391444114737883, 11.861708704253216], "isController": false}, {"data": ["/bitrix/js/main/sidepanel/css/sidepanel.css-35", 200, 0, 0.0, 137.76999999999998, 67, 879, 110.0, 174.0, 275.84999999999997, 841.850000000002, 13.850415512465373, 48.638763850415515, 8.2507358033241], "isController": false}, {"data": ["/bitrix/templates/landing24/assets/css/custom-grid.css-43", 200, 0, 0.0, 138.14000000000001, 91, 621, 113.0, 192.10000000000005, 262.0499999999998, 548.95, 12.211503236048358, 6.1892286909268535, 7.357907711564294], "isController": false}, {"data": ["/bitrix/js/main/pageobject/pageobject.js-25", 200, 0, 0.0, 92.06500000000004, 50, 190, 102.0, 118.9, 132.79999999999995, 182.95000000000005, 39.20799843168006, 28.41048323858067, 22.667124093315035], "isController": false}, {"data": ["/bitrix/js/ui/fonts/opensans/ui.font.opensans.css-33", 200, 0, 0.0, 113.89500000000001, 52, 454, 108.0, 130.9, 170.1499999999998, 440.62000000000035, 19.377967251235344, 14.647018215289217, 11.657058424571263], "isController": false}, {"data": ["/bitrix/js/main/popup/dist/main.popup.bundle.css-34", 200, 0, 0.0, 185.86499999999998, 72, 1438, 112.5, 434.2000000000001, 627.4999999999997, 1251.3000000000034, 13.917884481558803, 102.52207289491997, 8.372477383437717], "isController": false}, {"data": ["/bitrix/templates/landing24/assets/vendor/icon/far/font.woff-51", 200, 0, 0.0, 5048.9050000000025, 877, 13452, 4886.0, 8237.6, 9004.7, 12468.040000000008, 9.68007356855912, 3495.225001210009, 5.870435240307826], "isController": false}, {"data": ["/lp/bonus/-23", 200, 0, 0.0, 958.5149999999998, 449, 2066, 878.0, 1529.9, 1734.2499999999998, 1961.8100000000002, 30.926240915416734, 277.3165687335705, 22.892666615122934], "isController": false}, {"data": ["/bitrix/templates/landing24/assets/vendor/bootstrap/bootstrap.css-40", 200, 0, 0.0, 776.6099999999999, 203, 5427, 560.0, 1456.2000000000003, 1720.9999999999998, 4211.0200000000095, 11.386927806877704, 392.63772845023914, 7.027869505807333], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 5600, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
