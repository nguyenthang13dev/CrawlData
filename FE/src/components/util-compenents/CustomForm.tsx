// src/components/util-compenents/CustomForm.tsx
import React from "react";
import { Form, Input as AntdInput } from "antd";

// Export Form as CustomForm so it can be imported by other components
export { Form as CustomForm };

// AntTrimmedInput: trim khi blur hoặc ngay khi nhập, validate lỗi
export const AntTrimmedInput: React.FC<
    React.ComponentProps<typeof AntdInput>
> = (props) => {
    const [trimError, setTrimError] = React.useState<string | null>(null);
    const timerRef = React.useRef<NodeJS.Timeout | null>(null);

    const clearErrorAfterDelay = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setTrimError(null), 3000);
    };

    React.useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) {
            props.onChange(e);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const trimmed = e.target.value.replace(/^\s+|\s+$/g, "");
        if (trimmed !== e.target.value) {
            setTrimError("Khoảng trắng đã được tự động loại bỏ");
            clearErrorAfterDelay();
            if (props.onChange) {
                const fakeEvent = {
                    ...e,
                    target: { ...e.target, value: trimmed },
                };
                props.onChange(
                    fakeEvent as React.ChangeEvent<HTMLInputElement>,
                );
            }
        }
        if (props.onBlur) props.onBlur(e);
    };

    return (
        <div className="ant-input-wrapper">
            <AntdInput {...props} onChange={handleChange} onBlur={handleBlur} />
            {trimError && (
                <div className="ant-form-item-explain ant-form-item-explain-error">
                    <div role="alert">{trimError}</div>
                </div>
            )}
        </div>
    );
};

// AntTrimmedTextArea: trim khi blur hoặc ngay khi nhập, validate lỗi
export const AntTrimmedTextArea: React.FC<
    React.ComponentProps<typeof AntdInput.TextArea>
> = (props) => {
    const [trimError, setTrimError] = React.useState<string | null>(null);
    const timerRef = React.useRef<NodeJS.Timeout | null>(null);

    const clearErrorAfterDelay = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setTrimError(null), 3000);
    };

    React.useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (props.onChange) {
            props.onChange(e);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        const trimmed = e.target.value.replace(/^\s+|\s+$/g, "");
        if (trimmed !== e.target.value) {
            setTrimError("Khoảng trắng đã được tự động loại bỏ");
            clearErrorAfterDelay();
            if (props.onChange) {
                const fakeEvent = {
                    ...e,
                    target: { ...e.target, value: trimmed },
                };
                props.onChange(
                    fakeEvent as React.ChangeEvent<HTMLTextAreaElement>,
                );
            }
        }
        if (props.onBlur) props.onBlur(e);
    };

    return (
        <div className="ant-input-wrapper">
            <AntdInput.TextArea
                {...props}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {trimError && (
                <div className="ant-form-item-explain ant-form-item-explain-error">
                    <div role="alert">{trimError}</div>
                </div>
            )}
        </div>
    );
};

// AntInputInteger: chỉ cho nhập số, loại ký tự khác ngay khi nhập, validate lỗi
export interface AntInputIntegerProps
    extends React.ComponentProps<typeof AntdInput> {
    onValueChange?: (value: number | null) => void;
}

export const AntInputInteger: React.FC<AntInputIntegerProps> = (props) => {
    const { onValueChange, onChange, ...rest } = props;
    const [inputError, setInputError] = React.useState<string | null>(null);
    const [value, setValue] = React.useState<string>(
        props.value ? String(props.value) : "",
    );
    const [lastValidValue, setLastValidValue] = React.useState<string>(
        props.value ? String(props.value) : "",
    );
    const timerRef = React.useRef<NodeJS.Timeout | null>(null);

    // Cập nhật giá trị từ props khi props.value thay đổi từ bên ngoài
    React.useEffect(() => {
        if (props.value !== undefined) {
            const valueStr = props.value === null ? "" : String(props.value);
            if (valueStr !== value) {
                setValue(valueStr);
                setLastValidValue(valueStr);
            }
        }
    }, [props.value]);

    const clearErrorAfterDelay = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setInputError(null), 3000);
    };

    React.useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const raw = e.currentTarget.value;
        const numeric = raw.replace(/\D/g, ""); // Loại bỏ ký tự không phải số

        // Nếu input chứa ký tự không phải số
        if (raw !== numeric) {
            setInputError("Trường này chỉ chấp nhận số nguyên dương");
            clearErrorAfterDelay();

            // Nếu không có ký tự số trong input mới, giữ nguyên giá trị cũ
            if (numeric === "") {
                e.preventDefault();
                // Giữ lại giá trị trước đó
                (e.target as HTMLInputElement).value = lastValidValue;
                return;
            }
        } else {
            setInputError(null);
            // Lưu giá trị hợp lệ cuối cùng
            setLastValidValue(numeric);
        }

        // Cập nhật giá trị khi input hợp lệ
        if (numeric !== value) {
            setValue(numeric);
            const numValue = numeric === "" ? null : Number(numeric);
            if (onValueChange) onValueChange(numValue);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        const numeric = raw.replace(/\D/g, "");

        // Chỉ cập nhật khi có giá trị số hợp lệ
        if (numeric !== "" || raw === "") {
            setValue(numeric);
            setLastValidValue(numeric);
            const numValue = numeric === "" ? null : Number(numeric);
            if (onChange) {
                const fakeEvent = {
                    ...e,
                    target: { ...e.target, value: numValue },
                };
                onChange(fakeEvent as any);
            }
        } else {
            // Nếu không có giá trị số hợp lệ, giữ lại giá trị cũ
            e.target.value = lastValidValue;
        }
    };

    return (
        <div className="ant-input-number-wrapper">
            <AntdInput
                {...rest}
                value={value}
                onInput={handleInput}
                onChange={handleChange}
            />
            {inputError && (
                <div className="ant-form-item-explain ant-form-item-explain-error">
                    <div role="alert">{inputError}</div>
                </div>
            )}
        </div>
    );
};

// Enhanced interface for AntInputDecimal with formatting options
export interface AntInputDecimalProps
    extends React.ComponentProps<typeof AntdInput> {
    onValueChange?: (value: number | null) => void;
    decimalSeparator?: string; // Dấu phân cách phần thập phân (mặc định: ',')
    thousandSeparator?: string; // Dấu phân cách phần nghìn (mặc định: không có)
    precision?: number; // Số chữ s�� phần thập phân (mặc định: không giới hạn)
    addonAfter?: React.ReactNode; // Support addon after like currency symbol
}

export const AntInputDecimal: React.FC<AntInputDecimalProps> = (props) => {
    const {
        onValueChange,
        onChange,
        decimalSeparator = ",",
        thousandSeparator = "",
        precision = 2,
        addonAfter,
        ...rest
    } = props;

    const [trimError, setTrimError] = React.useState<string | null>(null);
    const [inputError, setInputError] = React.useState<string | null>(null);
    const [value, setValue] = React.useState<string>(formatValue(props.value));
    const [lastValidValue, setLastValidValue] = React.useState<string>(
        formatValue(props.value),
    );
    const timerRef = React.useRef<NodeJS.Timeout | null>(null);

    // Format a number value according to the formatting options
    function formatValue(val: any): string {
        if (val === undefined || val === null || val === "") return "";

        // Convert to string and ensure decimal separator is consistent
        let strValue = String(val).replace(".", decimalSeparator);

        // Apply precision if specified
        if (precision !== undefined) {
            const parts = strValue.split(decimalSeparator);
            if (parts.length > 1) {
                // Trim or pad decimal part to match precision
                if (parts[1].length > precision) {
                    parts[1] = parts[1].substring(0, precision);
                } else if (parts[1].length < precision) {
                    parts[1] = parts[1].padEnd(precision, "0");
                }
                strValue =
                    parts[0] +
                    (precision > 0 ? decimalSeparator + parts[1] : "");
            } else if (precision > 0) {
                // Add decimal part if missing but precision requires it
                strValue += decimalSeparator + "0".repeat(precision);
            }
        }

        // Apply thousand separator if provided
        if (thousandSeparator) {
            const parts = strValue.split(decimalSeparator);
            parts[0] = parts[0].replace(
                /\B(?=(\d{3})+(?!\d))/g,
                thousandSeparator,
            );
            strValue = parts.join(decimalSeparator);
        }

        return strValue;
    }

    // Cleanup formatting to get a standard number format for calculation
    function cleanupValue(val: string): string {
        if (!val) return "";
        // Remove thousand separators and convert decimal separator to standard dot
        let cleanVal = val;
        if (thousandSeparator) {
            cleanVal = cleanVal.replace(
                new RegExp(`\\${thousandSeparator}`, "g"),
                "",
            );
        }
        return cleanVal.replace(decimalSeparator, ".");
    }

    React.useEffect(() => {
        if (props.value !== undefined) {
            const formattedValue = formatValue(props.value);
            if (formattedValue !== value) {
                setValue(formattedValue);
                setLastValidValue(formattedValue);
            }
        }
    }, [props.value, decimalSeparator, thousandSeparator, precision]);

    const clearErrorAfterDelay = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setTrimError(null);
            setInputError(null);
        }, 3000);
    };

    React.useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    // Xử lý sự kiện Input để cập nhật giá trị vào form
    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const raw = e.currentTarget.value;

        // Allow the decimal point at the beginning (like ",00")
        if (raw === decimalSeparator) {
            setValue(`0${decimalSeparator}`);
            setLastValidValue(`0${decimalSeparator}`);

            // Trigger form value update
            const numValue = 0;
            if (onValueChange) onValueChange(numValue);
            if (onChange) {
                // Pass numeric value to the form instead of formatted string
                const fakeEvent = {
                    ...e,
                    target: { ...e.target, value: numValue },
                };
                onChange(fakeEvent as any);
            }
            return;
        }

        // Accept only digits, the decimal separator, and thousand separator
        const allowedChars = thousandSeparator
            ? new RegExp(
                  `[^0-9\\${decimalSeparator}\\${thousandSeparator}]`,
                  "g",
              )
            : new RegExp(`[^0-9\\${decimalSeparator}]`, "g");

        let numeric = raw.replace(allowedChars, "");

        // Handle multiple decimal separators - keep only the first one
        const parts = numeric.split(decimalSeparator);
        if (parts.length > 2) {
            numeric = parts[0] + decimalSeparator + parts.slice(1).join("");
        }

        // If the input contains invalid characters
        if (raw !== numeric) {
            setInputError(
                `Chỉ cho phép nhập số, dấu thập phân (${decimalSeparator}) và dấu phân cách (${thousandSeparator})`,
            );
            clearErrorAfterDelay();
        } else {
            setInputError(null);
        }

        // For decimal separator at the beginning, add a leading zero
        if (numeric.startsWith(decimalSeparator)) {
            numeric = `0${numeric}`;
        }

        // Apply precision limit if necessary
        const numericParts = numeric.split(decimalSeparator);
        if (
            numericParts.length > 1 &&
            precision !== undefined &&
            numericParts[1].length > precision
        ) {
            numericParts[1] = numericParts[1].substring(0, precision);
            numeric = numericParts.join(decimalSeparator);
        }

        setValue(numeric);
        setLastValidValue(numeric);

        // Convert to number for form value
        let numValue: number | null = null;
        if (numeric !== "") {
            const cleanValue = cleanupValue(numeric);
            numValue = parseFloat(cleanValue);
            if (isNaN(numValue)) numValue = null;
        }

        if (onValueChange) {
            onValueChange(numValue);
        }

        if (onChange) {
            // Pass numeric value to the form instead of formatted string
            const syntheticEvent = {
                ...e,
                target: {
                    ...e.currentTarget,
                    value: numValue,
                },
            };
            onChange(syntheticEvent as any);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        if (!raw && onChange) {
            const syntheticEvent = {
                ...e,
                target: {
                    ...e.target,
                    value: "",
                },
            };
            onChange(syntheticEvent as any);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const trimmed = e.target.value.replace(/^\s+|\s+$/g, "");

        if (trimmed !== e.target.value) {
            setTrimError("Khoảng trắng đã được tự động loại bỏ");
            clearErrorAfterDelay();
        }

        // When losing focus, format the value properly
        if (trimmed) {
            let numValue: number | null = null;
            const cleanValue = cleanupValue(trimmed);
            numValue = parseFloat(cleanValue);

            if (!isNaN(numValue)) {
                // Format with thousand separators and proper decimal places
                const formattedValue = formatValue(numValue);
                setValue(formattedValue);
                setLastValidValue(formattedValue);

                if (onValueChange) onValueChange(numValue);

                if (onChange) {
                    // Pass numeric value to the form instead of formatted string
                    const syntheticEvent = {
                        ...e,
                        target: {
                            ...e.target,
                            value: numValue,
                        },
                    };
                    onChange(syntheticEvent as any);
                }
            }
        } else {
            // Handle empty value - important to use undefined instead of null for Ant Design Form validation
            setValue("");
            setLastValidValue("");

            if (onValueChange) onValueChange(null);

            if (onChange) {
                const syntheticEvent = {
                    ...e,
                    target: {
                        ...e.target,
                        value: "",
                    },
                };
                onChange(syntheticEvent as any);
            }
        }

        if (props.onBlur) props.onBlur(e);
    };

    return (
        <div className="ant-input-number-wrapper">
            <AntdInput
                {...rest}
                value={value}
                onInput={handleInput}
                onChange={handleChange}
                onBlur={handleBlur}
                addonAfter={addonAfter}
            />
            {trimError && (
                <div className="ant-form-item-explain ant-form-item-explain-error">
                    <div role="alert">{trimError}</div>
                </div>
            )}
            {inputError && !trimError && (
                <div className="ant-form-item-explain ant-form-item-explain-error">
                    <div role="alert">{inputError}</div>
                </div>
            )}
        </div>
    );
};

// AntInputCurrency: Handles currency formatting, fixed 2 decimal places, and cursor management.
export interface AntInputCurrencyProps
    extends Omit<React.ComponentProps<typeof AntdInput>, "value" | "onChange"> {
    value?: number | null;
    onValueChange?: (value: number | null) => void;
    onChange?: (value: number | null) => void;
    decimalSeparator?: string;
    thousandSeparator?: string;
    addonAfter?: React.ReactNode;
}

export const AntInputCurrency: React.FC<AntInputCurrencyProps> = (rawProps) => {
    const {
        value: propValue,
        onValueChange,
        onChange: onPropChange,
        decimalSeparator = ",",
        thousandSeparator = ".",
        addonAfter,
        ...rest
    } = rawProps;

    const precision = 2; // Fixed precision for currency

    const inputRef = React.useRef<any>(null); // AntdInput's Input Ref
    const [currentValue, setCurrentValue] = React.useState<string>("");
    const [cursor, setCursor] = React.useState<number | null>(null);
    const [inputError, setInputError] = React.useState<string | null>(null);
    const timerRef = React.useRef<NodeJS.Timeout | null>(null);
    const previousValueRef = React.useRef<string>(""); // Store the previous value for cursor position calculation

    const clearErrorAfterDelay = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setInputError(null), 3000);
    };

    React.useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const formatForDisplay = React.useCallback(
        (
            val: number | null | undefined,
            decSep: string,
            thouSep: string,
            prec: number,
        ): string => {
            if (val === undefined || val === null) return "";
            const num = Number(val);
            if (isNaN(num)) return "";

            let strValue = num.toFixed(prec);
            strValue = strValue.replace(".", decSep);

            if (thouSep) {
                const parts = strValue.split(decSep);
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thouSep);
                strValue = parts.join(decSep);
            }
            if (strValue.includes(decSep)) {
                const [intPart, decPart] = strValue.split(decSep);
                if (/^0+$/.test(decPart)) {
                    return intPart;
                }
            }
            return strValue;
        },
        [],
    );

    // Helper function to format a number string with thousand separators
    const formatWithThousandSeparator = React.useCallback(
        (value: string): string => {
            if (!value) return "";

            const parts = value.split(decimalSeparator);
            const integerPart = parts[0];

            // Format the integer part with thousand separator
            let formattedInteger = "";
            if (integerPart) {
                formattedInteger = integerPart.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    thousandSeparator,
                );
            }

            // If there's a decimal part, add it back
            if (parts.length > 1) {
                return formattedInteger + decimalSeparator + parts[1];
            }

            return formattedInteger;
        },
        [decimalSeparator, thousandSeparator],
    );

    // Count how many thousand separators are in a number string
    const countThousandSeparators = React.useCallback(
        (value: string): number => {
            const matches = value.match(
                new RegExp(`\\${thousandSeparator}`, "g"),
            );
            return matches ? matches.length : 0;
        },
        [thousandSeparator],
    );

    // Calculate how many thousand separators will be added before the cursor position
    const calculateThousandSeparatorCount = React.useCallback(
        (value: string, cursorPos: number): number => {
            if (!thousandSeparator || cursorPos <= 0) return 0;

            const valueBeforeCursor = value.substring(0, cursorPos);
            const parts = valueBeforeCursor.split(decimalSeparator);
            const integerPartBeforeCursor = parts[0];

            // We need to count how many thousand separators will be added when formatted
            const integerDigitCount = integerPartBeforeCursor.replace(
                new RegExp(`\\${thousandSeparator}`, "g"),
                "",
            ).length;
            return Math.floor((integerDigitCount - 1) / 3);
        },
        [thousandSeparator, decimalSeparator],
    );

    const parseDisplayValue = React.useCallback(
        (str: string, decSep: string, thouSep: string): number | null => {
            if (!str) return null;
            const cleanedStr = str
                .replace(new RegExp(`\\${thouSep}`, "g"), "")
                .replace(decSep, ".");
            if (cleanedStr === "" || cleanedStr === ".") return null;
            if (cleanedStr === "0." && str.endsWith(decSep)) return 0; // "0," -> 0
            const num = parseFloat(cleanedStr);
            return isNaN(num) ? null : num;
        },
        [],
    );

    // Calculate the correct cursor position after formatting is applied
    const calculateCursorPosition = React.useCallback(
        (
            oldValue: string,
            newValue: string,
            currentPosition: number | null,
        ): number => {
            if (currentPosition === null) return newValue.length;

            // If the cursor is at the end, keep it at the end
            if (currentPosition >= oldValue.length) {
                return newValue.length;
            }

            // If cursor is in the decimal part, it should stay at the same position
            const oldDecimalIndex = oldValue.indexOf(decimalSeparator);
            if (oldDecimalIndex >= 0 && currentPosition > oldDecimalIndex) {
                const newDecimalIndex = newValue.indexOf(decimalSeparator);
                if (newDecimalIndex >= 0) {
                    return (
                        newDecimalIndex + (currentPosition - oldDecimalIndex)
                    );
                }
            }

            // For cursor in the integer part, adjust for added/removed thousand separators
            const oldValueBeforeCursor = oldValue.substring(0, currentPosition);
            const cleanedOldBeforeCursor = oldValueBeforeCursor.replace(
                new RegExp(`\\${thousandSeparator}`, "g"),
                "",
            );

            // Find the position in the new value where we have the same number of digits
            let countDigits = 0;
            let newPosition = 0;

            for (let i = 0; i < newValue.length; i++) {
                if (newValue[i] !== thousandSeparator) {
                    countDigits++;
                }

                if (countDigits === cleanedOldBeforeCursor.length) {
                    newPosition = i + 1;
                    break;
                }
            }

            return newPosition;
        },
        [decimalSeparator, thousandSeparator],
    );

    React.useEffect(() => {
        const formattedValueFromProps = formatForDisplay(
            propValue,
            decimalSeparator,
            thousandSeparator,
            precision,
        );
        if (formattedValueFromProps !== currentValue) {
            const currentNumeric = parseDisplayValue(
                currentValue,
                decimalSeparator,
                thousandSeparator,
            );
            if (
                propValue !== currentNumeric ||
                !inputRef.current?.input?.matches(":focus")
            ) {
                setCurrentValue(formattedValueFromProps);
                previousValueRef.current = formattedValueFromProps;
            } else if (propValue === null && currentValue !== "") {
                setCurrentValue("");
                previousValueRef.current = "";
            }
        }
    }, [
        propValue,
        decimalSeparator,
        thousandSeparator,
        precision,
        formatForDisplay,
        parseDisplayValue,
        currentValue,
    ]);

    React.useLayoutEffect(() => {
        if (cursor !== null && inputRef.current && inputRef.current.input) {
            inputRef.current.input.setSelectionRange(cursor, cursor);
            setCursor(null);
        }
    }, [cursor]);

    // New function to handle focus event
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        // Store previous position
        const selectionStart = e.target.selectionStart;

        // Apply formatting immediately when focusing
        if (rawValue) {
            const unformattedValue = rawValue.replace(
                new RegExp(`\\${thousandSeparator}`, "g"),
                "",
            );
            const formattedValue =
                formatWithThousandSeparator(unformattedValue);

            if (formattedValue !== rawValue) {
                setCurrentValue(formattedValue);
                previousValueRef.current = formattedValue;

                // Calculate new cursor position
                const newPosition = calculateCursorPosition(
                    rawValue,
                    formattedValue,
                    selectionStart,
                );

                // Update cursor after state update
                if (newPosition !== null) {
                    setCursor(newPosition);
                }
            }
        }

        // Pass focus event to original handler if provided
        if (rawProps.onFocus) {
            rawProps.onFocus(e);
        }
    };

    // Handle click event to maintain cursor position
    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const clickPosition = target.selectionStart;

        // If we just applied formatting and changed the value, we need to adjust cursor
        if (
            target.value !== previousValueRef.current &&
            clickPosition !== null
        ) {
            const newPosition = calculateCursorPosition(
                previousValueRef.current,
                target.value,
                clickPosition,
            );
            if (newPosition !== clickPosition) {
                // Update the cursor position after a tiny delay to let the browser handle the click
                setTimeout(() => {
                    if (inputRef.current && inputRef.current.input) {
                        inputRef.current.input.setSelectionRange(
                            newPosition,
                            newPosition,
                        );
                    }
                }, 0);
            }
        }

        // Call the original onClick if it exists
        if (rawProps.onClick) {
            rawProps.onClick(e);
        }
    };

    const handleAntdInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const rawValue = target.value;
        const originalSelectionStart = target.selectionStart;

        previousValueRef.current = currentValue;

        // Remove all thousand separators for processing
        const processedValue = rawValue.replace(
            new RegExp(`\\${thousandSeparator}`, "g"),
            "",
        );
        let newSelectionStart = originalSelectionStart ?? 0;

        // Adjust cursor for thousand separators before the cursor
        if (originalSelectionStart !== null && thousandSeparator) {
            const separatorsBeforeCursor = (
                rawValue
                    .substring(0, originalSelectionStart)
                    .match(new RegExp(`\\${thousandSeparator}`, "g")) || []
            ).length;
            newSelectionStart = originalSelectionStart - separatorsBeforeCursor;
        }

        let decimalSeparatorEncountered = false;
        let digitsAfterDecimal = 0;
        let filteredValue = "";

        for (let i = 0; i < processedValue.length; i++) {
            const char = processedValue[i];
            let charToKeep = "";

            if (char >= "0" && char <= "9") {
                if (decimalSeparatorEncountered) {
                    if (digitsAfterDecimal < precision) {
                        charToKeep = char;
                        digitsAfterDecimal++;
                    }
                } else {
                    charToKeep = char;
                }
            } else if (char === decimalSeparator) {
                if (!decimalSeparatorEncountered) {
                    charToKeep = char;
                    decimalSeparatorEncountered = true;
                }
            }

            if (charToKeep) {
                filteredValue += charToKeep;
            } else if (i < newSelectionStart) {
                newSelectionStart = Math.max(0, newSelectionStart - 1);
            }
        }

        // Special cases for leading decimal
        if (filteredValue.startsWith(decimalSeparator)) {
            filteredValue = `0${filteredValue}`;
            if (newSelectionStart === 0) {
                newSelectionStart = 1;
            }
        } else if (
            filteredValue.length === 0 &&
            rawValue === decimalSeparator
        ) {
            filteredValue = `0${decimalSeparator}`;
            newSelectionStart = 2;
        }

        // Error if invalid
        const cleanRawValue = rawValue.replace(
            new RegExp(`\\${thousandSeparator}`, "g"),
            "",
        );
        if (
            cleanRawValue !== filteredValue &&
            !(
                filteredValue === `0${decimalSeparator}` &&
                cleanRawValue === decimalSeparator &&
                rawValue.length === 1
            )
        ) {
            setInputError(
                `Chỉ cho phép nhập số, dấu thập phân '${decimalSeparator}' (tối đa ${precision} chữ số thập phân).`,
            );
            clearErrorAfterDelay();
        } else {
            setInputError(null);
        }

        // Format with thousand separators, but keep the decimal part as is for correct cursor
        let formattedValue = filteredValue;
        if (filteredValue.includes(decimalSeparator)) {
            const [intPart, decPart] = filteredValue.split(decimalSeparator);
            formattedValue =
                intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator) +
                decimalSeparator +
                decPart;
        } else {
            formattedValue = filteredValue.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                thousandSeparator,
            );
        }

        // Calculate correct cursor position
        let newCursorPos = formattedValue.length;
        if (originalSelectionStart !== null) {
            // Find the position in formattedValue that matches the number of digits before the cursor in filteredValue
            let digitsBeforeCursor = 0;
            for (let i = 0; i < newSelectionStart; i++) {
                if (filteredValue[i] && filteredValue[i] !== thousandSeparator)
                    digitsBeforeCursor++;
            }
            let count = 0;
            for (let i = 0; i < formattedValue.length; i++) {
                if (formattedValue[i] !== thousandSeparator) count++;
                if (count === digitsBeforeCursor) {
                    newCursorPos = i + 1;
                    break;
                }
            }
        }

        setCurrentValue(formattedValue);
        setCursor(Math.max(0, Math.min(newCursorPos, formattedValue.length)));

        // Convert to number for the form
        const numValue = parseDisplayValue(
            filteredValue,
            decimalSeparator,
            thousandSeparator,
        );
        if (onValueChange) onValueChange(numValue);
        if (onPropChange) onPropChange(numValue);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        // When blurring, fully format the value with fixed precision
        const numToFormat = parseDisplayValue(
            currentValue,
            decimalSeparator,
            thousandSeparator,
        );
        const fullyFormattedValue = formatForDisplay(
            numToFormat,
            decimalSeparator,
            thousandSeparator,
            precision,
        );

        previousValueRef.current = fullyFormattedValue;

        if (currentValue !== fullyFormattedValue) {
            setCurrentValue(fullyFormattedValue);
        }

        const finalNumericValue = parseDisplayValue(
            fullyFormattedValue,
            decimalSeparator,
            thousandSeparator,
        );

        if (onValueChange) onValueChange(finalNumericValue);
        if (onPropChange) onPropChange(finalNumericValue);

        if (rawProps.onBlur) {
            const eventForOnBlur = {
                ...e,
                target: {
                    ...e.target,
                    value: fullyFormattedValue,
                },
            };
            rawProps.onBlur(
                eventForOnBlur as React.FocusEvent<HTMLInputElement>,
            );
        }
        setInputError(null);
    };

    // Handle keydown event to maintain cursor position in special cases
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // For arrow keys and navigation keys, we may need to adjust cursor position
        if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
            // Save the current value for later cursor position calculation
            previousValueRef.current = currentValue;
        }

        // Pass the event to the original handler if it exists
        if (rawProps.onKeyDown) {
            rawProps.onKeyDown(e);
        }
    };

    return (
        <div className="ant-input-number-wrapper">
            <AntdInput
                {...rest}
                value={currentValue}
                onChange={handleAntdInputChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                addonAfter={addonAfter || "VNĐ"}
                ref={inputRef}
            />
            {inputError && (
                <div className="ant-form-item-explain ant-form-item-explain-error">
                    <div role="alert">{inputError}</div>
                </div>
            )}
        </div>
    );
};
