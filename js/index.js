(function(){
	// constructor of Product
	var Product = function (data) {   
		this.id = data.id;
		this.title = data.title;
		this.price = data.price;
		this.shortDescript = data.shortDescript;
		this.longDescript = data.longDescript;
		this.quantity =  data.quantity;
		
	};
	//get price of Product
	Product.prototype.getPrice = function() {
		return this.price;
	};
	// constructor of Cart
	var Cart = function (data) {
		this.selectedGoods = data.selectedGoods || [];
		this.discountAbsolute = data.discountAbsolute || 25;  
		this.discountPercent = data.discountPercent || 20;
		this.productQuantity = {};
	};
	Cart.prototype.addGoods = function(selectedGoods, quantity) {
		if(selectedGoods.quantity >= quantity) {
	   		this.selectedGoods.push(selectedGoods);     
	   		this.productQuantity[selectedGoods.id] = quantity;
		}else{
			console.error('No more '+ selectedGoods.title+' left in the store!');
		}
	};
	// remove selected Goods from Cart
	Cart.prototype.removeGoods = function(selectedGood) {           
		var index = this.selectedGoods.indexOf(selectedGood);
		delete this.productQuantity[selectedGood.id];
		this.selectedGoods.splice(index,1);
	};
	// chande quantity of items in Cart
	Cart.prototype.changeQuantityInCart = function(product, newQuantity){
		if(this.productQuantity[product.id]){
			this.productQuantity[product.id] = newQuantity; 
		}
	}
	// make discount on selected Goods
	Cart.prototype.discountedPrice = function(total) {  
		var discountPercentSum = (this.discountPercent/100)*total;
		return discountPercentSum + this.discountAbsolute;
	};
	// get Total Price of selected Goods with discount
	Cart.prototype.getTotalPrice = function() {                     
		var total = 0;
		for (var j = 0; j < this.selectedGoods.length; j++){
			var price = this.selectedGoods[j].getPrice()*this.productQuantity[this.selectedGoods[j].id];
			total += price;
		}
		var totalPrice = total - this.discountedPrice(total);
		return  totalPrice > 0 ? totalPrice : 0;
	};
	// show all selected Goods
	Cart.prototype.getSelectedGoods = function() {
		var arrSelectedGoods = this.selectedGoods;
		var json = JSON.stringify(arrSelectedGoods,null, '\t');
		console.log('Order of goods: '+json);
		return this.selectedGoods;
	}
	// reset quantity of goods in Cart
	Cart.prototype.clear = function() {
		this.productQuantity = {};
		this.selectedGoods = [];        
	};
	// constructor of Order
	var Order = function (data) {
		Cart.call(this, data);
		this.customerAdress = data.customerAdress;
		this.shipping = data.shipping;
		this.deliveryPrice = data.deliveryPrice;
		this.paymentMethod = data.paymentMethod;
		this.productQuantity = data.productQuantity;
	}
	//created prototype of Cart
	Order.prototype = Object.create(Cart.prototype);
	// make an order of Goods
	Order.prototype.make = function() {
		console.log(this.selectedGoods); 
	}
	var basebalCap = new Product({id: 1, title:'baseball cap', price: 90,           
		shortDescript:'Polo Ralph Lauren Logo Baseball Cap', 
		longDescript:'Baseball cap by Polo Ralph Lauren: cotton twill, domed crown with vent holes',quantity:10});
	var jacket = new Product({id:2, title:'leather jacket',price:670,
		shortDescript:'ASOS Suede Bomber Jacket In Black',longDescript:'Bomber Jacket by ASOS: soft-touch suede, baseball collar, zip opening',quantity:35});
	var jeans = new Product({id:3, title:'jeans', price:290,shortDescript:'River Island Skinny Jeans In Black',
		longDescript:'Skinny jeans by River Island, stretch denim, dark wash', quantity:110});
	var shoes = new Product({id:4, title:'shoes', price:230, shortDescript:'Ultra Boost Uncaged Shoes',
		longDescript:'Responsive, supportive and flexible, these mens running shoes charge every step with endless energy',quantity:210});
	var tShirt = new Product({id:5, title:'t-shirt', price:50, shortDescript:'New Balance Classic Logo T-Shirt In Blue', 
		longDescript:'T-shirt by New Balance , soft-touch jersey, crew neck', quantity:124});
	var suit = new Product({id:6, title:'suit', price:104, shortDescript:'River Island Skinny Suit Jacket In Grey',
		longDescript:'Suit jacket by River Island, woven fabric, contains stretch for comfort, notch lapels',quantity:25});

	window.cart = new Cart({});

	cart.addGoods(basebalCap, 1);
	cart.addGoods(jacket, 2);
	cart.addGoods(jeans, 1);
	cart.addGoods(shoes, 1);
	cart.addGoods(tShirt, 1);
	cart.removeGoods(jeans);
	cart.changeQuantityInCart(shoes, 3);

	window.order = new Order({selectedGoods: cart.getSelectedGoods(), productQuantity: cart.productQuantity, customerAdress: 'Park Lane avenue 15 NY',shipping:'UPS Ground', deliveryPrice:5, paymentMethod:'Credit Card'}); 
	
	if (order.selectedGoods !== 'undefined'){
		order.make();
	}else{
		console.log('Order is not created');
	};
	if (order.getTotalPrice !== 'undefined'){
		var price = order.getTotalPrice();
		console.log('Price of order with discount is ' + price);
	}else{
		console.log('Goods is not added to order');
	}
	cart.clear();	
})();

