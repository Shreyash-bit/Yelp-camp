const express = require('express');
const router = express.Router();
const campgrouds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(campgrouds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrouds.createCampground));

router.get('/new', isLoggedIn, campgrouds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrouds.showCampground))
    .put( isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrouds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrouds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrouds.renderEditForm));

module.exports = router;