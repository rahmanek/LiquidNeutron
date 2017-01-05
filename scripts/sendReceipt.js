"use strict";

var request = require('request');
var config = require('../config.js');

var path = config.apiHost + "/activity/receipt/create";
console.log(path);
var postData = {
	Key: "3dc38f75c1c531487da0d312f23a16f0",
	Link: {
		fingerprint:"fd92d30188397b3dd6236426554a83a8f324"
	},
	Receipt:{
   	"id":"057acf3cb945f739",
   	"attendant":{
      	"name":"Rinderle Righter",
      	"id":"97d4c5966e148b18"
   },
   "total":"1362.60",
   "items":[
      [
         {
            "description":"Spinach, Mix Green",
            "quantity":3,
            "unitPrice":"38.64",
            "total":"115.92"
         },
         {
            "description":"Squash, Vegetable Marrow",
            "quantity":2,
            "unitPrice":"16.33",
            "total":"32.66"
         },
         {
            "description":"Peas, Sugar Snap",
            "quantity":9,
            "unitPrice":"1.49",
            "total":"13.41"
         },
         {
            "description":"Lettuce Trio",
            "quantity":2,
            "unitPrice":"8.66",
            "total":"17.32"
         },
         {
            "description":"Spinach, New Zealand",
            "quantity":8,
            "unitPrice":"25.43",
            "total":"203.44"
         },
         {
            "description":"Greens, Dandelion",
            "quantity":7,
            "unitPrice":"20.42",
            "total":"142.94"
         },
         {
            "description":"Grape Nuts",
            "quantity":8,
            "unitPrice":"48.53",
            "total":"388.24"
         },
         {
            "description":"Yams (Name Nyah-May) Ret",
            "quantity":7,
            "unitPrice":"16.33",
            "total":"114.31"
         },
         {
            "description":"Vegetable Blend",
            "quantity":2,
            "unitPrice":"22.51",
            "total":"45.02"
         },
         {
            "description":"Okra, Red",
            "quantity":2,
            "unitPrice":"24.11",
            "total":"48.22"
         },
         {
            "description":"Turnip, Retailer Assigned",
            "quantity":0,
            "unitPrice":"21.89",
            "total":"0.00"
         }
      ],
      [
         {
            "description":"Subtotal",
            "total":1121.48
         },
         {
            "description":"MA State Tax @ 6.25%",
            "total":72.9
         },
         {
            "description":"Gratuity",
            "total":168.22
         },
         {
            "description":"Grand Total",
            "total":"1362.60"
         }
      ]
   ]}
}

request.post(path, {form:postData},function(err,res,bodyString){
   if(!err){
		var body = JSON.parse(bodyString);
      console.log(body);
   } else {
      console.log(err);
   }
});
