import $ from 'jquery';
import Messages from '../js/Messages';
import ModalWindow from '../js/ModalWindow';

import Index from '../Component/Index';


var CongratsWindow = ModalWindow(function () {
  $(congratsFormID).on('submit', submit.bind(this));
});


var congratsFormID = '#congratsForm';
var congratsMessageID = '#congratsMessage';
var congratsOKID = '#congratsOK';


var submit = function (e) {
  e.preventDefault();
  this.close();
};


CongratsWindow.prototype.close = function () {
  this._toggleDisplay();
  this._emitEvent(Messages.CONGRATS_WINDOW_CLOSED);
};


CongratsWindow.prototype.open = function (message) {
  this._toggleDisplay();
  $(congratsMessageID).text(message);
  $(congratsOKID).focus();
};


export default CongratsWindow;

