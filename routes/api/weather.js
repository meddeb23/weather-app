const express = require("express");
const route = express.Router();
const Axios = require('axios');


route.get("/search", async (req, res) => {
    try {
        const response = await Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&appid=${process.env.API_KEY}&units=metric`);
        res.status(200).json({data:response.data});
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "somthing went wrong"})
    }
})
route.get('/forecast', async (req, res) => {
    try {
        const response = await Axios.get(`
        http://api.openweathermap.org/data/2.5/forecast?q=${req.query.city}&appid=${process.env.API_KEY}&units=metric`);
        res.status(200).json({data:response.data});
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "somthing went wrong"})

    }
})

module.exports = route;