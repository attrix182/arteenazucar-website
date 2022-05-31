import { FormGroup } from '@angular/forms';

export abstract class FormValidationAbstract {
    public formGroup: FormGroup;
    public errroMessages: any;

    constructor() {
        this.setErrorMessages();
    }

    isValidField(field: string): string {
        const validateField = this.formGroup.get(field);
        return !validateField.valid && validateField.touched ? 'is-invalid' : validateField.touched ? 'is-valid' : '';
    }

    showError(field: string): boolean {
        const validateField = this.formGroup.get(field);

        return !validateField.valid && validateField.touched;
    }

    getErrorMessages(field: string) {
        const validateField = this.formGroup.get(field);
        const primerError = Object.keys(validateField.errors)[0];
        return this.errroMessages[field] && this.errroMessages[field][primerError]
            ? this.errroMessages[field][primerError]
            : 'Este dato no parece valido';
    }

    abstract setErrorMessages(): void;
}
