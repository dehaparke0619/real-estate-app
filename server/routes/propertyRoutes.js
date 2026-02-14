const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');
const authenticateToken = require('../middleware/auth');

const prisma = new PrismaClient();

// Multer configuration for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Get all properties
router.get('/', async (req, res) => {
    try {
        const properties = await prisma.property.findMany({
            include: { category: true },
            orderBy: { createdAt: 'desc' }
        });

        const formattedProperties = properties.map(p => ({
            ...p,
            images: p.images ? JSON.parse(p.images) : []
        }));

        res.json(formattedProperties);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single property
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const property = await prisma.property.findUnique({
            where: { id: parseInt(id) },
            include: { category: true }
        });

        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        res.json({
            ...property,
            images: property.images ? JSON.parse(property.images) : []
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch property' });
    }
});

// POST new property
router.post('/', authenticateToken, upload.array('images', 30), async (req, res) => {
    try {
        const { title, description, price, location, note, categoryId } = req.body;
        console.log("POST /properties body:", req.body); // Log incoming data

        let images = [];
        if (req.files) {
            images = req.files.map(file => file.filename);
        }

        const newProperty = await prisma.property.create({
            data: {
                title,
                description,
                price: parseFloat(price),
                location,
                images: JSON.stringify(images),
                note,
                categoryId: categoryId ? parseInt(categoryId) : null,
            }
        });
        res.status(201).json(newProperty);
    } catch (err) {
        console.error("Error creating property:", err);
        res.status(400).json({ message: err.message });
    }
});

// Update a property (Protected)
router.put('/:id', authenticateToken, upload.array('images', 10), async (req, res) => {
    const { id } = req.params;
    const { title, description, price, location, note, categoryId, existingImages } = req.body;

    let images = [];
    if (req.files && req.files.length > 0) {
        images = req.files.map(file => file.filename);
    }

    // Combine existing images (if any) with new images
    // Note: client should send existingImages as JSON string or array
    let finalImages = images;
    if (existingImages) {
        try {
            const parsedExisting = typeof existingImages === 'string' ? JSON.parse(existingImages) : existingImages;
            finalImages = [...(Array.isArray(parsedExisting) ? parsedExisting : []), ...images];
        } catch (e) {
            console.error("Error parsing existing images", e);
        }
    }

    try {
        const updatedProperty = await prisma.property.update({
            where: { id: parseInt(id) },
            data: {
                title,
                description,
                price: parseFloat(price),
                location,
                images: JSON.stringify(finalImages),
                note,
                categoryId: parseInt(categoryId),
            }
        });
        res.json(updatedProperty);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a property (Protected)
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.property.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Property deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
