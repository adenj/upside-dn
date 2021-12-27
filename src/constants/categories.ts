import {
  IoGameControllerOutline,
  IoWineOutline,
  IoTicketOutline,
  IoTennisballOutline,
  IoAirplaneOutline,
  IoDiceOutline,
  IoBeerOutline,
  IoRestaurantOutline,
  IoPizzaOutline,
  IoTvOutline,
  IoRoseOutline,
  IoPeopleOutline,
  IoShirtOutline,
  IoSchoolOutline,
  IoGiftOutline,
  IoCutOutline,
  IoMedicalOutline,
  IoBarChartOutline,
  IoCheckboxOutline,
  IoPhonePortraitOutline,
  IoNewspaperOutline,
  IoLaptopOutline,
  IoCartOutline,
  IoFitnessOutline,
  IoBedOutline,
  IoWifiOutline,
  IoHammerOutline,
  IoPawOutline,
  IoHomeOutline,
  IoTrashOutline,
  IoFlashOutline,
  IoCarOutline,
  IoBicycleOutline,
  IoCarSportOutline,
  IoTrainOutline,
  IoThumbsDownOutline,
} from "react-icons/io5/";
import { GiCigarette } from "react-icons/gi";
import { BiGasPump } from "react-icons/bi";
import { RiTaxiLine } from "react-icons/ri";
import { GiRoad } from "react-icons/gi";

interface CategoryInfo {
  color: "yellow" | "orange" | "purple" | "blue";
  icon: any;
}
type Categories = Record<string, CategoryInfo>;

const goodLife: Categories = {
  "games-and-software": {
    color: "yellow",
    icon: IoGameControllerOutline,
  },
  booze: {
    color: "yellow",
    icon: IoWineOutline,
  },
  "events-and-gigs": {
    color: "yellow",
    icon: IoTicketOutline,
  },
  hobbies: {
    color: "yellow",
    icon: IoTennisballOutline,
  },
  "holidays-and-travel": {
    color: "yellow",
    icon: IoAirplaneOutline,
  },
  "lottery-and-gambling": {
    color: "yellow",
    icon: IoDiceOutline,
  },
  "pubs-and-bars": {
    color: "yellow",
    icon: IoBeerOutline,
  },
  "restaurants-and-cafes": {
    color: "yellow",
    icon: IoRestaurantOutline,
  },
  takeaway: {
    color: "yellow",
    icon: IoPizzaOutline,
  },
  "tobacco-and-vaping": {
    color: "yellow",
    icon: GiCigarette,
  },
  "tv-and-music": {
    color: "yellow",
    icon: IoTvOutline,
  },
  adult: {
    color: "yellow",
    icon: IoRoseOutline,
  },
};

const personal: Categories = {
  family: {
    color: "orange",
    icon: IoPeopleOutline,
  },
  "clothing-and-accessories": {
    color: "orange",
    icon: IoShirtOutline,
  },
  "education-and-student-loans": {
    color: "orange",
    icon: IoSchoolOutline,
  },
  "fitness-and-wellbeing": {
    color: "orange",
    icon: IoFitnessOutline,
  },
  "gifts-and-charity": {
    color: "orange",
    icon: IoGiftOutline,
  },
  "hair-and-beauty": {
    color: "orange",
    icon: IoCutOutline,
  },
  "health-and-medical": {
    color: "orange",
    icon: IoMedicalOutline,
  },
  investments: {
    color: "orange",
    icon: IoBarChartOutline,
  },
  "life-admin": {
    color: "orange",
    icon: IoCheckboxOutline,
  },
  "mobile-phone": {
    color: "orange",
    icon: IoPhonePortraitOutline,
  },
  "news-magazines-and-books": {
    color: "orange",
    icon: IoNewspaperOutline,
  },
  technology: {
    color: "orange",
    icon: IoLaptopOutline,
  },
};

const home: Categories = {
  groceries: {
    color: "purple",
    icon: IoCartOutline,
  },
  "homeware-and-appliances": {
    color: "purple",
    icon: IoBedOutline,
  },
  internet: {
    color: "purple",
    icon: IoWifiOutline,
  },
  "home-maintenance-and-improvements": {
    color: "purple",
    icon: IoHammerOutline,
  },
  pets: {
    color: "purple",
    icon: IoPawOutline,
  },
  "home-insurance-and-rates": {
    color: "purple",
    icon: IoHomeOutline,
  },
  "rent-and-mortgage": {
    color: "purple",
    icon: IoTrashOutline,
  },
  utilities: {
    color: "purple",
    icon: IoFlashOutline,
  },
};

const transport: Categories = {
  "car-insurance-and-maintenance": {
    color: "blue",
    icon: IoCarOutline,
  },
  cycling: {
    color: "blue",
    icon: IoBicycleOutline,
  },
  fuel: {
    color: "blue",
    icon: BiGasPump,
  },
  parking: {
    color: "blue",
    icon: IoCarSportOutline,
  },
  "public-transport": {
    color: "blue",
    icon: IoTrainOutline,
  },
  "car-repayments": {
    color: "blue",
    icon: IoThumbsDownOutline,
  },
  "taxis-and-share-cars": {
    color: "blue",
    icon: RiTaxiLine,
  },
  "toll-roads": {
    color: "blue",
    icon: GiRoad,
  },
};

export const categories: Categories = {
  ...goodLife,
  ...personal,
  ...home,
  ...transport,
};
