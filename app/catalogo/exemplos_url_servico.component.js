"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var angular2_modal_1 = require('angular2-modal');
var bootstrap_1 = require('angular2-modal/plugins/bootstrap');
var CustomModalContext = (function (_super) {
    __extends(CustomModalContext, _super);
    function CustomModalContext() {
        _super.apply(this, arguments);
    }
    return CustomModalContext;
}(bootstrap_1.BSModalContext));
exports.CustomModalContext = CustomModalContext;
var CustomModal = (function () {
    function CustomModal(dialog) {
        this.dialog = dialog;
        this.context = dialog.context;
        this.wrongAnswer = true;
        dialog.setCloseGuard(this);
    }
    CustomModal.prototype.beforeDismiss = function () {
        return true;
    };
    CustomModal.prototype.beforeClose = function () {
        return false;
    };
    CustomModal.prototype.close = function () {
        this.dialog.close();
    };
    CustomModal = __decorate([
        core_1.Component({
            selector: 'modal-content',
            templateUrl: 'app/catalogo/exemplos_url.html',
        }), 
        __metadata('design:paramtypes', [angular2_modal_1.DialogRef])
    ], CustomModal);
    return CustomModal;
}());
exports.CustomModal = CustomModal;
//# sourceMappingURL=exemplos_url_servico.component.js.map