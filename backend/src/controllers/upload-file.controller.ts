import { Router } from "express";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import config from "../configs/firebase.config";
const express = require('express');
const multer = require('multer');
const router: Router = express.Router();

// Initialize a firebase application
initializeApp(config.firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

router.post("/multiple", upload.array("files", 10), async (req: any, res: any) => {
    try {
        const files = req.files;
        const fileUploadPromises = files.map(async (file: any) => {
            const dateTime = giveCurrentDateTime();
            const storageRef = ref(storage, `files/${file.originalname + "       " + dateTime}`);

            // Create file metadata including the content type
            const metadata = {
                contentType: file.mimetype,
            };

            // Upload the file in the bucket storage
            const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);

            console.log(`File ${file.originalname} successfully uploaded.`);
            return {
                name: file.originalname,
                type: file.mimetype,
                downloadURL: downloadURL
            };
        });

        // Wait for all file uploads to complete
        const uploadedFiles = await Promise.all(fileUploadPromises);

        return res.json({

            files: uploadedFiles
        });
    } catch (error: any) {
        return res.status(400).send(error.message);
    }
});

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}

export default router;
