"use strict";
/**
 * Unit tests for ConcurrencyManager
 */
Object.defineProperty(exports, "__esModule", { value: true });
const concurrency_manager_1 = require("../../src/concurrency-manager");
describe('ConcurrencyManager', () => {
    describe('acquireSlot', () => {
        it('should have acquireSlot method', () => {
            expect(typeof concurrency_manager_1.ConcurrencyManager.acquireSlot).toBe('function');
        });
    });
    describe('releaseSlot', () => {
        it('should have releaseSlot method', () => {
            expect(typeof concurrency_manager_1.ConcurrencyManager.releaseSlot).toBe('function');
        });
    });
});
//# sourceMappingURL=concurrency-manager.test.js.map