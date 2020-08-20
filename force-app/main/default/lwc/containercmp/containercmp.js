import { LightningElement, api, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactSearchController.getContactList';
import { refreshApex } from '@salesforce/apex';

export default class containercmp extends LightningElement {
     @api recordId;
     @api objectApiName;
     fields = ['Name', 'Industry', 'AccountNumber'];
     @wire(getContactList, { accId: '$recordId' })
     contacts;

     handleSubmit(){
          refreshApex(this.contacts);
     }
}