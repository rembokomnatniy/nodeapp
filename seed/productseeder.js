var Product = require('../models/product');

var mongoose=require('mongoose')
mongoose.connect('mongodb+srv://danilko:Moyo2013@cluster0-qfwzj.mongodb.net/eshop?retryWrites=true&w=majority',
{
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

var products = [
  new Product({
  imagePath: 'https://www.istore.ua/upload/iblock/61b/iphone_11_black_image_01_RthA9O6.jpg',
  title: 'Apple iPhone 11 128 GB (black)',
  description: 'iPhone 11',
  price: '1000'
}),
new Product({
imagePath: 'https://www.istore.ua/upload/iblock/cab/iphone_11_red_image_01_LSJFHoJ.jpg',
title: 'Apple iPhone 11 128 GB (red)',
description: 'iPhone 11',
price: '980'
}),
new Product({
imagePath: 'https://www.istore.ua/upload/iblock/2ae/ipad_pro_2018_11_space_gray_image_01_1.jpg',
title: 'Apple iPad Pro 11″, Wi-Fi, 256 GB (grey space, 2018 y.)',
description: 'iPad',
price: '1100'
}),
new Product({
imagePath: 'https://www.istore.ua/upload/iblock/cc2/cc27660ccafbc426365bb0b9a9dc6f91.jpg',
title: 'Apple Watch Nike+ 44 mm (grey-space)',
description: 'Apple Watch',
price: '650'
}),
new Product({
imagePath: 'https://www.istore.ua/upload/iblock/61b/airpods_2_gen_mrxj2_with_wireless_charging_case_image_01.jpg',
title: 'Apple AirPods 2 with wireless charge-case, Bluetooth',
description: 'AirPods',
price: '200'
})]

var done=0;
for (var i=0; i<products.length; i++) {
  products[i].save(function(err, result) {
    done++;
    if (done === products.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
