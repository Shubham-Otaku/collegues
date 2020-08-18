import { LightningElement, wire, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';
import { NavigationMixin } from 'lightning/navigation';
export default class LdsDeleteRecord extends NavigationMixin(LightningElement) {
    accounts;
    contacts;
    error;

    wiredAccountsResult;

    @wire(getAccountList)
    wiredAccounts(result) {  
        this.wiredAccountsResult = result;
        if (result.data) {
            this.accounts = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.accounts = undefined;
        }
    }

    createContactOnClick(event){
        const recordId = event.target.dataset.recordId;
        // const selectedEvent = new CustomEvent("makeVisible", {detail: recordId});
        // this.dispatchEvent(selectedEvent);
        // console.log( "it works");
        
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'new',

            },
            state: {
                defaultFieldValues: encodeDefaultFieldValues({
                    AccountId: recordId
                })
            }
        });
    }
    
    navigateToViewAccountPage(event){
        const recordId = event.target.dataset.recordId;
        console.log(recordId);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                objectApiName: 'Account',
                actionName: 'view'
            },
        });
    }

    deleteAccount(event) {
        
        const recordId = event.target.dataset.recordid;
        console.log("it works" + recordId);
        deleteRecord(recordId)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record deleted',
                        variant: 'success'
                    })
                );
                return refreshApex(this.wiredAccountsResult);
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: 'error occured',
                        variant: 'error'
                    })
                );
            });
    }
    @api handleRefresh(isRefresh){
        if(isRefresh) refreshApex(this.wiredAccountsResult);
    }
}
