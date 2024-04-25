const express = require("express");
const MapModel = require("../model/Map");
const router = express.Router();

// Route to add a new map seed
router.post("/map/add", async (req, res) => {
    try {
        // Extract map data from request body
        const { ...mapData } = req.body;

        // Create a new map instance with the extracted data
        const newMap = new MapModel({
            ...mapData
        });

        // Save the new map to the database
        const data = await newMap.save();

        // Log success message and send response with status 201 (Created)
        console.log("New map has been added:", data);
        res.status(201).json(data);
    } catch (error) {
        // Log error message and send response with status 500 (Internal Server Error)
        console.error("Error occurred:", error);
        res.status(500).send(error);
    }
});

// Route to fetch the list of maps
router.get("/map/map-list", async (req, res) => {
    try {
        // Retrieve all maps from the database
        const mapList = await MapModel.find({});

        // Send response with status 200 (OK) and the retrieved map list
        res.status(200).json(mapList);
    } catch (error) {
        // Log error message and send response with status 500 (Internal Server Error)
        console.error("Error occurred:", error);
        res.status(500).send(error);
    }
});

// Route to fetch a map by its seed
router.get("/map/seed/:seed", async (req, res) => {
    try {
        // Extract seed from request parameters
        const seed = req.params.seed;

        // Find a map with the given seed from the database
        const map = await MapModel.findOne({ "seed": seed });

        if (map) {
            // If map is found, send response with status 200 (OK) and the retrieved map
            res.status(200).json(map);
        } else {
            // If map is not found, send response with status 401 (Unauthorized) and error message
            res.status(401).json({
                message: `Map with seed ${seed} doesn't exist`
            });
        }
    } catch (error) {
        // Log error message and send response with status 500 (Internal Server Error)
        console.error("Error occurred:", error);
        res.status(500).send(error);
    }
});

router.put("/map/:id", async(req,res)=>{
    try{

        const mapId = req.params.id
        const data = req.body;

        const updatedData = await MapModel.findOneAndUpdate(
            { _id: mapId },
            data,
            { new: true }
        );

        if (!updatedData) {
            return res.status(404).json({ message: "Map not found" });
        }
        res.status(200).json(updatedData);

    }catch(error){
        console.error("Error occurred:", error);
        res.status(500).send(error);
    }
});

module.exports = router;