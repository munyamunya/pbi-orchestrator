"use strict";
/**
 * Unit tests for configuration
 */
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../src/config");
describe('Configuration', () => {
    describe('DEFAULT_PBI_CONFIG', () => {
        it('should have maxConcurrentWorkflows set to 2', () => {
            expect(config_1.DEFAULT_PBI_CONFIG.maxConcurrentWorkflows).toBe(2);
        });
        it('should have a valid task queue name', () => {
            expect(config_1.DEFAULT_PBI_CONFIG.taskQueue).toBe('pbi-orchestrator-queue');
        });
        it('should have a workflow timeout', () => {
            expect(config_1.DEFAULT_PBI_CONFIG.workflowTimeout).toBeGreaterThan(0);
        });
        it('should have retry policy configured', () => {
            expect(config_1.DEFAULT_PBI_CONFIG.retryPolicy).toBeDefined();
            expect(config_1.DEFAULT_PBI_CONFIG.retryPolicy.maximumAttempts).toBeGreaterThan(0);
        });
    });
});
//# sourceMappingURL=config.test.js.map