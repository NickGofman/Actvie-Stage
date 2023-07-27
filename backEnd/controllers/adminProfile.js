'use strict';
const pool = require('../database');
const jwt = require('jsonwebtoken');

//#region ================UPDATE PROFILE================
const updateProfile = (req, res) => {
  const token = req.cookies.accessToken;
  console.log('CONTROLLERS BACKEND updateProfile');
  const { businessEmail, businessName, address, phone, managerName } = req.body;

  if (!token) return res.status(401).json('Not logged in!');
  jwt.verify(token, 'secretKey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');
    const qCheckEmail = 'SELECT * FROM user WHERE Email = ?';

    pool.query(qCheckEmail, [businessEmail], (err, userData) => {
      if (err) return res.status(500).json(err);

      if (userData.length > 0 && userData[0].UserId !== userInfo.id) {
        // Email already exists for another user
        return res.status(409).json('Email already exists for another user');
      }

      const qUpdateProfile =
        'UPDATE business JOIN user ON business.UserId = user.UserId SET business.businessName = ?, business.address = ?, user.PhoneNumber = ?, business.managerName = ? WHERE business.UserId = ?';

      const values = [businessName, address, phone, managerName, userInfo.id];
      pool.query(qUpdateProfile, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json('Admin information updated successfully');
      });
    });
  });
};

//#endregion

//#region ================GET ADMIN PROFILE================
const getAdminData = (req, res) => {
  const userId = req.params.id;

  console.log('IN BACKEND getProfile');
  const q =
    'SELECT businessName, address, PhoneNumber, managerName,b.Email  FROM business as b JOIN user as u ON b.UserId = u.UserId WHERE b.UserId = ?';
  pool.query(q, userId, (err, data) => {
    if (err) return res.status(500).json(err);
    console.log('IN BACKEND getProfile DATA:', data);
    return res.status(200).json(data);
  });
  //
};

//#endregion

module.exports = {
  updateProfile,
  getAdminData,
};
