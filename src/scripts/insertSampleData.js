import "dotenv/config";
import { supabase } from "../utils/supabase.js";

const insertSampleProducts = async () => {
	try {
		console.log("🚀 Starting to insert sample products...");

		// Product 1: Premium Wireless Headphones
		const { data: product1, error: product1Error } = await supabase
			.from("products")
			.insert({
				name: "Premium Wireless Headphones",
				description:
					"High-quality wireless headphones with active noise cancellation, premium sound quality, and comfortable design for extended use.",
				base_price: 1500000,
				rating: 4.5,
				review_count: 127,
				is_available: true,
				is_featured: true,
				category: "Electronics",
			})
			.select()
			.single();

		if (product1Error) throw product1Error;
		console.log("✅ Product 1 inserted:", product1.name);

		// Insert images for product 1
		await supabase.from("product_images").insert([
			{
				product_id: product1.id,
				image_url:
					"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop&crop=center",
				alt_text: "Premium wireless headphones main view",
				display_order: 0,
			},
			{
				product_id: product1.id,
				image_url:
					"https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop&crop=center",
				alt_text: "Wireless headphones side profile",
				display_order: 1,
			},
			{
				product_id: product1.id,
				image_url:
					"https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop&crop=center",
				alt_text: "Headphones detail and controls",
				display_order: 2,
			},
			{
				product_id: product1.id,
				image_url:
					"https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&h=600&fit=crop&crop=center",
				alt_text: "Premium packaging",
				display_order: 3,
			},
		]);

		// Insert variants for product 1
		await supabase.from("product_variants").insert([
			{
				product_id: product1.id,
				name: "Matte Black",
				price: 1500000,
				is_available: true,
				display_order: 0,
			},
			{
				product_id: product1.id,
				name: "Pearl White",
				price: 1500000,
				is_available: true,
				display_order: 1,
			},
			{
				product_id: product1.id,
				name: "Space Silver",
				price: 1600000,
				is_available: true,
				display_order: 2,
			},
			{
				product_id: product1.id,
				name: "Rose Gold",
				price: 1700000,
				is_available: false,
				display_order: 3,
			},
		]);

		// Insert features for product 1
		await supabase.from("product_features").insert([
			{
				product_id: product1.id,
				feature_text: "Active Noise Cancellation with adaptive technology",
				display_order: 0,
			},
			{
				product_id: product1.id,
				feature_text: "30-hour battery life with quick 15-min charge",
				display_order: 1,
			},
			{
				product_id: product1.id,
				feature_text: "Premium leather headband and memory foam ear cups",
				display_order: 2,
			},
			{
				product_id: product1.id,
				feature_text: "Multi-device connectivity with Bluetooth 5.0",
				display_order: 3,
			},
			{
				product_id: product1.id,
				feature_text: "Built-in microphone for crystal clear calls",
				display_order: 4,
			},
		]);

		// Insert tabs for product 1
		await supabase.from("product_tabs").insert([
			{
				product_id: product1.id,
				tab_name: "Product Details",
				tab_content:
					"Experience premium audio quality with our flagship wireless headphones. Featuring advanced active noise cancellation technology that adapts to your environment, delivering crystal-clear sound whether you're at home, in the office, or traveling.\n\nThe comfortable over-ear design with premium leather and memory foam ensures you can wear them for hours without fatigue. Perfect for music lovers, professionals, and anyone who demands the best in audio quality.",
				display_order: 0,
			},
			{
				product_id: product1.id,
				tab_name: "Shipping & Delivery",
				tab_content:
					"Free shipping to all major cities in Indonesia!\n\n• Jakarta, Surabaya, Bandung: 1-2 business days\n• Other major cities: 2-3 business days\n• Remote areas: 3-5 business days\n\nExpress delivery available for additional fee. All items are carefully packaged with insurance coverage. Tracking information will be provided once your order ships.",
				display_order: 1,
			},
			{
				product_id: product1.id,
				tab_name: "Warranty & Returns",
				tab_content:
					"✅ 2-year international warranty\n✅ 30-day money-back guarantee\n✅ Free repairs for manufacturing defects\n\nReturn policy: Items must be in original condition with all accessories and packaging. Customer pays return shipping unless the item is defective. Refunds processed within 3-5 business days after we receive the returned item.",
				display_order: 2,
			},
		]);

		// Product 2: Smart Fitness Watch
		const { data: product2, error: product2Error } = await supabase
			.from("products")
			.insert({
				name: "Smart Fitness Watch Pro",
				description:
					"Advanced fitness tracking smartwatch with heart rate monitoring, GPS, and comprehensive health insights for active lifestyles.",
				base_price: 2500000,
				rating: 4.3,
				review_count: 89,
				is_available: true,
				is_featured: true,
				category: "Wearables",
			})
			.select()
			.single();

		if (product2Error) throw product2Error;
		console.log("✅ Product 2 inserted:", product2.name);

		// Insert images for product 2
		await supabase.from("product_images").insert([
			{
				product_id: product2.id,
				image_url:
					"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop&crop=center",
				alt_text: "Smart fitness watch main display",
				display_order: 0,
			},
			{
				product_id: product2.id,
				image_url:
					"https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&crop=center",
				alt_text: "Fitness watch during workout",
				display_order: 1,
			},
			{
				product_id: product2.id,
				image_url:
					"https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&h=600&fit=crop&crop=center",
				alt_text: "Watch face and interface",
				display_order: 2,
			},
		]);

		// Insert variants for product 2
		await supabase.from("product_variants").insert([
			{
				product_id: product2.id,
				name: "42mm Black",
				price: 2500000,
				is_available: true,
				display_order: 0,
			},
			{
				product_id: product2.id,
				name: "42mm Silver",
				price: 2500000,
				is_available: true,
				display_order: 1,
			},
			{
				product_id: product2.id,
				name: "46mm Black",
				price: 2800000,
				is_available: true,
				display_order: 2,
			},
			{
				product_id: product2.id,
				name: "46mm Silver",
				price: 2800000,
				is_available: true,
				display_order: 3,
			},
		]);

		// Insert features for product 2
		await supabase.from("product_features").insert([
			{
				product_id: product2.id,
				feature_text: "Advanced heart rate and SpO2 monitoring",
				display_order: 0,
			},
			{
				product_id: product2.id,
				feature_text: "Built-in GPS for accurate activity tracking",
				display_order: 1,
			},
			{
				product_id: product2.id,
				feature_text: "7-day battery life with wireless charging",
				display_order: 2,
			},
			{
				product_id: product2.id,
				feature_text: "Water resistant up to 50 meters",
				display_order: 3,
			},
			{
				product_id: product2.id,
				feature_text: "100+ workout modes and sports tracking",
				display_order: 4,
			},
		]);

		// Insert tabs for product 2
		await supabase.from("product_tabs").insert([
			{
				product_id: product2.id,
				tab_name: "Features",
				tab_content:
					"Your complete fitness companion that tracks everything from daily steps to advanced workout metrics. Monitor your heart rate 24/7, track sleep patterns, and get comprehensive health insights.\n\nWith built-in GPS and 100+ workout modes, you can accurately track running, cycling, swimming, and more. The smart notifications keep you connected while the long battery life ensures you never miss a beat.",
				display_order: 0,
			},
			{
				product_id: product2.id,
				tab_name: "Shipping",
				tab_content:
					"Fast and reliable shipping across Indonesia:\n\n• Same-day delivery available in Jakarta and Surabaya\n• 1-2 days for major cities\n• 3-4 days for other areas\n\nFree shipping on all orders. Express delivery available for urgent orders.",
				display_order: 1,
			},
			{
				product_id: product2.id,
				tab_name: "Support",
				tab_content:
					"1-year manufacturer warranty included\n14-day return policy for unopened items\nFree technical support via WhatsApp\n\nOur customer service team is available Monday-Friday 9AM-6PM to help with setup, troubleshooting, and any questions you might have.",
				display_order: 2,
			},
		]);

		// Product 3: Premium Leather Backpack
		const { data: product3, error: product3Error } = await supabase
			.from("products")
			.insert({
				name: "Executive Leather Backpack",
				description:
					"Handcrafted genuine leather backpack perfect for business and travel. Features laptop compartment and premium organizational pockets.",
				base_price: 850000,
				rating: 4.7,
				review_count: 203,
				is_available: true,
				is_featured: false,
				category: "Bags & Accessories",
			})
			.select()
			.single();

		if (product3Error) throw product3Error;
		console.log("✅ Product 3 inserted:", product3.name);

		// Insert images for product 3
		await supabase.from("product_images").insert([
			{
				product_id: product3.id,
				image_url:
					"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop&crop=center",
				alt_text: "Premium leather backpack front view",
				display_order: 0,
			},
			{
				product_id: product3.id,
				image_url:
					"https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800&h=600&fit=crop&crop=center",
				alt_text: "Backpack interior organization",
				display_order: 1,
			},
			{
				product_id: product3.id,
				image_url:
					"https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=800&h=600&fit=crop&crop=center",
				alt_text: "Professional styling",
				display_order: 2,
			},
		]);

		// Insert variants for product 3
		await supabase.from("product_variants").insert([
			{
				product_id: product3.id,
				name: "Classic Brown",
				price: 850000,
				is_available: true,
				display_order: 0,
			},
			{
				product_id: product3.id,
				name: "Executive Black",
				price: 850000,
				is_available: true,
				display_order: 1,
			},
			{
				product_id: product3.id,
				name: "Vintage Tan",
				price: 900000,
				is_available: true,
				display_order: 2,
			},
		]);

		// Insert features for product 3
		await supabase.from("product_features").insert([
			{
				product_id: product3.id,
				feature_text: "100% genuine full-grain leather construction",
				display_order: 0,
			},
			{
				product_id: product3.id,
				feature_text: 'Padded laptop compartment fits up to 15.6" laptops',
				display_order: 1,
			},
			{
				product_id: product3.id,
				feature_text: "Multiple organization pockets and pen holders",
				display_order: 2,
			},
			{
				product_id: product3.id,
				feature_text: "Comfortable padded shoulder straps",
				display_order: 3,
			},
			{
				product_id: product3.id,
				feature_text: "Durable YKK zippers and premium hardware",
				display_order: 4,
			},
		]);

		// Insert tabs for product 3
		await supabase.from("product_tabs").insert([
			{
				product_id: product3.id,
				tab_name: "Description",
				tab_content:
					"Crafted from premium full-grain leather, this executive backpack combines timeless style with modern functionality. Perfect for the professional who appreciates quality craftsmanship.\n\nThe thoughtfully designed interior features a dedicated laptop compartment, multiple organization pockets, and pen holders to keep your essentials organized and easily accessible.",
				display_order: 0,
			},
			{
				product_id: product3.id,
				tab_name: "Care Instructions",
				tab_content:
					"Leather Care Tips:\n\n• Clean with a soft, damp cloth\n• Apply leather conditioner every 3-6 months\n• Store in a cool, dry place\n• Avoid prolonged exposure to direct sunlight\n• Use leather protector spray for water resistance\n\nWith proper care, this bag will age beautifully and last for years.",
				display_order: 1,
			},
			{
				product_id: product3.id,
				tab_name: "Shipping & Returns",
				tab_content:
					"Free shipping nationwide!\n\nDelivery times:\n• Jakarta area: 1-2 days\n• Java: 2-3 days\n• Other islands: 3-5 days\n\n30-day return policy. Items must be unused and in original condition. Return shipping costs apply unless the item is defective.",
				display_order: 2,
			},
		]);

		console.log("🎉 All sample products inserted successfully!");
		console.log("📊 Summary:");
		console.log("- 3 products created");
		console.log("- 9 product images added");
		console.log("- 11 product variants created");
		console.log("- 15 product features added");
		console.log("- 9 product tabs created");
	} catch (error) {
		console.error("❌ Error inserting sample data:", error);
	}
};

// Run the function
insertSampleProducts();
