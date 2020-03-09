const functions = require('firebase-functions');
const cors = require('cors')({origin:true});
var axios = require('axios');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.businessInfo = functions.https.onCall((data, context)=>{
      return axios.get(`https://api.yelp.com/v3/businesses/${data.id}`, {
        headers: {
          Authorization: `Bearer XyLNjPiVmPm-_-Og2rpIVSqVUNbsAihqwf21PVcmpbmhQow8HEAflaDDLiO8rT6SmehRVMyJNLz-OqjyiwXCqy45-EIE7yVttnY9440F04drNBm_ceiBgnsVUWNEXnYx`,
          'X-Requested-With': `XMLHttpRequest`,
        }
      }).then(r => {
          return r.data;
      }).catch(err =>{
          return err;
      })
});

exports.yelpCall = functions.https.onCall((data, context)=>{
       return axios.get(`https://api.yelp.com/v3/businesses/search`, {
            headers: {
              Authorization: `Bearer XyLNjPiVmPm-_-Og2rpIVSqVUNbsAihqwf21PVcmpbmhQow8HEAflaDDLiO8rT6SmehRVMyJNLz-OqjyiwXCqy45-EIE7yVttnY9440F04drNBm_ceiBgnsVUWNEXnYx`,
              'X-Requested-With': `XMLHttpRequest`,
            },
            params: data.params,
       }).then(r => {
          return r.data;
      }).catch(err => err);

})
