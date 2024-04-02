'use strict';

export class Score {
    #date;
    #hits;
    #percentage;

    constructor(date, hits, percentage) {
        this.#date = date;
        this.#hits = hits;
        this.#percentage = percentage;
    }

    get date() {
        return this.#date;
    }
    get hits() {
        return this.#hits;
    }
    set hits(hits) {
        this.#hits = hits;
    }
    get percentage() {
        return this.#percentage;
    }
}