import * as firebase from 'firebase';
import 'firebase/database';

import {Event, Category, Member} from "./model";
import {firebaseConfig} from "/firebaseConfig";

const CATEGORIES = "categories";
const MEMBERS = "members";
const EVENTS = "events";



export default class FirebaseConnector {

    database: firebase.firestore.Firestore = null;


    constructor() {
        if (this.database === null) {
            try {
                firebase.initializeApp(firebaseConfig);
            } catch (e) {
            }
            this.database = firebase.firestore()
        }
    }

    createCategory(category: Category): boolean {
        let result = false;
        this.database
            .collection(CATEGORIES)
            .doc(category.name)
            .set(Object.assign({}, category))
            .then(() => {
                console.log("Success creating category");
                result = true;
            })
            .catch((error) => {
                console.error("Error writing categorie. Nothing changed: ", error);
            });
        return result
    }

    createEvent(categoryName: string, event: Event): boolean {
        let result = false;
        const members = event.members;
        delete event.members;

        this.database
            .collection(CATEGORIES)
            .doc(categoryName)
            .collection(EVENTS)
            .doc(event.id)
            .set(Object.assign({}, event))
            .then(() => {
                console.log("Success writing event");
                for (const member of members) {
                    this.database
                        .collection(CATEGORIES)
                        .doc(categoryName)
                        .collection(EVENTS)
                        .doc(event.id)
                        .collection(MEMBERS)
                        .doc(member.email)
                        .set(Object.assign({}, members))
                        .then(() => {
                            console.log("Success writing members of event.");
                            result = true
                        })
                        .catch((error) => {
                            console.error("Error writing members of event. Only some were written: ", error);
                        });
                }
            })
            .catch((error) => {
                console.error("Error writing event. Nothing changed: ", error);
            });
        return result;
    }

    createMember(categoryName: string, eventId: string, member: { email: string, name: string }): boolean {
        console.log("Member!", member);
        let result = false;
        this.database
            .collection(CATEGORIES)
            .doc(categoryName)
            .collection(EVENTS)
            .doc(eventId)
            .collection(MEMBERS)
            .doc(member.email)
            .set(Object.assign({}, member))
            .then(() => {
                console.log("Success creating member!");
                result = true
            }).catch((error) => {
            console.error("Error creating member document: ", error);
        });
        return result;
    }

    getCategoryNames(): Array<String> {
        const categories = [];
        this.database
            .collection(CATEGORIES)
            .get()
            .then((success1) => {
                success1.forEach((doc) => {
                    categories.push(doc.id)
                });
            })
            .catch((error) => {
                console.error("Error getting categorie names: ", error);
            });
        console.log("Success getting categorie names: ", categories);
        return categories;
    }

    getEventIds(categoryName: string): Array<String> {
        const events = [];
        this.database
            .collection(CATEGORIES)
            .doc(categoryName)
            .collection(EVENTS)
            .get()
            .then((success1) => {
                success1.forEach((doc) => {
                    events.push(doc.id)
                });
            })
            .catch((error) => {
                console.error("Error getting event names: ", error);
            });
        console.log("Success getting event names: ", events);
        return events;
    }

    getMemberMails(categoryName: string, eventId: string): Array<String> {
        const memberIds = [];

        this.database
            .collection(CATEGORIES)
            .doc(categoryName)
            .collection(EVENTS)
            .doc(eventId)
            .collection(MEMBERS)
            .get()
            .then((success1) => {
                success1.forEach((doc) => {
                    memberIds.push(doc.id)
                });
            })
            .catch((error) => {
                console.error("Error getting event members: ", error);
            });
        console.log("Success getting event members: ", memberIds);
        return memberIds;
    }

    //may return null if not exists and does not include events
    getCategory(categoryName: string): Category {
        let categorie = null;
        this.database
            .collection(CATEGORIES)
            .doc(categoryName)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    categorie = doc.data();
                    console.log("Success getting category ", categorie);
                } else {
                    console.error("No such category!", doc);
                }
            })
            .catch((error) => {
                console.error("Error getting category: ", error);
            });
        return categorie;
    }

    //may return null if not exists and does not include members
    getEvent(categoryName: string, eventId: string): Event {
        let event = null;
        this.database
            .collection(CATEGORIES)
            .doc(categoryName)
            .collection(EVENTS)
            .doc(eventId)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    event = doc.data();
                    console.log("Success getting event ", event);
                } else {
                    console.error("No such event!", doc);
                }
            })
            .catch((error) => {
                console.error("Error getting event: ", error);
            });
        return event;
    }

    //may return null if not existing
    getMember(categoryName: string, eventId: string, memberMail: string): Member {
        let member = null;
        this.database
            .collection(CATEGORIES)
            .doc(categoryName)
            .collection(EVENTS)
            .doc(eventId)
            .collection(MEMBERS)
            .doc(memberMail)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    member = doc.data();
                    console.log("Success getting member ", member);
                } else {
                    console.error("No such member!", doc);
                }
            })
            .catch((error) => {
                console.error("Error getting member: ", error);
            });
        return member;
    }

}