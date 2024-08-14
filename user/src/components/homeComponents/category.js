import { TiBusinessCard } from "react-icons/ti";
import { FaTshirt } from "react-icons/fa";
import { IoIosPrint } from "react-icons/io";
import { PiFlagBannerFill } from "react-icons/pi";

import banner from '../../assets/categoryImages/banner.png'
import broucher from '../../assets/categoryImages/broucher.png'
import business from '../../assets/categoryImages/business.png'
import tshirt from '../../assets/categoryImages/tshirt.png'

export const categoryList = [
  { img: banner, name: "Banners", link: "/product?q=banners" },
  { img: broucher, name: "Broucher", link: "/product?q=Broucher" },
  { img: business, name: "Business Card", link: "/product?q=Business Card" },
  { img: tshirt, name: "T-shirt", link: "/product?q=tshirt" },
];