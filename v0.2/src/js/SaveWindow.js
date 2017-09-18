import $ from 'jquery';
import { Messages } from '../js/Messages';
import { ModalWindow } from '../js/ModalWindow';
import Main from '../js/Main';


export var SaveWindow = ModalWindow(function () {
  $(saveFormID).on('submit', submit.bind(this));
});


var saveFormID = '#saveForm';
var saveOKID = '#saveOK';


var submit = function (e) {
  e.preventDefault();
  this.close();
};


SaveWindow.prototype.close = function () {
  this._toggleDisplay();
  this._emitEvent(Messages.SAVE_WINDOW_CLOSED);
};


SaveWindow.prototype.open = function () {
  this._toggleDisplay();
  $(saveOKID).focus();
};


// return SaveWindow;

