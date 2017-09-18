import $ from 'jquery';
import Messages from '../js/Messages';
import ModalWindow from '../js/ModalWindow';

import Index from '../Component/Index';


var NagWindow = ModalWindow(function () {
    $(nagFormID).on('submit', submit.bind(this));
  });


var nagFormID = '#nagForm';
var nagOKID = '#nagOK';


var submit = function (e) {
  e.preventDefault();
  this.close();
};


NagWindow.prototype.close = function () {
  this._toggleDisplay();
  this._emitEvent(Messages.NAG_WINDOW_CLOSED);
};


NagWindow.prototype.open = function () {
  this._toggleDisplay();
  $(nagOKID).focus();
};


export default NagWindow;

