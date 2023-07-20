const express = require('express');
const router = express.Router();
require('dotenv').config(); // Cargar las variables de entorno desde .env

const neo4j = require('neo4j-driver');
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'password'),);
const session = driver.session('neo4j');


router.get("/", async (req, res) => {
    try {
        session.run(`
        CREATE
        (:Usuario{name:'Testing_User'}),
        (:Product {
            _id: '64b8ac6c7ce01e552c41bea3',
            name: 'Smartphone X10',
            price: 599,
            category: 'celular',
            description: 'Powerful smartphone with advanced features.',
            specs: '6.5-inch display, 128GB storage, 6GB RAM, dual rear cameras.',
            img_url: 'x10.jpg'
          }),
          (:Product {
            _id: '64b8ad817ce01e552c41beb7',
            name: 'Smartphone Z20',
            price: 699,
            category: 'celular',
            description: 'High-performance smartphone with premium design.',
            specs: '6.8-inch display, 256GB storage, 8GB RAM, triple rear cameras.',
            img_url: 'z20.jpg'
          }),
          (:Product {
            _id: '64b8aeb07ce01e552c41becb',
            name: 'Smartphone Infinity',
            price: 799,
            category: 'celular',
            description: 'Bezel-less smartphone with edge-to-edge display.',
            specs: '6.7-inch AMOLED, 256GB storage, 12GB RAM, quad cameras.',
            img_url: 'infinity.jpg'
          }),
          (:Product {
            _id: '64b8acc67ce01e552c41bea9',
            name: 'Gaming PC BeastX',
            price: 2399,
            category: 'hardware',
            description: 'The ultimate gaming PC for hardcore gamers.',
            specs: 'NVIDIA RTX 3080, AMD Ryzen 9 5900X, 1TB NVMe SSD, 32GB RAM.',
            img_url: 'beastx.jpg'
          }),
          (:Product {
            _id: '64b8ad347ce01e552c41beb3',
            name: 'External SSD BoostDrive',
            price: 159,
            category: 'hardware',
            description: 'High-speed external SSD for data storage and transfer.',
            specs: '1TB capacity, USB 3.2 Gen 2, compact and durable design.',
            img_url: 'boostdrive.jpg'
          }),
          (:Product {
            _id: '64b8ae0d7ce01e552c41bebd',
            name: 'Gaming Console EliteGamer',
            price: 549,
            category: 'hardware',
            description: 'Next-gen gaming console for cutting-edge gaming experiences.',
            specs: '4K gaming, SSD storage, backward compatibility.',
            img_url: 'elitegamer.jpg'
          }),
          (:Product {
            _id: '64b8ae957ce01e552c41bec7',
            name: 'Portable SSD SwiftDrive',
            price: 119,
            category: 'hardware',
            description: 'Compact and high-speed portable SSD for data backup.',
            specs: '500GB capacity, USB 3.2 Gen 1, shock-resistant.',
            img_url: 'swiftdrive.jpg'
          }),
          (:Product {
            _id: '64b8aee97ce01e552c41bed5',
            name: '4K OLED TV LuxeVision',
            price: 2499,
            category: 'hardware',
            description: 'Premium 4K OLED TV with stunning picture quality.',
            specs: '65-inch display, Dolby Vision IQ, HDMI 2.1, webOS smart platform.',
            img_url: 'luxevision.jpg'
          }),
          (:Product {
            _id: '64b8af017ce01e552c41bed9',
            name: 'External HDD DataVault',
            price: 89,
            category: 'hardware',
            description: 'High-capacity external HDD for secure data storage.',
            specs: '4TB capacity, USB 3.0, automatic backup software.',
            img_url: 'datavault.jpg'
          }),
          (:Product {
            _id: '64b8acb67ce01e552c41bea7',
            name: 'Laptop UltraBook Z',
            price: 1299,
            category: 'notebook',
            description: 'Sleek and lightweight Ultrabook for professionals.',
            specs: '13.3-inch display, 512GB SSD, 16GB RAM, Intel Core i7.',
            img_url: 'ultrabookz.jpg'
          }),
          (:Product {
            _id: '64b8ada57ce01e552c41bebb',
            name: 'Laptop ProBook Y',
            price: 999,
            category: 'notebook',
            description: 'Reliable and efficient laptop for business users.',
            specs: '15.6-inch display, 512GB SSD, 8GB RAM, Intel Core i5.',
            img_url: 'probooky.jpg'
          }),
          (:Product {
            _id: '64b8aec57ce01e552c41becf',
            name: 'Laptop PowerBook GTX',
            price: 1599,
            category: 'notebook',
            description: 'High-performance laptop for gaming and content creation.',
            specs: '17.3-inch display, 1TB NVMe SSD, 32GB RAM, NVIDIA RTX 3070.',
            img_url: 'powerbookgtx.jpg'
          }),
          (:Product {
            _id: '64b8ace17ce01e552c41beab',
            name: 'Smartwatch FitTech',
            price: 199,
            category: 'perifericos',
            description: 'Feature-rich smartwatch for fitness enthusiasts.',
            specs: 'Heart rate monitor, GPS, water-resistant, 2-week battery life.',
            img_url: 'fittech.jpg'
          }),
          (:Product {
            _id: '64b8acef7ce01e552c41bead',
            name: 'Wireless Earbuds WaveZ',
            price: 89,
            category: 'perifericos',
            description: 'Immersive wireless earbuds with noise cancellation.',
            specs: 'Bluetooth 5.0, 8 hours playtime, touch controls, charging case.',
            img_url: 'wavez.jpg'
          }),
          (:Product {
            _id: '64b8ad0d7ce01e552c41beaf',
            name: '4K LED TV VisionX',
            price: 1299,
            category: 'perifericos',
            description: 'Ultra-HD LED TV with stunning visuals and smart features.',
            specs: '55-inch display, Dolby Vision, HDR10, Smart TV functionality.',
            img_url: 'visionx.jpg'
          }),
          (:Product {
            _id: '64b8ad267ce01e552c41beb1',
            name: 'Digital Camera ProShot',
            price: 699,
            category: 'perifericos',
            description: 'Professional-grade digital camera for photography enthusiasts.',
            specs: '24MP sensor, 4K video recording, interchangeable lenses.',
            img_url: 'proshot.jpg'
          }),
          (:Product {
            _id: '64b8ad3f7ce01e552c41beb5',
            name: 'VR Headset ImmersX',
            price: 399,
            category: 'perifericos',
            description: 'Virtual reality headset for immersive gaming and experiences.',
            specs: 'Wide field of view, integrated headphones, compatible with PC and consoles.',
            img_url: 'immersx.jpg'
          }),
          (:Product {
            _id: '64b8ae1c7ce01e552c41bebf',
            name: 'Fitness Tracker ActiveFit',
            price: 79,
            category: 'perifericos',
            description: 'Versatile fitness tracker for health and activity monitoring.',
            specs: 'Heart rate monitor, sleep tracking, water-resistant.',
            img_url: 'activefit.jpg'
          }),
          (:Product {
            _id: '64b8ae2f7ce01e552c41bec1',
            name: 'Wireless Headphones BassBeats',
            price: 129,
            category: 'perifericos',
            description: 'Premium wireless headphones with deep bass and long battery life.',
            specs: 'Bluetooth 5.1, 20 hours playtime, noise isolation.',
            img_url: 'bassbeats.jpg'
          }),
          (:Product {
            _id: '64b8ae617ce01e552c41bec3',
            name: 'Curved Monitor ViewMax',
            price: 599,
            category: 'perifericos',
            description: 'Immersive curved monitor for an enhanced viewing experience.',
            specs: '34-inch display, WQHD resolution, 144Hz refresh rate.',
            img_url: 'viewmax.jpg'
          }),
          (:Product {
            _id: '64b8ae767ce01e552c41bec5',
            name: 'Mirrorless Camera CaptureX',
            price: 849,
            category: 'perifericos',
            description: 'Advanced mirrorless camera for enthusiasts and vloggers.',
            specs: '20.1MP sensor, 4K video recording, flip-out touchscreen.',
            img_url: 'capturex.jpg'
          }),
          (:Product {
            _id: '64b8aea57ce01e552c41bec9',
            name: 'VR Headset ProXtreme',
            price: 499,
            category: 'perifericos',
            description: 'Premium virtual reality headset for gaming and professional use.',
            specs: 'Ultra-wide FOV, eye tracking, precision controllers.',
            img_url: 'proxtreme.jpg'
          }),
          (:Product {
            _id: '64b8aed07ce01e552c41bed1',
            name: 'Gaming Mouse FuryX',
            price: 79,
            category: 'perifericos',
            description: 'Precision gaming mouse with customizable RGB lighting.',
            specs: '16000 DPI sensor, ergonomic design, programmable buttons.',
            img_url: 'furyx.jpg'
          }),
          (:Product {
            _id: '64b8aeda7ce01e552c41bed3',
            name: 'Wireless Keyboard TypeMaster',
            price: 129,
            category: 'perifericos',
            description: 'Wireless mechanical keyboard with RGB backlighting.',
            specs: 'Full-size layout, hot-swappable switches, long-lasting battery.',
            img_url: 'typemaster.jpg'
          }),
          (:Product {
            _id: '64b8aef77ce01e552c41bed7',
            name: 'Mirrorless Camera ProShot X',
            price: 999,
            category: 'perifericos',
            description: 'Pro-level mirrorless camera for photography enthusiasts.',
            specs: '24.2MP sensor, 6K video recording, weather-sealed body.',
            img_url: 'proshotx.jpg'
          }),
          (:Product {
            _id: '64b8af107ce01e552c41bedb',
            name: 'Gaming Keyboard TurboGamer',
            price: 149,
            category: 'perifericos',
            description: 'Mechanical gaming keyboard with customizable macros.',
            specs: 'RGB lighting, N-key rollover, detachable wrist rest.',
            img_url: 'turbogamer.jpg'
          }),
          (:Product {
            _id: '64b8af237ce01e552c41bedd',
            name: 'VR Headset UltraSense',
            price: 699,
            category: 'perifericos',
            description: 'Cutting-edge VR headset with haptic feedback.',
            specs: 'Full-body haptics, precise tracking, wireless connectivity.',
            img_url: 'ultrasense.jpg'
          }),
          (:Product {
            _id: '64b8acaa7ce01e552c41bea5',
            name: 'Tablet Pro 11',
            price: 799,
            category: 'tablet',
            description: 'High-performance tablet for work and play.',
            specs: '11-inch display, 256GB storage, 8GB RAM, quad-core processor.',
            img_url: 'pro11.jpg'
          }),
          (:Product {
            _id: '64b8ad977ce01e552c41beb9',
            name: 'Tablet Lite 8',
            price: 299,
            category: 'tablet',
            description: 'Affordable and compact tablet for entertainment on the go.',
            specs: '8-inch display, 64GB storage, 4GB RAM, quad-core processor.',
            img_url: 'lite8.jpg'
          }),
          (:Product {
            _id: '64b8aeba7ce01e552c41becd',
            name: 'Tablet Air 10',
            price: 499,
            category: 'tablet',
            description: 'Ultra-thin and lightweight tablet for productivity.',
            specs: '10.5-inch display, 128GB storage, 6GB RAM, stylus support.',
            img_url: 'air10.jpg'
          })
        `)
        return res.sendStatus(200);

      } catch (error) {
        console.error('Error getting products', error);
        return res.sendStatus(400);
        // Manejar el error, por ejemplo, enviando una respuesta de error al cliente
      }
})
    
module.exports = router;