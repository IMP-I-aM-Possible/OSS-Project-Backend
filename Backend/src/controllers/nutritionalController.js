import nutritionalService from "../services/nutritionalService.js";

import health from "../services/healthServices.js"
import axios from 'axios'
const nutritionalController = {

    getNutritional: async (req, res) => {
        try {
            console.log(req.query);
            const nutritional = await nutritionalService.getNutritional(req.query.offset);
            return res.json(nutritional);
        } catch (err) {
            res.json(err);
        }

    },

    getProduct: async (req, res) => { //상세상품
        try {
            console.log(req.params);
            const product = await nutritionalService.getProduct(req.params.nid);
            return res.json(product);
        } catch (err) {
            res.json(err);
        }
    },

    getIncludeInfo: async (req, res) => {
        try {
            const includeInfo = await nutritionalService.getIncludeInfo(decodeURIComponent(req.query.info), req.query.offset);
            return res.json(includeInfo);
        } catch (err) {
            res.json(err);
        }
    },
    
    addUserNutrient: async (req, res) => {
        try{
            const adduserNutrient = await nutritionalService.addUserNutrient(req.body.uid, req.body.nid);
            const response = await health.HealthScore(req.body.id)
            return res.json(adduserNutrient)
        } catch (err) {
            res.json(err)
        }
    },
    
    deleteUserNutrient: async (req, res) => {
        try{
            const deleteuserNutrient = await nutritionalService.deleteUserNutrient(req.body.id, req.body.nutritional_id);
            const response = await health.HealthScore(req.body.id)
            return res.json(deleteuserNutrient)
        } catch (err) {
            res.json(err)
        }
    },

    addReview : async (req, res) => {
        try{
            /* const flaskURL = 'http://192.168.1.17:5000/ask/허리가 쥰나게 아파요'; // Flask 서버의 실제 URL로 변경해야 합니다.

            axios.post(flaskURL)
            .then(response => {
                console.log('응답 데이터:', response.data);
            })
            .catch(error => {
                console.error('에러 발생:', error);
            }); */
            const addReview = await nutritionalService.addReview(req.body);
            return res.json(addReview)
        } catch (err) {
            res.json(err)
        }
    }



}

export default nutritionalController;