// data/menuData.js
import {
  FaBusinessTime,
  FaFileAlt,
  FaTshirt,
  FaImage,
  FaHandHoldingUsd,
  FaCalendar,
  FaStickyNote,
  FaPen,
} from "react-icons/fa";


export const menuData = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Products",
    link: "/product",
    subcategories: [
      {
        title: "Printing Services",
        items: [
          {
            name: "Business Cards",
            link: "/product?page=1&limit=10&category=Business+Cards",
            description: "Professional business cards for networking.",
            icon: FaBusinessTime,
          },
          {
            name: "Flyers",
            link: "/product?page=1&limit=10&category=Flyers",
            description: "High-quality flyers for events and promotions.",
            icon: FaFileAlt,
          },
          {
            name: "T-Shirt Printing",
            link: "/product?page=1&limit=10&category=Custom+Print+Products",
            description: "Custom t-shirts with your design.",
            icon: FaTshirt,
          },
          {
            name: "Posters",
            link: "/product?page=1&limit=10&category=Posters",
            description: "Eye-catching posters for all occasions.",
            icon: FaImage,
          },
          {
            name: "Brochures",
            link: "/product?page=1&limit=10&category=Brochures",
            description: "Informative brochures to showcase your services.",
            icon: FaFileAlt,
          },
        ],
      },
      {
        title: "Promotional Materials",
        items: [
          {
            name: "Banners",
            link: "/product?page=1&limit=10&category=Banners",
            description: "Large banners for events and advertising.",
            icon: FaHandHoldingUsd,
          },
          {
            name: "Custom Mugs",
            link: "/product?page=1&limit=10&category=Custom+Print+Products",
            description: "Mugs with custom designs for promotional use.",
            icon: FaTshirt,
          },
        ],
      },
    ],
  },

  {
    name: "Order",
    link: "/order",
  },
];
