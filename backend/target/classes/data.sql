-- Initial Seed Data for JewelCraft MySQL Database

-- Users
INSERT INTO users (id, name, email, password, role, phone, city, address) VALUES
('USR-CUST-1', 'Ananya Sharma', 'ananya@jewelcraft.com', 'password123', 'ROLE_CUSTOMER', '+91 98765 43210', 'Hyderabad', 'Road No 36, Jubilee Hills, Hyderabad'),
('USR-SALES-1', 'Rajesh Varma', 'rajesh.sales@jewelcraft.com', 'password123', 'ROLE_SALESMAN', '+91 91234 56789', 'Hyderabad', 'Jubilee Hills Salon'),
('USR-SALES-2', 'Priya Mehta', 'priya.sales@jewelcraft.com', 'password123', 'ROLE_SALESMAN', '+91 99887 76655', 'Mumbai', 'Bandra Luxury Lounge'),
('USR-ADMIN-1', 'K. Reddy (Director)', 'admin@jewelcraft.com', 'admin123', 'ROLE_ADMIN', '+91 90000 11111', 'Hyderabad', 'REDDY Headquarters');

-- Showrooms
INSERT INTO showrooms (id, showroom_name, address, city, phone, email, opening_time, closing_time, status) VALUES
('SHW-HYD-01', 'REDDY Jubilee Hills Flagship Salon', 'Plot 422, Road No. 36, Jubilee Hills', 'Hyderabad, Telangana', '+91 40 2355 8899', 'jubileehills@jewelcraft.com', '10:30 AM', '08:30 PM', 'OPEN'),
('SHW-MUM-02', 'REDDY Bandra Luxury Lounge', 'Turner Road, Near Bandra West Post Office', 'Mumbai, Maharashtra', '+91 22 2640 4455', 'bandra@jewelcraft.com', '11:00 AM', '09:00 PM', 'OPEN'),
('SHW-BLR-03', 'REDDY Indiranagar Atelier', '100 Feet Road, HAL 2nd Stage, Indiranagar', 'Bengaluru, Karnataka', '+91 80 4122 7700', 'bengaluru@jewelcraft.com', '10:30 AM', '08:30 PM', 'OPEN'),
('SHW-DEL-04', 'REDDY South Extension VIP Boutique', 'G-14, Main Market, South Extension Part 1', 'New Delhi, Delhi NCR', '+91 11 4166 3322', 'delhi@jewelcraft.com', '11:00 AM', '08:30 PM', 'OPEN');

-- Jewellery Archetypes
INSERT INTO jewellery (id, name, type, description, image, base_price, status) VALUES
('JWL-01', 'Solitaire & Diamond Rings', 'Ring', 'Bespoke engagement rings, diamond bands, and signature heirloom solitaires hand-finished with exceptional precision.', '/images/jewellery/ring_solitaire.jpg', 25000.00, 'AVAILABLE'),
('JWL-02', 'Opulent Necklaces & Chokers', 'Necklace', 'Grand royal chokers and diamond cascade necklaces handcrafted for weddings and celebratory gala evenings.', '/images/jewellery/jewellery_craft.jpg', 85000.00, 'AVAILABLE'),
('JWL-03', 'Lustrous Earrings & Drops', 'Earrings', 'From timeless round diamond studs to articulated chandelier drops that capture and refract natural light.', '/images/jewellery/jewellery_craft.jpg', 32000.00, 'AVAILABLE'),
('JWL-04', 'Tennis & Kada Bracelets', 'Bracelet', 'Continuous brilliance with certified natural diamonds set into flexible luxury gold and platinum links.', '/images/jewellery/jewellery_craft.jpg', 55000.00, 'AVAILABLE'),
('JWL-05', 'Signature Pendants', 'Pendant', 'Subtle daily luxury featuring cushion, pear, and heart-shaped solitaire diamonds with custom hand-carved bails.', '/images/jewellery/ring_solitaire.jpg', 20000.00, 'AVAILABLE');

-- Designs
INSERT INTO designs (id, design_name, jewellery_type, description, image, base_price, status) VALUES
('DSG-01', 'Classic Solitaire', 'Ring', 'The definitive 4-prong or 6-prong solitaire setting elevating the diamond for optimal light dispersion.', '/images/jewellery/ring_solitaire.jpg', 12000.00, 'ACTIVE'),
('DSG-02', 'Halo Elegance', 'Ring', 'A brilliant center stone encircled by a micropavé diamond halo, amplifying visual radiance.', '/images/jewellery/ring_solitaire.jpg', 18000.00, 'ACTIVE'),
('DSG-03', 'Vintage Filigree', 'Ring', 'Intricate milgrain edges and botanical hand-engravings inspired by Edwardian master jewelers.', '/images/jewellery/ring_solitaire.jpg', 22000.00, 'ACTIVE'),
('DSG-04', 'Modern Bezel', 'Ring', 'Sleek architectural border of polished precious metal encasing the gem securely with a contemporary silhouette.', '/images/jewellery/ring_solitaire.jpg', 14000.00, 'ACTIVE'),
('DSG-05', 'Three-Stone Royal', 'Ring', 'Representing past, present, and future with a central solitaire flanked by tapered side stones.', '/images/jewellery/ring_solitaire.jpg', 26000.00, 'ACTIVE');

-- Metals
INSERT INTO metals (id, metal_name, purity, price_per_gram, color_code, availability, status) VALUES
('MTL-01', '18K Yellow Gold', '75.0% Fine Gold', 5600.00, '#D4AF37', TRUE, 'ACTIVE'),
('MTL-02', '22K Traditional Gold', '91.6% Pure Hallmark Gold', 6850.00, '#E5A93C', TRUE, 'ACTIVE'),
('MTL-03', '18K Rose Gold', '75.0% Gold + Copper Alloy', 5750.00, '#B76E79', TRUE, 'ACTIVE'),
('MTL-04', '18K White Gold', '75.0% Gold + Rhodium Plated', 5850.00, '#E8E8E8', TRUE, 'ACTIVE'),
('MTL-05', '950 Platinum', '95.0% Pure Platinum (PT950)', 3950.00, '#E5E4E2', TRUE, 'ACTIVE');

-- Diamonds
INSERT INTO diamonds (id, shape, carat, color, clarity, cut, price, stock, image, status) VALUES
('DMD-01', 'Round', 0.50, 'D (Colorless)', 'VVS1', 'Excellent', 32000.00, 8, '/images/jewellery/ring_solitaire.jpg', 'AVAILABLE'),
('DMD-02', 'Round', 1.00, 'E (Colorless)', 'VS1', 'Ideal', 95000.00, 5, '/images/jewellery/ring_solitaire.jpg', 'AVAILABLE'),
('DMD-03', 'Princess', 0.75, 'F (Colorless)', 'VVS2', 'Excellent', 48000.00, 6, '/images/jewellery/ring_solitaire.jpg', 'AVAILABLE'),
('DMD-04', 'Oval', 1.20, 'D (Colorless)', 'VVS1', 'Excellent', 135000.00, 4, '/images/jewellery/ring_solitaire.jpg', 'AVAILABLE'),
('DMD-05', 'Emerald', 1.50, 'E (Colorless)', 'IF (Internally Flawless)', 'Very Good', 185000.00, 3, '/images/jewellery/ring_solitaire.jpg', 'AVAILABLE');

-- Appointments
INSERT INTO appointments (id, customer_id, customer_name, customer_email, customer_phone, salesman_id, salesman_name, showroom_id, showroom_name, date, time, status, customer_notes, salesman_notes, created_at) VALUES
('JC1001', 'USR-CUST-1', 'Ananya Sharma', 'ananya@jewelcraft.com', '+91 98765 43210', 'USR-SALES-1', 'Rajesh Varma', 'SHW-HYD-01', 'REDDY Jubilee Hills Flagship Salon', '2026-10-15', '11:30 AM', 'CONFIRMED', 'Looking forward to viewing stone in daylight.', 'Reserved D-VVS1 round solitaire stone for customer private viewing in VIP Suite 2.', CURRENT_TIMESTAMP);

-- Quotations
INSERT INTO quotations (id, appointment_id, customer_id, customer_name, customer_email, salesman_id, salesman_name, jewellery, design, metal, diamond, diamond_shape, size, customization_details, estimated_price, additional_charges, discount, final_price, salesman_notes, valid_until_date, status, created_at) VALUES
('QT-2026-001', 'JC1001', 'USR-CUST-1', 'Ananya Sharma', 'ananya@jewelcraft.com', 'USR-SALES-1', 'Rajesh Varma', 'Ring', 'Classic Solitaire', '18K Yellow Gold (4.2g)', '0.50 ct Round D/VVS1', 'Round', '14', 'Laser-inscribed inner band "Forever & Always A&R"', 81400.00, 4200.00, 3000.00, 82600.00, 'Includes lifetime complimentary cleaning, prong re-tipping, and IGI jewelry certificate.', '2026-10-30', 'PENDING', CURRENT_TIMESTAMP);
