import React, { useEffect, useState } from "react";
import AutoComplatete from "./autoComplatete";
import {
  FilterAndSearchData,
  FilterObjectsByKeywords,
  ObjectToArrayWithKeyValues,
  ReactIcon,
  TableFieldFilter,
} from "../../../../helpers/functionHelper";
import CommonModel from "../../../../helpers/commonComponent/CommanModel/CommonModel";
import { Link } from "react-router-dom";
import AddEditUserForm from "./addEditUser";
import { CommonButtom } from "../../../../helpers/designHelper";
// import { MuiThemeProvider } from "@material-ui/core/styles";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import TextField from "@material-ui/core/TextField";
// const TableData = [
//   { fName: "Mark", lName: "Otto", handleBy: "@mdo" },
//   { fName: "Jacob", lName: "Thornton", handleBy: "@fat" },
//   { fName: "Larry", lName: "the Bird", handleBy: "@twitter" },
// ];
const ColumnHeader = [
  { title: "User Name", key: "userName" },
  { title: "Email", key: "email" },
  { title: "Mobile No.", key: "contact" },
  { title: "Name", key: "name" },
  { title: "Action", key: "action" },
];

const IconArray = [
  //   {
  //     icon: "AiFillEye",
  //     href: "/doctors/book-details",
  //     type: "view",
  //   },
  {
    icon: "AiFillEdit",
    href: "/doctors/book-edit",
    type: "edit",
  },
  {
    icon: "AiFillDelete",
    href: "/about",
    type: "delete",
  },
];

const UserTable = ({ AllPropes }) => {
  const { Loader, TableData, LoadData } = AllPropes || { TableData: [] };
  const [tableData, setTableData] = useState(TableData);
  const [recordData, setRecordData] = useState({});
  const [modelOpen, setModelOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [filters, setFilters] = useState({
    userName: "",
    email: "",
    contact: "",
    name: "",
  });

  const autoComplateFunction = (value, columnID, e) => {
    console.log("go11 autoComplateFunctionvalue1", value, columnID, e);
    setFilters({ ...filters, [columnID]: value });
  };
  const IsAllChacked = tableData.every((i, index) => i?.isChacked === true);

  const OnhandleCheckBox = ({ target }) => {
    const { checked, id } = target;
    if (id == "#") {
      if (IsAllChacked) {
        const tempData = tableData.map((i, index) => {
          return { ...i, isChacked: false };
        });
        setTableData(tempData);
      } else {
        const tempData = tableData.map((i, index) => {
          return { ...i, isChacked: true };
        });
        setTableData(tempData);
      }
    } else {
      const tempData = tableData.map((i, index) => {
        return index + 1 == id ? { ...i, isChacked: checked } : { ...i };
      });
      setTableData(tempData);
    }
  };

  useEffect(() => {
    setTableData([]);

    let filterKeyWords = [
      { userName: filters?.userName || "" },
      { email: filters?.email || "" },
      { contact: filters?.contact || "" },
      { name: filters?.name || "" },
    ];

    function filterObjectsByKeywords(objectArray, filterKeywords) {
      console.log(objectArray, filterKeywords);
      return objectArray.filter((object) => {
        for (let filterObj of filterKeywords) {
          const field = Object.keys(filterObj)[0];
          const keyword = filterObj[field];

          if (
            !String(object[field]).toLowerCase().includes(keyword.toLowerCase())
          ) {
            return false;
          }
        }
        return true;
      });
    }

    // Filter objects based on keywords
    const filteredObjects = filterObjectsByKeywords(TableData, filterKeyWords);

    // Output the filtered objects
    setTableData(filteredObjects);
  }, [filters]);

  const Toogle = (value) => {
    value ? setModelOpen(value) : setModelOpen(!modelOpen);
  };
  const onSubmit = () => {};
  useEffect(() => {
    setTableData(TableData);
  }, [TableData]);

  const OnButtonClick = (recorData, actionData) => {
    console.log("actionData", actionData);
    setModelOpen(true);
    switch (actionData.type) {
      case "edit":
        setRecordData({
          action: "edit",
          modelTitle: "Edit User Details",
          recordObj: recorData,
        });
        break;
      case "delete":
        setRecordData({
          action: "delete",
          modelTitle: "Delete User Details",
          message: `Are you want to delete record of ${
            recorData?.userName ?? "User"
          }`,
          recordObj: recorData,
        });
        break;
      case "add":
        setRecordData({
          action: "add",
          modelTitle: "Add New User",
        });
        break;
      default:
        break;
    }
  };

  const test = () => {
    console.log("test25456 filters", filters);
    console.log("test25456 TableData", TableData);
  };
  const ModelBody = ({ data }) => {
    return (
      <>
        <div>
          <AddEditUserForm
            recordData={recordData}
            toogle={Toogle}
            LoadData={LoadData}
          />
        </div>
      </>
    );
  };
  return (
    <>
      <div class="UserDataTable" onClick={test}>
        <div className="w-100 d-flex justify-content-start p-3">
          <CommonButtom
            attr={{
              onClick: () => {
                OnButtonClick({}, { type: "add" });
              },
            }}
            lable={"Add User"}
          />
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">
                <div>Select</div>
                <div className="headerFunctionComponent">
                  <input
                    type="checkbox"
                    checked={IsAllChacked}
                    name="all"
                    id="#"
                    onChange={OnhandleCheckBox}
                  />
                </div>
              </th>
              {ColumnHeader.map((i, index) => {
                return (
                  <>
                    <th scope="col">
                      <div>
                        <div>{i.title}</div>
                        <div className="headerFunctionComponent">
                          {i.key != "action" ? (
                            <>
                              <AutoComplatete
                                autoComplateFunction={autoComplateFunction}
                                options={extractKeyFromArray(tableData, [
                                  i.key,
                                ])}
                                columnID={i.key}
                                lable={i.title}
                              />
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </th>
                  </>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tableData.map((i, index) => {
              return (
                <>
                  <tr key={index + 1}>
                    <th scope="row">
                      <div>
                        <input
                          checked={i.isChacked}
                          type="checkbox"
                          name={"record$&{index + 1}"}
                          id={index + 1}
                          onChange={OnhandleCheckBox}
                        />
                      </div>
                    </th>
                    <td>{i.userName}</td>
                    <td>{i.email}</td> <td>{i.contact}</td> <td>{i.name}</td>
                    <td>
                      <div>
                        <div className="cs_team cs_style_1 cs_type_2 text-center boxShadowNone cs_radius_20 overflow-hidden transperentBg">
                          <div className="cs_team_meta  transperentBg">
                            <div className="cs_social_links">
                              {IconArray?.map((item, index) => (
                                // item.type == "delete" ? (
                                <>
                                  <span
                                    key={index}
                                    onClick={() => {
                                      OnButtonClick(i, item);
                                    }}
                                  >
                                    <Link
                                      // to={{ pathname: item.href, state: { data: "data" } }}
                                      to={""}
                                      key={index}
                                    >
                                      {/* <Icon icon={item.icon} /> */}
                                      {ReactIcon({ iconName: item.icon })}
                                      <div class="i-material-symbols:add-shopping-cart w-1em h-1em"></div>
                                    </Link>
                                  </span>
                                </>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <CommonModel
        title={recordData?.modelTitle ?? "Action on user"}
        BodyComponent={<ModelBody data={`Are sure to delete ${`name`} Book`} />}
        show={modelOpen}
        onSubmit={onSubmit}
        toogle={() => Toogle()}
        loader={loader}
        noFooter={true}
      />
    </>
  );
};

export default UserTable;

function extractKeyFromArray(arr, key) {
  return arr.map((item) => item[key]);
}
