import { LightningElement } from 'lwc';

export default class ContainerComp extends LightningElement {
    isRefresh = false;
    handleSubmit(){
       eval("$A.get('e.force:refreshView').fire();");
       this.isRefresh = true;
       this.template.querySelector("c-lds-delete-record").handleRefresh(true);
    }
}