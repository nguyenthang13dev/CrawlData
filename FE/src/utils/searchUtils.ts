/**
 * Trims specified string fields within an object.
 * If fieldsToTrim is not provided, it trims all string properties of the object.
 * @param values The object containing form values.
 * @param fieldsToTrim An optional array of keys (string) for the fields to be trimmed.
 * @returns A new object with the specified (or all) string fields trimmed.
 */
export const trimFormValues = <T extends Record<string, any>>(
    values: T,
    fieldsToTrim?: (keyof T)[]
): T => {
    const trimmedValues = { ...values };

    const keysToProcess = fieldsToTrim || (Object.keys(values) as (keyof T)[]);

    keysToProcess.forEach(field => {
        const value = trimmedValues[field];
        if (typeof value === 'string') {
            (trimmedValues[field] as any) = value.trim();
        }
    });
    return trimmedValues;
};