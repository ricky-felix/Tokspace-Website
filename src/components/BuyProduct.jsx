export const BuyProduct = ({ productId, ...props }) => {
	const { t, i18n } = useTranslation();

	// Debug logging
	console.log("BuyProduct component props:", { productId, props });
	console.log("productId type:", typeof productId);
	console.log("productId value:", productId);

	// Early return if no productId provided
	if (!productId) {
		console.error("❌ No productId provided to BuyProduct component");
		return (
			<div className="px-[5%] py-12 md:py-16 lg:py-20">
				<div className="container">
					<div className="text-center">
						<h2 className="text-2xl font-bold text-red-600 mb-4">
							Missing Product ID
						</h2>
						<p className="text-gray-600">
							No product ID was provided to load the product details.
						</p>
						<a
							href="/shop"
							className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
						>
							Back to Shop
						</a>
					</div>
				</div>
			</div>
		);
	}

	// Now call the hook with validated productId
	const { product, loading, error } = useProduct(productId);

	// Debug the hook response
	console.log("useProduct hook response:", { product, loading, error });

	const [selectedVariant, setSelectedVariant] = useState(null);
	const [quantity, setQuantity] = useState(1);

	// Set initial variant when product loads
	useEffect(() => {
		if (
			product &&
			product.product_variants &&
			product.product_variants.length > 0
		) {
			// Set first available variant as default
			const firstAvailableVariant = product.product_variants.find(
				(v) => v.is_available
			);
			setSelectedVariant(firstAvailableVariant || product.product_variants[0]);
		}
	}, [product]);

	const handleWhatsAppOrder = () => {
		if (!product) return null;

		const orderData = {
			productName: product.name,
			variantName: selectedVariant?.name,
			quantity: quantity,
			unitPrice: selectedVariant?.price || product.base_price,
			totalPrice: (selectedVariant?.price || product.base_price) * quantity,
		};

		const whatsappURL = WhatsAppService.generateOrderMessage(
			orderData,
			i18n.language
		);
		WhatsAppService.openWhatsApp(whatsappURL);
	};

	const handleWhatsAppInquiry = () => {
		if (!product) return;

		const whatsappURL = WhatsAppService.generateInquiryMessage(
			{ productName: product.name },
			i18n.language
		);
		WhatsAppService.openWhatsApp(whatsappURL);
	};

	const getCurrentPrice = () => {
		const price = selectedVariant?.price || product?.base_price || 0;
		return formatCurrency(price);
	};

	const getTotalPrice = () => {
		const price = selectedVariant?.price || product?.base_price || 0;
		return formatCurrency(price * quantity);
	};

	// Loading state
	if (loading) {
		return (
			<div className="px-[5%] py-12 md:py-16 lg:py-20">
				<div className="container">
					<div className="flex items-center justify-center h-64">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
						<p className="ml-4 text-gray-600">Loading product...</p>
					</div>
				</div>
			</div>
		);
	}

	// Error state
	if (error) {
		return (
			<div className="px-[5%] py-12 md:py-16 lg:py-20">
				<div className="container">
					<div className="text-center">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							{t("buyProduct.errorTitle") || "Error loading product"}
						</h2>
						<p className="text-gray-600 mb-4">{error}</p>
						<a
							href="/shop"
							className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
						>
							Back to Shop
						</a>
					</div>
				</div>
			</div>
		);
	}

	// No product found (after loading completed)
	if (!product) {
		return (
			<div className="px-[5%] py-12 md:py-16 lg:py-20">
				<div className="container">
					<div className="text-center">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							{t("buyProduct.notFoundTitle") || "Product Not Found"}
						</h2>
						<p className="text-gray-600 mb-4">
							{t("buyProduct.notFoundMessage") ||
								"The requested product could not be found."}
						</p>
						<a
							href="/shop"
							className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
						>
							Back to Shop
						</a>
					</div>
				</div>
			</div>
		);
	}

	// Main product display - only reached if we have a valid product
	return (
		<header id="relume" className="px-[5%] py-12 md:py-16 lg:py-20">
			{/* Rest of your JSX remains the same */}
			<div className="container">
				<div className="mb-8 flex flex-col gap-6 md:mb-12">
					<GalleryDialog
						images={product.product_images || []}
						showAllButton={{
							title: t("buyProduct.showAllPhotos") || "Show all photos",
						}}
					/>
				</div>

				<div className="grid grid-cols-1 gap-y-8 md:grid-cols-[1fr_16rem] md:gap-x-12 md:gap-y-10 lg:gap-12 xl:grid-cols-[1fr_0.5fr] xl:gap-x-20">
					<div>
						<h1 className="hidden text-4xl font-bold leading-[1.2] md:mb-8 md:block md:text-5xl lg:text-6xl">
							{product.name}
						</h1>
						<p className="mb-6 text-gray-700">{product.description}</p>

						{product.product_features &&
							product.product_features.length > 0 && (
								<ul className="mb-6 mt-4 list-inside list-disc md:mb-8">
									{product.product_features.map((feature) => (
										<li
											key={feature.id}
											className="py-0.5 pl-1.5 first:pt-0 last:pb-0"
										>
											{feature.feature_text}
										</li>
									))}
								</ul>
							)}

						<InformationTabs tabs={product.product_tabs || []} />
					</div>

					<div className="order-first md:order-none">
						<h1 className="mb-4 text-4xl font-bold leading-[1.2] md:hidden">
							{product.name}
						</h1>
						<p className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl lg:text-4xl">
							{getCurrentPrice()}
						</p>

						{/* Rating */}
						<div className="mb-5 flex flex-wrap items-center gap-3 md:mb-6">
							<Star rating={product.rating || 0} />
							<p className="text-sm">
								{`(${product.rating || 0} stars) • ${product.review_count || 0} reviews`}
							</p>
						</div>

						{/* Order Form */}
						<div className="grid grid-cols-1 gap-6">
							{/* Variants Selection */}
							{product.product_variants &&
								product.product_variants.length > 0 && (
									<div className="flex flex-col">
										<Label className="mb-2">
											{t("buyProduct.variantLabel") || "Select Variant"}
										</Label>
										<div className="flex flex-wrap gap-4">
											{product.product_variants.map((variant) => (
												<button
													key={variant.id}
													type="button"
													className={`${buttonStyles.bubbleButton} ${
														selectedVariant?.id === variant.id
															? buttonStyles.primary
															: buttonStyles.secondary
													} ${
														!variant.is_available
															? "opacity-25 pointer-events-none"
															: ""
													}`}
													onClick={() => setSelectedVariant(variant)}
													disabled={!variant.is_available}
												>
													{variant.name}
													{variant.price !== product.base_price && (
														<span className="ml-1 text-xs">
															({formatCurrency(variant.price)})
														</span>
													)}
												</button>
											))}
										</div>
									</div>
								)}

							{/* Quantity Selection */}
							<div className="flex flex-col">
								<Label htmlFor="quantity" className="mb-2">
									{t("buyProduct.quantityLabel") || "Quantity"}
								</Label>
								<Input
									type="number"
									id="quantity"
									min="1"
									max="99"
									placeholder="1"
									className="w-full"
									value={quantity}
									onChange={(e) =>
										setQuantity(Math.max(1, parseInt(e.target.value) || 1))
									}
								/>
							</div>

							{/* Total Price Display */}
							{quantity > 1 && (
								<div className="bg-gray-50 p-4 rounded-lg">
									<p className="text-lg font-semibold">
										{t("buyProduct.total") || "Total"}: {getTotalPrice()}
									</p>
								</div>
							)}
						</div>

						{/* Action Buttons */}
						<div className="mb-4 mt-8 flex flex-col gap-y-4">
							<button
								type="button"
								onClick={handleWhatsAppOrder}
								className={`${buttonStyles.bubbleButton} ${buttonStyles.primary} flex items-center justify-center gap-2`}
							>
								<span>📱</span>
								{t("buyProduct.orderWhatsApp") || "Order via WhatsApp"}
							</button>

							<button
								type="button"
								onClick={handleWhatsAppInquiry}
								className={`${buttonStyles.bubbleButton} ${buttonStyles.secondary} flex items-center justify-center gap-2`}
							>
								<span>💬</span>
								{t("buyProduct.askQuestion") || "Ask Questions"}
							</button>
						</div>

						{/* WhatsApp Contact Info */}
						<div className="text-center text-sm text-gray-600">
							<p>
								{t("buyProduct.whatsappInfo") ||
									"Orders processed via WhatsApp Business"}
							</p>
							<p className="font-medium">
								{WhatsAppService.getFormattedPhoneNumber()}
							</p>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
