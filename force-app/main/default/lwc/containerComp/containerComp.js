import { LightningElement } from 'lwc';

export default class ContainerComp extends LightningElement {
    handleSubmit(){
        eval("$A.get('e.force:refreshView').fire();");
    }
}