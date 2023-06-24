import axios from "axios";
import sessionToken from "../models/sessionToken.js";

export const flightAPIOneWay = async (req,res) =>{
    try{
        const options = {
            method: 'POST',
            url: 'https://skyscanner-api.p.rapidapi.com/v3/flights/live/search/create',
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': 'eccd6d6feemsh2a777da29beaf15p14fe1ajsncb2464e044e6',
              'X-RapidAPI-Host': 'skyscanner-api.p.rapidapi.com'
            },
            data: {
              query: {
                market: 'UK',
                locale: 'en-GB',
                currency: 'EUR',
                queryLegs: [
                  {
                    originPlaceId: {iata: 'LHR'},
                    destinationPlaceId: {iata: 'DXB'},
                    date: {
                      year: 2023,
                      month: 9,
                      day: 20
                    }
                  }
                ],
                cabinClass: 'CABIN_CLASS_ECONOMY',
                adults: 2,
                childrenAges: [3, 9]
              }
            }
          };

          const response = await axios.request(options);
          const token = response.data.sessionToken;
        const newToken = new sessionToken({
            sessionToken : token
        });
        await newToken.save();
        return res.send("Token saved successfully.");

        

    }catch(err){
        return res.send(err);
    }
}

export const searchFlight = async (req,res) =>{
    try{
        const {_id} = req.body;
        const token = await sessionToken.find({_id}).exec();
        if(!token.length) return res.send("Generate token again.");
        const options = {
            method: 'GET',
            url: `https://skyscanner-api.p.rapidapi.com/v3/flights/live/search/poll/${token[0].sessionToken}`,
            headers: {
              'X-RapidAPI-Key': 'eccd6d6feemsh2a777da29beaf15p14fe1ajsncb2464e044e6',
              'X-RapidAPI-Host': 'skyscanner-api.p.rapidapi.com'
            }
          };

          const response = await axios.request(options);
          return res.send(response.data);
    }catch(err){
        return res.send(err);
    }
}