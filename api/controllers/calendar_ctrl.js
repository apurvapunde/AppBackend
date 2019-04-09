"use strict";
var mongoose = require('mongoose'),
        validator = require('../../config/validator.js'),
        Constant = require('../../config/constant.js'),
        Config = require('../../config/config.js'),
        EventActivity = mongoose.model('EventActivity'),
        ActivitiesContact = mongoose.model('ActivitiesContact'),
        async = require('async');
var moment = require("moment");

var _ = require('underscore');

module.exports = {
        getEventsList: getEventsList,
        getEventsListByContact: getEventsListByContact,
};
/**
 * Function is use to get event list
 * @access private
 * @return json 
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 11-July-2017
 */
function getEventsList(req, res) {
        EventActivity.find({ companyId: req.body.companyId, isCalendarEvent: true, deleted: false }, { eventName: 1, startDate: 1, endDate: 1, isAllDay: 1, eventNotes: 1 }, function (err, eventList) {
                if (err) {
                        res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR, data: {} });
                } else {
                        let eventRecord = [];
                        eventList.forEach(function (element) {
                                let events = {};
                                var startDate = element.startDate;
                                var endDate = element.endDate;
                                events = {
                                        'title': element.eventName,
                                        'allDay': element.isAllDay,
                                        'start': moment(startDate, 'MM/DD/YYYY').format('YYYY/MM/DD'),
                                        'end': moment(endDate, 'MM/DD/YYYY').format('YYYY/MM/DD'),
                                        'desc': element.eventNotes,
                                }
                                eventRecord.push(events);
                        });
                        res.json({ code: Constant.SUCCESS_CODE, message: Constant.EVENT_FETCHED_SUCCESS, data: eventRecord });
                }
        });
}

/**
 * Function is use to get events by contact
 * @access private
 * @return json 
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 13-July-2017
 */
function getEventsListByContact(req, res) {
        let contactId = req.body.contactId;
        if (contactId) {
                ActivitiesContact.find({ contactId: { $in: contactId }, activityType: 2, deleted: false })
                        .populate('activityId', 'eventName startDate endDate isAllDay eventNotes')
                        .populate('eventId')
                        .exec(function (err, eventList) {
                                if (err) {
                                        res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR, data: {} });
                                } else {
                                        var uniqueStandards = _.uniq(eventList, function (item, key, Domain) {
                                                return item.eventId.eventName;


                                        });
                                        let eventRecord = [];
                                        uniqueStandards.forEach(function (element) {
                                                let events = {};
                                                var startDate = element.eventId.startDate;
                                                var endDate = element.eventId.endDate;
                                                events = {
                                                        'title': element.eventId.eventName,
                                                        'allDay': element.eventId.isAllDay,
                                                        'start': moment(startDate, 'MM/DD/YYYY').format('YYYY/MM/DD'),
                                                        'end': moment(endDate, 'MM/DD/YYYY').format('YYYY/MM/DD'),
                                                        'desc': element.eventId.eventNotes,
                                                }
                                                eventRecord.push(events);
                                        });
                                        res.json({ code: Constant.SUCCESS_CODE, message: Constant.EVENT_FETCHED_SUCCESS, data: eventRecord });
                                }
                        });
        } else {
                EventActivity.find({ companyId: req.body.companyId, isCalendarEvent: true, deleted: false }, { eventName: 1, startDate: 1, endDate: 1, isAllDay: 1, eventNotes: 1 }, function (err, eventList) {
                        if (err) {
                                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR, data: {} });
                        } else {
                                let eventRecord = [];
                                eventList.forEach(function (element) {
                                        let events = {};
                                        var startDate = element.startDate;
                                        var endDate = element.endDate;
                                        events = {
                                                'title': element.eventName,
                                                'allDay': element.isAllDay,
                                                'start': moment(startDate, 'MM/DD/YYYY').format('YYYY/MM/DD'),
                                                'end': moment(endDate, 'MM/DD/YYYY').format('YYYY/MM/DD'),
                                                'desc': element.eventNotes,
                                        }
                                        eventRecord.push(events);
                                });
                                res.json({ code: Constant.SUCCESS_CODE, message: Constant.EVENT_FETCHED_SUCCESS, data: eventRecord });
                        }
                });
        }

}