import { Component, ContentChild, EventEmitter, Input, NgModule, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var noticeBarPrefixCls = "am-notice-bar";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NoticeBarComponent = /** @class */ (function () {
    function NoticeBarComponent() {
        this.noticeBarPrefixCls = noticeBarPrefixCls;
        this.fps = 40;
        this.open = true;
        this.right = 0;
        this.maxWidth = 0;
        this.timeLen = 0;
        this.onAction = new EventEmitter();
    }
    /**
     * @return {?}
     */
    NoticeBarComponent.prototype.ngAfterViewInit = function () {
        this.maxWidth = this.marquee.nativeElement.clientWidth - this.marquee.nativeElement.parentElement.clientWidth + 5;
        this.timeLen = 1 / /** @type {?} */ ((this.fps)) * 1000;
        this.animation();
    };
    /**
     * @return {?}
     */
    NoticeBarComponent.prototype.animation = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.right < _this.maxWidth) {
                _this.right++;
                _this.animation();
            }
            else {
                setTimeout(function () {
                    _this.right = 0;
                    _this.animation();
                }, _this.timeLen * 80);
            }
        }, this.timeLen);
    };
    /**
     * @return {?}
     */
    NoticeBarComponent.prototype.doAction = function () {
        if (this.model === 'closeable') {
            this.open = false;
        }
        this.onAction.emit();
    };
    return NoticeBarComponent;
}());
NoticeBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'notice-bar',
                template: "<div class=\"am-notice-bar\" *ngIf=\"open\" role=\"alert\">\n    <div class=\"am-notice-bar-icon\" *ngIf=\"icon\">\n        <ng-container *ngTemplateOutlet=\"icon\"></ng-container>\n    </div>\n    <div class=\"am-notice-bar-content\">\n        <div class=\"am-notice-bar-marquee-wrap \" role=\"marquee\" style=\"overflow: hidden;\">\n            <div class=\"am-notice-bar-marquee\" #marquee [style.right.px]=\"right\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    </div>\n    <div class=\"am-notice-bar-operation\" (click)=\"doAction()\" aria-label=\"close\" role=\"button\" *ngIf=\"action\">\n        <ng-container *ngTemplateOutlet=\"action\"></ng-container>\n    </div>\n</div>",
                styles: [".am-notice-bar {\n  background-color: #fefcec;\n  height: 36px;\n  overflow: hidden;\n  font-size: 14px;\n  line-height: 36px;\n  color: #f76a24;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.am-notice-bar-content {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  width: 100%;\n  margin: auto 15px;\n  width: auto;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.am-notice-bar-icon {\n  margin-left: 15px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.am-notice-bar-icon .am-notice-bar-trips {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2238%22%20height%3D%2233%22%20viewBox%3D%220%200%2038%2033%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ctitle%3Etrips%3C%2Ftitle%3E%3Cg%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M17.838%2028.8c-.564-.468-1.192-.983-1.836-1.496-4.244-3.385-5.294-3.67-6.006-3.67-.014%200-.027.005-.04.005-.015%200-.028-.005-.042-.005H3.562c-.734%200-.903-.203-.903-.928V10.085c0-.49.058-.8.66-.8h5.782c.693%200%201.758-.28%206.4-3.628.828-.597%201.637-1.197%202.336-1.723V28.8zM19.682.19c-.463-.22-1.014-.158-1.417.157-.02.016-1.983%201.552-4.152%203.125C10.34%206.21%209.243%206.664%209.02%206.737H3.676c-.027%200-.053.003-.08.004H1.183c-.608%200-1.1.486-1.1%201.085V25.14c0%20.598.492%201.084%201.1%201.084h8.71c.22.08%201.257.55%204.605%203.24%201.947%201.562%203.694%203.088%203.712%203.103.25.22.568.333.89.333.186%200%20.373-.038.55-.116.48-.213.79-.684.79-1.204V1.38c0-.506-.294-.968-.758-1.19z%22%20mask%3D%22url(%23mask-2)%22%2F%3E%3Cpath%20d%3D%22M31.42%2016.475c0-3.363-1.854-6.297-4.606-7.876-.125-.066-.42-.192-.625-.192-.612%200-1.108.488-1.108%201.09%200%20.404.22.764.55.952%202.128%201.19%203.565%203.442%203.565%206.025%200%202.627-1.486%204.913-3.677%206.087-.318.19-.53.54-.53.934%200%20.602.496%201.09%201.107%201.09.26.002.568-.15.568-.15%202.835-1.556%204.754-4.538%204.754-7.96%22%20mask%3D%22url(%23mask-4)%22%2F%3E%3Cg%3E%3Cpath%20d%3D%22M30.14%203.057c-.205-.122-.41-.22-.658-.22-.608%200-1.1.485-1.1%201.084%200%20.433.26.78.627.977%204.043%202.323%206.762%206.636%206.762%2011.578%200%204.938-2.716%209.248-6.755%2011.572-.354.19-.66.55-.66.993%200%20.6.494%201.084%201.102%201.084.243%200%20.438-.092.65-.213%204.692-2.695%207.848-7.7%207.848-13.435%200-5.723-3.142-10.718-7.817-13.418%22%20mask%3D%22url(%23mask-6)%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\n}\n.am-notice-bar-icon + div {\n  margin-left: 5px;\n}\n.am-notice-bar-operation {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding-right: 8px;\n}\n", ".am-notice-bar-marquee {\n  white-space: nowrap;\n  display: inline-block;\n  position: relative;\n}\n"],
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
NoticeBarComponent.ctorParameters = function () { return []; };
NoticeBarComponent.propDecorators = {
    "action": [{ type: ContentChild, args: ['action',] },],
    "icon": [{ type: ContentChild, args: ['icon',] },],
    "model": [{ type: Input },],
    "fps": [{ type: Input },],
    "marquee": [{ type: ViewChild, args: ['marquee',] },],
    "onAction": [{ type: Output },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NoticeBarModule = /** @class */ (function () {
    function NoticeBarModule() {
    }
    return NoticeBarModule;
}());
NoticeBarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: [
                    NoticeBarComponent,
                ],
                declarations: [
                    NoticeBarComponent,
                ],
                providers: [],
            },] },
];
/** @nocollapse */
NoticeBarModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */
export { NoticeBarModule, NoticeBarComponent as ɵa };
//# sourceMappingURL=ng-antd-mobile-notice-bar.js.map
