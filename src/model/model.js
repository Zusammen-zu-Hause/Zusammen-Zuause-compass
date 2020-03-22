export class Event {
    constructor(id: string,
                additional: { blind: boolean, childFriendly: boolean, deaf: boolean, interactive: boolean, physicalDisabled: boolean, together: boolean },
                age: { min: number, max: number },
                creationDate: string,
                description: string,
                financial: { mandatory: boolean, price: string },
                institution: string,
                logoSrc: string,
                memberCount: { min: number, max: number },
                startDate: string,
                shortDescription: string,
                title: string,
                members: Array<{ id: string, email: string, name: string }>) {
        this.id = id; //is Id in database
        this.additional = additional;
        this.age = age;
        this.creationDate = creationDate;
        this.description = description;
        this.financial = financial;
        this.institution = institution;
        this.logoSrc = logoSrc;
        this.memberCount = memberCount;
        this.startDate = startDate;
        this.shortDescription = shortDescription;
        this.title = title;
        this.members = members;
    }


}

export class Category {
    constructor(id:string, name: string, link: string, image: string) {
        this.id = id; //is Id in database
        this.name = name;
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
