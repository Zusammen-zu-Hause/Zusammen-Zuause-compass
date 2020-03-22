import {Category, Event, Member} from "./model/model";
import FirebaseConnector from "./model/FirebaseConnector";


export const exampleEvent = new Event(
    "",
    {
        blind: true,
        childFriendly: true,
        deaf: true,
        interactive: true,
        physicalDisabled: true,
        together: true
    },
    {min: 0, max: 12},
    "2020-03-20T17:00:00.00+01:00",
    "This is a example description",
    {price: "0", mandatory: false},
    "YKZq9qQz8VjBOhW0Lidq",
    "src/logo",
    {min: 0, max: 20},
    "2020-04-20T17:00:00.00+01:00",
    "This is a short description",
    "Beste Kunstauffstellung der welt",
    [{
        name: "hans",
        email: "mail@mail.de"
    }]
);



export const exampleCategory = new Category(
    "kunst",
    "Kunst",
    "wwwn.kunst.de",
    "wwwn.kuns.de/image/path"
);

export const exampleMember = new Member(
    "hans@hans.de",
    "hans Mueller"
);

let db = null;
// db = new FirebaseConnector().createCategory(exampleCategory);
// db = new FirebaseConnector().createEvent("kunst", exampleEvent);
// db = new FirebaseConnector().createMember("kunst", "HGFVBNJKTFGHDMNBGYJK", exampleMember);
// //
// db = new FirebaseConnector().getCategoryIds();
// db = new FirebaseConnector().getEventIds("kunst");
// db = new FirebaseConnector().getMemberMails("kunst", "HGFVBNJKTFGHDMNBGYJK");
// //
// db = new FirebaseConnector().getCategory("kunst");
// db = new FirebaseConnector().getEvent("kunst", "HGFVBNJKTFGHDMNBGYJK");
// db = new FirebaseConnector().getMember("kunst", "HGFVBNJKTFGHDMNBGYJK", "hans@hans.de");
