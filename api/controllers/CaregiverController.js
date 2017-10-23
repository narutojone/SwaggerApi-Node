var mongoose = require("mongoose");
var CaregiverModel = require("../../models/CaregiverModel");
var common = require("../../app/common.js");

'use strict';

var util = require('util');

module.exports = {
  signup: signup,
  deleteCaregiver: deleteCaregiver,
  findCaregiverByID: findCaregiverByID,
  findCaregivers: findCaregivers,
};

function signup(req, res) {
  var data = req.swagger.params.body.value;
  if(data.firstname==undefined||data.lastname==undefined||data.email==undefined||data.password==undefined||data.phonenumber==undefined) {
    common.sendNormalResponse(res, false, "Please input all fields", '');
    return;
  } else {
    if(!common.validateEmail(data.email)) {common.sendNormalResponse(res, false, "Please input correct email", ''); return;}
    else if(!common.validatePhone(data.phonenumber)) {common.sendNormalResponse(res, false, "Please input correct phonenumber", ''); return;}
    var email = data.email;
    CaregiverModel.findOne({email: email}, function(err, user){
        if(err){
            common.sendBadResponse(res, false, "Error while add User.", '')
        } else {
            if(user){
                common.sendNormalResponse(res, false, "This user was already added.", '');
            } else {
                CaregiverModel.find().lean().sort([["_id", "descending"]]).limit(1).exec(function(err, users){
                    if(err){
                        common.sendNormalResponse(res, false, err, '');
                    } else {
                        let _id = (users.length>0) ? users[0]._id+1 : 0
                        let caregiver = new CaregiverModel({
                            _id: _id,
                            first_name: data.firstname,
                            last_name: data.lastname,
                            email: data.email,
                            phonenumber: data.phonenumber,
                            password: data.password
                        });
                        caregiver.save(function(err){
                            if(err){
                                common.sendNormalResponse(res, false, err, '');
                            } else {
                                common.sendNormalResponse(res, true, "Successfully added.", '');
                            }
                        });
                    }
                });
            }
        }
    });
  }  
}

function deleteCaregiver(req, res) {
    console.log(req.swagger.params.id.value);

    var delete_id = req.swagger.params.id.value;
    if(delete_id==undefined){
        common.sendNormalResponse(res, false, "delete_id is undefined.", '');
        return;
    }
    
    CaregiverModel.findOne({_id: delete_id}, function(err, caregiver){
        if(err || !caregiver){
            common.sendNormalResponse(res, true, "Successfully removed.", '');
        } else{
            caregiver.remove(function(err, doc){                
               common.sendNormalResponse(res, true, "Successfully removed.", '');                
            });
        }
    });
}

function findCaregiverByID(req, res) {
    console.log(req.swagger.params.id.value);

    var find_id = req.swagger.params.id.value;
    if(find_id==undefined) {
        common.sendNormalResponse(res, false, "find_id is undefined.", "");
        return;
    }

    CaregiverModel.findOne({_id: find_id}, function(err, caregiver){
        if(err || !caregiver) {
            common.sendNormalResponse(res, false, "Can't find Caregiver", "");
        } else {
            var data = {
                id: caregiver._id,
                firstname: caregiver.first_name,
                lastname: caregiver.last_name,
                gender: caregiver.gender,
                email: caregiver.email,
                phonenumber: caregiver.phonenumber,
                password: caregiver.password,
                image_path: caregiver.image_path,
                home_address: caregiver.home_address,
                city: caregiver.city,
                zip_code: caregiver.zip_code,
                state: caregiver.state,
                description: caregiver.description,
                rating: caregiver.rating,
                latitude: caregiver.latitude,
                longitude: caregiver.longitude,
                pet_ids: caregiver.pet_ids
            }
            common.sendNormalResponse(res, true, "Success", data);
        }
    });
}

function findCaregivers(req, res) {
    var tags = req.swagger.params.tags.value;
    var limit = req.swagger.params.limit.value;

    CaregiverModel.find({}, function(err, caregivers){
        if(err || !caregivers) {
            common.sendNormalResponse(res, false, "Can't find Caregiver", "");
        } else {
            var count = 0;
            var datas = [];
            console.log(caregivers);
            Object.keys(caregivers).forEach(function(current, index, caregiver){
                console.log(caregiver);
                console.log(current);
                console.log(index);

                var data = {
                    id: caregiver._id,
                    firstname: caregiver.first_name,
                    lastname: caregiver.last_name,
                    gender: caregiver.gender,
                    email: caregiver.email,
                    phonenumber: caregiver.phonenumber,
                    password: caregiver.password,
                    image_path: caregiver.image_path,
                    home_address: caregiver.home_address,
                    city: caregiver.city,
                    zip_code: caregiver.zip_code,
                    state: caregiver.state,
                    description: caregiver.description,
                    rating: caregiver.rating,
                    latitude: caregiver.latitude,
                    longitude: caregiver.longitude,
                    pet_ids: caregiver.pet_ids
                }                
                datas.push(data);
                common.sendNormalResponse(res, true, "Success", datas);                
            });
        }
    });
}