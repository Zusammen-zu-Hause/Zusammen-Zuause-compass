export class Event {
    constructor(id: string, name: string, age: { min: number, max: number }, childrenFriendly: boolean, creationDate: string, description: string, financial: { mandatory: boolean, price: string }, handicap: { blind: boolean, deaf: boolean, educationallyDisabled: boolean, physicalDisabled: boolean }, institution: string, interactive: boolean, logoSrc: string, memberCount: { min: number, max: number }, startDate: string, title: string, together: boolean, members: Array<{ id: string, email: string, name: string }>) {
        this.id = id; //is Id in database
        this.name = name;
        this.age = age;
        this.childrenFriendly = childrenFriendly;
        this.creationDate = creationDate;
        this.description = description;
        this.financial = financial;
        this.handicap = handicap;
        this.institution = institution;
        this.interactive = interactive;
        this.logoSrc = logoSrc;
        this.memberCount = memberCount;
        this.startDate = startDate;
        this.title = title;
        this.together = together;
        this.members = members;
    }


}

export class Category {
    constructor(name: string, link: string, image: string) {
        this.name = name; //is Id in database
        this.link = link;
        this.image = image;
    }
}

export class Member {
    constructor(email: string, name: string) {
        this.email = email; //is Id in database
        this.name = name;
    }
}
