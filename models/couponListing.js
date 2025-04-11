const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const couponSchema=new Schema({
    code:String,

    OrganizationName: String,
    couponType: String,
    Title: String,
    price:Number,
    date:Date,
    image:String,
    TandC:String,

    
});
const CouponListing=mongoose.model("CouponListing",couponSchema);
module.exports=CouponListing;
