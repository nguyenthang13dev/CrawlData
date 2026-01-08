// src/utils/formUtils.ts
import { FormInstance } from "antd";
import { NamePath, ValidateErrorEntity } from "rc-field-form/es/interface";

export const focusOnFirstAntdError = (
  errorInfo: ValidateErrorEntity<any>,
  form: FormInstance,
  formName?: string // Optional form name parameter
): void => {
  if (
    !errorInfo ||
    !errorInfo.errorFields ||
    errorInfo.errorFields.length === 0
  ) {
    return;
  }

  const firstErrorField = errorInfo.errorFields[0];
  const fieldNamePath: NamePath = firstErrorField.name;

  // Construct the field ID:
  // 1. Convert NamePath to a string (e.g., ['user', 'name'] -> 'user_name')
  const fieldPathString = Array.isArray(fieldNamePath)
    ? fieldNamePath.join("_")
    : String(fieldNamePath);
  // 2. Prepend formName if available (e.g., 'myForm_user_name'), otherwise use fieldPathString directly
  const targetId = formName
    ? `${formName}_${fieldPathString}`
    : fieldPathString;

  const inputElement = document.getElementById(targetId);
  let elementToScroll: HTMLElement | null = null;

  if (inputElement) {
    const formItemElement = inputElement.closest<HTMLElement>(".ant-form-item");
    if (formItemElement) {
      elementToScroll = formItemElement; // Default to scrolling to the form item

      // Check for .form-section and .section-title for components like ArcTransferModal
      const formSectionElement =
        formItemElement.closest<HTMLElement>(".form-section");
      if (formSectionElement) {
        const sectionTitleElement =
          formSectionElement.querySelector<HTMLElement>(".section-title");
        if (sectionTitleElement) {
          const position =
            sectionTitleElement.compareDocumentPosition(formItemElement);
          if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
            elementToScroll = sectionTitleElement;
          }
        }
      }
    } else {
      elementToScroll = inputElement; // Fallback to the input itself
    }
  }

  if (elementToScroll) {
    elementToScroll.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else {
    // Fallback to Ant Design's built-in scroll if custom logic doesn't find an element
    // This also covers cases where formName was not provided and document.getElementById(fieldPathString) failed
    form.scrollToField(fieldNamePath, {
      behavior: "smooth",
      block: "start",
    });
  }
};

/**
 * Validates an Ant Design form, shows a toast, and focuses on the first error if validation fails.
 * @param form The Ant Design form instance.
 * @param toastErrorFn A function to display a toast message (e.g., message.error from react-toastify).
 * @param formName The optional 'name' attribute of the <Form> component.
 * @returns Promise<boolean> True if validation is successful, false otherwise.
 */
export async function validateFormAndFocusOnError(
  form: FormInstance,
  toastErrorFn?: (message: string) => void,
  formName?: string // Optional form name parameter
): Promise<boolean> {
  try {
    await form.validateFields();
    return true; // Validation successful
  } catch (errorInfo: any) {
    if (
      errorInfo &&
      errorInfo.errorFields &&
      errorInfo.errorFields.length > 0
    ) {
      focusOnFirstAntdError(
        errorInfo as ValidateErrorEntity<any>,
        form,
        formName
      ); // Pass formName
    } else {
      console.error(
        "Validation failed with an unexpected error structure:",
        errorInfo
      );
    }
    return false; // Validation failed
  }
}
