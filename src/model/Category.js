export default class Category {

    constructor(name: string, age: { min: number, max: number }, childrenFriendly: boolean, creationDate: string, description: string, financial: { mandatory: boolean, price: string }, handicap: { blind: boolean, deaf: boolean, educationallyDisabled: boolean, physicalDisabled: boolean }, institution: string, interactive: boolean, logoSrc: string, memberCount: { min: number, max: number }, startDate: string, title: string, together: boolean, members: Array<{ id: string, email: string, name: string }>) {
        this._name = name;
        this._age = age;
        this._childrenFriendly = childrenFriendly;
        this._creationDate = creationDate;
        this._description = description;
        this._financial = financial;
        this._handicap = handicap;
        this._institution = institution;
        this._interactive = interactive;
        this._logoSrc = logoSrc;
        this._memberCount = memberCount;
        this._startDate = startDate;
        this._title = title;
        this._together = together;
        this._members = members;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get age(): { min: number, max: number } {
        return this._age;
    }

    set age(value: { min: number, max: number }) {
        this._age = value;
    }

    get childrenFriendly(): boolean {
        return this._childrenFriendly;
    }

    set childrenFriendly(value: boolean) {
        this._childrenFriendly = value;
    }

    get creationDate(): string {
        return this._creationDate;
    }

    set creationDate(value: string) {
        this._creationDate = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get financial(): { mandatory: boolean, price: string } {
        return this._financial;
    }

    set financial(value: { mandatory: boolean, price: string }) {
        this._financial = value;
    }

    get handicap(): { blind: boolean, deaf: boolean, educationallyDisabled: boolean, physicalDisabled: boolean } {
        return this._handicap;
    }

    set handicap(value: { blind: boolean, deaf: boolean, educationallyDisabled: boolean, physicalDisabled: boolean }) {
        this._handicap = value;
    }

    get institution(): string {
        return this._institution;
    }

    set institution(value: string) {
        this._institution = value;
    }

    get interactive(): boolean {
        return this._interactive;
    }

    set interactive(value: boolean) {
        this._interactive = value;
    }

    get logoSrc(): string {
        return this._logoSrc;
    }

    set logoSrc(value: string) {
        this._logoSrc = value;
    }

    get memberCount(): { min: number, max: number } {
        return this._memberCount;
    }

    set memberCount(value: { min: number, max: number }) {
        this._memberCount = value;
    }

    get startDate(): string {
        return this._startDate;
    }

    set startDate(value: string) {
        this._startDate = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get together(): boolean {
        return this._together;
    }

    set together(value: boolean) {
        this._together = value;
    }


    get members(): Array<{ id: string, email: string, name: string }> {
        return this._members;
    }

    set members(value: Array<{ id: string, email: string, name: string }>) {
        this._members = value;
    }
}