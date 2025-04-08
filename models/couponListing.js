const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const couponSchema=new Schema({
    code:{
        type:String,
        requried:true,
    },
    OrganizationName: String,
    couponType: String,
    Title: String,
    price:Number,
    Date:String,
    image:String,
    TandC:String,

});
const CouponListing=mongoose.model("CouponListing",couponSchema);
module.export=CouponListing;