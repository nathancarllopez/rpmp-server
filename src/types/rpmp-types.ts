// import type { ReactNode } from "react";
import { Constants } from "./database.types";
import type {
  Database,
  SupaProteinRow,
  SupaPullListRow,
} from "./supa-types";

type CamelCase<S extends string> = S extends `${infer P}_${infer R}`
  ? `${P}${Capitalize<CamelCase<R>>}`
  : S;

// E is a map of exceptions
type ToCamelCase<T, E extends Record<string, any> = {}> = {
  [K in keyof T as CamelCase<K & string>]:
    CamelCase<K & string> extends keyof E
      ? E[CamelCase<K & string>]
      : T[K] extends Array<infer U>
        ? Array<ToCamelCase<U, E>>
        : T[K] extends object
          ? ToCamelCase<T[K], E>
          : T[K];
};

/**
 * *****************************
 *           ORDERS
 * *****************************
 */
//#region
export const containerSizes = Constants["public"]["Enums"]["container_size"];

export type ContainerSize = Database["public"]["Enums"]["container_size"];

export type PullListRow = ToCamelCase<SupaPullListRow>;
export type ProteinRow = ToCamelCase<
  SupaProteinRow,
  { flavors: FlavorInfo[] }
>;

export interface FlavorInfo {
  protein: string;
  name: string;
  label: string;
  baseName: string;
  rawLabel: string;
  cookRow: number;
  cookLabel: string | null;
  sauceMultiplier: number | null;
}

export interface FlavorInfoWithCalcs extends FlavorInfo {
  orderedWeight: number;
  weightToCook: number;
  weightLbOz: string;
  cookedTeriyaki: string | null;
  sauce: string | null;
}

export interface ProteinRowWithCalcs extends ProteinRow {
  flavorInfo: Record<string, FlavorInfoWithCalcs>;
  totalWeightToCook: number
}

export type AllProteinInfo = Record<string, ProteinRowWithCalcs>

export interface OrderStatistics {
  numOrders: number;
  numMeals: number;
  numVeggieMeals: number;
  numThankYouBags: number;
  totalProteinWeight: number;
  containers: Partial<Record<ContainerSize, number>>;
  proteins: IngredientAmounts;
  veggieCarbs: AllVeggieCarbInfo;
}

export interface Order {
  fullName: string;
  itemName: string;
  container: ContainerSize;
  weight: number;
  flavor: string;
  flavorLabel: string;
  protein: string;
  proteinLabel: string;
  quantity: number;
}

export interface OrderError {
  error: Error | null;
  message: string;
  order: Order;
}

export interface IngredientAmounts {
  [name: string]: {
    label: string;
    amount: number;
    lbsPer: number;
    units: string;
    ingredientType: "proteins" | "veggies" | "carbs" | "misc"
  };
}

export interface Meal {
  protein: string;
  proteinLabel: string;
  flavor: string;
  flavorLabel: string;
  orderedWeight: number;  // Amount ordered by customer
  weightAfterBackstock: number;   // Amount after backstock adjustment
  weightToCook: number;    // Amount before shrink, i.e., amount to cook
  weightLbOz: string;
  backstockWeight: number;
  displayColor: string | null;
}

export interface CarbToCook {
  displayOrder: number,
  name: string,
  label: string,
  amountWithUnits: string,
  water: string | null,
  note: string | null
}

export interface CookSheetInfo {
  numTeriyakiCuppies: number;
  proteinCubes: Record<string, number>;
  carbsToCook: CarbToCook[];
}

export interface AllVeggieCarbInfo {
  [name: string]: {
    label: string;
    amount: number;
    lbsPer: number;
    units: string;
    ingredientType: "veggies" | "carbs";
    cookDisplayOrder: number | null;
    cookLabel: string | null;
    waterMultiplier: number | null;
  }
}

export interface StoreRow {
  storeName: string;
  name: string;
  label: string;
  purchaseLabel: string | null;
  price: number;
  locationInStore: string | null;
  quantity: number;
  editable: boolean;
}

/**
 * *****************************
 *           TIMECARDS
 * *****************************
 */
//#region
export interface TimecardDisplayValues {
  fullName: string;

  kitchenRate: string;
  drivingRate: string;

  sundayStart: string;
  sundayEnd: string;
  sundayTotalHours: string;
  sundayOvertimeHours: string;
  sundayRegularPay: string;
  sundayOvertimePay: string;
  sundayTotalPay: string;

  mondayStart: string;
  mondayEnd: string;
  mondayTotalHours: string;
  mondayOvertimeHours: string;
  mondayRegularPay: string;
  mondayOvertimePay: string;
  mondayTotalPay: string;

  drivingStart: string;
  drivingEnd: string;
  drivingTotalHours: string;
  drivingOvertimeHours: string;
  drivingRegularPay: string;
  drivingOvertimePay: string;
  drivingTotalPay: string;
  route1: string;
  route2: string;

  stops: string;
  costPerStop: string;
  drivingTotalCost: string;

  miscAmount: string;
  miscDescription: string;
  miscPayCode: string;

  grandTotal: string;
}
//#endregion