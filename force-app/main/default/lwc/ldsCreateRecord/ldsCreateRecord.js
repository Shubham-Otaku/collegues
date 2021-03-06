import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord, updateRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';

export default class LdsCreateRecord extends LightningElement {
    accountId;
    name = '';

    handleNameChange(event) {
        this.accountId = undefined;
        this.name = event.target.value;
    }

    createAccount() {
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.name;
        const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then((account) => {
                this.accountId = account.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account created',
                        variant: 'success'
                    })
                );
                this.dispatchEvent(new CustomEvent('submit'));
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message:'error occured',
                        variant: 'error'
                    })
                );
            });
            this.template.querySelector('form').reset();
    }
}