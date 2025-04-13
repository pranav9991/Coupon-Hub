const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const couponSchema=new Schema({
    code:String,
    OrganizationName: String,
    couponType: String,
    Title: String,
    discount:String,
    price:Number,
    date:Date,
    image:String,
    TandC:String,
    is_redeemed:String,

    
});
const CouponListing=mongoose.model("CouponListing",couponSchema);
module.exports=CouponListing;
