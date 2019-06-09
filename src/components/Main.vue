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

    <Dialog
      :show="showDialog"
      v-bind="dialogData"
      @closed="onCloseDialog"
      @md-closed="onCloseDialog"
    />
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import Dialog from "./Dialog.vue";

import { setTimingString } from "@/helpers/animation.js";
import {
  getItemAndIndex,
  removeItemFromList,
  isPresentInList,
  isLastInList
} from "@/helpers/filtering.js";

import { executeAfterDelay } from "@/helpers/delay-execution.js";
export default {
  name: "Main",

  components: {
    FullCalendar,
    Dialog
  },

  data() {
    return {
      showDialog: false,
      dialogData: {
        title: "",
        content: ""
      },

      animationConfig: { duration: 0, delay: 0 },

      currentMonthLabel: "",
      currentYearLabel: "",

      calendarApi: null,

      calendarPlugins: [
        dayGridPlugin,
        interactionPlugin // needed for dateClick
      ],

      calendarWeekends: true,

      displayedItems: [],
      itemsToRemove: [],

      events: []
    };
  },

  created() {
    this.fetchAnimationConfig().then(this.applyAnimationTiming);
  },

  mounted() {
    const url = `${process.env.VUE_APP_BASE_URL}/data/events.json`;

    fetch(url)
      .then(response => response.json())
      .then(events => (this.events = events))
      .then(() => {
        this.calendarApi = this.$refs.fullCalendar.getApi();

        const currentMonthDate = this.events[0].start;

        this.setCalendarDateFromEvents(this.calendarApi, currentMonthDate);

        this.setCurrentLabels(currentMonthDate);

        const sortString = "start"; // kept as ref: "-isMain, start"
        this.calendarApi.setOption("eventOrder", sortString);
      });
  },

  methods: {
    async fetchAnimationConfig() {
      const url = `${process.env.VUE_APP_BASE_URL}/config/animation.json`;
      const getJson = response => response.json();

      return await fetch(url).then(getJson);
    },

    applyAnimationTiming({ duration, delay, timingFunction }) {
      this.animationConfig = { duration, delay };

      const root = document.documentElement;

      root.style.setProperty("--anim-duration", setTimingString(duration));
      root.style.setProperty("--anim-delay", setTimingString(delay));
      root.style.setProperty("--anim-timing-function", timingFunction);
    },

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
      const description = event._def.extendedProps.description;

      if (description) {
        this.handleItemWithDescription(event);
      }

      const linkedItems = event._def.extendedProps.linkedItems;

      if (!linkedItems) {
        return;
      }

      const expanded = event._def.extendedProps.isExpanded;
      if (expanded) {
        const config = { event, list: this.events, expanded: false };
        this.hideLinkedItems(linkedItems);
        this.toggleExpandedOnMain(config);
      } else {
        const config = { event, list: [...this.events], expanded: true };
        this.handleLinkedItems(linkedItems);
        this.toggleExpandedOnMain(config);
      }
    },

    handleItemWithDescription(item) {
      const data = { ...item._def.extendedProps, ...item._def };

      const { title, description: content } = data;

      this.dialogData = { title, content };

      this.showDialog = true;
    },

    toggleExpandedOnMain({ event: eventToUpdate, list, expanded }) {
      const orig = list.find(event => event.title === eventToUpdate.title);
      const index = list.indexOf(orig);

      const updatedList = [...list];
      updatedList[index] = { ...orig, isExpanded: expanded };

      this.events = updatedList;
    },

    handleLinkedItems(linkedItems) {
      linkedItems.forEach(this.handleLinkedItem);
    },

    handleLinkedItem(item, itemIndex) {
      const delay =
        100 +
        (this.animationConfig.duration + this.animationConfig.delay) *
          itemIndex;

      executeAfterDelay(delay, () => {
        this.displayLinkedItemIfNotYetDone(item);
      }).then(() => {
        this.displayedItems = [...this.displayedItems, item];
      });
    },

    displayLinkedItemIfNotYetDone(item) {
      const alreadyDisplayed = isPresentInList(item, "title", this.events);

      if (alreadyDisplayed) {
        return;
      }

      this.events = [...this.events, item];
    },

    hideLinkedItems(linkedItems) {
      linkedItems.forEach(this.hideLinkedItem);
    },

    hideLinkedItem(item) {
      this.itemsToRemove = [...this.itemsToRemove, item];
    },

    eventRender(info) {
      const isMain = info.event._def.extendedProps.isMain;
      if (isMain) {
        return;
      }

      info.el.classList.add("is-sub");

      const isLast = isLastInList(this.events, info.event.title, "title");

      if (!isLast) {
        return;
      }

      const displayed = isPresentInList(
        info.event,
        "title",
        this.displayedItems
      );

      const toRemove = isPresentInList(info.event, "title", this.itemsToRemove);

      // * only adding a class as the state was modified already
      if (!displayed) {
        info.el.classList.toggle("appear");
      }

      // * much more data processing here as everything happens in reverse
      if (toRemove) {
        const { item } = getItemAndIndex(
          this.events,
          info.event._def.title,
          "title"
        );

        this.itemsToRemove = removeItemFromList(this.itemsToRemove, item);

        const animDelay = 100; // just to prevent the animation to start when the row jump happens
        const stateAffectDelay = this.animationConfig.duration;

        this.handleItemRemoval({ info, item, animDelay, stateAffectDelay });
      }
    },

    async handleItemRemoval({ info, item, animDelay, stateAffectDelay }) {
      await Promise.resolve();

      await executeAfterDelay(animDelay, () => info.el.classList.add("remove"));

      await executeAfterDelay(stateAffectDelay, () => {
        this.events = removeItemFromList(this.events, item);
        this.displayedItems = removeItemFromList(this.displayedItems, item);
      });
    },

    onCloseDialog() {
      this.showDialog = false;
    }
  }
};
</script>

<style lang="scss">
:root {
  --anim-duration: 0.5s;
  --anim-delay: 0.2s;
  --anim-timing-function: linear;
}
// overrides of md theme
.md-theme-default a:not(.md-button) {
  color: white;
}
.md-theme-default a:not(.md-button) {
  text-decoration: none !important;
  color: white !important;
}

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
  animation-duration: var(--anim-duration);
  animation-delay: var(--animation-delay);
  animation-timing-function: var(--animation-timing-function);
  animation-fill-mode: forwards;
}
@keyframes collapse {
  100% {
    height: 0.5rem !important;
  }

  0% {
    height: 1rem !important;
    opacity: 1;
    display: block;
    top: 0;
  }
}
.fc-day-grid-event.fc-h-event.fc-event.remove {
  opacity: 0;
  top: -1rem;
  animation-name: collapse;
  animation-duration: var(--anim-duration);
  animation-delay: var(--animation-delay);
  animation-timing-function: var(--animation-timing-function);
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

  &.is-sub {
    background-color: rgb(196, 159, 218);
  }
}

.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-not-end,
.fc-day-grid-event.fc-h-event.fc-event.fc-not-start.fc-end {
  padding-top: 0.125rem;
  border: none;
  border-radius: 0;
  background-color: rgb(165, 215, 167);

  &.is-sub {
    background-color: rgb(196, 159, 218);
  }
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
