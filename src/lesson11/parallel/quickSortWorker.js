"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var worker_threads_1 = require("worker_threads");
var worker_threads_2 = require("worker_threads");
var quick_sort_1 = require("../../lesson4/quick-sort");
var path = require("path");
// «Параллельная» быстрая сортировка: при достаточной глубине порождаем новых воркеров
function parallelQuickSort(arr, maxDepth) {
    return __awaiter(this, void 0, void 0, function () {
        var pivot, left, right, i, leftWorker, rightWorker, _a, sortedLeft, sortedRight;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (arr.length < 2)
                        return [2 /*return*/, arr];
                    if (maxDepth <= 0) {
                        // Переходим на обычный квик-сорт без параллелизма
                        return [2 /*return*/, (0, quick_sort_1.quickSort)(arr)];
                    }
                    pivot = arr[0];
                    left = [];
                    right = [];
                    for (i = 1; i < arr.length; i++) {
                        if (arr[i] < pivot) {
                            left.push(arr[i]);
                        }
                        else {
                            right.push(arr[i]);
                        }
                    }
                    leftWorker = new worker_threads_2.Worker(path.join(__dirname, 'quickSortWorker.js'), {
                        workerData: { arr: left, maxDepth: maxDepth - 1 }
                    });
                    rightWorker = new worker_threads_2.Worker(path.join(__dirname, 'quickSortWorker.js'), {
                        workerData: { arr: right, maxDepth: maxDepth - 1 }
                    });
                    return [4 /*yield*/, Promise.all([
                            new Promise(function (resolve, reject) {
                                leftWorker.on('message', resolve);
                                leftWorker.on('error', reject);
                            }),
                            new Promise(function (resolve, reject) {
                                rightWorker.on('message', resolve);
                                rightWorker.on('error', reject);
                            }),
                        ])];
                case 1:
                    _a = _b.sent(), sortedLeft = _a[0], sortedRight = _a[1];
                    // Собираем итоговый массив
                    return [2 /*return*/, __spreadArray(__spreadArray(__spreadArray([], sortedLeft, true), [pivot], false), sortedRight, true)];
            }
        });
    });
}
// Точка входа для воркера: читаем данные и шлём результат обратно
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, arr, maxDepth, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = worker_threads_1.workerData, arr = _a.arr, maxDepth = _a.maxDepth;
                return [4 /*yield*/, parallelQuickSort(arr, maxDepth)];
            case 1:
                result = _b.sent();
                worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage(result);
                return [2 /*return*/];
        }
    });
}); })();
