import $ from 'jquery';
import {Messages} from '../js/Messages';
import {ModalWindow} from '../js/ModalWindow';
import Main from '../js/Main';

import Index from '../Component/Index';



 export var TouchWarnWindow = ModalWindow(function() {
    $(touchFormID).on('submit', submit.bind(this));
  });


  var touchFormID = '#touchForm';
  var touchOKID = '#touchOK';


  var submit = function(e) {
    e.preventDefault();
    this.close();
  };


  TouchWarnWindow.prototype.close = function() {
    this._toggleDisplay();
    this._emitEvent(Messages.TOUCH_WINDOW_CLOSED);
  };


  TouchWarnWindow.prototype.open = function() {
    this._toggleDisplay();
    $(touchOKID).focus();
  };


  // return TouchWarnWindow;

