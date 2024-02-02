const express = require('express');
const router = express.Router();

const routing = require('../controller/User')

router.get('/get', routing.getUsers);
router.post('/write', routing.createUser);
router.get('/:id', routing.getUser);
router.put('/:id', routing.editUser);
router.delete('/:id', routing.deleteUser);

module.exports = router;