public with sharing class ContactSearchController {   @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(Id accId) {
        system.debug('accId is:'+ accId);
        return [SELECT Id, Name, Title, Phone, Email FROM Contact where AccountId = :accId];
    }

}