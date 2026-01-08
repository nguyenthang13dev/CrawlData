// src/utils/validators.ts
import { RuleObject } from 'rc-field-form/lib/interface';

export const NO_WHITESPACE_AROUND_KEY = 'noWhitespaceAroundValidationRule';

export const noWhitespaceAround = (message: string): RuleObject & { key: string } => ({
    key: NO_WHITESPACE_AROUND_KEY,
    validator: (_, value: string) => {
        // Ensure value is a string before calling string methods
        if (value && typeof value === 'string' && (value.startsWith(' ') || value.endsWith(' '))) {
            return Promise.reject(new Error(message));
        }
        return Promise.resolve();
    },
});
