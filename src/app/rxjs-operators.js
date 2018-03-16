// import 'rxjs/Rx'; // adds ALL RxJS statics & operators to Observable
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// See node_module/rxjs/Rxjs.js
// Import just the rxjs statics and operators needed for THIS app.
// Statics
require("rxjs/add/observable/throw");
// Operators
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/map");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/mergeMap");
//# sourceMappingURL=rxjs-operators.js.map