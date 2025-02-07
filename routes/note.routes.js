const express = require("express");
const { auth } = require("../middleware/auth.middleware")
const { Notemodel } = require("../models/note.model")
const noteRouter = express.Router()

noteRouter.post("/", auth, async (req, res) => {
    try {
        const newNote = new Notemodel(req.body)
        await newNote.save()
        res.status(200).send({ msg: "Note Created Successfully", status: res.statusCode })
    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error", error: error.message, status: res.statusCode });
    }
})
noteRouter.get("/", auth, async (req, res) => {
    try {
        const notes = await Notemodel.find({ userId: req.body.userId })
        res.status(200).send({ notes: notes, ststus: res.statusCode })
    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error", error: error.message, status: res.statusCode });

    }
})

// PATCH Route to Update a Note
noteRouter.patch("/:noteId", auth, async (req, res) => {
    const { noteId } = req.params;
    try {
        const note = await Notemodel.findOne({_id:noteId})
        if (note.userId.toString() === req.body.userId) {
                await Notemodel.findByIdAndUpdate({_id:noteId}, req.body)
                res.status(200).send({msg:`The Note with Id: ${noteId} has been updated`})
        }else{
            res.send({msg:"You are not authorizrd to perform this task"})
        }
    } catch (error) {
        res.status(500).send({error})
    }
});


noteRouter.delete("/:noteId",auth, async (req, res) => {
    const { noteId } = req.params;
    try {
        const note = await Notemodel.findOne({_id:noteId})
        console.log("userId for nore:", note.userId);
        console.log(req.body.userId);
        
        if (note.userId.toString() === req.body.userId) {
                await Notemodel.findByIdAndDelete({_id:noteId}, req.body)
                res.status(200).send({msg:`The Note with Id: ${noteId} has been Deleted`})
        }else{
            res.send({msg:"You are not authorizrd to perform this task"})
        }
    } catch (error) {
        res.status(500).send({error})
    }
})

module.exports = { noteRouter }