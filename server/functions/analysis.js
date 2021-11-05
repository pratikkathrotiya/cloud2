var lda = require('lda');
var Sentiment = require('sentiment');
var sent = new Sentiment();

module.exports = {
    cleaningData: function (data) {
        //removing user mention, link and RT
        regex = /(@\w*)|((?:https?):\/\/[\n\S]+)|RT/g
        let newstr = data.replace(regex, '')
        return newstr
    },

    sentimentAnalyser: function (tweet) {
        try {
            const result = sent.analyze(tweet);
            let sentiment;
            if (result.score < -1) {
                sentiment = 'negative';
            } else if (result.score > 1) {
                sentiment = 'positive';
            } else {
                sentiment = 'neutral';
            }
            return sentiment

        } catch {
            return 'error'
        }
    },

    topicModelling: function (data) {
        try {
            //Using Latent Dirichlet Allocation to get the top 8 topics with random seed
            const lda_result = lda(data, 8, 10, null, null, null, 99);
            const topic = []
            const keys = { 'term': 'value', 'probability': 'count' };
            const changeKey = o => Object.assign(...Object.keys(o).map(k => ({ [keys[k] || k]: o[k] })));
            lda_result.map((result, index) => {
                //disregrard any topic with less than 3 words
                if (result.length > 3) {
                    const topicres = {}
                    topicres.title = `topic${index + 1}`
                    //changing the key name for each topic object
                    topicres.words = result.map(changeKey);
                    topicres.sentiment = module.exports.sentimentAnalyser(result.map(x => x.term).join(' '));
                    topic.push(topicres)
                }
            })
            return topic
        }
        catch {
            return 'error';
        }
    },

    runAnalysis: async function (userTweets) {
        const cleandata = [];
        const tweetanalysis = [];
        const monthlySentimentTotals = {}

        allsentiment = {
            positive: 0,
            negative: 0,
            neutral: 0,
        }
        const monthlySentiment = {
            positive: 0,
            neutral: 0,
            negative: 0
        };

        userTweets.map(tweet => {
            if (typeof tweet.date === 'string') {
                tweet.date = new Date(tweet.date);
            }
            //Get sentiment for each tweet and count
            const cleantweet = module.exports.cleaningData(tweet.text);
            const sentiment = module.exports.sentimentAnalyser(cleantweet);
            tweet.sentiment = sentiment;
            sentiment === 'positive' && allsentiment.positive++;
            sentiment === 'negative' && allsentiment.negative++;
            sentiment === 'neutral' && allsentiment.neutral++;
            cleandata.push(cleantweet)
            tweetanalysis.push(tweet);

            //Counting for monthly sentiment
            var day = `${tweet.date.getMonth() + 1}-${tweet.date.getFullYear()}`;
            if (!monthlySentimentTotals[day]) {
                monthlySentimentTotals[day] = { ...monthlySentiment };
            }
            if (tweet.sentiment === 'positive') {
                monthlySentimentTotals[day].positive += 1;
            } else if (tweet.sentiment === 'neutral') {
                monthlySentimentTotals[day].neutral += 1;
            } else {
                monthlySentimentTotals[day].negative += 1;
            }

        })

        allsentiment.total = allsentiment.positive + allsentiment.negative + allsentiment.neutral
        allsentiment.positive = allsentiment.positive / allsentiment.total;
        allsentiment.neutral = allsentiment.neutral / allsentiment.total;
        allsentiment.negative = allsentiment.negative / allsentiment.total;


        const topic = module.exports.topicModelling(cleandata);
        return [tweetanalysis, allsentiment, topic, [monthlySentimentTotals]];
    }

}