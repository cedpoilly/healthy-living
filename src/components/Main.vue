<template>
  <v-layout>
    <v-flex>
      <v-sheet height="500">
        <v-calendar :now="calendarDate" :value="calendarDate" color="primary">
          <template v-slot:day="{ date }">
            <template v-for="event in eventsMap[date]">
              <v-menu
                :key="event.title"
                v-model="event.open"
                full-width
                offset-x
              >
                <template v-slot:activator="{ on }">
                  <div
                    v-if="!event.time"
                    v-ripple
                    class="my-event"
                    v-on="on"
                    v-html="event.title"
                  ></div>
                </template>

                <v-card color="grey lighten-4" min-width="350px" flat>
                  <v-toolbar color="primary" dark>
                    <v-toolbar-title v-html="event.title"></v-toolbar-title>
                  </v-toolbar>

                  <v-card-text primary-title>
                    <pre v-for="(item, index) in event.linkedItems" :key="index"
                      >{{ JSON.stringify(item, null, 2) }}
                      </pre
                    >
                  </v-card-text>
                  <v-card-actions>
                    <v-btn flat color="secondary">
                      Dismiss
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </template>
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
import { renameProp } from "../helpers/rename-fields";

export default {
  name: "Main",

  created() {
    const url =
      "https://us-central1-healthyliving-mroswell.cloudfunctions.net/app/sheet-data";

    (async () => {
      const response = await fetch(url);
      const records = await response.json();

      const formattedRecordMap = records.reduce(this.recordReducer, {});
      this.events = Object.values(formattedRecordMap);
    })();
  },

  data: function() {
    return {
      calendarDate: "2019-09-01",

      events: []
    };
  },

  computed: {
    eventsMap() {
      const map = {};
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      return map;
    }
  },

  methods: {
    open(event) {
      alert(event.title);
    },

    recordReducer(map, record) {
      if (record.parent_ID) {
        map = this.assignChild(record, map);
      } else {
        const updateRecord = this.formatRecord({ ...record });
        map[record.ID] = updateRecord;
      }

      return map;
    },

    assignChild(child, map) {
      if (!map[child.parent_ID]) {
        map[child.parent_ID] = {};
      }

      if (!map[child.parent_ID].linkedItems) {
        map[child.parent_ID].linkedItems = [];
      }

      map[child.parent_ID].linkedItems = [
        ...map[child.parent_ID].linkedItems,
        child
      ];

      return map;
    },

    formatRecord(record) {
      let updateRecord = { ...record };

      updateRecord = renameProp("Start Date", "startDate", updateRecord);
      updateRecord = renameProp("End Date", "endDate", updateRecord);
      updateRecord = renameProp("Subject", "title", updateRecord);

      const { startDate, title } = updateRecord;

      const formattedDate = (() => {
        const [month, date, year] = startDate.split("/");
        const paddedDate = date.padStart(2, "0");
        const paddedMonth = month.padStart(2, "0");

        return `${year}-${paddedMonth}-${paddedDate}`;
      })();

      return { date: formattedDate, title, open: false };
    }
  }
};
</script>

<style>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
</style>
