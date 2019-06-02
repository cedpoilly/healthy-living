<template>
  <div>
    <h1>{{ currentMonthLabel }} {{ currentYearLabel }}</h1>

    <FullCalendar
      ref="fullCalendar"
      defaultView="dayGridMonth"
      :header="{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      }"
      :plugins="calendarPlugins"
      :weekends="calendarWeekends"
      :events="events"
      @eventRender="eventRender"
      @eventClick="onEventSelected"
    />
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  name: "Main",

  components: {
    FullCalendar
  },

  data() {
    return {
      currentMonthLabel: "",
      currentYearLabel: "",

      calendarApi: null,

      calendarPlugins: [
        dayGridPlugin,
        interactionPlugin // needed for dateClick
      ],

      calendarWeekends: true,

      alreadyDisplayedItems: [],

      events: [
        {
          isMain: true,
          start: "2019-09-09T11:00:00",
          end: "2019-09-17T00:00:00",
          title: "All Staff meeting (6 people)",
          linkedItems: [
            {
              start: "2019-09-16T11:00:00",
              end: "2019-09-16",
              title: "Order Ingredients for Lentil Sweet Potato Stew"
            },
            {
              start: "2019-09-09T10:00:00",
              end: "2019-09-17T10:15:00",
              title: "Prepare Stew"
            }
          ]
        },
        {
          isMain: true,
          start: "2019-09-08T07:05:00",
          end: "2019-09-08T07:11:00",
          title: "Morning Shower",
          linkedItems: [
            {
              start: "2019-09-08T07:00:00",
              end: "2019-09-08T07:00:00",
              title: "Start veggies in electric steamer"
            },
            {
              start: "2019-09-08T07:15:00",
              end: "2019-09-08T07:20:00",
              title: "Eat half the veggies"
            },
            {
              start: "2019-09-08T07:21:00",
              end: "2019-09-08T07:23:00",
              title: "Pack lunch (rice, veggies, fruit), and go"
            }
          ]
        },
        {
          isMain: true,
          start: "2019-09-23",
          end: "2019-09-23",
          title: "National Voter Registration Day",
          linkedItems: [
            {
              start: "2019-09-23T20:00:00",
              end: "2019-09-23T20:10:00",
              title: "Make sure you've got flax and cinnamon"
            },
            {
              start: "2019-09-20T08:00:00",
              end: "2019-09-27",
              title: "Register voters at the farmers market"
            }
          ]
        },
        {
          isMain: true,
          start: "2019-09-21",
          end: "2019-09-21",
          title: "Honor World Rhino Day"
        },
        {
          isMain: true,
          start: "2019-09-07T23:00:00",
          end: "2019-09-07T23:00:00",
          title: "Bed Time",
          linkedItems: [
            {
              start: "2019-09-07T22:45:00",
              end: "2019-09-07T22:55:00",
              title: "Start Overnight Rice"
            }
          ]
        },
        {
          isMain: true,
          start: "2019-09-14T10:00:00",
          end: "2019-09-12",
          title: "Conference",
          linkedItems: [
            {
              start: "2019-09-11T10:10:00",
              end: "2019-09-11",
              title: "Pack Healthy Campaign Travel Kit"
            },
            {
              start: "2019-09-11",
              end: "2019-09-11",
              title: "Order Ingredients for Conference Delivery"
            }
          ]
        },
        {
          isMain: true,
          start: "2019-09-22",
          end: "2019-09-22",
          title: "Autumnal Equinox",
          linkedItems: [
            {
              start: "2019-09-22",
              end: "2019-09-22",
              title: "Google: Seasonal Vegetable Chart."
            },
            {
              start: "2019-09-22",
              end: "2019-09-22",
              title: "Plan Rosh Hashanah Meals"
            }
          ]
        },
        {
          isMain: true,
          start: "2019-09-03T23:00:00",
          end: "2019-09-03T23:10:00",
          title: "Find yourself sharing cat videos",
          linkedItems: [
            {
              start: "2019-09-03T23:10:00",
              end: "2019-09-03T23:15:00",
              title: "Refresh your Travel Kit."
            }
          ]
        },
        {
          isMain: true,
          start: "2019-09-28T17:00:00",
          end: "2019-09-28",
          title: "Rosh Hashanah Dinner",
          linkedItems: [
            {
              start: "2019-09-28T15:30:00",
              end: "2019-09-28T16:40:00",
              title: "Cook with all the devices"
            }
          ]
        }
      ]
    };
  },

  mounted() {
    this.calendarApi = this.$refs.fullCalendar.getApi();

    const currentMonthDate = this.events[0].start;

    this.setCalendarDateFromEvents(this.calendarApi, currentMonthDate);

    this.setCurrentLabels(currentMonthDate);
  },

  methods: {
    setCalendarDateFromEvents(api, currentMonthDate) {
      api.gotoDate(currentMonthDate);
    },

    setCurrentLabels(currentMonthDate) {
      const dateObject = new Date(currentMonthDate);

      this.currentMonthLabel = dateObject.toLocaleString("en-us", {
        month: "long"
      });

      this.currentYearLabel = dateObject.getFullYear();
    },

    // eslint-disable-next-line
    onEventSelected({ el, event, jsEvent, view }) {
      let linkedItems = event._def.extendedProps.linkedItems;

      if (!linkedItems) {
        return;
      }

      linkedItems.forEach(this.handleLinkedItem);
    },

    handleLinkedItem(item, itemIndex) {
      setTimeout(() => {
        this.displayLinkedItemIfNotYetDone(item);

        const delay = 1000;
        this.markItemAsDisplayedAfterDelay(item, itemIndex, delay);
      }, 1000 * itemIndex);
    },

    displayLinkedItemIfNotYetDone(item) {
      const alreadyDisplayed = this.checkAlreadyDisplayed(
        item,
        "title",
        this.alreadyDisplayedItems
      );

      if (alreadyDisplayed) {
        return;
      }

      this.events.push(item);
    },

    markItemAsDisplayedAfterDelay(item, itemIndex, delay) {
      setTimeout(() => {
        this.alreadyDisplayedItems = [...this.alreadyDisplayedItems, item];
      }, delay * itemIndex);
    },

    eventRender(info) {
      const isMain = info.event._def.extendedProps.isMain;

      const alreadyDisplayed = this.checkAlreadyDisplayed(
        info.event._def,
        "title",
        this.alreadyDisplayedItems
      );

      if (!isMain && !alreadyDisplayed) {
        info.el.classList.add("appear");
      }
    },

    checkAlreadyDisplayed(itemToCheck, fieldName, list) {
      const item = list.find(item => {
        return itemToCheck[fieldName] === item[fieldName];
      });

      return !!item;
    }
  }
};
</script>

<style lang="scss">
@keyframes expand {
  0% {
    height: 0.5rem !important;
  }

  100% {
    height: 1rem !important;
    opacity: 1;
    display: block;
    top: 0;
  }
}
.fc-day-grid-event.fc-h-event.fc-event.appear {
  opacity: 0;
  top: -1rem;
  animation-name: expand;
  animation-duration: 0.5s;
  animation-delay: 0.2s;
  animation-fill-mode: forwards;
}

/* Fix scrolling */
.fc-scroller.fc-day-grid-container {
  height: 100% !important;
  overflow-y: visible !important;
}

.fc-row.fc-widget-header {
  margin-right: 0 !important;
  border-right: none;
}

/* Hide toolbar */
.fc-toolbar.fc-header-toolbar {
  display: none;
}

/* Fix months header */
.fc-row.fc-widget-header table thead tr {
  text-align: right;
}

/* Handle events visuals */

.fc-day-header.fc-widget-header {
  text-align: right !important;
  padding-right: 0.6rem;
}

.fc-day-header.fc-widget-header {
  font-weight: normal;
  font-size: 0.8rem;
}

.fc-title {
  white-space: pre-wrap;
}

.fc-day-number {
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.75rem;
}

.fc-content {
  cursor: pointer;
  padding-left: 0.25rem;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.fc-time {
  display: none;
}

.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end {
  margin: auto 0.35rem auto 0.35rem;
  border: none;
  border-radius: 0;
  padding-top: 0.125rem;
  background-color: rgb(159, 168, 218);
}

.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-not-end,
.fc-day-grid-event.fc-h-event.fc-event.fc-not-start.fc-end {
  padding-top: 0.125rem;
  border: none;
  border-radius: 0;
  background-color: rgb(165, 215, 167);
}

.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-not-end {
  margin-left: 0.35rem;
}
.fc-day-grid-event.fc-h-event.fc-event.fc-not-start.fc-end {
  margin-left: 0.35rem;
  margin-right: 0.35rem;
}

.fc .fc-row .fc-content-skeleton table,
.fc .fc-row .fc-content-skeleton td,
.fc .fc-row .fc-helper-skeleton td {
  background: none !important;
  border-color: transparent;
  border-radius: 0;
}
</style>
