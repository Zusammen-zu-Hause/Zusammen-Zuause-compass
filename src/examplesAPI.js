import FirebaseConnector from "model/FirebaseConnector";
import {Category, Event, Member} from "./model/model";

let db = null;
db = new FirebaseConnector().createCategory(exampleCategory);
db = new FirebaseConnector().createEvent("Kunstausstellungen", exampleEvent);
db = new FirebaseConnector().createMember("Kunstausstellungen", "HGFVBNJKTFGHDMNBGYJK", exampleMember);
//
db = new FirebaseConnector().getCategoryNames();
db = new FirebaseConnector().getEventIds("Kunstausstellungen");
db = new FirebaseConnector().getMemberMails("Kunstausstellungen", "HGFVBNJKTFGHDMNBGYJK");
//
db = new FirebaseConnector().getCategory("Kunstausstellungen");
db = new FirebaseConnector().getEvent("Kunstausstellungen", "HGFVBNJKTFGHDMNBGYJK");
db = new FirebaseConnector().getMember("Kunstausstellungen", "HGFVBNJKTFGHDMNBGYJK", "hans@hans.de");


export const exampleCategory = new Category(
    "Kunstausstellungen",
    "http://link.de",
    "path/to/img"
);

export const exampleEvent = new Event(
    "HGFVBNJKTFGHDMNBGYJK",
    "MegaEvent",
    {min: 0, max: 12},
    true,
    "2020-03-20T17:00:00.00+01:00",
    "This is a example category",
    {price: "0", mandatory: false},
    {blind: false, deaf: false, physicalDisabled: false, educationallyDisabled: false},
    "Example Institution",
    false,
    "src/logo",
    {min: 0, max: 20},
    "2020-04-20T17:00:00.00+01:00",
    "Beste Kunstauffstellung der welt",
    false,
    [{
        name: "hans",
        email: "mail@mail.de"
    }]
);

export const exampleMember = new Member(
    "hans@hans.de",
    "hans Mueller"
);