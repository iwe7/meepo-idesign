(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/observable/fromEvent'), require('rxjs/add/operator/switchMap'), require('rxjs/add/operator/map'), require('@angular/forms'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/observable/fromEvent', 'rxjs/add/operator/switchMap', 'rxjs/add/operator/map', '@angular/forms', '@angular/common'], factory) :
	(factory((global['meepo-idesign-share'] = {}),global.ng.core,global.Rx.Observable,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.ng.forms,global.ng.common));
}(this, (function (exports,core,fromEvent,switchMap,map,forms,common) { 'use strict';

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @return {?}
 */
function guid() {
    /**
     * @return {?}
     */
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
/**
 * @template T
 * @param {?} arr
 * @return {?}
 */
function flatten(arr) {
    return Array.prototype.concat.apply([], arr);
}
var DESIGN_LIBRARYS = new core.InjectionToken('DESIGN_LIBRARYS');
var instancesMap = new Map();
var InstanceComponent = (function () {
    /**
     * @param {?} guid
     * @param {?} props
     * @param {?} instance
     */
    function InstanceComponent(guid$$1, props, instance) {
        this.guid = guid$$1;
        this.props = props;
        this.instance = instance;
    }
    return InstanceComponent;
}());
var DesignApiService = (function () {
    function DesignApiService() {
    }
    /**
     * @param {?} id
     * @return {?}
     */
    DesignApiService.prototype.get = function (id) {
        return instancesMap.get(id);
    };
    /**
     * @param {?} instance
     * @param {?} designLibraryProp
     * @param {?} isPreview
     * @return {?}
     */
    DesignApiService.prototype.save = function (instance, designLibraryProp, isPreview) {
        var /** @type {?} */ instanceComponent = new InstanceComponent(instance.guid, designLibraryProp, instance);
        if (isPreview) {
            var /** @type {?} */ map$$1 = instancesMap.get(instance.guid);
            if (map$$1) {
                map$$1.view = instanceComponent;
            }
            else {
                map$$1 = {
                    setting: null,
                    view: instanceComponent
                };
            }
            instancesMap.set(instance.guid, map$$1);
        }
        else {
            var /** @type {?} */ map$$1 = instancesMap.get(instance.guid);
            if (map$$1) {
                map$$1.setting = instanceComponent;
            }
            else {
                map$$1 = {
                    setting: instanceComponent,
                    view: null
                };
            }
            instancesMap.set(instance.guid, map$$1);
        }
    };
    return DesignApiService;
}());
DesignApiService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
DesignApiService.ctorParameters = function () { return []; };
var DESIGN_COMPONENTS = new core.InjectionToken('DESIGN_COMPONENTS');
var DesignPropsService = (function () {
    /**
     * @param {?} props
     * @param {?} library
     */
    function DesignPropsService(props, library) {
        this.library = library;
        // 所有props
        this.props = [];
        // 当前页面
        this.pageProps = [];
        this.fathersProps = [];
        this.historyKey = 'historyKey';
        // 历史记录
        this.historys = [];
        this.removePosition = [];
        this.props = flatten(props);
        try {
            this.backToHistory();
        }
        catch (err) {
            localStorage.clear();
        }
    }
    Object.defineProperty(DesignPropsService.prototype, "settingProps", {
        /**
         * @return {?}
         */
        get: function () {
            return this._settingProps;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            var _this = this;
            this._settingProps = val;
            try {
                if (!this._settingProps) {
                    this.fathersProps = [];
                }
                this.fathers = this.getFather(this.settingProps);
                if (this.fathers && this.fathers.length > 0) {
                    this.fathersProps = [];
                    this.fathers.map(function (res) {
                        var /** @type {?} */ props = _this.getPropsByUid(res);
                        if (props) {
                            _this.fathersProps.push(props);
                        }
                    });
                }
            }
            catch (err) { }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} designLibraryProp
     * @param {?} instance
     * @return {?}
     */
    DesignPropsService.prototype.setActiveSettingProps = function (designLibraryProp, instance) {
        this.settingProps = designLibraryProp;
        if (this.instance) {
            this.instance.removeClass('is-focus');
        }
        this.instance = instance;
        instance.addClass('is-focus');
        // instance.render.addClass(instance.ele.nativeElement,'is-focus');
    };
    /**
     * @param {?} name
     * @return {?}
     */
    DesignPropsService.prototype.getPropsByName = function (name) {
        var /** @type {?} */ com;
        this.props.forEach(function (item) {
            if (name === item.name) {
                com = item;
            }
        });
        return com;
    };
    /**
     * @param {?} name
     * @param {?=} father
     * @return {?}
     */
    DesignPropsService.prototype.addPropByName = function (name, father) {
        var /** @type {?} */ com = this.getPropsByName(name);
        var /** @type {?} */ deepCopyCom = this.deepCopy(com);
        if (deepCopyCom) {
            if (deepCopyCom.uuid) {
                // 交换位置
            }
            else {
                deepCopyCom.uuid = guid();
                deepCopyCom.father = father || '';
                var /** @type {?} */ lib = this.library.get(deepCopyCom.name);
                deepCopyCom.props = new lib.default();
                this.pageProps.push(deepCopyCom);
                this.updateHistory();
            }
        }
    };
    /**
     * @param {?} name
     * @return {?}
     */
    DesignPropsService.prototype.addPropsToInstanceByName = function (name) {
        var /** @type {?} */ props = this.getPropsByName(name);
        if (props) {
            if (this.instance) {
                var /** @type {?} */ deepProps = this.deepCopy(props);
                deepProps.father = this.instance.guid;
                var /** @type {?} */ lib = this.library.get(deepProps.name);
                deepProps.props = new lib.default();
                deepProps.uuid = guid();
                this.instance.props.children = this.instance.props.children || [];
                this.instance.props.children.push(deepProps);
            }
            else {
                var /** @type {?} */ deepProps = this.deepCopy(props);
                deepProps.father = null;
                var /** @type {?} */ lib = this.library.get(deepProps.name);
                deepProps.props = new lib.default();
                deepProps.uuid = guid();
                this.pageProps.push(deepProps);
            }
        }
    };
    /**
     * @return {?}
     */
    DesignPropsService.prototype.toFatherProps = function () {
        console.log(this.fathersProps);
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    DesignPropsService.prototype.deepCopy = function (obj) {
        try {
            return JSON.parse(JSON.stringify(obj));
        }
        catch (err) {
            console.dir(obj);
        }
    };
    /**
     * @param {?} name
     * @return {?}
     */
    DesignPropsService.prototype.isGuid = function (name) {
        return name.indexOf('guid_') > -1;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    DesignPropsService.prototype.trimGuid = function (name) {
        return name.replace('guid_', '');
    };
    /**
     * @param {?} uuid
     * @return {?}
     */
    DesignPropsService.prototype.removePropsByUid = function (uuid) {
        uuid = this.trimGuid(uuid);
        var /** @type {?} */ props = this.getPropsByUid(uuid);
        if (props) {
            if (props.father) {
                var /** @type {?} */ father = this.getPropsByUid(props.father);
                var /** @type {?} */ index = father.props.children.indexOf(props);
                if (index > -1) {
                    father.props.children.splice(index, 1);
                }
            }
            else {
                var /** @type {?} */ index = this.pageProps.indexOf(props);
                if (index > -1) {
                    this.pageProps.splice(index, 1);
                }
            }
        }
        this.updateHistory();
    };
    /**
     * @param {?} props
     * @param {?=} ids
     * @return {?}
     */
    DesignPropsService.prototype.getFather = function (props, ids) {
        if (ids === void 0) { ids = []; }
        ids.push(props.uuid);
        if (props.father) {
            var /** @type {?} */ father = this.getPropsByUid(props.father);
            if (father) {
                ids = this.getFather(((father)), ids);
            }
        }
        return ids;
    };
    /**
     * @param {?} uuid
     * @param {?=} data
     * @return {?}
     */
    DesignPropsService.prototype.getPropsByUid = function (uuid, data) {
        data = data || this.pageProps;
        for (var /** @type {?} */ i = 0; i < data.length; i++) {
            var /** @type {?} */ item = data[i];
            if (item.uuid + '' === uuid + '') {
                return item;
            }
            else if (item.props.children) {
                var /** @type {?} */ res = this.getPropsByUid(uuid, item.props.children);
                if (res) {
                    return res;
                }
            }
        }
        return false;
    };
    /**
     * @return {?}
     */
    DesignPropsService.prototype.getHistory = function () {
        var /** @type {?} */ local = localStorage.getItem(this.historyKey);
        if (local) {
            var /** @type {?} */ items = (JSON.parse(local));
            this.historys = items;
            return items;
        }
        else {
            return [];
        }
    };
    /**
     * @return {?}
     */
    DesignPropsService.prototype.updateHistory = function () {
        this.historys.unshift({
            name: new Date().toISOString(),
            data: this.pageProps
        });
        if (this.historys.length > 50) {
            this.historys = this.historys.splice(this.historys.length, this.historys.length - 50);
        }
        localStorage.setItem(this.historyKey, JSON.stringify(this.historys));
    };
    /**
     * @param {?=} item
     * @return {?}
     */
    DesignPropsService.prototype.backToHistory = function (item) {
        if (item === void 0) { item = null; }
        if (!item) {
            item = this.getHistory()[0];
        }
        this.pageProps = item.data;
    };
    return DesignPropsService;
}());
DesignPropsService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
DesignPropsService.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core.Inject, args: [DESIGN_COMPONENTS,] },] },
    { type: DesignLibraryService, },
]; };
var DesignLibraryService = (function () {
    /**
     * @param {?} components
     */
    function DesignLibraryService(components) {
        this.components = [];
        this.components = flatten(components);
    }
    /**
     * @param {?} name
     * @return {?}
     */
    DesignLibraryService.prototype.get = function (name) {
        var /** @type {?} */ com;
        this.components.map(function (item) {
            if (item[name]) {
                com = item[name];
            }
        });
        return com;
    };
    return DesignLibraryService;
}());
DesignLibraryService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
DesignLibraryService.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core.Inject, args: [DESIGN_LIBRARYS,] },] },
]; };
var DRAG_DROP_ALL = new core.InjectionToken('DRAG_DROP_ALL');
var NgComponentDirective = (function () {
    /**
     * @param {?} _viewContainerRef
     * @param {?} _template
     * @param {?} differs
     * @param {?} librarys
     * @param {?} api
     * @param {?} props
     * @param {?} render
     * @param {?} dragDropAll
     */
    function NgComponentDirective(_viewContainerRef, _template, differs, librarys, api, props, render, dragDropAll) {
        this._viewContainerRef = _viewContainerRef;
        this._template = _template;
        this.differs = differs;
        this.librarys = librarys;
        this.api = api;
        this.props = props;
        this.render = render;
        this.dragDropAll = dragDropAll;
        this.instances = [];
        this.viewContainerRef = _viewContainerRef;
    }
    /**
     * @return {?}
     */
    NgComponentDirective.prototype.ngDoCheck = function () {
        var _this = this;
        if (this._differ) {
            var /** @type {?} */ changes = this._differ.diff(this.ngComponent);
            if (changes) {
                changes.forEachOperation(function (item, adjustedPreviousIndex, currentIndex) {
                    if (item.previousIndex == null) {
                        _this.createComponent(item, currentIndex);
                    }
                    else if (currentIndex == null) {
                        _this._viewContainerRef.remove(adjustedPreviousIndex);
                    }
                    else {
                        var /** @type {?} */ view = ((_this._viewContainerRef.get(adjustedPreviousIndex)));
                        _this._viewContainerRef.move(view, currentIndex);
                    }
                });
            }
        }
    };
    /**
     * @param {?} item
     * @param {?} currentIndex
     * @return {?}
     */
    NgComponentDirective.prototype.createComponent = function (item, currentIndex) {
        var _this = this;
        try {
            var /** @type {?} */ designLibraryProp_1 = item.item;
            if (designLibraryProp_1) {
                var /** @type {?} */ component = void 0;
                var /** @type {?} */ libs = this.librarys.get(designLibraryProp_1.name);
                if (this.ngComponentPreview) {
                    component = libs.view;
                }
                else {
                    component = libs.setting;
                }
                var /** @type {?} */ elInjector = this.viewContainerRef.parentInjector;
                var /** @type {?} */ componentFactoryResolver = this.moduleRef ? this.moduleRef.componentFactoryResolver :
                    elInjector.get(core.ComponentFactoryResolver);
                var /** @type {?} */ componentFactory = componentFactoryResolver.resolveComponentFactory(component);
                var /** @type {?} */ componentRef = this.viewContainerRef.createComponent(componentFactory, currentIndex, elInjector);
                // designLibraryProp.props = JSON.parse(JSON.stringify(designLibraryProp.props));
                var instance_1 = componentRef.instance;
                if (designLibraryProp_1.props) {
                    instance_1.props = designLibraryProp_1.props;
                }
                if (designLibraryProp_1.state) {
                    instance_1.state = designLibraryProp_1.state;
                }
                instance_1.onClick.subscribe(function (ev) {
                    if (_this.ngComponentPreview) {
                        _this.props.setActiveSettingProps(designLibraryProp_1, instance_1);
                        ev.stopPropagation();
                    }
                });
                instance_1.setClass(this.ngComponentClass);
                instance_1.setStyle(this.ngComponentStyle);
                instance_1.instance = this.ngComponentInstance;
                if (this.ngComponentDrag || this.dragDropAll) {
                    this.setDrage(instance_1);
                }
                if (this.ngComponentDrop || this.dragDropAll) {
                    // this.setDrop(instance);
                }
                if (designLibraryProp_1.uuid) {
                    instance_1.guid = designLibraryProp_1.uuid;
                }
                else {
                    designLibraryProp_1.uuid = instance_1.guid = guid();
                }
                // api
                this.api.save(instance_1, designLibraryProp_1, this.ngComponentPreview);
            }
        }
        catch (err) {
            console.log((this.ngComponentPreview ? 'preview' : 'setting') + " is not fond", item);
            console.dir(err);
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgComponentDirective.prototype.ngOnChanges = function (changes) {
        this.viewContainerRef.clear();
        if ('ngComponent' in changes) {
            var /** @type {?} */ value = changes['ngComponent'].currentValue;
            if (value && !this._differ) {
                try {
                    this._differ = this.differs.find(value).create();
                }
                catch (err) { }
            }
        }
    };
    /**
     * @param {?} instance
     * @return {?}
     */
    NgComponentDirective.prototype.setDrage = function (instance) {
        instance.setAttribute({
            draggable: true
        });
        var /** @type {?} */ ele = instance.ele.nativeElement;
        var /** @type {?} */ uuid;
        fromEvent.fromEvent(ele, 'dragstart').subscribe(function (ev) {
            uuid = instance.guid;
            ev.dataTransfer.setData("name", 'guid_' + instance.guid);
            ev.stopPropagation();
        });
        fromEvent.fromEvent(ele, 'dragend').subscribe(function (ev) {
            // dragend 删除这一个
            // this.history.removeComponentByUuid(uuid);
        });
    };
    /**
     * @param {?} name
     * @return {?}
     */
    NgComponentDirective.prototype.isGuid = function (name) {
        return name.indexOf('guid_') > -1;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    NgComponentDirective.prototype.trimGuid = function (name) {
        return name.replace('guid_', '');
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    NgComponentDirective.prototype.deepCopy = function (obj) {
        try {
            return JSON.parse(JSON.stringify(obj));
        }
        catch (err) {
            console.dir(err);
            return {};
        }
    };
    /**
     * @param {?} instance
     * @return {?}
     */
    NgComponentDirective.prototype.setDrop = function (instance) {
        var _this = this;
        var /** @type {?} */ ele = instance.ele.nativeElement;
        fromEvent.fromEvent(ele, 'drop').subscribe(function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            var /** @type {?} */ data = ev.dataTransfer.getData("name");
            var /** @type {?} */ uuid = _this.trimGuid(data);
            if (!_this.isGuid(data)) {
                // 获取props
                var /** @type {?} */ props = _this.props.getPropsByName(data);
                instance.props.children = instance.props.children || [];
                var /** @type {?} */ deepProps = _this.deepCopy(props);
                // 记录上级
                deepProps.father = instance.guid;
                instance.props.children.push(deepProps);
                _this.props.instance.props.children.push(deepProps);
            }
            else if (uuid !== instance.guid) {
                // 移动已存在props
                var /** @type {?} */ props = _this.getInstanceProps(uuid);
                if (props) {
                    var /** @type {?} */ deepProps = _this.deepCopy(props);
                    deepProps.father = instance.guid;
                    instance.props.children.push(deepProps);
                }
            }
        });
        fromEvent.fromEvent(ele, 'dragleave').subscribe(function (ev) {
            // dragend 删除这一个
            _this.render.removeStyle(ele, 'dashed');
            ev.preventDefault();
            ev.stopPropagation();
        });
        fromEvent.fromEvent(ele, 'dragover').subscribe(function (ev) {
            _this.render.setStyle(ele, 'dashed', '1px lodash red');
            ev.preventDefault();
            ev.stopPropagation();
        });
    };
    /**
     * @param {?} uuid
     * @return {?}
     */
    NgComponentDirective.prototype.getInstanceProps = function (uuid) {
        var /** @type {?} */ props;
        this.instances.map(function (res) {
            if (res.guid === uuid) {
                props = res.props;
            }
        });
        return props;
    };
    return NgComponentDirective;
}());
NgComponentDirective.decorators = [
    { type: core.Directive, args: [{ selector: '[ngComponent]' },] },
];
/**
 * @nocollapse
 */
NgComponentDirective.ctorParameters = function () { return [
    { type: core.ViewContainerRef, },
    { type: core.TemplateRef, },
    { type: core.IterableDiffers, },
    { type: DesignLibraryService, },
    { type: DesignApiService, },
    { type: DesignPropsService, },
    { type: core.Renderer2, },
    { type: undefined, decorators: [{ type: core.Inject, args: [DRAG_DROP_ALL,] },] },
]; };
NgComponentDirective.propDecorators = {
    'ngComponent': [{ type: core.Input },],
    'ngComponentPreview': [{ type: core.Input },],
    'ngComponentState': [{ type: core.Input },],
    'ngComponentClass': [{ type: core.Input },],
    'ngComponentStyle': [{ type: core.Input },],
    'ngComponentDrag': [{ type: core.Input },],
    'ngComponentDrop': [{ type: core.Input },],
    'ngComponentInstance': [{ type: core.Input },],
    'ngComponentClick': [{ type: core.Input },],
};
var ControlBase = (function () {
    function ControlBase() {
    }
    /**
     * @param {?} name
     * @param {?=} _default
     * @return {?}
     */
    ControlBase.prototype.checkControl = function (name, _default) {
        if (_default === void 0) { _default = ''; }
        try {
            var /** @type {?} */ control = this.props.get(name);
            if (!control) {
                this.createControl(name, _default);
            }
        }
        catch (err) {
            this.createControl(name, _default);
        }
    };
    /**
     * @param {?} name
     * @param {?} _default
     * @return {?}
     */
    ControlBase.prototype.createControl = function (name, _default) {
        this.props.addControl(name, new forms.FormControl(_default));
    };
    /**
     * @param {?} px
     * @return {?}
     */
    ControlBase.prototype.pxToNumber = function (px) {
        return px.replace('px', '');
    };
    return ControlBase;
}());
ControlBase.propDecorators = {
    'props': [{ type: core.Input },],
};
var ShareColorComponent = (function (_super) {
    __extends(ShareColorComponent, _super);
    function ShareColorComponent() {
        return _super.call(this) || this;
    }
    /**
     * @return {?}
     */
    ShareColorComponent.prototype.ngOnInit = function () {
        this.checkControl('color', '#fff');
        this.checkControl('background-color', 'gray');
    };
    return ShareColorComponent;
}(ControlBase));
ShareColorComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'share-color',
                template: "\n      <div class=\"setting-row\" [formGroup]=\"props\">\n          <h1>\u989C\u8272</h1>\n          <div class=\"setting-row-input\">\n              <div class=\"setting-row-input-label\">\n                  \u80CC\u666F\u8272:\n              </div>\n              <div class=\"setting-row-input-content\">\n                  <input type=\"color\" placeholder=\"\u80CC\u666F\u8272\" [formControlName]=\"'background-color'\">\n              </div>\n              <span class=\"setting-row-input-unit\"></span>\n          </div>\n          <div class=\"setting-row-input\">\n              <div class=\"setting-row-input-label\">\n                  \u524D\u666F\u8272:\n              </div>\n              <div class=\"setting-row-input-content\">\n                  <input type=\"color\" placeholder=\"\u80CC\u666F\u8272\" [formControlName]=\"'color'\">\n              </div>\n              <span class=\"setting-row-input-unit\"></span>\n          </div>\n      </div>\n    ",
                styles: ["\n      .row {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-orient: horizontal;\n        -webkit-box-direction: normal;\n            -ms-flex-direction: row;\n                flex-direction: row;\n        width: 100%;\n        margin-top: 5px; }\n        .row input {\n          -webkit-box-flex: 1;\n              -ms-flex: 1;\n                  flex: 1;\n          width: 50%; }\n    "]
            },] },
];
/**
 * @nocollapse
 */
ShareColorComponent.ctorParameters = function () { return []; };
var ShareSizeComponent = (function (_super) {
    __extends(ShareSizeComponent, _super);
    function ShareSizeComponent() {
        var _this = _super.call(this) || this;
        _this.unit = ['%', 'px'];
        return _this;
    }
    /**
     * @return {?}
     */
    ShareSizeComponent.prototype.ngOnInit = function () {
        this.checkControl("width" + this.unit[0], '100');
        this.checkControl("height" + this.unit[1], '100');
    };
    return ShareSizeComponent;
}(ControlBase));
ShareSizeComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'share-size',
                template: "\n      <div class=\"setting-row\" [formGroup]=\"props\">\n          <h1>\u5927\u5C0F\u8BBE\u7F6E</h1>\n          <div class=\"setting-row-input\">\n              <label class=\"setting-row-input-label\" for=\"setting-row-input-width\">\n                  \u5BBD\u5EA6:\n              </label>\n              <div class=\"setting-row-input-content\">\n                  <input type=\"number\" id=\"setting-row-input-width\" [attr.placeholder]=\"'\u5BBD\u5EA6'+unit[0]\" [formControlName]=\"'width.'+unit[0]\">\n              </div>\n              <span class=\"setting-row-input-unit\">{{unit[0]}}</span>\n          </div>\n          <div class=\"setting-row-input\">\n              <label class=\"setting-row-input-label\" for=\"setting-row-input-height\">\n                  \u9AD8\u5EA6:\n              </label>\n              <div class=\"setting-row-input-content\">\n                  <input type=\"number\" id=\"setting-row-input-height\" [attr.placeholder]=\"'\u9AD8\u5EA6'+unit[1]\" [formControlName]=\"'height.'+unit[1]\">\n              </div>\n              <span class=\"setting-row-input-unit\">{{unit[1]}}</span>\n          </div>\n      </div>\n    ",
                styles: ["\n      :host {\n        display: block; }\n    "]
            },] },
];
/**
 * @nocollapse
 */
ShareSizeComponent.ctorParameters = function () { return []; };
ShareSizeComponent.propDecorators = {
    'props': [{ type: core.Input },],
    'unit': [{ type: core.Input },],
};
var ShareBackgroundComponent = (function (_super) {
    __extends(ShareBackgroundComponent, _super);
    function ShareBackgroundComponent() {
        return _super.call(this) || this;
    }
    /**
     * @return {?}
     */
    ShareBackgroundComponent.prototype.ngOnInit = function () {
        this.checkControl('background-size', 'cover');
        this.checkControl('background-position', 'cover');
        this.checkControl('background-repeat', 'no-repeat');
    };
    /**
     * @param {?} e
     * @return {?}
     */
    ShareBackgroundComponent.prototype.backgroundImageChange = function (e) {
        this.props.get('background-image').setValue("url(" + e.target.value + ")");
    };
    return ShareBackgroundComponent;
}(ControlBase));
ShareBackgroundComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'share-background',
                template: "\n      <!-- <div class=\"setting-row\" [formGroup]=\"props\">\n          <h1>\u80CC\u666F\u8BBE\u7F6E</h1>\n          <div class=\"setting-row-input\">\n              <div class=\"setting-row-input-label\">\n                  \u56FE\u7247:\n              </div>\n              <div class=\"setting-row-input-content\">\n                  <input type=\"text\" (change)=\"backgroundImageChange($event)\" [attr.value]=\"props.get('background-image').value\">\n              </div>\n              <span class=\"setting-row-input-unit\"></span>\n          </div>\n          <div class=\"setting-row-input\">\n              <div class=\"setting-row-input-label\">\n                  \u5E73\u94FA:\n              </div>\n              <div class=\"setting-row-input-content\">\n                  <input type=\"text\" [formControlName]=\"'background-repeat'\">\n              </div>\n              <span class=\"setting-row-input-unit\"></span>\n          </div>\n          <div class=\"setting-row-input\">\n              <div class=\"setting-row-input-label\">\n                  \u5927\u5C0F:\n              </div>\n              <div class=\"setting-row-input-content\">\n                  <input type=\"text\" [formControlName]=\"'background-size'\">\n              </div>\n              <span class=\"setting-row-input-unit\"></span>\n          </div>\n          <div class=\"setting-row-input\">\n              <div class=\"setting-row-input-label\">\n                  \u4F4D\u7F6E:\n              </div>\n              <div class=\"setting-row-input-content\">\n                  <input type=\"text\" [formControlName]=\"'background-position'\">\n              </div>\n              <span class=\"setting-row-input-unit\"></span>\n          </div>\n      </div> -->\n    "
            },] },
];
/**
 * @nocollapse
 */
ShareBackgroundComponent.ctorParameters = function () { return []; };
var ShareMarginComponent = (function (_super) {
    __extends(ShareMarginComponent, _super);
    function ShareMarginComponent() {
        return _super.call(this) || this;
    }
    /**
     * @return {?}
     */
    ShareMarginComponent.prototype.ngOnInit = function () {
        var /** @type {?} */ margin = this.props.get('margin').value;
        var _a = margin.split(" "), top = _a[0], right = _a[1], bottom = _a[2], left = _a[3];
        this.checkControl('margin-top.px', this.pxToNumber(top));
        this.checkControl('margin-right.px', this.pxToNumber(right));
        this.checkControl('margin-bottom.px', this.pxToNumber(bottom));
        this.checkControl('margin-left.px', this.pxToNumber(left));
    };
    return ShareMarginComponent;
}(ControlBase));
ShareMarginComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'share-margin',
                template: "\n      <div class=\"setting-row\" [formGroup]=\"props\">\n          <h1>\u95F4\u8DDD\u8BBE\u7F6E</h1>\n          <div class=\"setting-row-input\">\n              <div class=\"setting-row-input-label\">\n                  \u4E0A\u95F4\u8DDD:\n              </div>\n              <div class=\"setting-row-input-content\">\n                  <input type=\"number\" formControlName=\"margin-top.px\">\n              </div>\n              <span class=\"setting-row-input-unit\">px</span>\n          </div>\n          <div class=\"setting-row-input\">\n              <div class=\"setting-row-input-label\">\n                  \u53F3\u95F4\u8DDD:\n              </div>\n              <div class=\"setting-row-input-content\">\n                  <input type=\"number\" formControlName=\"margin-right.px\">\n              </div>\n              <span class=\"setting-row-input-unit\">px</span>\n          </div>\n          <div class=\"setting-row-input\">\n              <div class=\"setting-row-input-label\">\n                  \u4E0B\u95F4\u8DDD:\n              </div>\n              <div class=\"setting-row-input-content\">\n                  <input type=\"number\" formControlName=\"margin-bottom.px\">\n              </div>\n              <span class=\"setting-row-input-unit\">px</span>\n          </div>\n          <div class=\"setting-row-input\">\n              <div class=\"setting-row-input-label\">\n                  \u5DE6\u95F4\u8DDD:\n              </div>\n              <div class=\"setting-row-input-content\">\n                  <input type=\"number\" formControlName=\"margin-left.px\">\n              </div>\n              <span class=\"setting-row-input-unit\">px</span>\n          </div>\n      </div>\n    ",
                styles: ["\n      :host {\n        display: block; }\n    "]
            },] },
];
/**
 * @nocollapse
 */
ShareMarginComponent.ctorParameters = function () { return []; };
var SharePositionComponent = (function (_super) {
    __extends(SharePositionComponent, _super);
    function SharePositionComponent() {
        return _super.call(this) || this;
    }
    /**
     * @return {?}
     */
    SharePositionComponent.prototype.ngOnInit = function () {
        this.checkControl('position', 'relative');
        this.checkControl('left.px', '0');
        this.checkControl('right.px', '0');
        this.checkControl('top.px', '0');
        this.checkControl('bottom.px', '0');
    };
    return SharePositionComponent;
}(ControlBase));
SharePositionComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'share-position',
                template: "\n      <div class=\"setting-row\" [formGroup]=\"props\">\n              <h1>\u5B9A\u4F4D</h1>\n              <div class=\"setting-row-input\">\n                  <div class=\"setting-row-input-label\">\n                      \u4E0A:\n                  </div>\n                  <div class=\"setting-row-input-content\">\n                      <input type=\"number\" formControlName=\"top.px\">\n                  </div>\n                  <span class=\"setting-row-input-unit\">px</span>\n              </div>\n              <div class=\"setting-row-input\">\n                  <div class=\"setting-row-input-label\">\n                      \u53F3:\n                  </div>\n                  <div class=\"setting-row-input-content\">\n                      <input type=\"number\" formControlName=\"right.px\">\n                  </div>\n                  <span class=\"setting-row-input-unit\">px</span>\n              </div>\n              <div class=\"setting-row-input\">\n                  <div class=\"setting-row-input-label\">\n                      \u4E0B:\n                  </div>\n                  <div class=\"setting-row-input-content\">\n                      <input type=\"number\" formControlName=\"bottom.px\">\n                  </div>\n                  <span class=\"setting-row-input-unit\">px</span>\n              </div>\n              <div class=\"setting-row-input\">\n                  <div class=\"setting-row-input-label\">\n                      \u5DE6:\n                  </div>\n                  <div class=\"setting-row-input-content\">\n                      <input type=\"number\" formControlName=\"left.px\">\n                  </div>\n                  <span class=\"setting-row-input-unit\">px</span>\n              </div>\n          </div>\n    "
            },] },
];
/**
 * @nocollapse
 */
SharePositionComponent.ctorParameters = function () { return []; };
var shareComponents = [
    ShareColorComponent,
    ShareSizeComponent,
    ShareBackgroundComponent,
    ShareMarginComponent,
    SharePositionComponent
];
var IDesignComponentModule = (function () {
    function IDesignComponentModule() {
    }
    /**
     * @param {?} coms
     * @param {?=} dragDropAll
     * @return {?}
     */
    IDesignComponentModule.forRoot = function (coms, dragDropAll) {
        if (dragDropAll === void 0) { dragDropAll = false; }
        return {
            ngModule: IDesignComponentModule,
            providers: [{
                    provide: DESIGN_LIBRARYS,
                    useValue: coms,
                    multi: true
                }, {
                    provide: DRAG_DROP_ALL,
                    useValue: dragDropAll
                }]
        };
    };
    return IDesignComponentModule;
}());
IDesignComponentModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    forms.ReactiveFormsModule
                ],
                exports: [
                    NgComponentDirective
                ].concat(shareComponents),
                declarations: [
                    NgComponentDirective
                ].concat(shareComponents),
                providers: [
                    DesignApiService,
                    DesignLibraryService,
                    DesignPropsService
                ],
            },] },
];
/**
 * @nocollapse
 */
IDesignComponentModule.ctorParameters = function () { return []; };

exports.IDesignComponentModule = IDesignComponentModule;
exports.NgComponentDirective = NgComponentDirective;
exports.DesignApiService = DesignApiService;
exports.DesignLibraryService = DesignLibraryService;
exports.DESIGN_LIBRARYS = DESIGN_LIBRARYS;
exports.DesignPropsService = DesignPropsService;
exports.DESIGN_COMPONENTS = DESIGN_COMPONENTS;
exports.ɵf = ShareBackgroundComponent;
exports.ɵd = ControlBase;
exports.ɵc = ShareColorComponent;
exports.ɵg = ShareMarginComponent;
exports.ɵh = SharePositionComponent;
exports.ɵb = shareComponents;
exports.ɵe = ShareSizeComponent;
exports.ɵa = DRAG_DROP_ALL;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=meepo-idesign-share.umd.js.map
