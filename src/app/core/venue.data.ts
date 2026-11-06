import { TapBeer, WineItem, CocktailItem, PartnerFood, ReviewItem, WeeklySpecial } from './venue.model';

export const VENUE_INFO = {
  name: "The Forager's Drop",
  tagline: "Independent Craft Beer, Seasonal Wines, Cocktails & Neighborhood Atmosphere",
  shortDescription: "A premier independent craft haven in Melbourne's Eastern Suburbs, pouring 20 rotating craft taps, artisanal Victorian wines, and bespoke cocktails with a unique BYO food culture.",
  address: "499A Whitehorse Road, Mitcham VIC 3132, Australia",
  coordinates: {
    lat: -37.8174,
    lng: 145.1932
  },
  phone: "0415 727 988",
  phoneFormatted: "+61 415 727 988",
  email: "foragersdrop@gmail.com",
  instagramHandle: "@foragersdrop",
  instagramUrl: "https://www.instagram.com/foragersdrop/",
  facebookUrl: "https://www.facebook.com/profile.php?id=61557023863218",
  googleReviewsUrl: "https://www.google.com/search?q=the+foragers+drop&oq=the+foragers+drop#lrd=0x6ad63922b2d8da29:0xace8d302b76dc8ef,1,,,,",
  hours: [
    { day: "Monday", open: "16:00", close: "22:00", display: "4:00 PM – 10:00 PM", notes: "Tight Arse Mondays: $6 Shots, $10 Pints" },
    { day: "Tuesday", open: "16:00", close: "22:00", display: "4:00 PM – 10:00 PM", notes: "Quiet sips & pool table sessions" },
    { day: "Wednesday", open: "16:00", close: "22:00", display: "4:00 PM – 10:00 PM", notes: "Pub Trivia Night (7:00 PM Seating)" },
    { day: "Thursday", open: "12:00", close: "01:00", display: "12:00 PM – 1:00 AM", notes: "Open from midday through late night" },
    { day: "Friday", open: "12:00", close: "01:00", display: "12:00 PM – 1:00 AM", notes: "Mr & Mrs Pizza lunch + Happy Hour 6–8 PM" },
    { day: "Saturday", open: "12:00", close: "01:00", display: "12:00 PM – 1:00 AM", notes: "$8 Basic Spirits 6–8 PM + weekend energy" },
    { day: "Sunday", open: "14:00", close: "22:00", display: "2:00 PM – 10:00 PM", notes: "2-for-1 Cocktails 3–6 PM, $4 Pots from 6 PM" }
  ],
  stats: {
    tapsCount: 20,
    rating: 4.7,
    reviewsCount: "400+",
    independentPercent: 100,
    venueHireFee: "$0"
  },
  images: {
    logo: "/images/logo.png",
    barInterior: "/images/d58a68_ca5885281bfe43af9346e279a213ee6d~mv2.jpg",
    beerCellar: "/images/b4aada852d3247f6a733b08786e4db14.jpg",
    barAtmosphere: "/images/d58a68_3f7748fe95274841a6ea80980fa6a1b7~mv2.jpg",
    hops: "/images/d58a68_fcf0307e0751432fa8aab14539192163~mv2.jpg",
    cocktails: "/images/d58a68_ce6f51127a634ee9953fe5f6b937bf26~mv2.jpg",
    floorPlan: "/images/d58a68_05a967d1452b4b78a28ca51ca20737e2~mv2.png",
    foodMap: "/images/d58a68_fc153bfbabec4f10bd61e7b86b35fc5a~mv2.png",
    pizzaPartner: "/images/d58a68_ffb90e57fa2b47a4bd3a62dd8b03a254~mv2.png",
    triviaRules: "/images/d58a68_886e470291194c6c87db444ecb4f413e~mv2.png",
    triviaFlyer: "/images/d58a68_564b5ea24b714feca228795e1376def0~mv2.jpg",
    reviewsCollage: "/images/a3c153_b79a53f203ca4892958a2fe6e0c9a822~mv2.png",
    reviewBadge1: "/images/a3c153_e1410a1d129d42b6b093bf4c361c88ed~mv2.png",
    reviewBadge2: "/images/a3c153_5de7d3dd2a174fc4b04166c8fec34b50~mv2.png",
    reviewBadge3: "/images/a3c153_64687849619b415195aaae3cf61a37bc~mv2.png",
    reviewBadge4: "/images/a3c153_100f6cd63ca54b6c9a7f0760c52b6ed1~mv2.png",
    reviewBadge5: "/images/a3c153_f9f57c25a7c9493493668dd1b693984d~mv2.png",
    tapBadge: "/images/d58a68_c387a164e9ac46ed8c1be7e698462ada~mv2.jpg",
    nowTappedBanner: "/images/a3c153_d3fd814e9af142c89f2aa36da4d38e5e~mv2.png"
  }
};

export const TAP_LIST: TapBeer[] = [
  {
    id: "tap-01",
    tapNumber: 1,
    name: "Forager's House Lagery Lager",
    brewery: "Independent Breweries Collab",
    location: "Mitcham / Yarra Valley, VIC",
    style: "Lager",
    abv: 4.5,
    ibu: 18,
    description: "Crisp, hyper-refreshing European-style lager brewed exclusively with pristine local malts and noble hops. Clean, dry finish built for session drinking.",
    pricing: { pot: 6.5, pint: 12.0, jug: 24.0 },
    status: "Pouring Fresh",
    isLocalVictorian: true,
    tastingNotes: ["Cracker malt", "Floral noble hop", "Snappy dry finish"]
  },
  {
    id: "tap-02",
    tapNumber: 2,
    name: "Nebula Fog Double Dry-Hopped Hazy IPA",
    brewery: "One Drop Brewing Co.",
    location: "Botany / East Coast, AU",
    style: "Hazy IPA",
    abv: 6.8,
    ibu: 35,
    description: "Lush tropical juice bomb exploding with ripe mango, passionfruit pulp, and candied pineapple over a pillowy oat & wheat foundation.",
    pricing: { pot: 8.5, pint: 15.5, jug: 31.0 },
    status: "Pouring Fresh",
    isLocalVictorian: false,
    tastingNotes: ["Dripping mango", "Candied pineapple", "Velvet haze"]
  },
  {
    id: "tap-03",
    tapNumber: 3,
    name: "Pacific Ridge West Coast IPA",
    brewery: "Hop Nation Brewing",
    location: "Footscray, VIC",
    style: "West Coast IPA",
    abv: 6.2,
    ibu: 60,
    description: "Old school pine needle, ruby red grapefruit rind, and resinous dank notes with a sharp, assertive bitter snap that real hopheads crave.",
    pricing: { pot: 8.0, pint: 14.5, jug: 29.0 },
    status: "Pouring Fresh",
    isLocalVictorian: true,
    tastingNotes: ["Resinous pine", "Grapefruit pith", "Clean golden malt"]
  },
  {
    id: "tap-04",
    tapNumber: 4,
    name: "Shadowlands Bourbon Barrel Imperial Stout",
    brewery: "Hawkers Beer",
    location: "Reservoir, VIC",
    style: "Stout",
    abv: 8.9,
    ibu: 55,
    description: "Viscous, jet-black nectar aged on American oak bourbon barrels. Layers of Belgian dark chocolate, espresso crema, toffee, and warming vanilla.",
    pricing: { pot: 9.5, pint: 17.0 },
    status: "Pouring Fresh",
    isLocalVictorian: true,
    tastingNotes: ["Dark cacao", "Bourbon warmth", "Roasted espresso"]
  },
  {
    id: "tap-05",
    tapNumber: 5,
    name: "Sunburst Yuzu & Blood Orange Kettle Sour",
    brewery: "Future Mountain Brewing",
    location: "Reservoir, VIC",
    style: "Sour",
    abv: 4.8,
    ibu: 8,
    description: "Electrifying citrus tartness balanced by natural sea salt. Thirst-quenching acidity that awakens the palate and cuts through rich food.",
    pricing: { pot: 7.5, pint: 13.5, jug: 27.0 },
    status: "Pouring Fresh",
    isLocalVictorian: true,
    tastingNotes: ["Zesty yuzu", "Blood orange sherbet", "Crisp sea salt"]
  },
  {
    id: "tap-06",
    tapNumber: 6,
    name: "Mountain Mist Victorian Pale Ale",
    brewery: "Bridge Road Brewers",
    location: "Beechworth, VIC",
    style: "Pale Ale",
    abv: 4.8,
    ibu: 26,
    description: "Gold standard Victorian pale ale. Balanced caramel biscuity backbone with gentle stone fruit and citrus aromatics from local Ella & Galaxy hops.",
    pricing: { pot: 7.0, pint: 13.0, jug: 26.0 },
    status: "Pouring Fresh",
    isLocalVictorian: true,
    tastingNotes: ["Melon & peach", "Biscuity malt", "Gentle floral hop"]
  },
  {
    id: "tap-07",
    tapNumber: 7,
    name: "Cold-Pressed Pink Lady Heritage Cider",
    brewery: "Napoleone Cider Co.",
    location: "Yarra Valley, VIC",
    style: "Cider",
    abv: 5.0,
    description: "100% estate-grown Yarra Valley apples, wild fermented and bottled fresh. Crisp sparkling bubbles with authentic orchard fruit character.",
    pricing: { pot: 7.0, pint: 13.0, jug: 26.0 },
    status: "Pouring Fresh",
    isLocalVictorian: true,
    tastingNotes: ["Fresh picked apple", "Delicate champagne bubble", "Dry finish"]
  },
  {
    id: "tap-08",
    tapNumber: 8,
    name: "Traditional Handpump English Best Bitter",
    brewery: "Local Artisan Real Ale",
    location: "Gembrook, VIC",
    style: "Cask Ale",
    abv: 4.2,
    ibu: 30,
    description: "Poured authentic handpump cellar temperature (11°C). Soft natural carbonation, toffee malt sweetness, and earthy Fuggle hop bitterness.",
    pricing: { pot: 7.5, pint: 13.5 },
    status: "Pouring Fresh",
    isLocalVictorian: true,
    tastingNotes: ["Toffee biscuit", "Soft mouthfeel", "Earthy cedar"]
  },
  {
    id: "tap-09",
    tapNumber: 9,
    name: "Citra Eclipse Double Hazy IPA",
    brewery: "Banks Brewing",
    location: "Seaford, VIC",
    style: "Hazy IPA",
    abv: 7.8,
    ibu: 42,
    description: "Heavyweight oat cream DIPA loaded with excessive dry-hopping. Aromas of lime cordial, guava, and sweet mandarin cream.",
    pricing: { pot: 9.0, pint: 16.5 },
    status: "Low Keg",
    isLocalVictorian: true,
    tastingNotes: ["Lime cordial", "Ripe guava", "Pillowy oat cream"]
  },
  {
    id: "tap-10",
    tapNumber: 10,
    name: "Smoked Birchwood Baltic Porter",
    brewery: "Blackman's Brewery",
    location: "Torquay, VIC",
    style: "Stout",
    abv: 7.2,
    ibu: 38,
    description: "Deep mahogany pour with beechwood smoked malts reminiscent of campfire nights. Dark molasses, prune, and dark baker's chocolate.",
    pricing: { pot: 8.5, pint: 15.0 },
    status: "Pouring Fresh",
    isLocalVictorian: true,
    tastingNotes: ["Campfire smoke", "Molasses", "Dark dried fruit"]
  }
];

export const WINE_LIST: WineItem[] = [
  {
    id: "wine-01",
    name: "Forager's House Mulled Wine (Winter Elixir)",
    winery: "Crafted In-House with Yarra Valley Shiraz",
    region: "Yarra Valley, VIC",
    type: "Seasonal Specialty",
    glassPrice: 14.0,
    bottlePrice: 48.0,
    description: "The legendary specialty: 'To die for!' Simmered slowly with star anise, Ceylon cinnamon, orange rind, whole cloves, and a dash of Victorian small-batch brandy.",
    isSeasonalHighlight: true
  },
  {
    id: "wine-02",
    name: "Forager's Summer Courtyard Sangria",
    winery: "In-House Recipe with Spanish Tempranillo",
    region: "Victorian & Barossa Blend",
    type: "Seasonal Specialty",
    glassPrice: 13.0,
    bottlePrice: 44.0,
    description: "Macerated seasonal strawberries, Valencia orange slices, triple sec, artisanal craft vermouth, and a spritz of ginger beer. Refreshing, vibrant, and made for sunlit afternoons.",
    isSeasonalHighlight: true
  },
  {
    id: "wine-03",
    name: "Wild Ferment Natural Pinot Noir",
    winery: "TarraWarra Estate",
    region: "Yarra Valley, VIC",
    type: "Red",
    glassPrice: 15.0,
    bottlePrice: 68.0,
    description: "Unfiltered, organic Pinot Noir bursting with forest floor, wild cherry, violet perfume, and fine silk tannins."
  },
  {
    id: "wine-04",
    name: "Old Vine Shiraz (Minimal Intervention)",
    winery: "Denton View Hill",
    region: "Yarra Glen, VIC",
    type: "Red",
    glassPrice: 16.0,
    bottlePrice: 72.0,
    description: "Cool-climate Shiraz grown on granitic soils. Cracked black peppercorn, blackberry bramble, and savory structural backbone."
  },
  {
    id: "wine-05",
    name: "Single Vineyard Chardonnay",
    winery: "Giant Steps",
    region: "Sexton Vineyard, Yarra Valley",
    type: "White",
    glassPrice: 14.5,
    bottlePrice: 65.0,
    description: "Pristine white nectarine, lemon blossom, and subtle flinty reduction with toasted brioche and lively saline acidity."
  },
  {
    id: "wine-06",
    name: "King Valley Prosecco DOC",
    winery: "Dal Zotto Wines",
    region: "King Valley, VIC",
    type: "Sparkling",
    glassPrice: 12.0,
    bottlePrice: 52.0,
    description: "Crisp green apple, Bartlett pear, and effervescent floral fizz crafted in the traditional Italian alpine style of northern Victoria."
  }
];

export const COCKTAIL_LIST: CocktailItem[] = [
  {
    id: "cocktail-01",
    name: "The Forager's Smoked Old Fashioned",
    ingredients: "Starward Two-Fold Whisky, Local Bitters, Demerara, Orange Peel, Hickory Smoke",
    glassPrice: 22.0,
    description: "Melbourne's premier single malt whisky infused with house-made smoked syrup, expressed citrus oils, and served over hand-carved ice.",
    spiritBase: "Victorian Single Malt",
    tag: "Signature"
  },
  {
    id: "cocktail-02",
    name: "Native Botanical Gin & Tonic",
    ingredients: "Four Pillars Rare Dry Gin, Fever-Tree Mediterranean Tonic, Dehydrated Blood Orange, Native Rosemary",
    glassPrice: 19.0,
    description: "Victorian craft gin distilling native Tasmanian pepperberry, lemon myrtle, and whole oranges. A pristine, aromatic classic.",
    spiritBase: "Yarra Valley Gin",
    tag: "Crowd Favorite"
  },
  {
    id: "cocktail-03",
    name: "Cold Drip Espresso Martini",
    ingredients: "Archie Rose Vodka, House Cold Drip Coffee Liqueur, Fresh Espresso, Spiced Honey",
    glassPrice: 21.0,
    description: "Velvety thick foam crema atop robust single-origin cold brew with subtle honey sweetness and pure clean grain spirits.",
    spiritBase: "Vodka",
    tag: "Night Starter"
  },
  {
    id: "cocktail-04",
    name: "Spiced Blood Orange Sour",
    ingredients: "Starward Nova Whisky, Fresh Lemon, Blood Orange Shrub, Aquafaba, Spiced Bitters",
    glassPrice: 20.0,
    description: "Silky vegan foam, brilliant ruby hue, and a harmonious balance of citrus tang and oak spice.",
    spiritBase: "Whisky"
  },
  {
    id: "cocktail-05",
    name: "Yarra Valley Blackberry Bramble",
    ingredients: "Craft Gin, Fresh Lemon, Marionette Mûre (Blackberry Liqueur), Crushed Ice",
    glassPrice: 19.0,
    description: "Tart, sweet, and gorgeously layered cocktail showcasing locally foraged berry liqueurs.",
    spiritBase: "Gin"
  }
];

export const PARTNER_FOOD: PartnerFood[] = [
  {
    id: "food-01",
    restaurantName: "Mr & Mrs Pizza Mitcham",
    cuisine: "Artisan Woodfired Pizza & Pasta",
    address: "501 Whitehorse Road, Mitcham (Right next door)",
    specialDeal: "Friday Forager's Special: Any Pizza between Noon and 4:00 PM gets you a $10 Pint of Lager or Pale Ale at the bar!",
    phone: "(03) 9874 1234",
    walkingMinutes: 1,
    image: "/images/d58a68_ffb90e57fa2b47a4bd3a62dd8b03a254~mv2.png",
    popularDishes: [
      { name: "Prosciutto & Truffle Mushroom Pizza", price: "$24.00", description: "San Marzano tomatoes, fior di latte, aged prosciutto di Parma, wild mushrooms, white truffle oil." },
      { name: "Calabrese Hot Salami Pizza", price: "$22.50", description: "Spicy sopressa salami, roasted red peppers, kalamata olives, chili flakes, fresh basil." },
      { name: "Four Cheese Bianca Pizza", price: "$23.00", description: "Mozzarella, creamy gorgonzola dolce, fontina, freshly grated parmigiano reggiano." }
    ]
  },
  {
    id: "food-02",
    restaurantName: "Mitcham Artisan Dumpling & Noodle Bar",
    cuisine: "Handmade Pan-Fried Dumplings & Noodles",
    address: "495 Whitehorse Road, Mitcham",
    phone: "(03) 9873 5566",
    walkingMinutes: 1,
    popularDishes: [
      { name: "Pork & Chive Pan-Fried Potstickers (12 pcs)", price: "$16.80", description: "Crispy lace bottom dumplings served with black vinegar and homemade chili oil." },
      { name: "Dan Dan Noodles with Minced Pork & Peanuts", price: "$15.50", description: "Springy hand-pulled noodles in a fragrant Sichuan sesame paste and toasted chili broth." },
      { name: "Crispy Salt & Pepper Squid", price: "$18.00", description: "Flash fried with scallions, fresh red chilies, and garlic pepper seasoning." }
    ]
  },
  {
    id: "food-03",
    restaurantName: "Whitehorse Gourmet Burgers & Loaded Fries",
    cuisine: "Smash Burgers & Bar Feasts",
    address: "505 Whitehorse Road, Mitcham",
    phone: "(03) 9872 8899",
    walkingMinutes: 2,
    popularDishes: [
      { name: "Double Wagyu Smash Bacon Cheeseburger", price: "$19.50", description: "Twin grass-fed smashed patties, double American cheddar, streaky maple bacon, secret burger sauce on brioche." },
      { name: "Nashville Hot Crispy Chicken Burger", price: "$18.50", description: "Spicy buttermilk fried thigh, tangy purple slaw, house pickles, smoked jalapeño mayo." },
      { name: "Pulled Pork Loaded Beer-Battered Fries", price: "$16.00", description: "Slow-braised pulled pork, melted monterey jack cheese, BBQ drizzle, spring onions." }
    ]
  }
];

export const IN_BAR_SNACKS = [
  { name: "Warm Salted Soft Pretzels", price: "$10.00", description: "Baked fresh and dusted with Murray River pink flake salt, served with warm house stout mustard." },
  { name: "Marinated Mount Zero Olives", price: "$9.00", description: "Warmed Australian mixed olives infused with rosemary sprigs, orange peel, and garlic oil." },
  { name: "House Roasted Spiced Beer Nuts", price: "$7.50", description: "Cashews, almonds, and peanuts tossed in smoked paprika, cayenne, brown sugar, and sea salt." },
  { name: "Artisanal Australian Beef Biltong & Jerky", price: "$12.00", description: "Traditional cured lean grass-fed beef slices with cracked black pepper and coriander." }
];

export const WEEKLY_SPECIALS: WeeklySpecial[] = [
  {
    day: "Monday",
    dayIndex: 1,
    title: "Tight Arse Mondays",
    badge: "$6 Shots & $10 Pints",
    timeWindow: "4:00 PM – 10:00 PM",
    highlights: ["$6 Experimental & classic shots", "$10 Pints of Lagery Lager & Pale Ale", "Casual pool games & quiet pints"],
    description: "Start the week without denting your wallet. Grab a $10 craft pint, test our bartenders' wild experimental shots for $6, and shoot pool with friends.",
    heroImage: "/images/d58a68_ca5885281bfe43af9346e279a213ee6d~mv2.jpg"
  },
  {
    day: "Wednesday",
    dayIndex: 3,
    title: "Pub Trivia Night",
    badge: "7:00 PM Seating",
    timeWindow: "4:00 PM – 10:00 PM (Trivia from 7:00 PM)",
    highlights: ["Free team entry", "Bar tabs & boozy prize packs", "Hilarious, adult-themed banter & mini-games"],
    description: "The best trivia in Melbourne's East! Fast-paced rounds, funny hosts, music trivia, and brutal tie-breakers. Booths fill fast—booking is highly recommended.",
    heroImage: "/images/d58a68_564b5ea24b714feca228795e1376def0~mv2.jpg"
  },
  {
    day: "Friday",
    dayIndex: 5,
    title: "Mr & Mrs Pizza Lunch + Happy Hour",
    badge: "Happy Hour 6:00 – 8:00 PM",
    timeWindow: "12:00 PM – 1:00 AM",
    highlights: ["Noon–4 PM: Any Pizza next door unlocks a $10 craft pint", "6:00–8:00 PM: Happy Hour drink discounts across taps", "Late night weekend vibes till 1:00 AM"],
    description: "The quintessential Friday celebration. Start early with our famous lunch pizza deal, roll straight into Happy Hour from 6 to 8 PM, and enjoy 20 taps till late.",
    heroImage: "/images/d58a68_ffb90e57fa2b47a4bd3a62dd8b03a254~mv2.png"
  },
  {
    day: "Saturday",
    dayIndex: 6,
    title: "Saturday Spirits & Sessions",
    badge: "$8 Basic Spirits 6:00 – 8:00 PM",
    timeWindow: "12:00 PM – 1:00 AM",
    highlights: ["$8 Basic Spirits from 6:00 PM to 8:00 PM", "Bespoke cocktail shaking all night", "Lively music, beer garden courtyard & pool lounge"],
    description: "The peak of the weekend. Sip top-shelf cocktails, enjoy $8 spirits during prime hours, and share tables with fellow craft enthusiasts.",
    heroImage: "/images/d58a68_ce6f51127a634ee9953fe5f6b937bf26~mv2.jpg"
  },
  {
    day: "Sunday",
    dayIndex: 0,
    title: "Sunday Sessions & Line Clean Pots",
    badge: "2-for-1 Cocktails & $4 Pots",
    timeWindow: "2:00 PM – 10:00 PM",
    highlights: ["Selected 2-for-1 Cocktails from 3:00 PM to 6:00 PM", "$4 Pots from 6:00 PM as line clean begins", "Courtyard acoustic vibes & dog friendly patio"],
    description: "Wind down the weekend in style. Two-for-one cocktail specials throughout the afternoon, followed by legendary $4 pots as our cellar team prepares lines for the week.",
    heroImage: "/images/b4aada852d3247f6a733b08786e4db14.jpg"
  }
];

export const TESTIMONIALS: ReviewItem[] = [
  {
    id: "rev-01",
    author: "Dave 'HopSeeker' M.",
    rating: 5,
    source: "Google Reviews",
    date: "2 weeks ago",
    category: "Craft Beer",
    verifiedVisit: true,
    badgeImage: "/images/a3c153_e1410a1d129d42b6b093bf4c361c88ed~mv2.png",
    comment: "Hands down the absolute best craft beer venue in the Eastern Suburbs! 20 rotating taps of independent breweries you cannot find in standard pubs. The staff know every brewery story and pour each beer with proper glassware and care. The house mulled wine in winter is seriously to die for."
  },
  {
    id: "rev-02",
    author: "Sarah & Liam K.",
    rating: 5,
    source: "Google Reviews",
    date: "1 month ago",
    category: "BYO Food",
    verifiedVisit: true,
    badgeImage: "/images/a3c153_5de7d3dd2a174fc4b04166c8fec34b50~mv2.png",
    comment: "Brilliant concept! Being able to order pizza from Mr & Mrs Pizza right next door and eat it in the bar while enjoying their incredible craft IPAs and wines is genius. Atmosphere is cozy, lighting is moody and warm, and zero snobbery. 10/10."
  },
  {
    id: "rev-03",
    author: "Marcus Vance",
    rating: 5,
    source: "Untappd",
    date: "3 weeks ago",
    category: "Craft Beer",
    verifiedVisit: true,
    badgeImage: "/images/a3c153_64687849619b415195aaae3cf61a37bc~mv2.png",
    comment: "A true hidden gem just a 3-minute stroll from Mitcham Station. Fresh keg drops every single week—One Drop, Hawkers, Banks, Bridge Road, plus genuine English handpump bitter! Super rare finds. Check in on Untappd and treat yourself."
  },
  {
    id: "rev-04",
    author: "Chloe Henderson",
    rating: 5,
    source: "Facebook",
    date: "Last month",
    category: "Trivia",
    verifiedVisit: true,
    badgeImage: "/images/a3c153_100f6cd63ca54b6c9a7f0760c52b6ed1~mv2.png",
    comment: "Wednesday Pub Trivia here is unmatched! Not your boring dry corporate trivia—the host is hilarious, questions are cheeky, and winning bar tabs and jugs makes the whole place erupt. Book a booth in advance because it packs out every week!"
  },
  {
    id: "rev-05",
    author: "Anthony R.",
    rating: 5,
    source: "Google Reviews",
    date: "2 months ago",
    category: "Events",
    verifiedVisit: true,
    badgeImage: "/images/a3c153_f9f57c25a7c9493493668dd1b693984d~mv2.png",
    comment: "Hosted my 30th birthday here in the courtyard and lounge. Absolutely zero venue hire fee, which is virtually unheard of in Melbourne! The team let us bring in our own catering, sorted custom drink paddles for our mates, and took all the stress away."
  },
  {
    id: "rev-06",
    author: "Jessica T.",
    rating: 5,
    source: "Restaurant Guru",
    date: "3 months ago",
    category: "Vibe & Atmosphere",
    verifiedVisit: true,
    comment: "Voted #1 bar in Mitcham for a reason. Eclectic vintage couches, a pool table that actually has straight cues, beer garden for sunny days, and dog-friendly! You feel like a regular the minute you walk in the door."
  },
  {
    id: "rev-07",
    author: "Brendan S.",
    rating: 5,
    source: "Google Reviews",
    date: "Recent",
    category: "Hospitality",
    verifiedVisit: true,
    comment: "Bartenders here are true champions. You can tell they actually love what they do. Gave us tasting pours before we committed to a pint, recommended great natural wines for my partner, and the vibe is unbeatable."
  }
];

export const FUNCTION_PACKAGES = [
  {
    title: "Casual Social Gatherings & Birthdays",
    capacity: "10 – 35 Guests",
    space: "Reserved Booths & Courtyard Garden",
    hireFee: "$0 Room Hire",
    description: "Ideal for birthday milestones, group reunions, or post-work drinks. Includes reserved cluster of booths, dedicated bar tab setup, and complete BYO food freedom.",
    features: [
      "No hire fee or minimum spend pressure",
      "Bring your own food or order hot pizzas from next door",
      "Personalized welcome signage & reserved table cards",
      "Full access to 20 craft taps, spirits, and wine cellar"
    ]
  },
  {
    title: "Milestone Celebrations & Hens / Bucks",
    capacity: "30 – 70 Guests",
    space: "The Pool Lounge & Beer Garden Wing",
    hireFee: "$0 Room Hire",
    description: "An exclusive semi-private wing combining the rustic pool room with the covered outdoor beer garden courtyard.",
    features: [
      "Dedicated cocktail wristband or tab management",
      "Free pool table play throughout your event",
      "Flexible catering options: order in, food trucks, or self-catered platters",
      "Sound system integration & speech mic setup"
    ]
  },
  {
    title: "Full Venue Exclusive Buyout",
    capacity: "Up to 120 Guests",
    space: "Entire Venue (Main Bar, Pool Lounge, Courtyard)",
    hireFee: "Modest Minimum Spend (Zero Venue Hire Fee)",
    description: "Take over the entirety of The Forager's Drop for weddings, corporate celebrations, product launches, or private celebrations.",
    features: [
      "Exclusive access to all 20 taps and private bar staff",
      "Complete venue branding & multimedia projection",
      "Custom cocktail creation dedicated to your guest of honor",
      "Curated playlist control & live acoustic musician stage"
    ]
  }
];
