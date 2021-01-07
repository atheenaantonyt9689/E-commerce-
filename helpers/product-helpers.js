var db=require('../config/connection')
var collection=require('../config/collections')
const { ObjectId } = require('mongodb')
const { response } = require('express')
var objectId=require('mongodb').ObjectID
module.exports={
    addProduct:(product,callback)=>{
        product.Price=parseInt(product.Price) 
        db.get().collection('product').insertOne(product).then((data)=>{

            callback(data.ops[0]._id)

        })

    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve (products)
        })
    },
    deleteProduct:(prodId)=>{
        return new Promise((resolve,reject)=>{
            console.log(prodId);
            console.log(objectId(prodId));
            db.get().collection(collection.PRODUCT_COLLECTION).removeOne({_id:objectId(prodId)}).then((response)=>{
                //console.log(response);
                resolve(response)
            })
        })
    },
    getProductDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:ObjectId(proId)}).then((product)=>{
                resolve(product)

            })
        })
    },
    updateProduct:(proId,ProDetails)=>{
        ProDetails.Price=parseInt(ProDetails.Price)
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).updateOne({_id:objectId(proId)},{
                $set:{
                    Name:ProDetails.Name,
                    Description:ProDetails.Description,
                    Price:ProDetails.Price,
                    Category:ProDetails.Category
                }
            }).then((response)=>{
                resolve()
            })
        })
    }
    
   
}