export class InputTypeConstants {

    static readonly GUID = "Guid";
    static readonly STR_TEXT = "StrText";
    static readonly STR_AREA = "StrArea";
    static readonly STR_EDITOR = "StrEditor";
    static readonly STR_PASSWORD = "StrPassword";
    static readonly STR_EMAIL = "StrEmail";
    static readonly STR_PHONE = "StrPhone";


    static readonly NUMBER = "Number";
    static readonly DECIMAL = "Decimal";


    static readonly DT_DATE_PICKER = "DtDatePicker";
    static readonly DT_TIME_PICKER = "DtTimePicker";
    static readonly DT_DATE_TIME_PICKER = "DtDateTimePicker";
    


    static readonly CHECKBOX = "CheckBox";
    static readonly RADIO = "Radio";
    static readonly SWITCH = "Switch";
    static readonly DROPDOWN = "Dropdown";
    static readonly MULTI_SELECT = "MultiSelect";


    static isDateType(inputType: string): boolean {
        return [
            this.DT_DATE_PICKER,
            this.DT_TIME_PICKER,
            this.DT_DATE_TIME_PICKER
        ].includes(inputType);
    }

    static isDropdownType(inputType: string): boolean {
        return [
            this.DROPDOWN,
            this.MULTI_SELECT
        ].includes(inputType);
    }

    static isTextType(inputType: string): boolean {
        return [
            this.STR_TEXT,
            this.STR_AREA,
            this.STR_EDITOR,
            this.STR_PASSWORD,
            this.STR_EMAIL,
            this.STR_PHONE
        ].includes(inputType);
    }

    static isNumberType(inputType: string): boolean {
        return [
            this.NUMBER,
            this.DECIMAL
        ].includes(inputType);
    }
}
