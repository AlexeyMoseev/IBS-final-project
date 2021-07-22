import { PageChart } from "../pages/chart/PageChart";
import {PageIndex} from "../pages/index/PageIndex";

export interface IMenu{
  id: number
  component: any
  label: string
  href: string
  exact?: boolean
}

export const MENU: Array<IMenu> = [
  {
    id: 1,
    label: "Главная",
    href: "/",
    exact: true,
    component: PageIndex
  },
  {
    id: 2,
    label: "График",
    href: "/chart",
    exact: true,
    component: PageChart
  },
]