import { useEffect, useState } from "react";
import TransactionTable from "./TransactionTable";
import axios from "axios";

export default function Table() {
  return (
    <div>
      <TransactionTable />
    </div>
  );
}
