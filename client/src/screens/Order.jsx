import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Table from "../components/table/Table";
import { Dialog, Transition } from "@headlessui/react";

const Orders = () => {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  const getData = async () => {
    try {
      const request = await fetch(
        `${process.env.REACT_APP_API}/admin/allorders`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = await request.json();
      setData(response.message.items);
      setIsLoading(false);
      console.log(isLoading);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [toggle]);
  const customerTableHead = [
    "Id",
    "User Name",
    "Item Name",
    "Order Quantity",
    "Total Price",
    "Item Image",
  ];
  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item._id}</td>
      <td>{item.username}</td>
      <td>{item.itemName}</td>
      <td>{item.orderQuantity}</td>
      <td>{item.orderPrice}</td>
      <td>
        <img style={{ width: 40, height: 40 }} src={item.itemImage} />
      </td>
    </tr>
  );

  return (
    <div>
      <h2 className="page-header">Orders In System</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              {isLoading === false && data.length !== 0 && (
                <Table
                  limit="10"
                  headData={customerTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={data}
                  renderBody={(item, index) => renderBody(item, index)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const buttonStyle = {
  background: "var(--main-color)",
  color: "#fff",
  padding: 12,
  paddingRight: 18,
  paddingLeft: 18,
  borderRadius: 12,
  marginBottom: 10,
  "&:hover": {
    opacity: 0.5,
  },
};

export default Orders;
