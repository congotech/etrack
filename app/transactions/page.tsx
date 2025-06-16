"use client";
import { Transaction } from "@/type";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { getTransactionByEmailAndPeriod } from "../action";
import Wrapper from "../components/Wrapper";
import TransactionsItem from "../components/TransactionsItem";

const page = () => {
  const { user } = useUser();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTransactions = async (period: string) => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setLoading(true);
      try {
        const transactionsData = await getTransactionByEmailAndPeriod(
          user?.primaryEmailAddress?.emailAddress,
          period
        );
        setTransactions(transactionsData);
        setLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des transactions:",
          error
        );
      }
    }
  };

  useEffect(() => {
    fetchTransactions("last30");
  }, [user?.primaryEmailAddress?.emailAddress]);

  return (
    <Wrapper>
      <div className="flex justify-end mb-5">
        <select
          className="input input-bordered input-md"
          defaultValue="last30"
          onChange={(e) => fetchTransactions(e.target.value)}
        >
          <option value="last7">Derniers 7 jours</option>
          <option value="last30">Derniers 30 jours</option>
          <option value="last90">Derniers 90 jours</option>
          <option value="last365">Derniers 365 jours</option>
        </select>
      </div>

      <div className="overflow-x-auto w-full bg-base-200/35 p-5 routded-xl">
        {loading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <span className="text-gray-500 text-sm">
              Aucune transaction à afficher
            </span>
          </div>
        ) : (
          <div>
            <ul className="divide-y divide-base-300">
              {transactions.map((transaction) => (
                <TransactionsItem
                  key={transaction.id}
                  transaction={transaction}
                ></TransactionsItem>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default page;
