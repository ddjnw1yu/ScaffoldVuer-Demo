const { GoogleSpreadsheet } = require('google-spreadsheet');

/* eslint-disable no-alert, no-console */
export default {
  data: function() {
    return {
      tableData: [],
      show: {
        note: true
      }
    };
  },
  methods: {
    createTable: async function(sheetRows, keywords) {
      for (let i = 0; i < sheetRows.length; i++) {
        let mappedData = {};
        for (let j = 0; j < keywords.length; j++) {
          let keyword = keywords[j];
          mappedData[keyword] = sheetRows[i][keyword];
        }
        this.tableData.push(mappedData);
      }
    },
    getModelsInformation: async function() {
      const doc = new GoogleSpreadsheet(process.env.VUE_APP_GOOGLE_SPREADSHEET_ID);
      await doc.useServiceAccountAuth({
        private_key: process.env.VUE_APP_GOOGLE_PRIVATE_KEY,
        client_email: process.env.VUE_APP_GOOGLE_SERVICE_EMAIL
     });
      await doc.loadInfo(); // loads document properties and worksheets
      const sheet = doc.sheetsByIndex[0];
      const sheetRows = await sheet.getRows();
      const keys = ["Organ", "Species", "Note", "Location",
        "Last modified","Blackfynn dataset", "Published", "Discover"];
      this.createTable(sheetRows, keys);
    },
    handleShowColumn: function (columnName) {
      this.show[columnName] = !this.show[columnName]
    }
  }
}
