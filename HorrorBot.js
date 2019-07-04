const _ = require('lodash');
const arkhamCards = require('./arkhamCardList.json');
const arkhamBaseURL = 'https://arkhamdb.com';

class HorrorBot {
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
    respondWithCard(cardQuery, options) {
        return this.getCardImage(cardQuery, options);
    }
}

module.exports = new HorrorBot();