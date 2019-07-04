const _ = require('lodash');
const arkhamCards = require('./arkhamCardList.json');
const arkhamBaseURL = 'https://arkhamdb.com';

class HorrorBot {
    constructor () {
        this.allCards = _.reduce(arkhamCards, function (collection, card) {
            if (card.imagesrc != null) {
                card.name = _.toLower(card.name);
                card.subname = _.toLower(card.subname);
                collection.push(card);
            }
            return collection;
        }, []);
        this.secrets = {
            pawterson : {
                imagesrc : '/bundles/cards/03114.jpg'
            }
        };
    }
    respondWithCard (searchTerms) {
        let query = this.buildQuery(searchTerms);
        let card = this.searchForCard(query);
        return this.getCardImage(card);
    }
    buildQuery (searchTerms) {
        let query = {
            searchValue : '',
            cardLevel : 0
        };
        
        if (searchTerms.length === 1) {
            query.searchValue = _.first(searchTerms); //Only 1 arg, probably
        } else if (searchTerms.length > 1 && !_.some(searchTerms, _.isNumber)) {
            query.searchValue = searchTerms.join(' ');
        } else if (_.some(searchTerms, _.isNumber)) {
            //
        }

        query.searchValue = _.toLower(query.searchValue);

        return query;
    }
    searchForCard (query) {
        let queryResult = this.queryCards(query.searchValue);
        if (queryResult.card) {
            return queryResult.card;
        } else if (queryResult.multipleMatches) {
            return _.first(queryResult.matches); //todo try harder
        }
        return queryResult;
    }
    queryCards (userSearch) {
        let queryResult = {
            matches : []
        };

        if (_.has(this.secrets, userSearch)) {
            queryResult.card = this.secrets[userSearch];
            return queryResult;
        }
        
        _.forEach(this.allCards, function (card) {
            if (card.name === userSearch || card.subname === userSearch) {
                queryResult.card = card;
                return false; //We found it, stop
            } else if (_.includes(card.name, userSearch) || _.includes(card.subname, userSearch)) {
                queryResult.matches.push(card);
            }
        });

        if (queryResult.matches.length === 1) {
            queryResult.card = _.first(queryResult.matches);
        } else if (queryResult.matches.length > 1) {
            queryResult.multipleMatches = true;
        } else if (queryResult.card == null || queryResult.matches.length === 0) {
            queryResult.notFound = true;
            queryResult.message = 'Card not found.';
        }

        return queryResult;

    }
    getCardImage (card) {
        if (card.notFound) {
            return card.message;
        } else {
            return arkhamBaseURL + card.imagesrc;
        }
    }
}

module.exports = new HorrorBot();