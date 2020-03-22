import firebase from 'firebase/app';
import 'firebase/firestore';

import {Category, Event, Member} from "./model";
import {firebaseFirestore} from './firebase';


const CATEGORIES = "categories";
const MEMBERS = "members";
const EVENTS = "events";

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
        let result = false;
        try {
            let success = await this.database
                .collection(CATEGORIES)
                .doc(category.id)
                .set(Object.assign({}, category));
            console.log("Success creating category: ", success);
            result = true;
        } catch (error) {
            console.error("Error writing category. Nothing changed: ", error);
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
        let result = false;
        const members = event.members;
        delete event.members;
        try {
            let success = await this.database
                .collection(CATEGORIES)
                .doc(categoryId)
                .collection(EVENTS)
                .doc(event.id)
                .set(Object.assign({}, event));
            console.log("Success writing event: ", success);
            for (let member of members) {
                let success1 = await this.database
                    .collection(CATEGORIES)
                    .doc(categoryId)
                    .collection(EVENTS)
                    .doc(event.id)
                    .collection(MEMBERS)
                    .doc(member.email)
                    .set(Object.assign({}, members));
                console.log("Success writing members of event: ", success1);
            }
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
     * Returns all category ids in the database.
     * */
    async getCategoryIds(): Array<string> {
        const categories = [];
        try {
            const success1 = await this.database.collection(CATEGORIES).get();
            success1.forEach(doc => categories.push(doc.id));
            console.log("Success getting categorie names: ", categories);
        } catch (error) {
            console.error("Error getting categorie names: ", error);
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
    async getMemberMails(categoryId: string, eventId: string): Array<String> {
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
     * Returns a specific category (without events) or null if the category does not exist.
     * @categoryId: is the id of the category.
     * */
    async getCategory(categoryId: string): Category {
        let categorie = null;
        try {
            const doc = await this.database.collection(CATEGORIES).doc(categoryId).get();
            if (doc.exists) {
                categorie = doc.data();
                console.log("Success getting category ", categorie);
            } else {
                console.error("No such category!", doc);
            }
        } catch (error) {
            console.error("Error getting category: ", error);
        }
        return categorie;
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

}