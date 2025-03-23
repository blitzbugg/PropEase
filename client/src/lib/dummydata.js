export const listData = [
  {
    id: 1,
    title: "Beachfront Villa in Kovalam",
    img: "https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bedroom: 3,
    bathroom: 2,
    price: 2500,
    address: "Light House Road, Kovalam",
    latitude: 8.4004,
    longitude: 76.9787,
    roomSize: 1200, // Added
    beds: 3, // Added
    nearby: {
      school: "500m away",
      busStop: "200m away",
      restaurant: "100m away",
    },
  },
  {
    id: 2,
    title: "Houseboat Stay in Alleppey Backwaters",
    img: "https://images.pexels.com/photos/3734649/pexels-photo-3734649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bedroom: 2,
    bathroom: 2,
    price: 4000,
    address: "Punnamada, Alappuzha",
    latitude: 9.4981,
    longitude: 76.3388,
    roomSize: 800, // Added
    beds: 2, // Added
    nearby: {
      school: "1km away",
      busStop: "300m away",
      restaurant: "500m away",
    },
  },
  {
    id: 3,
    title: "Munnar Hilltop Cottage",
    img: "https://images.pexels.com/photos/462785/pexels-photo-462785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bedroom: 2,
    bathroom: 1,
    price: 1800,
    address: "Chithirapuram, Munnar",
    latitude: 10.0889,
    longitude: 77.0595,
    roomSize: 600, // Added
    beds: 2, // Added
    nearby: {
      school: "2km away",
      busStop: "1km away",
      restaurant: "800m away",
    },
  },
  {
    id: 4,
    title: "Luxury Apartment in Kochi",
    img: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bedroom: 3,
    bathroom: 3,
    price: 5000,
    address: "Marine Drive, Kochi",
    latitude: 9.9816,
    longitude: 76.2851,
    roomSize: 1500, // Added
    beds: 3, // Added
    nearby: {
      school: "700m away",
      busStop: "400m away",
      restaurant: "200m away",
    },
  },
  {
    id: 5,
    title: "Cozy Bungalow in Wayanad",
    img: "https://images.pexels.com/photos/703140/pexels-photo-703140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bedroom: 2,
    bathroom: 2,
    price: 2200,
    address: "Vythiri, Wayanad",
    latitude: 11.6101,
    longitude: 76.0847,
    roomSize: 900, // Added
    beds: 2, // Added
    nearby: {
      school: "1.5km away",
      busStop: "500m away",
      restaurant: "300m away",
    },
  },
  {
    id: 6,
    title: "Heritage Home in Fort Kochi",
    img: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bedroom: 1,
    bathroom: 1,
    price: 1200,
    address: "Princess Street, Fort Kochi",
    latitude: 9.9656,
    longitude: 76.2426,
    roomSize: 500, // Added
    beds: 1, // Added
    nearby: {
      school: "1km away",
      busStop: "200m away",
      restaurant: "100m away",
    },
  },
  {
    id: 7,
    title: "Lakeside Villa in Kumarakom",
    img: "https://images.pexels.com/photos/1106471/pexels-photo-1106471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bedroom: 4,
    bathroom: 3,
    price: 4500,
    address: "Near Bird Sanctuary, Kumarakom",
    latitude: 9.6218,
    longitude: 76.4282,
    roomSize: 1800, // Added
    beds: 4, // Added
    nearby: {
      school: "2km away",
      busStop: "1km away",
      restaurant: "500m away",
    },
  },
  {
    id: 8,
    title: "Mountain View Home in Thekkady",
    img: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bedroom: 2,
    bathroom: 1,
    price: 2000,
    address: "Kumily, Thekkady",
    latitude: 9.6031,
    longitude: 77.1628,
    roomSize: 700, // Added
    beds: 2, // Added
    nearby: {
      school: "1.2km away",
      busStop: "600m away",
      restaurant: "400m away",
    },
  },
];

export const singlePostData = {
  id: 1,
  title: "Beachside Villa in Kovalam",
  price: 3000,
  images: [
    "https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1106471/pexels-photo-1106471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/462785/pexels-photo-462785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/703140/pexels-photo-703140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ],
  bedRooms: 3,
  bathroom: 2,
  size: 1200, // Added
  roomSize: 1200, // Added
  beds: 3, // Added
  latitude: 8.4004,
  longitude: 76.9787,
  city: "Kovalam",
  address: "Light House Road",
  nearby: {
    school: "500m away",
    busStop: "200m away",
    restaurant: "100m away",
  },
  description:
    "Experience luxury and serenity in this beachfront villa. With stunning sea views, spacious interiors, and modern amenities, it's perfect for a peaceful getaway or a vacation home. The property offers easy access to Kovalam Beach, famous seafood restaurants, and local attractions.",
  owner: {
    name: "Rahul Nair",
    img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
};

export const userData = {
  id: 1,
  name: "Rahul Nair",
  img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
};


// Sample data for chat messages

export const contacts = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      lastMessage: "Yes, it's available. Would you like to schedule a virtual tour?",
      timestamp: "10:40 AM",
      unread: 1,
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      lastMessage: "I'll let you know about the pricing soon.",
      timestamp: "Yesterday",
      unread: 0,
    },
    {
      id: 3,
      name: "Robert Johnson",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      lastMessage: "The property in Munnar is still available.",
      timestamp: "Mar 20",
      unread: 2,
    },
    {
      id: 4,
      name: "Sarah Williams",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      lastMessage: "Thanks for your interest in the Kovalam villa.",
      timestamp: "Mar 18",
      unread: 0,
    },
  ];

  // Sample messages for the selected chat
  export const messages = [
    {
      id: 1,
      sender: "John Doe",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      content: "Hey there! How's the property search going?",
      timestamp: "10:32 AM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "Me",
      content: "Great! I'm interested in the Beachfront Villa in Kovalam. Is it available next month?",
      timestamp: "10:35 AM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "John Doe",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      content: "Yes, it's available. Would you like to schedule a virtual tour?",
      timestamp: "10:40 AM",
      isOwn: false,
    },
  ];