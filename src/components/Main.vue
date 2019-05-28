<template>
  <div id="app">
    <div class="calendar-parent">
      <calendar-view
        :events="events"
        :show-date="showDate"
        :time-format-options="{ hour: 'numeric', minute: '2-digit' }"
        :enable-drag-drop="true"
        :disable-past="disablePast"
        :disable-future="disableFuture"
        :show-event-times="showEventTimes"
        :display-period-uom="displayPeriodUom"
        :display-period-count="displayPeriodCount"
        :starting-day-of-week="startingDayOfWeek"
        :class="themeClasses"
        :period-changed-callback="periodChanged"
        :current-period-label="useTodayIcons ? 'icons' : ''"
        @drop-on-date="onDrop"
        @click-date="onClickDay"
        @click-event="onClickEvent"
      >
        <calendar-view-header
          slot="header"
          slot-scope="{ headerProps }"
          :header-props="headerProps"
          @input="setShowDate"
        />
      </calendar-view>
    </div>
  </div>
</template>

<script>
import {
  CalendarView,
  CalendarViewHeader,
  CalendarMathMixin
} from "vue-simple-calendar";

require("vue-simple-calendar/static/css/default.css");
require("vue-simple-calendar/static/css/holidays-us.css");

import { renameProp } from "../helpers/rename-fields";

export default {
  name: "Main",

  components: {
    CalendarView,
    CalendarViewHeader
  },

  mixins: [CalendarMathMixin],

  created() {
    const url =
      "https://us-central1-healthyliving-mroswell.cloudfunctions.net/app/sheet-data";

    (async () => {
      const response = await fetch(url);
      const records = await response.json();

      const formattedRecords = records.reduce(this.recordReducer, []);

      this.events = formattedRecords;
    })();
  },

  data: function() {
    return {
      showDate: this.thisMonth(1),

      message: "",

      startingDayOfWeek: 1,

      disablePast: false,
      disableFuture: false,
      displayPeriodUom: "month",
      displayPeriodCount: 1,

      showEventTimes: true,

      newEventTitle: "",
      newEventStartDate: "",
      newEventEndDate: "",

      useDefaultTheme: true,
      useHolidayTheme: true,
      useTodayIcons: false,

      events: []
    };
  },

  computed: {
    userLocale() {
      return this.getDefaultBrowserLocale;
    },

    dayNames() {
      return this.getFormattedWeekdayNames(this.userLocale, "long", 0);
    },

    themeClasses() {
      return {
        "theme-default": this.useDefaultTheme,
        "holiday-us-traditional": this.useHolidayTheme,
        "holiday-us-official": this.useHolidayTheme
      };
    }
  },

  mounted() {
    this.newEventStartDate = this.isoYearMonthDay(this.today());
    this.newEventEndDate = this.isoYearMonthDay(this.today());
  },

  methods: {
    periodChanged(range, eventSource) {
      // Demo does nothing with this information, just including the method to demonstrate how
      // you can listen for changes to the displayed range and react to them (by loading events, etc.)
      console.log(eventSource);
      console.log(range);
    },

    thisMonth(d, h, m) {
      const t = new Date();
      return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0);
    },

    onClickDay(d) {
      this.message = `You clicked: ${d.toLocaleDateString()}`;
    },

    onClickEvent(e) {
      this.message = `You clicked: ${e.title}`;
    },

    setShowDate(d) {
      this.message = `Changing calendar view to ${d.toLocaleDateString()}`;
      this.showDate = d;
    },

    onDrop(event, date) {
      this.message = `You dropped ${event.id} on ${date.toLocaleDateString()}`;
      // Determine the delta between the old start date and the date chosen,
      // and apply that delta to both the start and end date to move the event.
      const eLength = this.dayDiff(event.startDate, date);
      event.originalEvent.startDate = this.addDays(event.startDate, eLength);
      event.originalEvent.endDate = this.addDays(event.endDate, eLength);
    },

    recordReducer(filteredArray, record) {
      if (record.parent_ID) {
        return filteredArray;
      }

      const updateRecord = this.formatValues(this.formatRecord({ ...record }));

      filteredArray = [...filteredArray, updateRecord];

      return filteredArray;
    },

    formatRecord(record) {
      let updateRecord = { ...record };

      updateRecord = renameProp("Start Date", "startDate", updateRecord);
      updateRecord = renameProp("End Date", "endDate", updateRecord);
      updateRecord = renameProp("Subject", "title", updateRecord);
      updateRecord = renameProp("ID", "id", updateRecord);

      return updateRecord;
    },

    formatValues(record) {
      const day = new Date(record.startDate).getDate();
      record.startDate = this.thisMonth(day);
      record.endDate = this.thisMonth(day);
      record.id = `e${record.id}`;

      return record;
    }
  }
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  background-color: #f7fcff;
}
#app {
  display: flex;
  flex-direction: row;
  font-family: Calibri, sans-serif;
  width: 95vw;
  min-width: 30rem;
  max-width: 100rem;
  min-height: 40rem;
  margin-left: auto;
  margin-right: auto;
}
.calendar-controls {
  margin-right: 1rem;
  min-width: 14rem;
  max-width: 14rem;
}
.calendar-parent {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: hidden;
  max-height: 80vh;
  background-color: white;
}
/* For long calendars, ensure each week gets sufficient height. The body of the calendar will scroll if needed */
.cv-wrapper.period-month.periodCount-2 .cv-week,
.cv-wrapper.period-month.periodCount-3 .cv-week,
.cv-wrapper.period-year .cv-week {
  min-height: 6rem;
}
/* These styles are optional, to illustrate the flexbility of styling the calendar purely with CSS. */
/* Add some styling for events tagged with the "birthday" class */
.theme-default .cv-event.birthday {
  background-color: #e0f0e0;
  border-color: #d7e7d7;
}
.theme-default .cv-event.birthday::before {
  content: "\1F382"; /* Birthday cake */
  margin-right: 0.5em;
}
</style>
