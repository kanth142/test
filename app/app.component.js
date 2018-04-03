"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var AppComponent = (function () {
    function AppComponent(http) {
        var _this = this;
        this.http = http;
        this.showData = false;
        this.modifieddata = '';
        this.cartListName = 'Shopping List';
        this.ImageBasePath = 'https://www.real.de/lebensmittelshop';
        this.products = [];
        this.productsOriginal = [];
        this.cart = [];
        this.total = 0;
        this.getJSON().subscribe(function (data) { return _this.products = data.products; }, function (error) { return console.log(error); });
    }
    AppComponent.prototype.getJSON = function () {
        var _this = this;
        return this.http.get("http://api.efood.real.de/api/v2/real/products/search?query=food:relevance:category:1&currentPage=0&pageSize=32").map(function (res) { return res.json(); })
            .catch(function (error) { return _this.handleError(error); });
    };
    AppComponent.prototype.filterItem = function (value) {
        if (this.productsOriginal.length == 0)
            this.productsOriginal = this.products;
        if (!value)
            this.assignCopy(); //when nothing has typed
        this.products = Object.assign([], this.productsOriginal).filter(function (product) { return product.name.toLowerCase().indexOf(value.toLowerCase()) > -1; });
    };
    AppComponent.prototype.assignCopy = function () {
        this.products = Object.assign([], this.productsOriginal);
    };
    AppComponent.prototype.handleError = function (error) {
        if (error.status == 500) { }
        else {
            return Rx_1.Observable.throw(error);
        }
    };
    AppComponent.prototype.update = function () {
        this.showData = true;
    };
    AppComponent.prototype.save = function () {
        this.cartListName = this.modifieddata;
        this.showData = false;
    };
    AppComponent.prototype.cancel = function () {
        this.showData = false;
    };
    AppComponent.prototype.addItemToCart = function (product) {
        if (this.cart.length === 0) {
            product.count = 1;
            this.cart.push(product);
            this.total += Math.ceil(parseFloat(product.price.value) * 10) / 10;
        }
        else {
            var repeat = false;
            for (var i = 0; i < this.cart.length; i++) {
                if (this.cart[i].name === product.name) {
                    repeat = true;
                    this.cart[i].count += 1;
                    this.total += Math.ceil(parseFloat(product.price.value) * 10) / 10;
                }
            }
            if (!repeat) {
                product.count = 1;
                this.cart.push(product);
                this.total += Math.ceil(parseFloat(product.price.value) * 10) / 10;
            }
        }
    };
    ;
    AppComponent.prototype.removeItem = function (product) {
        if (product.count > 1) {
            product.count -= 1;
            this.total -= Math.ceil(parseFloat(product.price.value) * 10) / 10;
        }
    };
    ;
    AppComponent.prototype.removeItemCart = function (product) {
        var countDec = Math.ceil(parseFloat(product.price.value) * 10) / 10;
        var index = this.cart.indexOf(product);
        this.cart.splice(index, 1);
        this.total = this.total - countDec;
        if (this.cart.length === 0) {
            this.total = 0;
        }
    };
    ;
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app.component.html',
    }),
    core_2.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map