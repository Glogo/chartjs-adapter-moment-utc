/*!
  * chartjs-adapter-moment v1.1.0
  * https://www.chartjs.org
  * (c) 2023 chartjs-adapter-moment Contributors
  * Released under the MIT license
  */
import moment from 'moment';
import { _adapters } from 'chart.js';

const FORMATS = {
  datetime: 'MMM D, YYYY, h:mm:ss a',
  millisecond: 'h:mm:ss.SSS a',
  second: 'h:mm:ss a',
  minute: 'h:mm a',
  hour: 'hA',
  day: 'MMM D',
  week: 'll',
  month: 'MMM YYYY',
  quarter: '[Q]Q - YYYY',
  year: 'YYYY'
};

_adapters._date.override(typeof moment === 'function' ? {
  _id: 'moment', // DEBUG ONLY

  formats: function() {
    return FORMATS;
  },

  parse: function(value, format) {
    if (typeof value === 'string' && typeof format === 'string') {
      value = moment.utc(value, format);
    } else if (!(value instanceof moment)) {
      value = moment.utc(value);
    }
    return value.isValid() ? value.valueOf() : null;
  },

  format: function(time, format) {
    return moment.utc(time).format(format);
  },

  add: function(time, amount, unit) {
    return moment.utc(time).add(amount, unit).valueOf();
  },

  diff: function(max, min, unit) {
    return moment.utc(max).diff(moment.utc(min), unit);
  },

  startOf: function(time, unit, weekday) {
    time = moment.utc(time);
    if (unit === 'isoWeek') {
      weekday = Math.trunc(Math.min(Math.max(0, weekday), 6));
      return time.isoWeekday(weekday).startOf('day').valueOf();
    }
    return time.startOf(unit).valueOf();
  },

  endOf: function(time, unit) {
    return moment.utc(time).endOf(unit).valueOf();
  }
} : {});
