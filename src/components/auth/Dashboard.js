import React from "react";

import { Sidebar } from "../Sidebar";
import Clientes from '../Clientes'
import AltaFaena from "../AltaFaena";

export const Dashboard = () => {
  return (
    <>
      <Sidebar />

      <Clientes />

    </>
  );
};