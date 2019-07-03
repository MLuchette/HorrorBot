const _ = require('lodash');
const arkhamCards = require('./arkhamCardList.json');
const arkhamBaseURL = 'https://arkhamdb.com';

module.exports = class HorrorBot {
    constructor () {
        this.allCards = arkhamCards;
    }
    search (query) {
        let potentialCards = _.filter(this.allCards, function (card) {
            return _.includes(_.toLower(card.name), query);
        });
        if (potentialCards.length === 1) {
            return potentialCards[0];
        } else if (potentialCards.length > 1) {
            return potentialCards[0]; //todo actually try harder
        } else {
            return { notFound : true, message : 'Card not found' };
        }
    }
    getCardImage (query) {
        let card = this.search(query);
        if (card.notFound) {
            return card.message;
        } else {
            return arkhamBaseURL + card.imagesrc;
        }
    }
    getQueryFromMessage (fullMessage) {
        let parsed = _.words(fullMessage);
        let command = parsed[0];
        let query = parsed[1];
        return _.toLower(query);
    }
    respondWithCard(fullMessage) {
        return this.getCardImage(this.getQueryFromMessage(fullMessage));
    }
}