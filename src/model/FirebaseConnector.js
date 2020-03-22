import firebase from 'firebase/app';
import 'firebase/firestore';

import {Category, Event, Institution, Member} from "./model";
import {firebaseFirestore} from './firebase';


const CATEGORIES = "categories";
const MEMBERS = "members";
const EVENTS = "events";
const INSTITUTION = "institutions";

/*
 * Connection to the firebase database
 * The database contains a collection categories.
 * In it are all the different categories as documents.
 * Each document has attributes like the type 'model/model.js/Category' and a subcollection events.
 * In it are all the different events as documents.
 * Each document has attributes like the type 'model/model.js/Event' and a subcollection members.
 * In it are all the different members as documents.
 * Each document has attributes like the type 'model/model.js/Event'.
 * */
export default class FirebaseConnector {

    database: firebase.firestore.Firestore = null;


    constructor() {
        if (this.database === null) {
            this.database = firebaseFirestore()
        }
    }

    /*
     * Creates a new category in the database.
     * @category: is the category object.
     *            Make sure that all properties have the correct type and are initialised or null.
     * */
    async createCategory(category: Category): boolean {
        delete category.id;
        let result = false;
        try {
            let success = await this.database
                .collection(CATEGORIES)
                .doc()
                .set(Object.assign({}, category));
            console.log("Success creating category: ", success);
            result = true;
        } catch (error) {
            console.error("Error writing category: ", error);
        }
        return result
    }

    /*
     * Creates a new event in the database under the specific category.
     * @categoryId: is the id of the category.
     * @event:        the event that should be created.
     *                Make sure that all properties have the correct type and are initialised or null.
     * */
    async createEvent(categoryId: string, event: Event): boolean {
        delete event.id;
        let result = false;
        try {
            let success = await this.database
                .collection(CATEGORIES)
                .doc(categoryId)
                .collection(EVENTS)
                .doc()
                .set(Object.assign({}, event));
            console.log("Success writing event: ", success);
            result = true
        } catch (error) {
            console.error("Error writing event: ", error);
        }
        return result;
    }

    /*
     * Creates a new member in the database under the specific event.
     * @categoryId: is the id of the category.
     * @eventId:      is the id of the event.
     * @member:       the member that should be created.
     *                Make sure that all properties have the correct type and are initialised or null.
     * */
    async createMember(categoryId: string, eventId: string, member: { email: string, name: string }): boolean {
        let result = false;
        try {
            await this.database
                .collection(CATEGORIES)
                .doc(categoryId)
                .collection(EVENTS)
                .doc(eventId)
                .collection(MEMBERS)
                .doc(member.email)
                .set(Object.assign({}, member));
            result = true;
        } catch (error) {
            console.error("Error creating member document: ", error);
        }
        return result;
    }

    /*
    * Creates a new institution in the database.
    * @institution: is the institution object.
    *               Make sure that all properties have the correct type and are initialised or null.
    * */
    async createInstitution(institution: Institution): boolean {
        delete institution.id;
        let result = false;
        try {
            let success = await this.database
                .collection(INSTITUTION)
                .doc()
                .set(Object.assign({}, institution));
            console.log("Success creating institution: ", success);
            result = true;
        } catch (error) {
            console.error("Error writing institution: ", error);
        }
        return result
    }

    /*
     * Returns all category ids in the database.
     * */
    async getCategoryIds(): Array<string> {
        const categories = [];
        try {
            const success1 = await this.database.collection(CATEGORIES).get();
            success1.forEach(doc => categories.push(doc.id));
            console.log("Success getting category names: ", categories);
        } catch (error) {
            console.error("Error getting category names: ", error);
        }
        return categories;
    }

    /*
     * Returns all eventIds to a specific category in the database.
     * @categoryId: is the id of the category.
     * */
    async getEventIds(categoryId: string): Array<string> {
        const events = [];
        try {
            const success1 = await this.database.collection(CATEGORIES).doc(categoryId).collection(EVENTS).get();
            console.log("success1",success1);
            success1.forEach(doc => {
                console.log("Success getting event names: ", doc);
                events.push(doc.id)
            });
            console.log("Success getting event names: ", events);
        } catch (error) {
            console.error("Error getting event names: ", error);
        }
        return events;
    }

    /*
     * Returns all member-mails (they are the ids in the member collection) to a specific category in the database.
     * @categoryId: is the id of the category.
     * @eventId:      is the id of the event where the members are contained.
     * */
    async getMemberMails(categoryId: string, eventId: string): Array<string> {
        const memberIds = [];
        try {
            let success = await this.database
                .collection(CATEGORIES)
                .doc(categoryId)
                .collection(EVENTS)
                .doc(eventId)
                .collection(MEMBERS)
                .get();
            success.forEach((doc) => {
                memberIds.push(doc.id)
            });
            console.log("Success getting event members: ", memberIds);
        } catch (error) {
            console.error("Error getting event members: ", error);
        }
        return memberIds;
    }

    /*
      * Returns all institutions in the database.
      * */
    async getInstitutionIds(): Array<string> {
        const institutions = [];
        try {
            let success = await this.database
                .collection(INSTITUTION)
                .get();
            success.forEach((doc) => {
                institutions.push(doc.id)
            });
            console.log("Success getting institutions: ", institutions);
        } catch (error) {
            console.error("Error getting institutionss: ", error);
        }
        return institutions;
    }

    /*
     * Returns a specific category (without events) or null if the category does not exist.
     * @categoryId: is the id of the category.
     * */
    async getCategory(categoryId: string): Category {
        let category = null;
        try {
            const doc = await this.database.collection(CATEGORIES).doc(categoryId).get();
            if (doc.exists) {
                category = doc.data();
                category.id = doc.id;
                console.log("Success getting category ", category);
            } else {
                console.error("No such category!", doc);
            }
        } catch (error) {
            console.error("Error getting category: ", error);
        }
        return category;
    }

    /*
      * Returns a specific event (without members) or null if the event does not exist.
      * @categoryId: is the id of the category.
      * @eventId:      is the id of the event.
      * */
    async getEvent(categoryId: string, eventId: string): Event {
        let event = null;
        try {
            const doc = await this.database
                .collection(CATEGORIES)
                .doc(categoryId)
                .collection(EVENTS)
                .doc(eventId)
                .get();
            if (doc.exists) {
                event = doc.data();
                event.institution = event.institution.id;
                event.id = doc.id;
                console.log("Success getting event ", event);
            } else {
                console.error("No such event!", doc);
            }
        } catch (error) {
            console.error("Error getting event: ", error);
        }
        return event;
    }

    /*
     * Returns a specific member or null if the member does not exist.
     * @categoryId: is the id of the category.
     * @eventId:      is the id of the event.
     * @eventId:      is the mail of the member.
     * */
    async getMember(categoryId: string, eventId: string, memberMail: string): Member {
        let member = null;
        try {
            const doc = await this.database
                .collection(CATEGORIES)
                .doc(categoryId)
                .collection(EVENTS)
                .doc(eventId)
                .collection(MEMBERS)
                .doc(memberMail)
                .get();
            if (doc.exists) {
                member = doc.data();
                console.log("Success getting member ", member);
            } else {
                console.error("No such member!", doc);
            }
        } catch (error) {
            console.error("Error getting member: ", error);
        }

        return member;
    }

    /*
     * Returns a specific institutionId or null if the institutionId does not exist.
     * @institutionId: is the id of the institution.
     * */
    async getInstitution(institutionId: string): Institution {
        let institution = null;
        try {
            const doc = await this.database.collection(INSTITUTION).doc(institutionId).get();
            if (doc.exists) {
                institution = doc.data();
                institution.id = doc.id;
                console.log("Success getting institution ", institution);
            } else {
                console.error("No such institution!", doc);
            }
        } catch (error) {
            console.error("Error getting institution: ", error);
        }
        return institution;
    }

}