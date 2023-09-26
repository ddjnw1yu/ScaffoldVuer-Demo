<template>
  <div>
    <div>
      <el-button 
        data-cy="showNote"
        :icon="handleNoteIcon()"
        size="mini"
        @click="handleShowColumn('note')"
      >
        {{show.note ? "Hide" : "Show"}} Note
      </el-button>
    </div>
    <br>
    <el-input
      data-cy="searchInput"
      v-model="search"
      size="mini"
      placeholder="Type to search"
    />
    <el-table
      :data="tableData.filter(
        data => !search || 
          data.Organ.toLowerCase().includes(search.toLowerCase()) ||
          data.Species.toLowerCase().includes(search.toLowerCase()) ||
          this.handleSearchInNote(data))"
      style="width: 100%;"
      max-height="600"
    >
      <el-table-column
        prop="Organ"
        label="Organ"
        width="100"
        sortable
      />
      <el-table-column
        prop="Species"
        label="Species"
        width="100"
        sortable
      />
      <el-table-column
        data-cy="noteColumn"
        prop="Note"
        label="Note"
        width="200"
        v-if="show.note"
      />
        <el-table-column
        prop="Last modified"
        label="Last modified"
        width="250"
        sortable
        :sort-method="handleSortByModifyTime"
      /> 
      <el-table-column
        fixed="right"
        label="Action"
        width="300"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleView(scope.row)"
          >
            View
          </el-button>
          <el-button
            size="mini"
            @click="handleDownload(scope.row)"
          >
            Download
          </el-button>
          <el-button
            v-if="scope.row.Discover !== 'Not even'"
            size="mini"
            @click="handleDiscover(scope.row)"
          >
            Discover
          </el-button>
          <el-button
            v-if="scope.row['Blackfynn dataset'] !== '/'"
            size="mini"
            @click="handleBlackfynn(scope.row)"
          >
            Blackfynn
          </el-button>
        </template>
      </el-table-column>   
    </el-table>
  </div>
</template>

<script>
/* eslint-disable no-alert, no-console */
import Vue from "vue";
import models from './ModelsInformation'
import { Button, Input, Table, TableColumn } from "element-ui";
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";

locale.use(lang);
Vue.use(Button);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);


export default {
  name: "ModelsTable",
  mixins: [models],
  data() {
    return {
      search: '',
    }
  },
  created: function() {
    this.getModelsInformation();
  },
  methods: {
    handleView: function(row) {
      this.$emit("viewModelClicked", row.Location);
    },
    handleDownload: function(row) {
      this.$emit("downloadModelClicked", row)
    },
    handleDiscover: function(row) {
      window.open(row.Discover, "_blank");
    },
    handleBlackfynn: function(row) {
      window.open(row['Blackfynn dataset'], "_blank");
    },
    handleNoteIcon: function () {
      if (this.show.note) {
        return "el-icon-notebook-2"
      }
      return "el-icon-notebook-1"
    },
    // Disable search in note when note column not show
    handleSearchInNote: function (data) {
      return this.show.note ? data.Note.toLowerCase().includes(this.search.toLowerCase()) : false
    },
    handleSortByModifyTime: function (a, b) {
      const msecA = Date.parse(a["Last modified"]);
      const msecB = Date.parse(b["Last modified"]);
      return msecA - msecB
    }
  }
};
</script>

<style scoped lang="scss">
@import "~element-ui/packages/theme-chalk/src/input";
@import "~element-ui/packages/theme-chalk/src/table";
@import "~element-ui/packages/theme-chalk/src/table-column";
</style>
