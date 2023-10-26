import {
  PiMicrosoftWordLogoBold,
  PiMicrosoftExcelLogoBold,
} from "react-icons/pi";
import { TbHomeDot } from "react-icons/tb";
import { AiOutlineAntDesign } from "react-icons/ai";

export const linkRoutes = [
  { name: "Inicio", link: "/", icon: TbHomeDot },
  {
    name: "Buscador de duplas",
    link: "/",
    icon: PiMicrosoftExcelLogoBold,
  },
  {
    name: "Glosario",
    link: "/",
    icon: PiMicrosoftWordLogoBold,
  },
  { name: "Rediseño UX/UI", link: "/", icon: AiOutlineAntDesign },
];
