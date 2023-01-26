import React from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import { Catalog } from "../pages/Catalog";
import { Detail } from "../pages/details/Detail";
import { Home } from "../pages/Home";

export function Routes() {
  return (
      <Switch>
        <Route path="/:category/search/:keyword" element={<Catalog />} />
        <Route path="/:category/:id" element={<Detail />} />
        <Route path="/:category" element={<Catalog />} />
        <Route path="/" element={<Home />} />
      </Switch>
  );
}
