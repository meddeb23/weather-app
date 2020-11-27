const { default: Axios } = require("axios");
const express = require("express");
const route = express.Router();
const {createClient} = require('pexels')

const client = createClient(process.env.API_KEY_pexel)

route.get("/search", async (req, res) => {
    const query = req.query.city;
    console.log(query)
    client.photos.search({ query, per_page: 1 }).then(photos => {
        console.log(photos)
        res.status(200).json(photos);
    }).catch(err=>console.log(err));
})

module.exports = route;