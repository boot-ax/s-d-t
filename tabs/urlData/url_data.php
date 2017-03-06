<?php

// require_once $_SERVER['DOCUMENT_ROOT'] . '/ose-majestic.php';
//
//
// $domains = unprocessed_urls($con, 4, 20);
// if(sizeof($domains)>0){
//   echo "   - Loaded ".sizeof($domains)." domains to run through mozscape.\n";
//   mozChecks($domains,$con);
// }


 ?>

<md-toolbar class="md-table-toolbar md-default" ng-hide="selected.length || filter.show" aria-hidden="false">
  <div class="md-toolbar-tools">
    <h2 class="md-title">URL Information</h2>
    <div flex="" class="flex"></div>
    <button class="md-icon-button md-button md-ink-ripple" type="button" ng-click="filter.show = true" aria-label="filter_list">
      <md-icon class="material-icons">search</md-icon>
    </button>
    <button class="md-icon-button md-button md-ink-ripple" type="button" ng-click="bulkDownload($event,url_data_tables.data,$file,$header,$location)" aria-label="bulk_download">
      <i class="material-icons">file_download</i>
    </button>
    <button class="md-icon-button md-button md-ink-ripple" type="button" ng-click="addItem($event)" aria-label="local_dining">
      <md-icon class="material-icons">add_circle</md-icon>
    </button>
  </div>
</md-toolbar>

<md-toolbar class="md-table-toolbar md-default ng-hide" ng-show="filter.show && !selected.length" aria-hidden="true">
  <div class="md-toolbar-tools">
    <md-icon class="material-icons">search</md-icon>
    <form flex="" name="filter.form" class="ng-pristine ng-valid flex">
      <input ng-model="query.filter" ng-model-options="filter.options" placeholder="search" class="ng-pristine ng-untouched ng-valid" aria-invalid="false" type="text">
    </form>
    <button class="md-icon-button md-button md-ink-ripple" type="button" ng-click="removeFilter()" aria-label="close">
      <md-icon class="material-icons">close</md-icon>
    </button>
  </div>
</md-toolbar>

<md-toolbar class="md-table-toolbar alternate ng-hide" ng-show="selected.length" aria-hidden="true">
  <div class="md-toolbar-tools layout-align-space-between-stretch" layout-align="space-between">
<div>{{selected.length}} {{selected.length > 1 ? 'items' : 'item'}} selected</div>
<button class="md-icon-button md-button md-ink-ripple" type="button" ng-click="delete($event)" aria-label="delete">
      <md-icon class="material-icons">delete</md-icon>
    </button>
  </div>
</md-toolbar>

<!-- exact table from live demo -->
<md-table-container>
  <table md-table md-row-select ng-model="selected" md-progress="promise">
    <thead md-head md-order="query.order" md-on-reorder="getDesserts">
      <tr md-row>
        <th md-column md-order-by="url_name"><span>URL Name</span></th>
        <th md-column md-numeric md-order-by="crawl_frequency"><span>Crawl Frequency</span></th>
        <th md-column md-numeric md-order-by="domain_authority"><span>DA</span></th>
        <th md-column md-numeric md-order-by="page_authority"><span>PA</span></th>
        <th md-column md-numeric md-order-by="tf"><span>TF</span></th>
        <th md-column md-numeric md-order-by="cf"><span>CF</span></th>
        <th md-column md-numeric md-order-by="status_code"><span>Status Code</span></th>
        <th md-column md-numeric md-order-by="ose_num_links"><span>OSE Num Links</span></th>
        <th md-column md-numeric md-order-by="ose_external_equity"><span>OSE External Equity</span></th>
        <th md-column md-numeric md-order-by="majestic_num_links"><span>Majestic Num Links</span></th>
      </tr>
    </thead>
    <tbody md-body>
      <tr md-row md-select="url_data_table" md-select-id="name" ng-repeat="url_data_table in url_data_tables.data">
        <td md-cell="" ng-click="changeCellText($event, url_data_table, 'url_name',dbTableInfo.db_table,dbTableInfo.db_ID)" placeholder="{{url_data_table.url_name}} "
        aria-label="url_data_table.url_name" class="md-cell ng-binding md-clickable" tabindex="0">{{url_data_table.url_name}}</td>
        <td md-cell="" ng-click="changeCellText($event, url_data_table, 'crawl_frequency',dbTableInfo.db_table,dbTableInfo.db_ID,382)" placeholder="{{url_data_table.crawl_frequency}} "
        class="md-cell ng-binding md-clickable" tabindex="0">{{url_data_table.crawl_frequency}}</td>
        <td md-cell="" ng-click="changeCellText($event, url_data_table, 'domain_authority',dbTableInfo.db_table,dbTableInfo.db_ID,382)" placeholder="{{url_data_table.domain_authority}} "
        class="md-cell ng-binding md-clickable" tabindex="0">{{url_data_table.domain_authority}}</td>
        <td md-cell="" ng-click="changeCellText($event, url_data_table, 'page_authority',dbTableInfo.db_table,dbTableInfo.db_ID,382)" placeholder="{{url_data_table.page_authority}} "
        class="md-cell ng-binding md-clickable" tabindex="0">{{url_data_table.page_authority}}</td>
        <td md-cell="" ng-click="changeCellText($event, url_data_table, 'tf',dbTableInfo.db_table,dbTableInfo.db_ID,382)" placeholder="{{url_data_table.tf}} "
        class="md-cell ng-binding md-clickable" tabindex="0">{{url_data_table.tf}}</td>
        <td md-cell="" ng-click="changeCellText($event, url_data_table, 'cf',dbTableInfo.db_table,dbTableInfo.db_ID)" placeholder="{{url_data_table.cf}} "
        class="md-cell ng-binding md-clickable" tabindex="0">{{url_data_table.cf}}</td>
        <td md-cell="" ng-click="changeCellText($event, url_data_table, 'status_code',dbTableInfo.db_table,dbTableInfo.db_ID)" placeholder="{{url_data_table.status_code}} "
        class="md-cell ng-binding md-clickable" tabindex="0">{{url_data_table.status_code}}</td>
        <td md-cell="" ng-click="changeCellText($event, url_data_table, 'ose_num_links',dbTableInfo.db_table,dbTableInfo.db_ID)" placeholder="{{url_data_table.ose_num_links}} "
        class="md-cell ng-binding md-clickable" tabindex="0">{{url_data_table.ose_num_links}}</td>
        <td md-cell="" ng-click="changeCellText($event, url_data_table, 'ose_num_links',dbTableInfo.db_table,dbTableInfo.db_ID)" placeholder="{{url_data_table.ose_external_equity}} "
        class="md-cell ng-binding md-clickable" tabindex="0">{{url_data_table.ose_external_equity}}</td>
        <td md-cell="" ng-click="changeCellText($event, url_data_table, 'majestic_num_links',dbTableInfo.db_table,dbTableInfo.db_ID)" placeholder="{{url_data_table.majestic_num_links}} "
        class="md-cell ng-binding md-clickable" tabindex="0">{{url_data_table.cf}}</td>
      </tr>
    </tbody>
  </table>
</md-table-container>

<md-table-pagination md-limit="query.limit" md-limit-options="[15, 30, 45]" md-page="query.page" md-total="{{url_data_tables.count}}" md-on-paginate="getDesserts" md-page-select></md-table-pagination>
