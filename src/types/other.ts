export interface ItemCreateRequestDto{
    subcategoryId:number | undefined;
    status:"PASSIVE" | "ACTIVE" ;
    itemType:"PRODUCT"|"SERVICE" | undefined;
    name:string;
    description:string;
    itemUnits:ItemUnitCreateRequestDto[]
}

export interface ItemUnitCreateRequestDto{
unitId:number | undefined;
convact1:number | undefined;
convact2:number | undefined;
main:boolean;
unitBarcodes:UnitBarcodeCreateRequestDto[]
}

export interface UnitBarcodeCreateRequestDto{
  id:number | null;
barcode:string
}


export interface CategoryType {
  id: number;
  name: string;
  subcategories: { id: number; name: string }[];
};
export interface SubCategoryType {
  id: number;
  name: string;
  sortOrder:number;
};

export interface OptionType  {
  name: string;
  id: number;
};
export interface ItemsType {
  key: React.Key;
  id: number;
  itemType: string;
  code: number;
  name: string;
  barcode: number;
  salesPrice: number;
  status: string,
  purchasesPrice: number;
  virtualCount: number;
  realCount: number;
  basicUnit: string;
  note: string;
  description:string
}