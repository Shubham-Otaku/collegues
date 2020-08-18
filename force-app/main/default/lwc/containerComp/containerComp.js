import { LightningElement,api,track } from 'lwc';

export default class ContainerComp extends LightningElement {
    isRefresh = false;
    accountId;

    handleSubmit(){
        // eval("$A.get('e.force:refreshView').fire();");
        this.isRefresh = true;
        this.isVisible = true;
        this.template.querySelector("c-lds-delete-record").handleRefresh(true);
        
        console.log(this.accountId);
    }
    
}