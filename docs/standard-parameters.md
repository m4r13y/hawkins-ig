Website Standard Parameters | App Standard Parameters | Offline Standard Parameters | Description
availability | Value must be available_soon, for_rent, for_sale, off_market, recently_sold or sale_pending.
body_style | Body style of the vehicle: CONVERTIBLE, COUPE, HATCHBACK, MINIVAN, TRUCK, SUV, SEDAN, VAN, WAGON, CROSSOVER, OTHER.
checkin_date | The date the user is wanting to check-in to the hotel in the hotel's time-zone. We accept dates in YYYYMMDD, YYYY-MM-DD, YYYY-MM-DDThh:mmTZD and YYYY-MM-DDThh:mm:ssTZD.
city | Provide the city of the location from user intent.
condition_of_vehicle | Condition of vehicle.
# content_ids | The content IDs associated with the event, such as product SKUs for items in an AddToCart event. If content_type is a product, then your content IDs must be an array with a single string value. Otherwise, this array can contain any number of string values.
# content_type | Should be set to product or product_group: Use product if the keys you send represent products. Sent keys could be content_ids or contents. Use product_group if the keys you send in content_ids represent product groups. Product groups are used to distinguish products that are identical but have variations such as color, material, size or pattern.
# contents | A list of JSON objects that contain the product IDs associated with the event plus information about the products. Available fields: id, quantity, item_price, delivery_category.
country | Provide the country of the location from user intent.
currency | Required for purchase events. The currency for the value specified, if applicable. Currency must be a valid ISO 4217 three-digit currency code.
delivery_category | Optional for purchase events. Type of delivery for a purchase event. Supported values are: in_store — Customer needs to enter the store to get the purchased product. curbside — Customer picks up their order by driving to a store and waiting inside their vehicle. home_delivery — Purchase is delivered to the customer's home.
departing_arrival_date | The date and time for arrival at the destination of the outbound journey.
departing_departure_date | The date and time for start of the outbound journey.
destination_airport | Use official IATA code of destination airport.
destination_ids | If you have a destination catalog, you can associate one or more destinations in your destination catalog with a specific hotel event.
dma_code | The Designated Market Area (DMA) code, which the user looks at for offers.
drivetrain | Drivetrain of the vehicle: 4X2, 4X4, AWD, FWD, RWD, OTHER, NONE.
exterior_color | Exterior color.
fuel_type | Fuel type of the vehicle: DIESEL, ELECTRIC, FLEX, GASOLINE, HYBRID, PETROL, PLUGIN_HYBRID, OTHER, NONE.
hotel_score | An indicator representing the relative value of this hotel to the advertiser compared to its other hotels.
interior_color | Interior color.
# lead_event_source | Lead event source.
lease_end_date | Specified using ISO 8601 date format: YYYY-MM-DD.
lease_start_date | Allows us to recommend properties based off their date availability (using available_dates_price_config in the catalog), and improve the user landing experience (using template tags).
listing_type | Value must be for_rent_by_agent, for_rent_by_owner, for_sale_by_agent, for_sale_by_owner, foreclosed, new_construction or new_listing.
make | Make or brand of the vehicle.
mileage.unit | Mileage unit.
mileage.value | Mileage value.
model | Model of the vehicle.
neighborhood | Neighborhood of interest.
net_revenue | The margin value of a conversion event.
num_adults | Number of adults that will be staying.
num_children | Number of children that will be staying.
num_infants | Number of infants that will be staying.
num_items | Use only with InitiateCheckout events. The number of items that a user tries to buy during checkout.
order_id | The order ID for this transaction as a string.
origin_airport | Use official IATA code of departure airport.
postal_code | Postal code.
predicted_ltv | The predicted lifetime value of a conversion event.
preferred_baths_range | Number of bathrooms chosen as range.
preferred_beds_range | Number of bedrooms chosen as range.
preferred_neighborhoods | Preferred neighborhoods.
preferred_num_stops | Indicate the preferred number of stops the user is looking for.
preferred_price_range | Preferred price range for vehicle. Min/max, up to 2 decimals.
preferred_star_ratings | A tuple of minimum and maximum hotel star rating that a user is filtering for.
price | Cost and currency of the vehicle. Format the price as the cost, followed by the ISO currency code, with a space between cost and currency.
# product_catalog_id | Product catalog id.
property_type | Must be apartment, condo, house, land, manufactured, other or townhouse.
region | State, district, or region of interest.
returning_arrival_date | The date and time when the return journey is done.
returning_departure_date | The date and time for start of the return journey.
search_string | Use only with Search events. A search query made by a user.
state_of_vehicle | State of vehicle.
suggested_destinations | Suggested destinations.
suggested_home_listings | Suggested home listings.
suggested_hotels | Suggested hotels.
suggested_jobs | Suggested jobs.
suggested_local_service_businesses | Suggested local service businesses.
suggested_location_based_items | Suggested location based items.
suggested_vehicles | Suggested vehicles.
transmission | Transmission of the vehicle: AUTOMATIC, MANUAL, OTHER, NONE.
travel_class | Must be economy, premium, business or first.
travel_end | Travel end date.
travel_start | Travel start date.
trim | Max characters: 50.
# user_bucket | User bucket.
value | Required for purchase events or any events that utilize value optimization. A numeric value associated with the event. This must represent a monetary amount.
vin | VIN.
year | Year the vehicle was launched in yyyy format.
# item_number | Unique identifier to distinguish events within the same order or transaction.
ad_type | Ad type.
 | A list of JSON object that contains the International Article Number (EAN) when applicable, or other product or content identifier(s) as well as quantities and prices of the products. Required: id, quantity. Example: "[{\"id\": \"1234\", \"quantity\": 2,}, {\"id\": \"5678\", \"quantity\": 1,}]".
 | International Article Number (EAN) when applicable, or other product or content identifier(s). For multiple product ids: e.g. "[\"1234\",\"5678\"]".
 | A string description.
 | Level of a game.
 | Upper bounds of a rating scale, for example 5 on a 5 star scale.
 | 1 for yes, 0 for no.
 | Facebook, Email, Twitter, etc.
 | 1 for yes, 0 for no.
 | Numeric value of individual event to be summed in reporting.
