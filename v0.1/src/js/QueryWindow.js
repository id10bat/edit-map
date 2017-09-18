import $ from 'jquery';
import { Config } from '../js/Config';
import { Messages } from '../js/Messages';
import { ModalWindow } from '../js/ModalWindow';
import { MiscUtils } from '../js/MiscUtils';

import Index from '../Component/Index';



export var QueryWindow = ModalWindow(function () {
  this._debugToggled = false;
  $(queryFormID).on('submit', submit.bind(this));
});


var queryFormID = '#queryForm';
var queryOKID = '#queryOK';


var submit = function (e) {
  e.preventDefault();
  this.close();
};


QueryWindow.prototype.close = function () {
  this._toggleDisplay();
  this._emitEvent(Messages.QUERY_WINDOW_CLOSED);
};


QueryWindow.prototype.open = function () {
  if ((Config.debug || Config.queryDebug) && !this._debugToggled) {
    this._debugToggled = true;
    $('.queryDebug').removeClass('hidden');
  }

  this._toggleDisplay();
  $(queryOKID).focus();
};


// return QueryWindow;

