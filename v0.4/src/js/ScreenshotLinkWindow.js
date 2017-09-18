import $ from 'jquery';
import { Messages } from '../js/Messages';
import { ModalWindow } from '../js/ModalWindow';
import { MiscUtils } from '../js/MiscUtils';


export var ScreenshotLinkWindow = ModalWindow(function () {
  $(screenshotLinkFormID).on('submit', submit.bind(this));
});


var screenshotLinkFormID = '#screenshotLinkForm';
var screenshotLinkOKID = '#screenshotLinkOK';
var screenshotLinkID = '#screenshotLink';


ScreenshotLinkWindow.prototype.close = function () {
  this._toggleDisplay();
  this._emitEvent(Messages.SCREENSHOT_LINK_CLOSED);
};


var cancel = function (e) {
  e.preventDefault();
  this.close();
};


var submit = function (e) {
  e.preventDefault();
  this.close();
};


ScreenshotLinkWindow.prototype.open = function (screenshotLink) {
  $(screenshotLinkID).attr('href', screenshotLink);
  this._toggleDisplay();
};


// return ScreenshotLinkWindow;

