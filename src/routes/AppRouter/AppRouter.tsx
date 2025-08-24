import React from "react";
import { Route, Routes } from "react-router";
import NewProduct from "../../pages/NewProduct/NewProduct";
import Products from "../../pages/Products/Products";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/products">
        <Route path="/products/list" element={<Products />} />
        <Route path="/products/new" element={<NewProduct />} />
      </Route>
      {/* <Route path="/purchases" element={<PurschaseList/>}/> */}
      {/* <Route path="/purchasesreturn" element={<PurchaseReturns/>}/> */}
      {/* <Route path="/newpurchases" element={<NewPurchase/>}/> */}
      {/* <Route path="/newpurchasereturn" element={<NewPurchaseReturn/>}/> */}
      {/* <Route path="/saleslist" element={<SalesList/>}/> */}
      {/* <Route path="/salesreturns" element={<SalesReturns/>}/> */}
      {/* <Route path="/newsale" element={<NewSale/>}/> */}
      {/* <Route path="/newsalereturn" element={<NewSaleReturn/>}/> */}
    </Routes>
  );
};

export default AppRouter;
