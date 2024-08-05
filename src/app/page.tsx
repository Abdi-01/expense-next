"use client";
import { UserContext } from "@/context/UserContext";
import { apiCall } from "@/helper/axiosInstance";
import Image from "next/image";
import { useEffect, useRef, useState, useContext } from "react";
import { MdDelete } from "react-icons/md";

export default function Home() {
  const filterCategoryRef = useRef<HTMLSelectElement>(null);
  const filterStartRef = useRef<HTMLInputElement>(null);
  const filterEndtRef = useRef<HTMLInputElement>(null);

  const titleRef = useRef<HTMLInputElement>(null);
  const radioIncomeRef = useRef<HTMLInputElement>(null);
  const radioExpenseRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const nominalRef = useRef<HTMLInputElement>(null);

  const [list, setList] = useState<any>([]);
  const [category, setCategory] = useState<any>([]);
  const [amount, setAmount] = useState<any>({
    totalIncome: 0,
    totalExpense: 0,
  });
  const getList = async (query: string = "") => {
    try {
      const { data } = await apiCall.get(`/tracker${query}`);
      console.log(data);

      setAmount({
        totalIncome: data.totalIncome,
        totalExpense: data.totalExpense,
      });
      setList(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategory = async () => {
    try {
      const { data } = await apiCall.get(`/tracker/category`);

      setCategory(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
    getCategory();
  }, []);

  const onSubmit = () => {
    try {
      console.log(
        titleRef.current?.value,
        nominalRef.current?.value,
        categoryRef.current?.value
      );
    } catch (error) {
      console.log(error);
    }
  };

  const printList = () => {
    return list.map((val: any) => {
      return (
        <div className="flex p-2 justify-between items-center">
          <div>
            <p className="text-lg">{val.title}</p>
            <p className="text-slate-500">{val.category}</p>
            <p className="text-slate-600">{val.date}</p>
          </div>
          <div className="flex items-center gap-4">
            <p
              className={`font-bold ${
                val.type === "income" ? "text-teal-500" : "text-red-500"
              }`}
            >
              {val.nominal.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <button className="bg-slate-200 p-2 rounded-md shadow">
              <MdDelete />
            </button>
          </div>
        </div>
      );
    });
  };

  const printCategory = () => {
    return category.map((val: any) => {
      return <option value={val}>{val}</option>;
    });
  };

  const { user, setUser } = useContext(UserContext);

  return (
    <div className="bg-slate-50 h-screen flex items-center">
      <div
        id="container"
        className="w-3/4 bg-slate-100 m-auto shadow-lg rounded-md flex p-8"
      >
        <div id="tracker-list" className="flex-1 p-8">
          <h1 className="text-5xl">Hello {user?.email}, track your money</h1>
          <div className="my-4 bg-slate-50 p-4 shadow-md rounded-md">
            <h3 className="text-center text-2xl">Your Money Balance</h3>
            <h3 className="text-center text-6xl font-bold">
              {(amount.totalIncome - amount.totalExpense).toLocaleString(
                "id-ID",
                {
                  style: "currency",
                  currency: "IDR",
                }
              )}
            </h3>
            <div className="flex my-4">
              <div className="flex-1">
                <h3 className="text-center text-lg">Income</h3>
                <h3 className="text-center text-xl font-bold">
                  {amount.totalIncome.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </h3>
              </div>
              <div className="flex-1">
                <h3 className="text-center text-lg">Expense</h3>
                <h3 className="text-center text-xl font-bold">
                  -{" "}
                  {amount.totalExpense.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </h3>
              </div>
            </div>
          </div>
          <div id="filter" className="space-y-2">
            <div className="flex gap-4 items-center">
              <label className="block text-xl flex-1">Category</label>
              <select
                className="p-2 rounded-md shadow flex-1"
                ref={filterCategoryRef}
              >
                <option value="">Choose</option>
                {printCategory()}
              </select>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 flex gap-4 items-center">
                <label className="block text-xl flex-1">Start Date</label>
                <input
                  className="p-2 rounded-md shadow flex-1"
                  type="date"
                  ref={filterStartRef}
                />
              </div>
              <div className="flex-1 flex gap-4 items-center">
                <label className="block text-xl flex-1">End Date</label>
                <input
                  className="p-2 rounded-md shadow flex-1"
                  type="date"
                  ref={filterEndtRef}
                />
              </div>
            </div>
            <button
              className="w-full p-2 bg-slate-500 rounded-md shadow"
              onClick={() => {
                console.log(filterCategoryRef.current?.value);
                getList(
                  `?category=${filterCategoryRef.current?.value}&&startDate=${filterStartRef.current?.value}&&endDate=${filterEndtRef.current?.value}`
                );
              }}
            >
              Search
            </button>
          </div>
          <div
            id="list-data"
            className="my-4 h-64 overflow-scroll bg-slate-50 p-4 shadow-md rounded-md"
          >
            {printList()}
          </div>
        </div>
        <div
          id="tracker-form"
          className="flex-1 p-8 bg-slate-50 rounded-md shadow-md"
        >
          <div className="flex items-center h-full">
            <div className="w-full space-y-4">
              <div className="flex gap-4 items-center">
                <label className="block text-xl flex-1">Type</label>
                <div className="flex-1 flex justify-evenly">
                  <div>
                    <input
                      name="expense-type"
                      className="rounded-md shadow flex-1 mr-2"
                      value="income"
                      type="radio"
                      ref={radioIncomeRef}
                    />
                    <label>Income</label>
                  </div>
                  <div>
                    <input
                      name="expense-type"
                      className="rounded-md shadow flex-1 mr-2"
                      value="expense"
                      type="radio"
                      ref={radioExpenseRef}
                    />
                    <label>Expense</label>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <label className="block text-xl flex-1">Title</label>
                <input
                  className="p-2 rounded-md shadow flex-1"
                  type="text"
                  ref={titleRef}
                />
              </div>
              <div className="flex gap-4 items-center">
                <label className="block text-xl flex-1">Nominal</label>
                <input
                  className="p-2 rounded-md shadow flex-1"
                  type="number"
                  ref={nominalRef}
                />
              </div>
              <div className="flex gap-4 items-center">
                <label className="block text-xl flex-1">Category</label>
                <select
                  className="p-2 rounded-md shadow flex-1"
                  ref={categoryRef}
                >
                  <option value="">Choose</option>
                  {printCategory()}
                </select>
              </div>
              <button
                className="bg-slate-500 p-2 w-full rounded-md shadow"
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
